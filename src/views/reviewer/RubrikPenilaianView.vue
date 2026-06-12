<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar       from '../../layouts/shared/AppTopbar.vue'
import { fetchEntryPoint, fetchLink, parseLinks } from '../../services/api.js'

const route = useRoute()
const router = useRouter()

// ─── State ────────────────────────────────────────────────────────────────────
const tasks = ref([])
const isLoadingTasks = ref(false)
const selectedManuscriptId = ref(null)

// Assessment State
const manuscriptDetail = ref(null)
const rubricList = ref([])
const isLoadingDetail = ref(false)
const scores = ref({})
const narrativeFeedback = ref('')
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref('')

// ─── Computed ─────────────────────────────────────────────────────────────────
const totalScore = computed(() => {
  if (rubricList.value.length === 0) return 0
  
  let weightedSum = 0
  let totalWeight = 0
  
  rubricList.value.forEach(item => {
    const score = parseInt(scores.value[item.criteria_id]) || 0
    // Backend assigns rubric weight to max_score field
    const weight = parseFloat(item.max_score) || 0
    
    weightedSum += (score * weight)
    totalWeight += weight
  })
  
  if (totalWeight === 0) return 0
  
  const finalScore = weightedSum / totalWeight
  return Math.round(finalScore * 10) / 10
})

const outcome = computed(() => {
  return totalScore.value >= 75 ? 'accepted' : 'rejected'
})

const isFeedbackRequired = computed(() => {
  return outcome.value === 'rejected'
})

const canSubmit = computed(() => {
  // All scores must be filled (> 0)
  const allFilled = Object.values(scores.value).every(v => v > 0)
  if (!allFilled) return false
  
  // If rejected, feedback is mandatory
  if (isFeedbackRequired.value && !narrativeFeedback.value.trim()) return false
  
  return true
})

// ─── Fetch task list (manuscripts assigned) ───────────────────────────────────
async function fetchTasks() {
  isLoadingTasks.value = true
  try {
    const res = await fetchEntryPoint('/reviewer/dashboard')
    const data = await res.json()
    if (data.success) {
      tasks.value = data.data
    }
  } catch (err) {
    console.error('Gagal mengambil daftar tugas:', err)
  } finally {
    isLoadingTasks.value = false
  }
}

// ─── Load manuscript detail + rubric ──────────────────────────────────────────
async function loadManuscript(manuscriptId) {
  selectedManuscriptId.value = manuscriptId
  isLoadingDetail.value = true
  submitSuccess.value = false
  submitError.value = ''
  narrativeFeedback.value = ''
  
  try {
    // Cari task terkait untuk mendapatkan link
    const task = tasks.value.find(t => t.manuscript_id == manuscriptId)
    if (!task) throw new Error('Naskah tidak ditemukan dalam daftar tugas')

    const taskLinks = parseLinks(task.links)

    // 1. Fetch manuscript details via HATEOAS link dari task
    let dataDetail = null
    if (taskLinks['get_details']) {
      const resDetail = await fetchLink(taskLinks['get_details'])
      dataDetail = await resDetail.json()
    }
    
    if (dataDetail && dataDetail.success) {
      manuscriptDetail.value = dataDetail.data
    }
    
    // 2. Fetch rubric criteria via entry point
    const resRubric = await fetchEntryPoint(`/reviewer/manuscripts/${manuscriptId}/rubric`)
    const dataRubric = await resRubric.json()

    if (dataRubric && dataRubric.success) {
      rubricList.value = dataRubric.data
      scores.value = {}
      rubricList.value.forEach(item => {
        scores.value[item.criteria_id] = item.submitted_score || 0
      })
      
      // Simpan link submit_review dari response rubric (HATEOAS)
      const rubricResponseLinks = parseLinks(dataRubric.links)
      if (rubricResponseLinks['submit_review']) {
        task._submitReviewLink = rubricResponseLinks['submit_review']
      }

      // If submitted_review exists, this manuscript was already reviewed
      if (dataRubric.submitted_review) {
        narrativeFeedback.value = dataRubric.submitted_review.feedback || ''
        submitSuccess.value = true
      }
    }
  } catch (err) {
    console.error('Gagal memuat rubrik:', err)
  } finally {
    isLoadingDetail.value = false
  }
}

