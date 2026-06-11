<script setup>
import { ref, computed, onMounted } from 'vue'
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar from '../../layouts/shared/AppTopbar.vue'
import { fetchEntryPoint, fetchLink, parseLinks } from '../../services/api.js'

// ─── State ────────────────────────────────────────────────────────────────────
const tasks = ref([])
const isLoading = ref(false)

// ─── Fetch reviewer dashboard (all assigned manuscripts) ─────────────────────
async function fetchTasks() {
  isLoading.value = true
  try {
    const res = await fetchEntryPoint('/reviewer/dashboard')
    const data = await res.json()
    if (data.success) {
      // For each task, also attempt to load rubric/scores if review is completed
      const enriched = []
      for (const task of data.data) {
        const taskLinks = parseLinks(task.links)
        const item = {
          id: task.id,
          manuscript_id: task.manuscript_id,
          judul: task.judul,
          penulis: task.penulis,
          kategori: '-',
          status: task.status,
          rataRataSkor: '-',
          expanded: false,
          detail: null
        }
        
        // Fetch rubric with submitted scores if completed
        if (task.status === 'Selesai Review') {
          try {
            // Backend task.links hanya punya get_details, rubric diakses via entry point
            const rubRes = await fetchEntryPoint(`/reviewer/manuscripts/${task.manuscript_id}/rubric`)
            const rubData = await rubRes.json()
            
            if (rubData && rubData.success) {
              // Get manuscript detail for kategori via HATEOAS link
              if (taskLinks['get_details']) {
                const msRes = await fetchLink(taskLinks['get_details'])
                const msData = await msRes.json()
                if (msData.success && msData.data) {
                  item.kategori = msData.data.book_type || '-'
                }
              }
              
              // Extract submitted review data
              if (rubData.submitted_review) {
                const sr = rubData.submitted_review
                item.rataRataSkor = (sr.final_score || 0).toFixed(1) + '/100'
                item.detail = {
                  scores: rubData.data.map(c => ({
                    kriteria: c.aspect,
                    nilai: (c.submitted_score !== null ? c.submitted_score : '-') + '/100'
                  })),
                  skorAkhir: (sr.final_score || 0).toFixed(1) + '/100',
                  outcome: sr.status || 'rejected',
                  catatan: sr.feedback || '-'
                }
              }
            }
          } catch (err) {
            console.error('Error fetching rubric for', task.manuscript_id, err)
          }
        } else {
          // fetch manuscript detail for kategori
          try {
            if (taskLinks['get_details']) {
              const msRes = await fetchLink(taskLinks['get_details'])
              const msData = await msRes.json()
              if (msData.success && msData.data) {
                item.kategori = msData.data.book_type || '-'
              }
            }
          } catch(e) {}
        }
        
        enriched.push(item)
      }
      tasks.value = enriched
    }
  } catch (err) {
    console.error('Gagal mengambil data riwayat:', err)
  } finally {
    isLoading.value = false
  }
}

// ─── Computed Stats ───────────────────────────────────────────────────────────
const totalNaskah = computed(() => tasks.value.length)
const sedangReview = computed(() => tasks.value.filter(t => t.status === 'Sedang Review' || t.status === 'Belum Review').length)
const selesaiReview = computed(() => tasks.value.filter(t => t.status === 'Selesai Review').length)
const rataRataSkor = computed(() => {
  const completed = tasks.value.filter(t => t.detail && t.detail.skorAkhir)
  if (completed.length === 0) return '-'
  const sum = completed.reduce((acc, t) => {
    const numStr = t.detail.skorAkhir.split('/')[0]
    return acc + (parseFloat(numStr) || 0)
  }, 0)
  return (sum / completed.length).toFixed(1)
})

function toggleExpand(item) {
  if (!item.detail) return
  item.expanded = !item.expanded
}

onMounted(() => fetchTasks())
</script>

