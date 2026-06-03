<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar from '../../layouts/shared/AppTopbar.vue'
import { API_BASE_URL } from '../../config.js'
import { authHeaders } from '../../services/auth.js'

// ─── State ────────────────────────────────────────────────────────────────────
const tasks = ref([])
const isLoading = ref(false)

// ─── Fetch reviewer dashboard ─────────────────────────────────────────────────
async function fetchTasks() {
  isLoading.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/reviewer/dashboard`, {
      headers: authHeaders(false)
    })
    const data = await res.json()
    if (data.success) {
      // Fetch category for each task for full info in table
      const enriched = []
      for (const task of data.data) {
        const item = {
          ...task,
          kategori: '-'
        }
        
        try {
          const msRes = await fetch(`${API_BASE_URL}/reviewer/manuscripts/${task.manuscript_id}`, {
            headers: authHeaders(false)
          })
          const msData = await msRes.json()
          if (msData.success && msData.data) {
            item.kategori = msData.data.book_type || '-'
          }
        } catch (e) {
          // Ignore individual fetch errors
        }
        
        enriched.push(item)
      }
      tasks.value = enriched
    }
  } catch (err) {
    console.error('Gagal mengambil data dashboard:', err)
  } finally {
    isLoading.value = false
  }
}

// ─── Computed Stats ───────────────────────────────────────────────────────────
const totalNaskah = computed(() => tasks.value.length)
const belumReview = computed(() => tasks.value.filter(t => t.status === 'Belum Review').length)
const sedangReview = computed(() => tasks.value.filter(t => t.status === 'Sedang Review').length)
const selesaiReview = computed(() => tasks.value.filter(t => t.status === 'Selesai Review').length)

// Limit to 5 tasks for the dashboard table
const recentTasks = computed(() => {
  return [...tasks.value].slice(0, 5)
})

onMounted(() => fetchTasks())
</script>

<template>
  <div class="layout">
    <ReviewerSidebar />

    <div class="main-area">
      <AppTopbar
        page-title="Dashboard Reviewer"
        user-name="Inna Putri"
        user-role="Reviewer"
      />

      <p class="subtitle">Lihat daftar tugas review yang ditugaskan</p>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon-wrap orange">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">TOTAL NASKAH</span>
            <span class="stat-value">{{ totalNaskah }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">BELUM REVIEW</span>
            <span class="stat-value">{{ belumReview }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">SEDANG REVIEW</span>
            <span class="stat-value">{{ sedangReview }}</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon-wrap brown">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
          </div>
          <div class="stat-info">
            <span class="stat-label">SELESAI REVIEW</span>
            <span class="stat-value">{{ selesaiReview }}</span>
          </div>
        </div>
      </div>

      <div class="content-card">
        <div class="card-header">
          <div class="card-title-wrap">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#555"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
            <h2 class="card-title">Aktivitas Terbaru Naskah</h2>
          </div>
          <RouterLink to="/reviewer/daftar-tugas" class="btn-lihat-semua">Lihat Semua</RouterLink>
        </div>

        <div class="table-wrapper">
          <div v-if="isLoading" class="loading-state">Memuat data dashboard...</div>
          <div v-else-if="recentTasks.length === 0" class="empty-state">Belum ada tugas review.</div>
          <table v-else class="data-table">
            <thead>
              <tr>
                <th>JUDUL NASKAH</th>
                <th>PENULIS</th>
                <th>KATEGORI</th>
                <th>STATUS PROGRES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in recentTasks" :key="item.id">
                <td class="judul-cell">{{ item.judul }}</td>
                <td class="penulis-cell">{{ item.penulis }}</td>
                <td class="kategori-cell">{{ item.kategori }}</td>
                <td>
                  <span class="badge" :class="{
                    'badge-selesai': item.status === 'Selesai Review',
                    'badge-sedang': item.status === 'Sedang Review',
                    'badge-belum': item.status === 'Belum Review'
                  }">{{ item.status }}</span>
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
.stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.stat-card { background: #fff; padding: 20px; border-radius: 14px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px; }
.stat-icon-wrap { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.stat-icon-wrap.orange { background: #fdf0e6; color: #d97736; }
.stat-icon-wrap.brown { background: #f5f0ea; color: #a88a70; }
.stat-info { display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
.stat-value { font-size: 32px; font-weight: 700; color: #1a1a1a; line-height: 1.1; }

.loading-state, .empty-state { padding: 40px; text-align: center; color: #888; font-size: 14px; }

/* Content Card */
.content-card { background: #fff; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.card-title-wrap { display: flex; align-items: center; gap: 10px; }
.card-title { font-size: 16px; font-weight: 600; color: #1a1a1a; margin: 0; }
.btn-lihat-semua { font-size: 12px; font-weight: 600; color: #5a4030; background: #fff; border: 1px solid #d4c4b0; padding: 6px 14px; border-radius: 16px; text-decoration: none; transition: all 0.15s; }
.btn-lihat-semua:hover { background: #fdf5ef; border-color: #c48f65; color: #a86b3e; }

.table-wrapper { overflow-x: auto; border-radius: 8px; border: 1px solid #f0ede9; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table thead tr { background: #f5f2ee; }
.data-table th { padding: 12px 16px; text-align: left; font-size: 11px; font-weight: 600; color: #888; letter-spacing: 0.6px; border-bottom: 1px solid #e0d8d0; }
.data-table tbody tr { border-bottom: 1px solid #f0ede9; transition: background 0.15s; }
.data-table tbody tr:hover { background: #faf8f5; }
.data-table td { padding: 16px; vertical-align: top; }

.judul-cell { font-size: 13.5px; font-weight: 600; color: #1a1a1a; }
.penulis-cell, .kategori-cell { font-size: 13px; color: #444; }

/* Badges */
.badge { padding: 5px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge-selesai { background: #d4f0e0; color: #1a7a44; }
.badge-sedang  { background: #dce8f8; color: #1a52a8; }
.badge-belum   { background: #fce3e3; color: #c43838; }
</style>