// ─── Submit Assessment ────────────────────────────────────────────────────────
async function submitAssessment() {
  if (!canSubmit.value || !selectedManuscriptId.value) return
  isSubmitting.value = true
  submitError.value = ''
  
  const rubricScoresPayload = Object.entries(scores.value).map(([criteriaId, val]) => ({
    criteria_id: parseInt(criteriaId),
    score: parseInt(val) || 0
  }))
  
  try {
    const task = tasks.value.find(t => t.manuscript_id == selectedManuscriptId.value)
    
    // Gunakan link submit_review yang di-cache dari response rubric (HATEOAS)
    const reviewLink = task && task._submitReviewLink
      ? task._submitReviewLink
      : null

    let res
    if (reviewLink) {
      // Gunakan HATEOAS link dari response rubric
      res = await fetchLink(reviewLink, {
        body: {
          rubric_scores: rubricScoresPayload,
          narrative_feedback: narrativeFeedback.value || 'Penilaian dikirim.'
        }
      })
    } else {
      // Fallback ke entry point jika link tidak tersedia
      res = await fetchEntryPoint(`/reviewer/manuscripts/${selectedManuscriptId.value}/review`, {
        method: 'POST',
        body: {
          rubric_scores: rubricScoresPayload,
          narrative_feedback: narrativeFeedback.value || 'Penilaian dikirim.'
        }
      })
    }
    
    const data = await res.json()
    if (data.success || res.ok) {
      submitSuccess.value = true
      await fetchTasks()
    } else {
      let errorMsg = data.message || 'Terjadi kesalahan saat mengirim penilaian.'
      if (data.errors) {
        const errorDetails = Object.values(data.errors).flat().join(', ')
        errorMsg += ' Detail: ' + errorDetails
      }
      submitError.value = errorMsg
    }
  } catch (err) {
    console.error('Gagal mengirim penilaian:', err)
    submitError.value = 'Gagal mengirim penilaian. Periksa koneksi Anda.'
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  selectedManuscriptId.value = null
  manuscriptDetail.value = null
  rubricList.value = []
  scores.value = {}
  narrativeFeedback.value = ''
  submitSuccess.value = false
  submitError.value = ''
}

function statusClass(status) {
  return {
    'Selesai Review': 'badge-selesai',
    'Sedang Review':  'badge-sedang',
    'Belum Review':   'badge-belum',
  }[status] || ''
}

// ─── Init ─────────────────────────────────────────────────────────────────────
onMounted(async () => {
  await fetchTasks()
  
  // If navigated from DaftarTugas with query param
  const msId = route.query.manuscript_id
  if (msId) {
    loadManuscript(msId)
  }
})
</script>

<template>
  <div class="layout">
    <ReviewerSidebar />

    <div class="main-area">
      <AppTopbar
        page-title="Rubrik Penilaian"
        user-name="Inna Putri"
        user-role="Reviewer"
      />

      <p class="subtitle">Pilih naskah lalu isi rubrik penilaian</p>

      <div class="rubrik-layout">
        <!-- LEFT: Task Selector -->
        <div class="task-selector-card">
          <div class="selector-header">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#555"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
            <h3>Pilih Naskah</h3>
          </div>
          
          <div v-if="isLoadingTasks" class="loading-state-sm">Memuat...</div>
          <div v-else-if="tasks.length === 0" class="empty-state-sm">Tidak ada tugas review.</div>
          <div v-else class="task-list">
            <div
              v-for="task in tasks"
              :key="task.id"
              class="task-item"
              :class="{ 
                active: selectedManuscriptId == task.manuscript_id,
                done: task.status === 'Selesai Review'
              }"
              @click="task.status !== 'Selesai Review' ? loadManuscript(task.manuscript_id) : null"
            >
              <div class="task-info">
                <span class="task-title">{{ task.judul }}</span>
                <span class="task-author">{{ task.penulis }}</span>
              </div>
              <span class="badge-sm" :class="statusClass(task.status)">{{ task.status }}</span>
            </div>
          </div>
        </div>

        <!-- RIGHT: Rubric Form -->
        <div class="rubric-form-card">
          <!-- No Manuscript Selected -->
          <div v-if="!selectedManuscriptId" class="placeholder-state">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="#d4ccc4"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            <p class="placeholder-text">Pilih naskah dari daftar di samping untuk mulai memberikan penilaian</p>
          </div>

          <!-- Loading -->
          <div v-else-if="isLoadingDetail" class="loading-state">Memuat rubrik penilaian...</div>

          <!-- Success State -->
          <div v-else-if="submitSuccess" class="success-state">
            <div class="success-icon-wrap">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3>Penilaian Berhasil Dikirim!</h3>
            <p>Review untuk naskah <strong>{{ manuscriptDetail?.title }}</strong> telah berhasil dikirim.</p>
            <button class="btn-kembali" @click="resetForm">Nilai Naskah Lain</button>
          </div>

          <!-- Rubric Form -->
          <div v-else-if="manuscriptDetail" class="rubric-form-content">
            <!-- Manuscript Info Header -->
            <div class="manuscript-info-bar">
              <div class="ms-info">
                <h3 class="ms-title">{{ manuscriptDetail.title }}</h3>
                <p class="ms-meta">Penulis: <strong>{{ manuscriptDetail.author }}</strong> · Kategori: <strong>{{ manuscriptDetail.book_type }}</strong></p>
              </div>
            </div>

            <!-- Score Indicator -->
            <div class="score-indicator" :class="{ 'indicator-accepted': outcome === 'accepted', 'indicator-rejected': outcome === 'rejected' }">
              <div class="indicator-left">
                <span class="indicator-label">Nilai Akhir</span>
                <span class="indicator-value">{{ totalScore }}<span class="indicator-max">/100</span></span>
              </div>
              <div class="indicator-right">
                <span class="outcome-badge" :class="outcome === 'accepted' ? 'outcome-accepted' : 'outcome-rejected'">
                  {{ outcome === 'accepted' ? 'Accepted' : 'Rejected' }}
                </span>
                <span class="outcome-note" v-if="outcome === 'rejected'">Bobot kurang dari 75 — Feedback wajib diisi</span>
                <span class="outcome-note" v-else>Bobot mencapai batas minimum — Feedback opsional</span>
              </div>
            </div>

            <!-- Rubric Criteria Cards -->
            <div class="criteria-list">
              <div v-for="criteria in rubricList" :key="criteria.criteria_id" class="criteria-card">
                <div class="criteria-header">
                  <span class="aspect-name">{{ criteria.aspect }}</span>
                  <span class="max-badge">Bobot Maks: {{ criteria.max_score }}</span>
                </div>
                <p class="criteria-desc">{{ criteria.description }}</p>
                <div class="score-input-wrap">
                  <label class="score-label">Input Nilai (0-100):</label>
                  <input
                    type="number"
                    v-model.number="scores[criteria.criteria_id]"
                    min="0"
                    max="100"
                    class="score-input"
                    :class="{ 
                      'score-low': scores[criteria.criteria_id] > 0 && scores[criteria.criteria_id] < 75,
                      'score-high': scores[criteria.criteria_id] >= 75
                    }"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <!-- Feedback Section -->
            <div class="feedback-section">
              <div class="feedback-header">
                <label class="feedback-label">
                  Umpan Balik Naratif (Feedback)
                  <span v-if="isFeedbackRequired" class="required-tag">* Wajib diisi</span>
                  <span v-else class="optional-tag">Opsional</span>
                </label>
              </div>
              <textarea
                v-model="narrativeFeedback"
                class="feedback-textarea"
                :class="{ 'textarea-required': isFeedbackRequired && !narrativeFeedback.trim() }"
                :placeholder="isFeedbackRequired 
                  ? 'Wajib diisi karena bobot kurang dari 75. Berikan catatan, saran, atau alasan penolakan...' 
                  : 'Berikan catatan, saran, atau kesimpulan reviewer mengenai naskah ini (opsional)...'"
              ></textarea>
              <p v-if="isFeedbackRequired && !narrativeFeedback.trim()" class="feedback-warning">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
                Feedback wajib diisi untuk naskah yang ditolak (bobot &lt; 75)
              </p>
            </div>

            <!-- Error Message -->
            <div v-if="submitError" class="error-alert">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
              {{ submitError }}
            </div>

            <!-- Submit Actions -->
            <div class="form-actions">
              <button class="btn-batal" @click="resetForm">Batal</button>
              <button
                class="btn-kirim"
                @click="submitAssessment"
                :disabled="!canSubmit || isSubmitting"
              >
                <svg v-if="!isSubmitting" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                <span v-if="isSubmitting" class="spinner"></span>
                {{ isSubmitting ? 'Mengirim...' : 'Kirim Penilaian' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }
.main-area { margin-left: 0px; flex: 1; padding: 20px 24px; min-height: 100vh; }
.subtitle { font-size: 13px; color: #555; margin-bottom: 18px; margin-top: -4px; }

/* ── Two-column Layout ── */
.rubrik-layout { display: flex; gap: 20px; align-items: flex-start; }

/* ── Left: Task Selector ── */
.task-selector-card {
  width: 280px; min-width: 280px;
  background: #fff; border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  overflow: hidden;
  position: sticky; top: 20px;
}
.selector-header {
  display: flex; align-items: center; gap: 10px;
  padding: 18px 20px 14px;
  border-bottom: 1px solid #f0ede9;
}
.selector-header h3 { font-size: 14px; font-weight: 600; color: #1a1a1a; margin: 0; }

.task-list { padding: 8px; max-height: 70vh; overflow-y: auto; }
.task-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px; border-radius: 10px;
  cursor: pointer; transition: all 0.15s;
  margin-bottom: 4px;
}
.task-item:hover:not(.active):not(.done) { background: #faf8f5; }
.task-item.active { background: #2a1a10; }
.task-item.active .task-title { color: #fff; }
.task-item.active .task-author { color: rgba(255,255,255,0.6); }
.task-item.done { opacity: 0.5; cursor: not-allowed; }

.task-info { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
.task-title { font-size: 13px; font-weight: 600; color: #1a1a1a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.task-author { font-size: 11px; color: #888; }

.badge-sm { padding: 3px 8px; border-radius: 10px; font-size: 10px; font-weight: 600; white-space: nowrap; margin-left: 8px; flex-shrink: 0; }
.badge-selesai { background: #d4f0e0; color: #1a7a44; }
.badge-sedang  { background: #dce8f8; color: #1a52a8; }
.badge-belum   { background: #ffe0da; color: #c83828; }

.loading-state-sm, .empty-state-sm { padding: 30px 20px; text-align: center; color: #888; font-size: 13px; }

/* ── Right: Rubric Form Card ── */
.rubric-form-card {
  flex: 1;
  background: #fff; border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  min-height: 400px;
  overflow: hidden;
}

.placeholder-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 40px; text-align: center; gap: 16px;
}
.placeholder-text { font-size: 14px; color: #999; max-width: 300px; line-height: 1.5; }

.loading-state { display: flex; align-items: center; justify-content: center; padding: 80px; color: #888; font-size: 14px; }

/* Success State */
.success-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 80px 40px; text-align: center; gap: 12px;
}
.success-icon-wrap { color: #28a745; }
.success-state h3 { font-size: 18px; font-weight: 700; color: #155734; margin: 0; }
.success-state p { font-size: 14px; color: #555; margin: 0; }
.btn-kembali {
  margin-top: 16px; padding: 10px 24px; border-radius: 8px;
  border: 1.5px solid #2a1a10; background: transparent; color: #2a1a10;
  font-size: 13.5px; font-weight: 600; cursor: pointer; transition: all 0.15s;
}
.btn-kembali:hover { background: #2a1a10; color: #fff; }

/* ── Rubric Form Content ── */
.rubric-form-content { padding: 24px; display: flex; flex-direction: column; gap: 20px; }

.manuscript-info-bar {
  background: #faf8f5; padding: 16px; border-radius: 10px;
  border: 1px solid #ebdcd0;
}
.ms-title { font-size: 16px; font-weight: 700; color: #1a1a1a; margin: 0 0 4px; }
.ms-meta { font-size: 13px; color: #666; margin: 0; }

/* ── Score Indicator ── */
.score-indicator {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 20px; border-radius: 10px;
  border: 2px solid #e0d8d0; background: #fdfcfa;
  transition: all 0.3s ease;
}
.score-indicator.indicator-accepted { border-color: #28a745; background: #f0faf3; }
.score-indicator.indicator-rejected { border-color: #dc3545; background: #fef5f5; }

.indicator-left { display: flex; flex-direction: column; gap: 2px; }
.indicator-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.indicator-value { font-size: 32px; font-weight: 800; color: #1a1a1a; line-height: 1; }
.indicator-max { font-size: 16px; font-weight: 400; color: #888; }

.indicator-right { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.outcome-badge { padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
.outcome-accepted { background: #d4edda; color: #155724; }
.outcome-rejected { background: #f8d7da; color: #721c24; }
.outcome-note { font-size: 11px; color: #888; }

/* ── Criteria Cards ── */
.criteria-list { display: flex; flex-direction: column; gap: 14px; }
.criteria-card {
  background: #fff; border: 1px solid #ebdcd0;
  border-radius: 10px; padding: 16px;
  display: flex; flex-direction: column; gap: 8px;
  transition: border-color 0.2s;
}
.criteria-card:hover { border-color: #c9b89e; }
.criteria-header { display: flex; justify-content: space-between; align-items: center; }
.aspect-name { font-size: 14px; font-weight: 700; color: #111; }
.max-badge { font-size: 11px; font-weight: 600; color: #8a6d5c; background: #fdf5f0; border: 1px solid #ebdcd0; padding: 3px 10px; border-radius: 12px; }
.criteria-desc { font-size: 12.5px; color: #666; margin: 0; line-height: 1.5; }

.score-input-wrap { display: flex; align-items: center; gap: 12px; margin-top: 4px; border-top: 1px dashed #f0ede9; padding-top: 10px; }
.score-label { font-size: 13px; font-weight: 600; color: #444; }
.score-input {
  width: 100px; padding: 8px 12px;
  border: 2px solid #d4ccc4; border-radius: 8px;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  outline: none; transition: border-color 0.2s;
  text-align: center;
}
.score-input:focus { border-color: #a89080; }
.score-input.score-low { border-color: #dc3545; background: #fff5f5; color: #dc3545; }
.score-input.score-high { border-color: #28a745; background: #f0faf3; color: #155724; }

/* ── Feedback Section ── */
.feedback-section { display: flex; flex-direction: column; gap: 8px; }
.feedback-header { display: flex; align-items: center; }
.feedback-label { font-size: 14px; font-weight: 600; color: #222; display: flex; align-items: center; gap: 8px; }
.required-tag { font-size: 11px; font-weight: 700; color: #dc3545; background: #fce4e4; padding: 2px 8px; border-radius: 10px; }
.optional-tag { font-size: 11px; font-weight: 600; color: #28a745; background: #e6f6ee; padding: 2px 8px; border-radius: 10px; }

.feedback-textarea {
  width: 100%; height: 120px; padding: 12px;
  border: 2px solid #d4ccc4; border-radius: 10px;
  font-family: 'Inter', sans-serif; font-size: 13px;
  outline: none; resize: vertical; transition: border-color 0.2s;
  line-height: 1.5;
}
.feedback-textarea:focus { border-color: #a89080; }
.feedback-textarea.textarea-required { border-color: #dc3545; background: #fff9f9; }

.feedback-warning {
  display: flex; align-items: center; gap: 6px;
  font-size: 12px; color: #dc3545; font-weight: 500; margin: 0;
}

/* ── Error Alert ── */
.error-alert {
  display: flex; align-items: center; gap: 10px;
  background: #fce4e4; color: #721c24; border: 1px solid #f5c6cb;
  padding: 12px 16px; border-radius: 8px; font-size: 13px; font-weight: 500;
}

/* ── Form Actions ── */
.form-actions {
  display: flex; align-items: center; justify-content: flex-end; gap: 12px;
  padding-top: 16px; border-top: 1px solid #f0ede9;
}
.btn-batal {
  padding: 10px 24px; border-radius: 8px;
  border: 1.5px solid #d0c8c0; background: #fff; color: #444;
  font-size: 13.5px; font-weight: 500; cursor: pointer; transition: background 0.15s;
}
.btn-batal:hover { background: #f5f2ee; }
.btn-kirim {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 28px; border-radius: 8px; border: none;
  background: #2a1a10; color: #fff;
  font-size: 13.5px; font-weight: 600; cursor: pointer;
  transition: all 0.15s;
}
.btn-kirim:hover { background: #1a0f09; }
.btn-kirim:disabled { background: #a89f98; cursor: not-allowed; }

/* Spinner */
.spinner {
  width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff; border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
