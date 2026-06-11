<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">

      <Topbar
        :title="`Selamat Datang, ${dashboardData?.author_name || 'Penulis'}!`"
        placeholder="Cari naskah..."
      />

      <div v-if="loading" class="state-msg">Memuat dashboard...</div>
      <div v-else-if="error" class="state-msg error">{{ error }}</div>

      <template v-else>

        <!-- Statistik (4 kartu) -->
        <div class="stats-container">

          <div class="stat-card">
            <div class="badge green">Total</div>
            <p>Jumlah Naskah</p>
            <h1>{{ totalNaskah }}</h1>
          </div>

          <div class="stat-card">
            <div class="badge orange">Status</div>
            <p>Status Naskah Terbaru</p>
            <h1 style="font-size:20px;margin-top:14px;">
              {{ statusLabel(dashboardData?.active_manuscript?.status) || '-' }}
            </h1>
          </div>

          <div class="stat-card">
            <div class="badge blue">Revisi</div>
            <p>Jumlah Revisi</p>
            <h1>{{ jumlahRevisi }}</h1>
          </div>

        </div>

        <!-- Baris bawah: Proyek Aktif + Notifikasi -->
        <div class="bottom-row">

          <!-- Proyek Aktif -->
          <section class="project-section">
            <div class="section-header">
              <h3>Proyek Aktif</h3>
              <router-link to="/buku-saya" class="see-all">Lihat Semua</router-link>
            </div>

            <div v-if="dashboardData?.active_manuscript" class="project-card">
              <h4>{{ dashboardData.active_manuscript.title }}</h4>
              <p>{{ dashboardData.active_manuscript.book_type }} • {{ dashboardData.active_manuscript.category }}</p>
              <div class="progress-header">
                <span>Status</span>
                <span :class="['status', statusClass(dashboardData.active_manuscript.status)]">
                  {{ statusLabel(dashboardData.active_manuscript.status) }}
                </span>
              </div>
              <div style="margin-top:15px">
                <router-link
                  v-if="dashboardData.active_manuscript.status === 'revision_requested'"
                  :to="`/revisi-naskah/${dashboardData.active_manuscript.id}`"
                  class="action-link"
                >→ Upload Revisi</router-link>
                <router-link
                  v-else-if="dashboardData.active_manuscript.status === 'review_completed'"
                  :to="`/hasil-review/${dashboardData.active_manuscript.id}`"
                  class="action-link"
                >→ Lihat Hasil Review</router-link>
              </div>
            </div>
            <div v-else class="project-card empty-card">
              <p>Belum ada manuskrip aktif.</p>
              <router-link to="/upload-draft">+ Buat Manuskrip Baru</router-link>
            </div>
          </section>

          <!-- Notifikasi -->
          <section class="notif-section">
            <div class="section-header">
              <h3>Notifikasi</h3>
              <span class="notif-count" v-if="notifications.length">{{ notifications.length }}</span>
            </div>

            <div v-if="notifications.length === 0" class="notif-empty">
              Tidak ada notifikasi saat ini.
            </div>

            <div
              v-for="(notif, i) in notifications"
              :key="i"
              class="notif-item"
              :class="notif.type"
            >
              <div class="notif-icon">{{ notif.icon }}</div>
              <div class="notif-body">
                <p class="notif-title">{{ notif.title }}</p>
                <p class="notif-desc">{{ notif.desc }}</p>
              </div>
            </div>
          </section>

        </div>

        <!-- Tabel Manuskrip -->
        <section class="table-section">
          <div class="section-header">
            <h3>Manuskrip Terbaru</h3>
          </div>
          <table>
            <thead>
              <tr>
                <th>JUDUL MANUSKRIP</th>
                <th>KATEGORI</th>
                <th>STATUS</th>
                <th>TERAKHIR DIUBAH</th>
                <th>AKSI</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="dashboardData?.history?.length">
                <tr v-for="ms in dashboardData.history" :key="ms.id">
                  <td>{{ ms.title }}</td>
                  <td>{{ ms.book_type }}</td>
                  <td>
                    <span :class="['status', statusClass(ms.status)]">
                      {{ statusLabel(ms.status) }}
                    </span>
                  </td>
                  <td>{{ formatDate(ms.updated_at) }}</td>
                  <td>
                    <router-link :to="`/detail-buku/${ms.id}`" class="tbl-link">Detail</router-link>
                  </td>
                </tr>
              </template>
              <tr v-else>
                <td colspan="5" class="empty-row">Belum ada riwayat manuskrip.</td>
              </tr>
            </tbody>
          </table>
        </section>

      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const dashboardData = ref(null)
const loading = ref(true)
const error = ref(null)
const { getDashboard } = useApi()

// --- Computed stats ---
const totalNaskah = computed(() => dashboardData.value?.history?.length ?? 0)

const jumlahRevisi = computed(() =>
  dashboardData.value?.history?.filter(m =>
    ['revision_requested', 'revision_uploaded'].includes(m.status)
  ).length ?? 0
)

const jumlahDokumen = computed(() =>
  dashboardData.value?.total_documents ?? dashboardData.value?.history?.filter(m => m.has_documents).length ?? 0
)

