<template>
  <div class="page">
    <Sidebar />
    <main class="main-content">
      <Topbar title="Riwayat Dokumen" placeholder="Cari naskah..." />

      <div class="detail-layout">

        <!-- Kartu Riwayat -->
        <section class="history-card">

          <div class="card-header">
            <div>
              <h1>Riwayat Dokumen</h1>
              <p class="subtitle">Semua file yang pernah diunggah untuk manuskrip ini.</p>
            </div>
            <span class="ms-badge">#{{ manuscriptId }}</span>
          </div>

          <hr class="divider" />

          <!-- Loading -->
          <div v-if="loading" class="state-msg">
            <span class="spinner">⏳</span> Memuat riwayat dokumen...
          </div>

          <!-- Error -->
          <div v-else-if="error" class="state-error">{{ error }}</div>

          <!-- Empty -->
          <div v-else-if="files.length === 0" class="empty-state">
            <div class="empty-icon">📂</div>
            <h3>Belum ada dokumen</h3>
            <p>Belum ada file yang diunggah untuk naskah ini.</p>
          </div>

          <!-- Tabel -->
          <template v-else>
            <div class="table-meta">
              <span>Total <strong>{{ files.length }}</strong> file ditemukan</span>
              <span class="latest-tag">Versi terbaru: <strong>v{{ latestVersion }}</strong></span>
            </div>

            <div class="table-wrapper">
              <table class="history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nama File</th>
                    <th>Tipe</th>
                    <th>Versi</th>
                    <th>Catatan Perubahan</th>
                    <th>Tanggal Upload</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(file, idx) in files"
                    :key="file.id ?? idx"
                    :class="{ 'row-latest': idx === 0 }"
                  >
                    <td class="no-col">{{ idx + 1 }}</td>
                    <td class="filename-col">
                      <span class="file-icon">📄</span>
                      {{ file.original_name ?? file.file_name ?? file.name ?? '-' }}
                      <span v-if="idx === 0" class="latest-pill">Terbaru</span>
                    </td>
                    <td>
                      <span class="type-tag">{{ file.file_type ?? file.type ?? '-' }}</span>
                    </td>
                    <td>
                      <span class="version-tag">v{{ file.version ?? (files.length - idx) }}</span>
                    </td>
                    <td class="note-col">
                      {{ file.revision_note ?? file.changelog ?? '-' }}
                    </td>
                    <td class="date-col">{{ formatDate(file.created_at ?? file.uploaded_at) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

        </section>

        <!-- Panel Samping -->
        <aside class="side-panel">

          <div class="info-box">
            <h4>📊 Statistik</h4>
            <div class="stat-row">
              <span>Total File</span>
              <strong>{{ files.length }}</strong>
            </div>
            <div class="stat-row">
              <span>Versi Terbaru</span>
              <strong>v{{ latestVersion }}</strong>
            </div>
            <div class="stat-row">
              <span>Upload Terakhir</span>
              <strong>{{ lastUploadDate }}</strong>
            </div>
          </div>

          <div class="nav-box">
            <h4>Navigasi</h4>
            <router-link :to="`/detail-buku/${manuscriptId}`" class="nav-btn">
              📖 Detail Buku
            </router-link>
            <router-link :to="`/hasil-review/${manuscriptId}`" class="nav-btn">
              📝 Hasil Review
            </router-link>
            <router-link
              :to="`/revisi-naskah/${manuscriptId}`"
              class="nav-btn highlight-btn"
            >
              ✏️ Upload Revisi Baru
            </router-link>
            <router-link to="/buku-saya" class="nav-btn back-btn">
              ← Kembali ke Buku Saya
            </router-link>
          </div>

        </aside>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  manuscriptId: { type: [String, Number], required: true }
})

const { getFiles } = useApi()

const files   = ref([])
const loading = ref(true)
const error   = ref(null)

const latestVersion = computed(() => {
  if (!files.value.length) return '-'
  return files.value[0]?.version ?? files.value.length
})

const lastUploadDate = computed(() => {
  if (!files.value.length) return '-'
  const d = files.value[0]?.created_at ?? files.value[0]?.uploaded_at
  return formatDate(d)
})

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'

