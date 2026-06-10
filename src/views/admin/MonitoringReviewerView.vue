<script setup>
import { ref, onMounted, computed } from 'vue'
import AdminSidebar from '../../layouts/admin/AdminSidebar.vue'
import AppTopbar from '../../layouts/shared/AppTopbar.vue'
import { fetchEntryPoint, fetchLink, parseLinks } from '../../services/api.js'

// ─── State ────────────────────────────────────────────────────────────────────
const manuscripts = ref([])
const isLoading = ref(false)

// ─── Fetch Data ───────────────────────────────────────────────────────────────
async function fetchMonitoringData() {
  isLoading.value = true
  try {
    // Entry point: admin manuscripts list (response menyertakan HATEOAS links)
    const res = await fetchEntryPoint('/admin/manuscripts')
    const data = await res.json()
    if (data.success) {
      // Filter naskah yang sudah diplot tapi belum selesai kompilasi
      manuscripts.value = data.data.filter(m => 
        ['reviewer_assigned', 'under_review'].includes(m.status)
      )
    }
  } catch (err) {
    console.error('Gagal mengambil data monitoring:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMonitoringData()
})

// ─── Computed Stats ───────────────────────────────────────────────────────────
const totalNaskahAktif = computed(() => manuscripts.value.length)
const totalReviewerAktif = computed(() => {
  const reviewerSet = new Set()
  manuscripts.value.forEach(m => {
    (m.reviewers || []).forEach(r => reviewerSet.add(r.id))
  })
  return reviewerSet.size
})

// Helpers
function formatDate(dateStr) {
  if (!dateStr) return 'Belum ditentukan'
  return dateStr
}

function sendReminder(manuscript, reviewer) {
  alert(`Pengingat berhasil dikirim ke ${reviewer.name} untuk naskah "${manuscript.title}"`)
}

function getStatusLabel(status) {
  return status || 'Sedang Review'
}

function getStatusClass(status) {
  const s = status || 'Sedang Review'
  if (s === 'Selesai Review' || s === 'review_completed') return 'selesai'
  if (s === 'Belum Review') return 'belum'
  return 'sedang'
}

</script>

<template>
  <div class="layout">
    <AdminSidebar />

    <div class="main-area">
      <AppTopbar
        page-title="Monitoring Reviewer"
        user-name="Ngafifah"
        user-role="Admin"
      />

      <p class="subtitle">Pantau progres reviewer pada naskah yang sedang berjalan</p>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">NASKAH AKTIF (PROSES)</span>
            <span class="stat-value">{{ totalNaskahAktif }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">REVIEWER AKTIF</span>
            <span class="stat-value">{{ totalReviewerAktif }}</span>
          </div>
        </div>
      </div>

      <!-- Content Card -->
      <div class="content-card">
        <div class="card-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          <h2 class="card-title">Progres Review Naskah</h2>
        </div>

        <div class="table-wrapper">
          <div v-if="isLoading" class="loading-state">Memuat data monitoring...</div>
          <div v-else-if="manuscripts.length === 0" class="empty-state">Tidak ada naskah yang sedang direview saat ini.</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>REVIEWER (PROGRES)</th>
                <th>TENGGAT</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ms in manuscripts" :key="ms.id">
                <td class="judul-cell">{{ ms.title }}</td>
                <td class="reviewer-cell">
                  <div v-for="rev in ms.reviewers" :key="rev.id" class="reviewer-item">
                    <div class="rev-info">
                      <span class="dot" :class="'dot-' + getStatusClass(rev.status)"></span> {{ rev.name }}
                      <span class="badge-status" :class="'badge-' + getStatusClass(rev.status)">{{ getStatusLabel(rev.status) }}</span>
                    </div>
                  </div>
                </td>
                <td class="tenggat-cell">{{ formatDate(ms.tenggat) }}</td>
                <td class="action-cell">
                  <button class="btn-outline-sm" @click="sendReminder(ms, ms.reviewers[0])">Kirim Pengingat</button>
                </td>
              </tr>
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
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px; max-width: 600px; }
.stat-card { background: #fff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px; }
.stat-icon-wrap { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.stat-icon-wrap.orange { background: #fdf0e6; color: #d97736; }
.stat-icon-wrap.brown { background: #f5f0ea; color: #a88a70; }
.stat-info { display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 26px; font-weight: 700; color: #1a1a1a; line-height: 1.1; }

/* Content Card */
.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0; }
.loading-state, .empty-state { padding: 40px; text-align: center; color: #888; font-size: 14px; }

.table-wrapper { overflow-x: auto; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f5f2ee; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #888; letter-spacing: 0.6px; text-transform: uppercase; border-bottom: 1px solid #e0d8d0; }
.data-table tbody tr { border-bottom: 1px solid #f0ede9; transition: background 0.1s; }
.data-table tbody tr:hover { background: #faf8f5; }
.data-table tbody tr:last-child { border-bottom: none; }
.data-table td { padding: 16px; vertical-align: top; }

.judul-cell { font-size: 13.5px; font-weight: 600; color: #1a1a1a; width: 35%; }
.tenggat-cell { font-size: 13px; color: #444; white-space: nowrap; }

.reviewer-cell { display: flex; flex-direction: column; gap: 10px; }
.reviewer-item { display: flex; flex-direction: column; gap: 4px; }
.rev-info { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #444; }
.dot { width: 6px; height: 6px; border-radius: 50%; }
.dot-sedang { background: #ff9800; }
.dot-selesai { background: #4caf50; }
.dot-belum { background: #f44336; }

.badge-status { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 12px; }
.badge-sedang { border: 1px solid #ff9800; color: #f57c00; }
.badge-selesai { border: 1px solid #4caf50; color: #4caf50; }
.badge-belum { border: 1px solid #f44336; color: #f44336; }

/* Actions */
.action-cell { white-space: nowrap; }
.btn-outline-sm { padding: 6px 14px; border-radius: 16px; border: 1px solid #d4c4b0; background: #fff; color: #5a4030; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-outline-sm:hover { background: #fdf5ef; border-color: #c48f65; color: #a86b3e; }
</style>
