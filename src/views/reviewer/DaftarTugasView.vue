<script setup>
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar       from '../../layouts/shared/AppTopbar.vue'

const tasks = [
  { id: 1, judul: 'Pemrograman Berorientasi Objek', penulis: 'Budi Santoso',    progres: 100, tenggat: '5 Juni 2026', status: 'Selesai Review' },
  { id: 2, judul: 'Algoritma dan Struktur Data',    penulis: 'Anisa Putri',     progres: 100, tenggat: '5 Juni 2026', status: 'Selesai Review' },
  { id: 3, judul: 'Jaringan Komputer Dasar',        penulis: 'Hendra Wijaya',   progres: 50,  tenggat: '5 Juni 2026', status: 'Sedang Review' },
  { id: 4, judul: 'Basis Data Relasional',          penulis: 'Melati Kusuma',   progres: 10,  tenggat: '5 Juni 2026', status: 'Sedang Review' },
  { id: 5, judul: 'Pemrograman Berorientasi Objek', penulis: 'Dani Santoso',    progres: 0,   tenggat: '5 Juni 2026', status: 'Belum Review' },
  { id: 6, judul: 'Pemrograman Web',                penulis: 'Siti Rahayu',     progres: 0,   tenggat: '5 Juni 2026', status: 'Belum Review' },
  { id: 7, judul: 'Pemrograman Berorientasi Objek', penulis: 'Dani Santoso',    progres: 0,   tenggat: '5 Juni 2026', status: 'Belum Review' },
  { id: 8, judul: 'Pemrograman Web',                penulis: 'Siti Rahayu',     progres: 0,   tenggat: '5 Juni 2026', status: 'Belum Review' },
]

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
        user-name="Inna"
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
          <table class="data-table">
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
                  <!-- Edit -->
                  <button class="icon-btn" :id="'edit-' + task.id" title="Edit">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                  </button>
                  <!-- View -->
                  <button class="icon-btn" :id="'view-' + task.id" title="Lihat Detail">
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
</style>
