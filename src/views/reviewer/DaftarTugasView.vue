<script setup>
import { ref, onMounted } from 'vue'
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar       from '../../layouts/shared/AppTopbar.vue'
import { API_BASE_URL } from '../../config.js'

// ─── State ────────────────────────────────────────────────────────────────────
const tasks = ref([])
const isLoading = ref(false)

// Detail Modal State
const showModal = ref(false)
const isLoadingDetail = ref(false)
const selectedTask = ref(null)
const manuscriptDetail = ref(null)
const rubricList = ref([])
const scores = ref({}) // key: criteria_id, value: score
const narrativeFeedback = ref('')
const isSubmitting = ref(false)

// ─── Fetch Tasks ──────────────────────────────────────────────────────────────
async function fetchTasks() {
  isLoading.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/reviewer/dashboard`)
    const data = await res.json()
    if (data.success) {
      tasks.value = data.data
    }
  } catch (err) {
    console.error('Gagal mengambil daftar tugas:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})

// ─── Modal Helpers ────────────────────────────────────────────────────────────
async function openDetailModal(task) {
  selectedTask.value = task
  showModal.value = true
  isLoadingDetail.value = true
  
  try {
    // 1. Fetch manuscript details (triggers auto-transition to under_review on backend)
    const resDetail = await fetch(`${API_BASE_URL}/reviewer/manuscripts/${task.manuscript_id}`)
    const dataDetail = await resDetail.json()
    if (dataDetail.success) {
      manuscriptDetail.value = dataDetail.data
    }
    
    // 2. Fetch rubric criteria
    const resRubric = await fetch(`${API_BASE_URL}/reviewer/manuscripts/${task.manuscript_id}/rubric`)
    const dataRubric = await resRubric.json()
    if (dataRubric.success) {
      rubricList.value = dataRubric.data
      
      // Initialize scores map
      scores.value = {}
      rubricList.value.forEach(item => {
        scores.value[item.criteria_id] = 0
      })
    }
    
    // Refresh the task list in background to reflect 'under_review' status
    fetchTasks()
  } catch (err) {
    console.error('Gagal memuat detail tugas:', err)
  } finally {
    isLoadingDetail.value = false
  }
}

function closeModal() {
  showModal.value = false
  selectedTask.value = null
  manuscriptDetail.value = null
  rubricList.value = []
  scores.value = {}
  narrativeFeedback.value = ''
}

async function submitAssessment() {
  if (!selectedTask.value) return
  isSubmitting.value = true
  
  // Format rubric scores payload
  const rubricScoresPayload = Object.entries(scores.value).map(([criteriaId, val]) => ({
    criteria_id: parseInt(criteriaId),
    score: parseInt(val) || 0
  }))
  
  try {
    const res = await fetch(`${API_BASE_URL}/reviewer/manuscripts/${selectedTask.value.manuscript_id}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rubric_scores: rubricScoresPayload,
        narrative_feedback: narrativeFeedback.value || 'Penilaian dikirim.'
      })
    })
    
    const data = await res.json()
    if (data.success) {
      await fetchTasks()
      closeModal()
    }
  } catch (err) {
    console.error('Gagal mengirim penilaian:', err)
  } finally {
    isSubmitting.value = false
  }
}

function statusClass(status) {
  return {
    'Selesai Review': 'badge-selesai',
    'Sedang Review':  'badge-sedang',
    'Belum Review':   'badge-belum',
  }[status] || ''
}

function barClass(progres) {
  if (progres === 100) return 'bar-full'
  if (progres > 0)     return 'bar-partial'
  return                      'bar-empty'
}
</script>