<template>
  <div class="layout">
    <ReviewerSidebar />

    <div class="main-area">
      <AppTopbar
        page-title="Riwayat Reviewer"
        user-name="Inna Putri"
        user-role="Reviewer"
      />

      <p class="subtitle">Lihat daftar yang sudah direview</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL NASKAH REVIEW</span>
            <span class="stat-value">{{ totalNaskah }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">SEDANG REVIEW</span>
            <span class="stat-value">{{ sedangReview }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">SELESAI REVIEW</span>
            <span class="stat-value">{{ selesaiReview }}</span>
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
          <h2 class="card-title">Aktivitas Terbaru Naskah</h2>
        </div>

        <div class="table-wrapper">
          <div v-if="isLoading" class="loading-state">Memuat riwayat review...</div>
          <div v-else-if="tasks.length === 0" class="empty-state">Belum ada riwayat review.</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>PENULIS</th>
                <th>KATEGORI</th>
                <th>STATUS PROGRES</th>
                <th>RATA-RATA BOBOT</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="item in tasks" :key="item.id">
                <tr :class="{ 'expanded-row-header': item.expanded }">
                  <td class="judul-cell">{{ item.judul }}</td>
                  <td class="penulis-cell">{{ item.penulis }}</td>
                  <td class="kategori-cell">{{ item.kategori }}</td>
                  <td>
                    <span class="badge" :class="item.status === 'Selesai Review' ? 'badge-selesai' : 'badge-sedang'">{{ item.status }}</span>
                  </td>
                  <td class="skor-cell">{{ item.rataRataSkor }}</td>
                  <td>
                    <button v-if="item.detail" class="detail-btn" @click="toggleExpand(item)">
                      Detail
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" :style="{ transform: item.expanded ? 'rotate(180deg)' : 'none' }">
                        <path d="M7 10l5 5 5-5z"/>
                      </svg>
                    </button>
                    <RouterLink v-else-if="item.status !== 'Selesai Review'" :to="`/reviewer/rubrik-penilaian?manuscript_id=${item.manuscript_id}`" class="action-btn-lanjut">
                      Lanjut
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
                      </svg>
                    </RouterLink>
                    <span v-else class="detail-pending">—</span>
                  </td>
                </tr>
                
                <tr v-if="item.expanded && item.detail" class="expanded-row-body">
                  <td colspan="6">
                    <div class="expanded-content">
                      <div class="score-section">
                        <h4>BOBOT PER REVIEW</h4>
                        <div class="score-block-inner">
                          <div v-for="score in item.detail.scores" :key="score.kriteria" class="score-row">
                            <span class="score-label">{{ score.kriteria }}</span>
                            <span class="score-value"><strong>{{ score.nilai.split('/')[0] }}</strong>/100</span>
                          </div>
                          <div class="score-row final-score-row">
                            <span class="score-label">Bobot akhir</span>
                            <span class="score-value final-score"><strong>{{ item.detail.skorAkhir.split('/')[0] }}</strong>/100 <span class="badge-accepted-outline" :class="item.detail.outcome === 'rejected' ? 'badge-rejected-outline' : ''">{{ item.detail.outcome }}</span></span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="feedback-section">
                        <h4>CATATAN REVIEW</h4>
                        <div class="feedback-block">
                          <p class="rev-note">{{ item.detail.catatan }}</p>
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
.loading-state, .empty-state { padding: 40px; text-align: center; color: #888; font-size: 14px; }

/* Content Card */
.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0; }

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
.penulis-cell, .kategori-cell { font-size: 13px; color: #444; }
.skor-cell { font-size: 13.5px; font-weight: 600; color: #c45b46; }
.detail-pending { font-size: 13px; color: #888; }

/* Badges */
.badge { padding: 5px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge-selesai { background: #d4f0e0; color: #1a7a44; }
.badge-sedang  { background: #dce8f8; color: #1a52a8; }
.badge-accepted-outline { border: 1px solid #28a745; color: #28a745; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 12px; margin-left: 8px; }
.badge-rejected-outline { border-color: #dc3545 !important; color: #dc3545 !important; }

/* Action Buttons */
.detail-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border: 1px solid #444; background: transparent; border-radius: 16px; font-size: 12px; font-weight: 600; color: #444; cursor: pointer; transition: all 0.15s; }
.detail-btn:hover { background: #444; color: #fff; }

.action-btn-lanjut { display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; border: 1px solid #c48f65; background: #fff; border-radius: 16px; font-size: 12px; font-weight: 600; color: #a86b3e; cursor: pointer; text-decoration: none; transition: all 0.15s; }
.action-btn-lanjut:hover { background: #fdf5ef; }

/* Expanded Content */
.expanded-content { display: flex; gap: 24px; padding: 20px; background: #fdfbf8; border: 1px solid #ebdcd0; border-radius: 12px; }
.score-section, .feedback-section { flex: 1; display: flex; flex-direction: column; gap: 12px; }
.score-section h4, .feedback-section h4 { font-size: 12px; font-weight: 600; color: #666; margin: 0; text-transform: uppercase; letter-spacing: 0.5px; }

.score-block-inner { display: flex; flex-direction: column; gap: 0; }
.score-row { display: flex; justify-content: space-between; font-size: 13px; color: #555; padding-bottom: 8px; padding-top: 8px; border-bottom: 1px dashed #e0d8d0; }
.score-value strong { color: #111; }
.final-score-row { background: #f5ece4; padding: 12px; border-radius: 8px; border-bottom: none; align-items: center; margin-top: 8px; border: 1px solid #e6d8cc; }
.final-score { display: flex; align-items: center; }

.feedback-block { background: #f5f0ea; padding: 16px; border-radius: 8px; border: 1px solid #e6d8cc; flex: 1; }
.rev-note { font-size: 13px; color: #444; margin: 0; line-height: 1.5; }
</style>
