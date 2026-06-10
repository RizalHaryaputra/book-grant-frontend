<template>
  <div class="page">
    <Sidebar />
    <main class="main-content">

      <Topbar title="Detail Buku" placeholder="Cari naskah..." />

      <div v-if="loading" class="state-msg">Memuat detail buku...</div>
      <div v-else-if="error" class="state-msg error">{{ error }}</div>

      <template v-else-if="manuscript">

        <div class="detail-layout">

          <!-- Kartu utama detail -->
          <section class="detail-card">

            <!-- Header -->
            <div class="book-header">
              <div class="book-cover-lg">📖</div>
              <div class="book-meta">
                <span class="status-badge" :class="statusClass(manuscript.status)">
                  {{ statusLabel(manuscript.status) }}
                </span>
                <h1>{{ manuscript.title }}</h1>
                <p class="book-type">{{ manuscript.book_type }} • {{ manuscript.category }}</p>
              </div>
            </div>

            <hr class="divider" />

            <!-- Grid Metadata -->
            <div class="meta-grid">

              <div class="meta-item">
                <label>Judul</label>
                <p>{{ manuscript.title || '-' }}</p>
              </div>

              <div class="meta-item">
                <label>Jenis Buku</label>
                <p>{{ manuscript.book_type || '-' }}</p>
              </div>

              <div class="meta-item">
                <label>Bidang Ilmu</label>
                <p>{{ manuscript.science_field || manuscript.field_of_study || '-' }}</p>
              </div>

              <div class="meta-item">
                <label>Jumlah Halaman</label>
                <p>{{ manuscript.total_pages ? manuscript.total_pages + ' halaman' : '-' }}</p>
              </div>


              <div class="meta-item">
                <label>Status</label>
                <span class="status-badge" :class="statusClass(manuscript.status)">
                  {{ statusLabel(manuscript.status) }}
                </span>
              </div>

              <div class="meta-item full-width">
                <label>Abstrak</label>
                <p class="abstrak">{{ manuscript.abstract || manuscript.description || 'Abstrak belum tersedia.' }}</p>
              </div>

              <div class="meta-item">
                <label>Tanggal Dibuat</label>
                <p>{{ formatDate(manuscript.created_at) }}</p>
              </div>

              <div class="meta-item">
                <label>Terakhir Diperbarui</label>
                <p>{{ formatDate(manuscript.updated_at) }}</p>
              </div>

            </div>

          </section>

          <!-- Panel Aksi Cepat -->
          <aside class="action-panel">

            <h3>Aksi Cepat</h3>

            <router-link
              :to="`/dokumen-administrasi/${manuscript.id}`"
              class="action-btn"
            >
              📋 Dokumen Administrasi
            </router-link>

            <router-link
              :to="`/revisi-naskah/${manuscript.id}`"
              class="action-btn"
              :class="{ disabled: manuscript.status !== 'revision_requested' }"
            >
              ✏️ Upload Revisi
            </router-link>

            <router-link
              :to="`/hasil-review/${manuscript.id}`"
              class="action-btn"
            >
              📝 Hasil Review
            </router-link>

            <router-link
              :to="`/riwayat-dokumen/${manuscript.id}`"
              class="action-btn"
            >
              🗂️ Riwayat Dokumen
            </router-link>

            <router-link to="/buku-saya" class="action-btn back-btn">
              ← Kembali ke Buku Saya
            </router-link>

          </aside>

        </div>

      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  id: { type: [String, Number], required: true }
})

const manuscript = ref(null)
const loading    = ref(true)
const error      = ref(null)
const { getManuscriptDetail } = useApi()

onMounted(async () => {
  try {
    const res = await getManuscriptDetail(props.id)
    manuscript.value = res.data.data ?? res.data
  } catch (e) {
    if (e.response?.status === 404) error.value = 'Naskah tidak ditemukan.'
    else if (e.response?.status === 403) error.value = 'Anda tidak memiliki akses ke naskah ini.'
    else error.value = 'Gagal memuat detail buku.'
  } finally {
    loading.value = false
  }
})

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
  if (['review_completed', 'ready_to_print'].includes(status)) return 'green'
  if (['revision_requested', 'publisher_revised'].includes(status)) return 'orange'
  if (status === 'rejected') return 'red'
  return 'gray'
}

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : '-'
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.page{ display:flex; min-height:100vh; background:#e8ded3; }
.main-content{ flex:1; padding:25px; }

.state-msg{ padding:20px; text-align:center; color:#888; }
.state-msg.error{ color:#c0392b; background:#fde8e8; border-radius:12px; }

.detail-layout{ display:grid; grid-template-columns:1fr 260px; gap:22px; margin-top:10px; }

/* Detail Card */
.detail-card{ background:white; border-radius:22px; padding:32px; }

.book-header{ display:flex; gap:24px; margin-bottom:28px; align-items:flex-start; }
.book-cover-lg{
  width:110px; height:140px;
  background:#f5ede3; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  font-size:56px; flex-shrink:0;
}
.book-meta{ flex:1; }
.book-meta h1{ font-size:32px; color:#2f2f2f; margin:10px 0 6px; line-height:1.3; }
.book-type{ color:#888; font-size:15px; }

.status-badge{ display:inline-block; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:600; }
.green{ background:#d7f0df; color:#4f8b61; }
.gray{ background:#ececec; color:#666; }
.orange{ background:#ffe5cf; color:#c56d2d; }
.red{ background:#fde8e8; color:#c0392b; }

.divider{ border:none; border-top:1px solid #f0ece7; margin-bottom:28px; }

.meta-grid{ display:grid; grid-template-columns:1fr 1fr; gap:0; }
.meta-item{ padding:16px 0; border-bottom:1px solid #f0ece7; padding-right:20px; }
.meta-item:nth-last-child(-n+2){ border-bottom:none; }
.meta-item.full-width{ grid-column:1/-1; }
.meta-item label{ display:block; font-size:12px; color:#999; text-transform:uppercase; letter-spacing:.5px; margin-bottom:6px; }
.meta-item p{ color:#2f2f2f; font-size:15px; line-height:1.6; }
.abstrak{ color:#555 !important; line-height:1.8 !important; }

/* Action Panel */
.action-panel{ background:white; border-radius:22px; padding:24px; height:fit-content; }
.action-panel h3{ font-size:18px; color:#2f2f2f; margin-bottom:20px; }
.action-btn{
  display:flex; align-items:center; gap:8px;
  padding:14px 16px; border-radius:12px;
  text-decoration:none; color:#3f2d24;
  background:#f8f5f1; font-size:14px; font-weight:500;
  margin-bottom:10px; transition:.2s;
}
.action-btn:hover{ background:#ede5db; }
.action-btn.disabled{ opacity:.4; pointer-events:none; }
.back-btn{ background:none; border:1px solid #ddd; color:#888; margin-top:10px; }
.back-btn:hover{ background:#f5f5f5; }
</style>