// --- Notifikasi otomatis berdasarkan status ---
const notifications = computed(() => {
  if (!dashboardData.value) return []
  const list = []
  const ms = dashboardData.value.active_manuscript
  if (!ms) return list

  if (ms.status === 'revision_requested') {
    list.push({
      icon: '⚠️', type: 'warn',
      title: 'Revisi Diminta',
      desc: `Naskah "${ms.title}" perlu direvisi. Silakan upload revisi Anda.`,
    })
  }
  if (ms.status === 'review_completed') {
    list.push({
      icon: '✅', type: 'success',
      title: 'Review Selesai',
      desc: `Hasil review untuk "${ms.title}" sudah tersedia.`,
    })
  }
  if (ms.status === 'initial_draft_uploaded') {
    list.push({
      icon: '📋', type: 'info',
      title: 'Draft Diterima',
      desc: `Draft "${ms.title}" telah diterima dan sedang diproses.`,
    })
  }
  if (ms.status === 'reviewer_assigned') {
    list.push({
      icon: '🔍', type: 'info',
      title: 'Sedang Direview',
      desc: `Naskah "${ms.title}" sedang direview oleh tim reviewer.`,
    })
  }
  return list
})

// --- Helpers ---
const statusLabel = (status) => {
  const map = {
    contract_validated     : 'Kontrak Disetujui',
    initial_draft_uploaded : 'Draft Awal Dikirim',
    reviewer_assigned      : 'Sedang Direview',
    review_completed       : 'Review Selesai',
    revision_requested     : 'Menunggu Revisi',
    revision_uploaded      : 'Revisi Dikirim',
    preprint               : 'Pra-Cetak',
    publisher_revised      : 'Perlu Perbaikan',
    ready_to_print         : 'Siap Cetak',
  }
  return map[status] || status
}

const statusClass = (status) => {
  if (['review_completed', 'ready_to_print'].includes(status)) return 'green-status'
  if (['revision_requested', 'publisher_revised'].includes(status)) return 'orange-status'
  if (status === 'rejected') return 'red-status'
  return 'gray-status'
}

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  : '-'

onMounted(async () => {
  try {
    const response = await getDashboard()
    dashboardData.value = response.data.data
  } catch (err) {
    error.value = 'Gagal memuat data dashboard. Pastikan server backend berjalan.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.dashboard{ display:flex; min-height:100vh; background:#e8ded3; }
.main-content{ flex:1; padding:25px; }

/* Stats */
.stats-container{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:25px; }
.stat-card{ background:white; border-radius:20px; padding:25px; box-shadow:0 2px 10px rgba(0,0,0,.04); }
.stat-card p{ margin-top:18px; color:#666; font-size:14px; }
.stat-card h1{ margin-top:10px; font-size:48px; color:#1f2230; }

.badge{ display:inline-block; padding:6px 12px; border-radius:20px; font-size:12px; font-weight:600; }
.green{ background:#d7f0df; color:#4f8b61; }
.orange{ background:#ffe5cf; color:#c56d2d; }
.blue{ background:#dbeafe; color:#1e4e8c; }
.purple{ background:#ede9fe; color:#6d28d9; }

/* Bottom row */
.bottom-row{ display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px; }

/* Project */
.project-section, .notif-section{
  background:white; border-radius:20px; padding:22px;
}
.section-header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
.section-header h3{ font-size:22px; color:#2f2f2f; }
.see-all{ color:#8b4a16; text-decoration:none; font-size:14px; }

.project-card{ background:#f8f5f1; border-radius:14px; padding:22px; }
.project-card h4{ font-size:20px; margin-bottom:8px; }
.project-card p{ color:gray; margin-bottom:14px; font-size:14px; }
.empty-card p{ color:#aaa; }
.empty-card a{ color:#8b4a16; text-decoration:none; display:block; margin-top:10px; }
.progress-header{ display:flex; justify-content:space-between; font-size:13px; }
.action-link{ color:#8b4a16; text-decoration:none; font-weight:600; font-size:14px; }

/* Notifikasi */
.notif-count{ background:#c0392b; color:white; border-radius:20px; padding:2px 10px; font-size:13px; }
.notif-empty{ color:#aaa; font-size:14px; padding:10px 0; }
.notif-item{ display:flex; gap:14px; padding:14px; border-radius:12px; margin-bottom:10px; }
.notif-item.warn{ background:#fff8e1; }
.notif-item.success{ background:#e8f5e9; }
.notif-item.info{ background:#e3f2fd; }
.notif-icon{ font-size:22px; flex-shrink:0; }
.notif-title{ font-weight:600; color:#2f2f2f; font-size:14px; margin-bottom:4px; }
.notif-desc{ color:#666; font-size:13px; line-height:1.5; }

/* Table */
.table-section{ background:white; border-radius:20px; padding:22px; }
table{ width:100%; border-collapse:collapse; }
thead{ background:#f6f2ed; }
th{ padding:14px 18px; text-align:left; color:#777; font-size:12px; text-transform:uppercase; }
td{ padding:18px; border-bottom:1px solid #eee; font-size:14px; }
.empty-row{ text-align:center; color:#aaa; padding:30px; }
.tbl-link{ color:#8b4a16; text-decoration:none; font-size:13px; font-weight:600; }
.tbl-link:hover{ text-decoration:underline; }

.status{ padding:5px 12px; border-radius:20px; font-size:12px; }
.green-status{ background:#d7f0df; color:#4f8b61; }
.gray-status{ background:#ececec; color:#666; }
.orange-status{ background:#ffe5cf; color:#c56d2d; }
.red-status{ background:#fde8e8; color:#c0392b; }

.state-msg{ padding:20px; text-align:center; color:#888; }
.state-msg.error{ color:#c0392b; background:#fde8e8; border-radius:12px; }
</style>