<template>
  <div class="layout">
    <ReviewerSidebar />

    <div class="main-area">
      <!-- Topbar mode salam -->
      <AppTopbar
        :greet-mode="true"
        user-name="Prof. Dr. Budi Utomo"
        user-role="Reviewer"
      />

      <!-- Subtitle -->
      <p class="subtitle">Berikut merupakan daftar tugas review yang ditugaskan kepada Anda</p>

      <!-- Content Card -->
      <div class="content-card">
        <div class="card-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
          <h2 class="card-title">Daftar Tugas Review</h2>
        </div>

        <div class="table-wrapper">
          <div v-if="isLoading" class="loading-state">Memuat daftar tugas...</div>
          <div v-else-if="tasks.length === 0" class="empty-state">Belum ada tugas review untuk Anda.</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>PENULIS</th>
                <th>PROGRES</th>
                <th>TENGGAT</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td class="judul-cell">{{ task.judul }}</td>
                <td class="penulis-cell">{{ task.penulis }}</td>
                <td class="progres-cell">
                  <div class="progres-wrap">
                    <div class="progres-bar-bg">
                      <div
                        class="progres-bar-fill"
                        :class="barClass(task.progres)"
                        :style="{ width: task.progres + '%' }"
                      ></div>
                    </div>
                    <span class="progres-pct">{{ task.progres }}%</span>
                  </div>
                </td>
                <td class="tenggat-cell">{{ task.tenggat }}</td>
                <td class="status-cell">
                  <span class="badge" :class="statusClass(task.status)">{{ task.status }}</span>
                </td>
                <td class="aksi-cell">
                  <!-- View Details Button -->
                  <button class="icon-btn" :id="'view-' + task.id" title="Lihat Detail & Nilai" @click="openDetailModal(task)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ═══ DETAIL & ASSESSMENT MODAL ════════════════════════════════════════ -->
    <Transition name="fade">
      <div class="overlay" v-if="showModal" @click.self="closeModal" id="modal-overlay">
        <div class="modal" id="modal-box">
          <div class="modal-top">
            <h3 class="modal-title">Lembar Penilaian & Detail Naskah</h3>
          </div>

          <div class="modal-body" v-if="isLoadingDetail">
            <div class="loading-state">Memuat detail naskah dan kriteria rubrik...</div>
          </div>

          <div class="modal-body" v-else-if="manuscriptDetail">
            <!-- Info Naskah -->
            <div class="info-section">
              <h4 class="section-title">Informasi Naskah</h4>
              <p class="info-item">Judul: <strong>{{ manuscriptDetail.title }}</strong></p>
              <p class="info-item">Penulis: <strong>{{ manuscriptDetail.author }}</strong></p>
              <p class="info-item">Kategori: <strong>{{ manuscriptDetail.book_type }}</strong></p>
              <p class="info-item">Abstrak: <span class="abstract-text">{{ manuscriptDetail.abstract || '-' }}</span></p>
              
              <!-- Download Link -->
              <div class="download-box" v-if="manuscriptDetail.file_url">
                <span class="file-label">Draf Awal Naskah:</span>
                <a :href="manuscriptDetail.file_url" target="_blank" class="download-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                  </svg>
                  Unduh / Buka File PDF
                </a>
              </div>
            </div>

            <!-- Rubrik Penilaian -->
            <div class="rubric-section" v-if="selectedTask.status !== 'Selesai Review'">
              <h4 class="section-title">Isi Rubrik Penilaian</h4>
              
              <div v-for="criteria in rubricList" :key="criteria.criteria_id" class="criteria-card">
                <div class="criteria-header">
                  <span class="aspect-name">{{ criteria.aspect }}</span>
                  <span class="max-badge">Skor Maks: {{ criteria.max_score }}</span>
                </div>
                <p class="criteria-desc">{{ criteria.description }}</p>
                <div class="score-input-wrap">
                  <label class="score-label">Input Skor:</label>
                  <input
                    type="number"
                    v-model.number="scores[criteria.criteria_id]"
                    min="0"
                    :max="criteria.max_score"
                    class="score-input"
                  />
                </div>
              </div>

              <!-- Narrative Feedback -->
              <div class="feedback-wrap">
                <label class="feedback-label">Umpan Balik Naratif (Feedback)</label>
                <textarea
                  v-model="narrativeFeedback"
                  class="feedback-textarea"
                  placeholder="Berikan catatan, saran, atau kesimpulan reviewer mengenai naskah ini..."
                ></textarea>
              </div>
            </div>

            <div class="rubric-section already-reviewed" v-else>
              <div class="success-alert">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="alert-icon">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Penilaian untuk naskah ini telah selesai dikirim.
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn-batal" @click="closeModal">Tutup</button>
            <button
              v-if="manuscriptDetail && selectedTask.status !== 'Selesai Review'"
              class="btn-simpan"
              @click="submitAssessment"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Mengirim...' : 'Kirim Penilaian' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }
.main-area { margin-left: 210px; flex: 1; padding: 20px 24px; min-height: 100vh; }

.subtitle { font-size: 13px; color: #555; margin-bottom: 18px; margin-top: -4px; }

.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; }

