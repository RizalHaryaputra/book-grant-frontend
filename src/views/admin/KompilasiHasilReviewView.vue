<script setup>
import { ref, computed, onMounted } from 'vue'
import AdminSidebar from '../../layouts/admin/AdminSidebar.vue'
import AppTopbar from '../../layouts/shared/AppTopbar.vue'
import { fetchEntryPoint, fetchLink, parseLinks } from '../../services/api.js'

// ─── State ────────────────────────────────────────────────────────────────────
const manuscripts = ref([])
const isLoading = ref(false)

// ─── Fetch Manuscripts with Reviews ───────────────────────────────────────────
async function fetchData() {
  isLoading.value = true
  try {
    const res = await fetchEntryPoint('/admin/manuscripts')
    const data = await res.json()
    if (data.success) {
      // Only show manuscripts that have reviewers assigned
      const assigned = data.data.filter(m => m.reviewers && m.reviewers.length > 0)
      
      // Fetch compiled reviews for manuscripts with review_completed status
      const reviewList = []
      for (const m of assigned) {
        const item = {
          id: m.id,
          judul: m.title,
          status: m.status,
          reviewers: m.reviewers || [],
          rataRataSkor: '-',
          outcome: '-',
          expanded: false,
          detail: null
        }
        
        // Fetch compiled review if available
        if (['review_completed', 'revised', 'approved', 'accepted', 'revise'].includes(m.status)) {
          try {
            // ManuscriptResource menyertakan links per-item, gunakan rel compiled_reviews
            const msLinks = parseLinks(m.links)
            let compiledRes = null
            if (msLinks['compiled_reviews']) {
              compiledRes = await fetchLink(msLinks['compiled_reviews'])
            } else {
              // Fallback: gunakan entry point compiled-reviews
              compiledRes = await fetchEntryPoint(`/manuscripts/${m.id}/compiled-reviews`)
            }
            
            if (compiledRes) {
              const compiledData = await compiledRes.json()
              if (compiledData.success && compiledData.data) {
                const cd = compiledData.data
                item.rataRataSkor = cd.overall_score + '/100'
                item.outcome = cd.decision
                item.detail = {
                  reviewers: (cd.reviewer_feedbacks || []).map(fb => ({
                    name: fb.reviewer_alias,
                    skor: fb.score + '/100',
                    skorAkhir: fb.score + '/100',
                    outcome: fb.score >= 75 ? 'accepted' : 'rejected',
                    catatan: fb.feedback || '-'
                  }))
                }
              }
            }
          } catch (err) {
            console.error('Error fetching compiled review for manuscript', m.id, err)
          }
        }
        
        reviewList.push(item)
      }
      
      manuscripts.value = reviewList
    }
  } catch (err) {
    console.error('Gagal mengambil data:', err)
  } finally {
    isLoading.value = false
  }
}

// ─── Computed Stats ───────────────────────────────────────────────────────────
const totalDireview = computed(() => manuscripts.value.length)
const reviewSelesai = computed(() => manuscripts.value.filter(m => m.outcome !== '-').length)
const masihBerjalan = computed(() => manuscripts.value.filter(m => m.outcome === '-').length)
const rataRataSkor = computed(() => {
  const completed = manuscripts.value.filter(m => m.outcome !== '-')
  if (completed.length === 0) return '-'
  const sum = completed.reduce((acc, m) => {
    const numStr = m.rataRataSkor.split('/')[0]
    return acc + (parseFloat(numStr) || 0)
  }, 0)
  return (sum / completed.length).toFixed(1) + '/100'
})

function toggleExpand(review) {
  review.expanded = !review.expanded
}

function statusLabel(ms) {
  const map = {
    'initial_draft_uploaded': 'Draft',
    'reviewer_assigned': 'Reviewer Ditugaskan',
    'under_review': 'Sedang Review',
    'review_completed': 'Review Selesai',
    'revised': 'Sudah Revisi',
    'approved': 'Disetujui'
  }
  return map[ms.status] || ms.status
}