onMounted(async () => {
  if (!props.manuscriptId || props.manuscriptId == 0) {
    error.value = 'ID manuskrip tidak valid.'
    loading.value = false
    return
  }
  try {
    const res = await getFiles(props.manuscriptId)
    files.value = res.data.data ?? res.data ?? []
  } catch (e) {
    if (e.response?.status === 403) error.value = 'Anda tidak memiliki akses ke naskah ini.'
    else if (e.response?.status === 404) error.value = 'Naskah tidak ditemukan.'
    else error.value = 'Gagal memuat riwayat dokumen: ' + (e.response?.data?.message || e.message)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.page{ display:flex; min-height:100vh; background:#e8ded3; }
.main-content{ flex:1; padding:25px; }

.detail-layout{ display:grid; grid-template-columns:1fr 260px; gap:22px; margin-top:10px; }

/* History Card */
.history-card{ background:white; border-radius:22px; padding:32px; }
.card-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
.card-header h1{ font-size:28px; color:#2f2f2f; margin-bottom:6px; }
.subtitle{ color:#888; font-size:14px; }
.ms-badge{ background:#f3eee9; color:#5e4335; padding:8px 16px; border-radius:20px; font-size:13px; font-weight:600; white-space:nowrap; }
.divider{ border:none; border-top:1px solid #f0ece7; margin-bottom:24px; }

/* States */
.state-msg{ padding:30px; text-align:center; color:#888; font-size:15px; }
.spinner{ margin-right:8px; }
.state-error{ background:#fde8e8; color:#c0392b; padding:16px 20px; border-radius:12px; font-size:14px; }
.empty-state{ text-align:center; padding:60px 20px; }
.empty-icon{ font-size:48px; margin-bottom:16px; }
.empty-state h3{ font-size:20px; color:#4a3a31; margin-bottom:8px; }
.empty-state p{ color:#888; }

/* Table Meta */
.table-meta{ display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; font-size:13px; color:#666; }
.latest-tag{ color:#5e4335; }

/* Table */
.table-wrapper{ overflow-x:auto; }
.history-table{ width:100%; border-collapse:collapse; font-size:14px; }
.history-table thead{ background:#f8f5f1; }
.history-table th{ padding:12px 16px; text-align:left; color:#777; font-size:11px; text-transform:uppercase; letter-spacing:.5px; white-space:nowrap; }
.history-table td{ padding:14px 16px; border-bottom:1px solid #f5f2ef; color:#444; vertical-align:middle; }
.history-table tbody tr:last-child td{ border-bottom:none; }
.history-table tbody tr:hover{ background:#fdfaf7; }
.row-latest td{ background:#fefcf9; }

.no-col{ color:#bbb; font-size:13px; width:40px; }
.filename-col{ color:#3f2d24; font-weight:500; display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.file-icon{ font-size:16px; }
.latest-pill{ background:#d7f0df; color:#4f8b61; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:600; }
.type-tag{ background:#eeebf0; color:#6b5b6e; padding:3px 10px; border-radius:20px; font-size:12px; }
.version-tag{ background:#e8e3de; color:#5e4335; padding:3px 10px; border-radius:20px; font-size:12px; font-weight:600; }
.note-col{ color:#666; font-size:13px; max-width:220px; line-height:1.5; }
.date-col{ white-space:nowrap; color:#888; font-size:13px; }

/* Side Panel */
.side-panel{ display:flex; flex-direction:column; gap:16px; }

.info-box, .nav-box{ background:white; border-radius:22px; padding:24px; }
.info-box h4, .nav-box h4{ font-size:16px; color:#2f2f2f; margin-bottom:16px; }

.stat-row{ display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid #f5f2ef; font-size:14px; color:#666; }
.stat-row:last-child{ border-bottom:none; }
.stat-row strong{ color:#3f2d24; }

.nav-btn{
  display:flex; align-items:center; gap:8px;
  padding:13px 16px; border-radius:12px;
  text-decoration:none; color:#3f2d24;
  background:#f8f5f1; font-size:14px; font-weight:500;
  margin-bottom:10px; transition:.2s;
}
.nav-btn:hover{ background:#ede5db; }
.highlight-btn{ background:#5e4335; color:white; }
.highlight-btn:hover{ background:#4a3128; }
.back-btn{ background:none; border:1px solid #ddd; color:#888; margin-top:4px; }
.back-btn:hover{ background:#f5f5f5; }
</style>