.table-wrapper { overflow-x: auto; }
.loading-state, .empty-state { padding: 40px; text-align: center; color: #888; font-size: 14px; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f5f2ee; }
.data-table th {
  padding: 10px 16px; text-align: left;
  font-size: 11px; font-weight: 600; color: #888;
  letter-spacing: 0.6px; text-transform: uppercase;
}
.data-table tbody tr { border-bottom: 1px solid #f0ede9; transition: background 0.1s; }
.data-table tbody tr:hover { background: #faf8f5; }
.data-table tbody tr:last-child { border-bottom: none; }
.data-table td { padding: 13px 16px; vertical-align: middle; }

.judul-cell  { font-size: 13.5px; font-weight: 600; color: #1a1a1a; }
.penulis-cell { font-size: 13px; color: #555; }
.tenggat-cell { font-size: 13px; color: #444; white-space: nowrap; }

/* ── Progress Bar ── */
.progres-cell { min-width: 120px; }
.progres-wrap { display: flex; align-items: center; gap: 8px; }
.progres-bar-bg {
  flex: 1; height: 5px; border-radius: 3px;
  background: #ede8e2; overflow: hidden;
}
.progres-bar-fill {
  height: 100%; border-radius: 3px;
  transition: width 0.4s ease;
}
.bar-full    { background: #2a1a10; }
.bar-partial { background: #2a1a10; }
.bar-empty   { background: #d4b8a0; width: 0% !important; }
.progres-pct { font-size: 11px; color: #888; white-space: nowrap; min-width: 28px; }

/* ── Status Badges ── */
.status-cell { white-space: nowrap; }
.badge { padding: 5px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge-selesai { background: #d4f0e0; color: #1a7a44; }
.badge-sedang  { background: #dce8f8; color: #1a52a8; }
.badge-belum   { background: #ffe0da; color: #c83828; }

/* ── Action Buttons ── */
.aksi-cell { display: flex; align-items: center; gap: 6px; }
.icon-btn {
  width: 32px; height: 32px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 8px; border: 1.5px solid #e0d8d0;
  background: #fff; color: #666; cursor: pointer;
  transition: all 0.15s;
}
.icon-btn:hover { border-color: #a89080; background: #f5f0ea; color: #3d2b1f; }

/* ── Modal & Overlays ── */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
}
.modal {
  background: #ffffff;
  border-radius: 12px;
  width: 580px;
  max-width: 95vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}
.modal-top { padding: 20px 24px 15px; border-bottom: 1px solid #f0ede9; }
.modal-title { font-size: 16px; font-weight: 700; color: #111; margin: 0; }
.modal-body { flex: 1; overflow-y: auto; padding: 20px 24px; display: flex; flex-direction: column; gap: 20px; }

/* Info Section */
.info-section { background: #faf8f5; padding: 16px; border-radius: 8px; border: 1px solid #ebdcd0; display: flex; flex-direction: column; gap: 8px; }
.section-title { font-size: 14px; font-weight: 700; color: #2a1a10; margin: 0 0 6px 0; border-bottom: 2px solid #2a1a10; padding-bottom: 4px; display: inline-block; width: max-content; }
.info-item { font-size: 13px; color: #333; margin: 0; }
.abstract-text { display: block; margin-top: 4px; padding: 8px; background: #fff; border-radius: 6px; border: 1px solid #eee; font-style: italic; font-size: 12.5px; line-height: 1.4; color: #666; }

/* Download Box */
.download-box { display: flex; align-items: center; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px dashed #e8ddd0; }
.file-label { font-size: 13px; font-weight: 600; color: #555; }
.download-link {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; background: #2a1a10; color: #fff;
  font-size: 12.5px; font-weight: 600; border-radius: 6px;
  text-decoration: none; transition: background 0.15s;
}
.download-link:hover { background: #1a0f09; }

/* Rubric Section */
.rubric-section { display: flex; flex-direction: column; gap: 14px; }
.criteria-card { background: #fff; border: 1px solid #ebdcd0; border-radius: 8px; padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
.criteria-header { display: flex; justify-content: space-between; align-items: center; }
.aspect-name { font-size: 13.5px; font-weight: 700; color: #111; }
.max-badge { font-size: 11px; font-weight: 600; color: #8a6d5c; background: #fdf5f0; border: 1px solid #ebdcd0; padding: 2px 8px; border-radius: 10px; }
.criteria-desc { font-size: 12.5px; color: #666; margin: 0; line-height: 1.4; }
.score-input-wrap { display: flex; align-items: center; gap: 10px; margin-top: 6px; border-top: 1px dashed #f0ede9; padding-top: 8px; }
.score-label { font-size: 12.5px; font-weight: 600; color: #444; }
.score-input { width: 80px; padding: 6px 10px; border: 1.5px solid #d4ccc4; border-radius: 6px; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; }
.score-input:focus { border-color: #a89080; }

/* Narrative Feedback */
.feedback-wrap { display: flex; flex-direction: column; gap: 6px; margin-top: 6px; }
.feedback-label { font-size: 13px; font-weight: 600; color: #222; }
.feedback-textarea { width: 100%; height: 100px; padding: 10px; border: 1.5px solid #d4ccc4; border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 13px; outline: none; resize: vertical; }
.feedback-textarea:focus { border-color: #a89080; }

/* Success Alert */
.success-alert { display: flex; align-items: center; gap: 10px; background: #e6f6ee; color: #155734; border: 1px solid #c3e6cb; padding: 12px 16px; border-radius: 8px; font-size: 13.5px; font-weight: 600; }
.alert-icon { color: #28a745; }

/* Footer */
.modal-footer { display: flex; align-items: center; justify-content: flex-end; gap: 10px; padding: 14px 24px; border-top: 1px solid #f0ede9; }
.btn-batal { padding: 9px 22px; border-radius: 8px; border: 1.5px solid #d0c8c0; background: #fff; color: #444; font-size: 13.5px; font-weight: 500; cursor: pointer; transition: background 0.15s; }
.btn-batal:hover { background: #f5f2ee; }
.btn-simpan { padding: 9px 26px; border-radius: 8px; border: none; background: #2a1a10; color: #fff; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-simpan:hover { background: #1a0f09; }
.btn-simpan:disabled { background: #a89f98; cursor: not-allowed; }

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }
.fade-enter-active .modal,
.fade-leave-active .modal { transition: transform 0.2s ease; }
.fade-enter-from .modal   { transform: scale(0.96) translateY(10px); }
.fade-leave-to .modal     { transform: scale(0.96) translateY(10px); }
</style>