function reviewerStatusLabel(ms, reviewer) {
  // We can't know individual reviewer status from compiled reviews endpoint
  // so just label by overall manuscript status
  if (['review_completed', 'revised', 'approved'].includes(ms.status)) return 'Selesai'
  return 'Proses'
}

onMounted(() => fetchData())
</script>

<template>
  <div class="layout">
    <AdminSidebar />

    <div class="main-area">
      <AppTopbar
        page-title="Kompilasi Hasil Review"
        user-name="Ngafifah"
        user-role="Admin"
      />

      <p class="subtitle">Ringkasan semua review yang sudah selesai</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">NASKAH DIREVIEW</span>
            <span class="stat-value">{{ totalDireview }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">REVIEW SELESAI</span>
            <span class="stat-value">{{ reviewSelesai }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">MASIH BERJALAN</span>
            <span class="stat-value">{{ masihBerjalan }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">RATA-RATA BOBOT</span>
            <span class="stat-value large-value">{{ rataRataSkor }}</span>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M4 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm0-6c-.83 0-1.5.67-1.5 1.5S3.17 7.5 4 7.5 5.5 6.83 5.5 6 4.83 4.5 4 4.5zm0 12c-.83 0-1.5.68-1.5 1.5s.68 1.5 1.5 1.5 1.5-.68 1.5-1.5-.67-1.5-1.5-1.5zM7 19h14v-2H7v2zm0-6h14v-2H7v2zm0-8v2h14V5H7z"/></svg>
          <h2 class="card-title">Hasil Review Per Naskah</h2>
        </div>

        <div class="table-wrapper">
          <div v-if="isLoading" class="loading-state">Memuat data kompilasi review...</div>
          <div v-else-if="manuscripts.length === 0" class="empty-state">Belum ada naskah yang ditugaskan reviewer.</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>REVIEWER PLOT</th>
                <th>RATA-RATA BOBOT</th>
                <th>OUTCOME</th>
                <th>STATUS</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="review in manuscripts" :key="review.id">
                <tr :class="{ 'expanded-row-header': review.expanded }">
                  <td class="judul-cell">{{ review.judul }}</td>
                  <td class="reviewer-cell">
                    <div v-for="rev in review.reviewers" :key="rev.id" class="reviewer-item">
                      <span class="dot"></span> {{ rev.name }} 
                      <span class="badge-selesai-outline">{{ reviewerStatusLabel(review, rev) }}</span>
                    </div>
                  </td>
                  <td class="skor-cell">{{ review.rataRataSkor }}</td>
                  <td>
                    <span v-if="review.outcome !== '-'" class="badge-outcome" :class="review.outcome === 'accepted' ? 'badge-accepted' : 'badge-rejected'">{{ review.outcome }}</span>
                    <span v-else class="badge-pending">Menunggu</span>
                  </td>
                  <td class="status-cell-text">{{ statusLabel(review) }}</td>
                  <td>
                    <button v-if="review.detail" class="detail-btn" @click="toggleExpand(review)">
                      Detail
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" :style="{ transform: review.expanded ? 'rotate(180deg)' : 'none' }">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </button>
                    <span v-else class="detail-pending">—</span>
                  </td>
                </tr>
                <tr v-if="review.expanded && review.detail" class="expanded-row-body">
                  <td colspan="6">
                    <div class="expanded-content">
                      <div class="score-section">
                        <h4>BOBOT PER REVIEWER</h4>
                        <div v-for="(revDetail, idx) in review.detail.reviewers" :key="idx" class="rev-score-block">
                          <p class="rev-name">{{ revDetail.name }}: <strong>({{ revDetail.skor }})</strong></p>
                          <div class="score-row final-score-row">
                            <span class="score-label">Bobot akhir</span>
                            <span class="score-value final-score"><strong>{{ revDetail.skorAkhir.split('/')[0] }}</strong>/100 <span class="badge-accepted-outline" :class="revDetail.outcome === 'rejected' ? 'badge-rejected-outline' : ''">{{ revDetail.outcome }}</span></span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="feedback-section">
                        <h4>CATATAN REVIEWER</h4>
                        <div v-for="(revDetail, idx) in review.detail.reviewers" :key="idx" class="feedback-block">
                          <p class="rev-name">{{ revDetail.name }}</p>
                          <p class="rev-note">{{ revDetail.catatan }}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }
.main-area { margin-left: 210px; flex: 1; padding: 20px 24px; min-height: 100vh; }

.subtitle { font-size: 13px; color: #555; margin-bottom: 20px; margin-top: -4px; }

/* Stats Grid */
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px; }
.stat-icon-wrap { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.stat-icon-wrap.orange { background: #fdf0e6; color: #d97736; }
.stat-icon-wrap.brown { background: #f5f0ea; color: #a88a70; }
.stat-info { display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 26px; font-weight: 700; color: #1a1a1a; line-height: 1.1; }
.large-value { font-size: 32px; }

/* Content Card */
.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0; }
.loading-state, .empty-state { padding: 40px; text-align: center; color: #888; font-size: 14px; }

.table-wrapper { overflow-x: auto; border-radius: 8px; border: 1px solid #f0ede9; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f5f2ee; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #888; letter-spacing: 0.6px; border-bottom: 1px solid #e0d8d0; }
.data-table tbody tr { border-bottom: 1px solid #f0ede9; transition: background 0.15s; }
.data-table tbody tr:hover { background: #faf8f5; }
.data-table td { padding: 16px; vertical-align: top; }

.expanded-row-header { background: #faf8f5; border-bottom: none !important; }
.expanded-row-body { background: #faf8f5; }
.expanded-row-body td { padding-top: 0; padding-bottom: 24px; }

.judul-cell { font-size: 13.5px; font-weight: 600; color: #1a1a1a; }
.reviewer-cell { display: flex; flex-direction: column; gap: 6px; }
.reviewer-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #444; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #4caf50; }
.skor-cell { font-size: 13.5px; font-weight: 600; color: #c45b46; }
.status-cell-text { font-size: 13px; color: #2e7d32; }

/* Badges */
.badge-selesai-outline { border: 1px solid #4caf50; color: #4caf50; font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 12px; }
.badge-accepted { background: #d4edda; color: #155724; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px; }
.badge-rejected { background: #f8d7da; color: #721c24; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px; }
.badge-pending { background: #fff3cd; color: #856404; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: 12px; }
.badge-accepted-outline { border: 1px solid #28a745; color: #28a745; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 12px; margin-left: 8px; }
.badge-rejected-outline { border-color: #dc3545 !important; color: #dc3545 !important; }
.detail-pending { font-size: 13px; color: #888; }

/* Detail Btn */
.detail-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border: 1px solid #444; background: transparent; border-radius: 16px; font-size: 12px; font-weight: 600; color: #444; cursor: pointer; transition: all 0.15s; }
.detail-btn:hover { background: #444; color: #fff; }

/* Expanded Content */
.expanded-content { display: flex; gap: 24px; padding: 20px; background: #fdfbf8; border: 1px solid #ebdcd0; border-radius: 12px; }
.score-section, .feedback-section { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.score-section h4, .feedback-section h4 { font-size: 12px; font-weight: 600; color: #666; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }

.rev-score-block { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
.rev-name { font-size: 13px; font-weight: 600; color: #1a1a1a; margin: 0; }
.score-row { display: flex; justify-content: space-between; font-size: 13px; color: #555; padding-bottom: 6px; border-bottom: 1px dashed #e0d8d0; }
.score-value strong { color: #111; }
.final-score-row { background: #f5ece4; padding: 8px 12px; border-radius: 8px; border-bottom: none; align-items: center; margin-top: 4px; border: 1px solid #e6d8cc; }
.final-score { display: flex; align-items: center; }

.feedback-block { background: #f5f0ea; padding: 14px; border-radius: 8px; display: flex; flex-direction: column; gap: 6px; border: 1px solid #e6d8cc; }
.rev-note { font-size: 13px; color: #444; margin: 0; line-height: 1.5; }
</style>
