<template>
  <div class="buku-page">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <main class="main-content">

      <!-- Topbar -->
      <Topbar title="Buku Saya" placeholder="Cari naskah..." />

      <!-- Loading / Error -->
      <div v-if="loading" class="info-msg">Memuat data manuskrip...</div>
      <div v-else-if="error" class="error-msg">{{ error }}</div>

      <section v-else class="library-card">

        <div class="library-header">
          <div>
            <h1>Perpustakaan Pribadi Anda</h1>
            <p>Kelola dan pantau semua manuskrip yang sedang Anda kerjakan.</p>
          </div>
          <button class="btn-upload" @click="mulaiManuskrip">
            + Mulai Manuskrip Baru
          </button>
        </div>

        <!-- Tabs -->
        <div class="tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="tab"
            :class="{ 'active-tab': activeTab === tab.key }"
            @click="activeTab = tab.key"
          >
            {{ tab.label }} ({{ countByTab(tab.key) }})
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="filteredManuscripts.length === 0" class="empty-state">
          <div class="plus-box" @click="mulaiManuskrip" style="cursor:pointer">+</div>
          <h4>Belum ada manuskrip</h4>
          <p>Klik "Mulai Manuskrip Baru" untuk menambahkan naskah pertama Anda.</p>
        </div>

        <!-- Grid -->
        <div v-else class="book-grid">

          <div
            class="book-card"
            v-for="ms in filteredManuscripts"
            :key="ms.id"
            @click="router.push(`/detail-buku/${ms.id}`)"
            style="cursor:pointer"
          >
            <div class="book-top">
              <div class="book-cover">📖</div>
              <div class="book-info">
                <span class="status" :class="statusClass(ms.status)">
                  {{ formatStatus(ms.status) }}
                </span>
                <h3>{{ ms.title }}</h3>
                <p>{{ ms.book_type }}</p>
                <p class="science">{{ ms.science_field }}</p>
              </div>
            </div>

            <div class="progress-section">
              <div class="progress-header">
                <span>Total Halaman</span>
                <span>{{ ms.total_pages ?? '-' }} hal</span>
              </div>
              <div class="progress-bar">
                <div
                  class="progress-fill"
                  :class="progressColor(ms.status)"
                  style="width:100%"
                ></div>
              </div>
            </div>

            <div class="book-footer">
              <span>{{ formatDate(ms.created_at) }}</span>
              <span class="id-tag">#{{ ms.id }}</span>
            </div>
          </div>

          <!-- Card tambah baru -->
          <div class="new-project-card" @click="mulaiManuskrip">
            <div class="plus-box">+</div>
            <h4>Mulai Proyek Baru</h4>
            <p>Tuangkan ide Anda ke dalam manuskrip digital baru.</p>
          </div>

        </div>

      </section>


    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const { getDashboard } = useApi()

const manuscripts    = ref([])
const loading        = ref(true)
const error          = ref(null)
const activeTab      = ref('semua')


const tabs = [
  { key: 'semua',   label: 'Semua' },
  { key: 'draft',   label: 'Draf' },
  { key: 'review',  label: 'Dalam Review' },
  { key: 'selesai', label: 'Diterbitkan' },
]

onMounted(async () => {
  try {
    const res = await getDashboard()

    
    if (!res.data.success) throw new Error(res.data.message)
    manuscripts.value = res.data.data.history ?? []
  } catch (e) {
    error.value = 'Gagal memuat data: ' + (e.response?.data?.message || e.message)
  } finally {
    loading.value = false
  }
  console.log(manuscripts.value.map(m => m.status))
})

const filteredManuscripts = computed(() => {
  let list = manuscripts.value

  if (activeTab.value !== 'semua') {
    list = list.filter(ms => {

      if (activeTab.value === 'draft') {
        return [
          'initial_draft_uploaded'
        ].includes(ms.status)
      }

      if (activeTab.value === 'review') {
        return [
          'reviewer_assigned',
          'under_review',
          'review_completed',
          'revision_requested',
          'revision_uploaded'
        ].includes(ms.status)
      }

      if (activeTab.value === 'selesai') {
        return [
          'preprint',
          'publisher_revised',
          'ready_to_print'
        ].includes(ms.status)
      }

      return true
    })
  }

  return list
})

function countByTab(key) {

  if (key === 'semua')
    return manuscripts.value.length

  if (key === 'draft')
    return manuscripts.value.filter(
      m => ['initial_draft_uploaded'].includes(m.status)
    ).length

  if (key === 'review')
    return manuscripts.value.filter(
      m => [
        'reviewer_assigned',
        'under_review',
        'review_completed',
        'revision_requested',
        'revision_uploaded'
      ].includes(m.status)
    ).length

  if (key === 'selesai')
    return manuscripts.value.filter(
      m => [
        'preprint',
        'publisher_revised',
        'ready_to_print'
      ].includes(m.status)
    ).length

  return 0
}

function formatStatus(status) {
  const map = {
    contract_validated      : 'KONTRAK DISETUJUI',
    initial_draft_uploaded  : 'DRAF',
    reviewer_assigned       : 'DALAM REVIEW',
    review_completed        : 'REVIEW SELESAI',
    revision_requested      : 'PERLU REVISI',
    revision_uploaded       : 'REVISI DIKIRIM',
    preprint                : 'PRA-CETAK',
    publisher_revised       : 'PERLU PERBAIKAN',
    ready_to_print          : 'SIAP CETAK',
    approved                : 'DISETUJUI',
    published               : 'DITERBITKAN',
  }
  return map[status] ?? status.toUpperCase()
}

function statusClass(status) {

  if (
    [
      'ready_to_print'
    ].includes(status)
  ) return 'published'

  if (
    [
      'reviewer_assigned',
      'under_review',
      'review_completed',
      'revision_uploaded'
    ].includes(status)
  ) return 'review'

  if (
    [
      'revision_requested',
      'publisher_revised'
    ].includes(status)
  ) return 'revision'

  return 'draft'
}

function progressColor(status) {

  if (
    [
      'ready_to_print'
    ].includes(status)
  ) return 'green'

  if (
    [
      'reviewer_assigned',
      'under_review',
      'review_completed',
      'revision_uploaded'
    ].includes(status)
  ) return 'brown'

  if (
    [
      'revision_requested',
      'publisher_revised'
    ].includes(status)
  ) return 'brown'

  return 'gray'
}

function formatDate(dateStr) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

function mulaiManuskrip() {
  sessionStorage.removeItem('atributBuku')
  router.push('/upload-draft')
}
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.buku-page{ display:flex; min-height:100vh; background:#e8ded3; }

.main-content{ flex:1; padding:20px; }

.info-msg{ padding:20px; color:#666; }
.error-msg{ padding:20px; color:#c0392b; background:#fdecea; border-radius:12px; }

.library-card{ background:white; border-radius:22px; padding:30px; }
.library-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:30px; }
.library-header h1{ font-size:40px; margin-bottom:10px; color:#2f2f2f; }
.library-header p{ color:#666; line-height:1.6; max-width:600px; }

.btn-upload{ background:#6b4b3e; color:white; border:none; padding:16px 24px; border-radius:14px; font-size:15px; cursor:pointer; white-space:nowrap; }
.btn-upload:hover{ background:#5a3d31; }

.tabs{ display:flex; gap:25px; margin-bottom:25px; border-bottom:1px solid #ddd; padding-bottom:14px; }
.tab{ border:none; background:none; font-size:15px; cursor:pointer; color:#888; padding-bottom:10px; }
.active-tab{ color:#2f2f2f; border-bottom:3px solid #5b3d2d; font-weight:600; }

.empty-state{ text-align:center; padding:60px 20px; }
.empty-state h4{ font-size:22px; margin:15px 0 10px; color:#4a3a31; }
.empty-state p{ color:#888; }

.book-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }

.book-card{ border:1px solid #e7e7e7; border-radius:16px; padding:20px; transition:.2s; }
.book-card:hover{ box-shadow:0 4px 16px rgba(0,0,0,.08); border-color:#c8b9aa; }
.book-top{ display:flex; gap:16px; margin-bottom:20px; }
.book-cover{ font-size:52px; width:80px; display:flex; align-items:center; justify-content:center; background:#f5f0ea; border-radius:10px; }
.book-info{ flex:1; }
.book-info h3{ font-size:18px; line-height:1.4; margin-bottom:6px; color:#2f2f2f; }
.book-info p{ color:#777; font-size:14px; }
.science{ font-size:12px !important; color:#aaa !important; margin-top:3px; }

.status{ display:inline-block; padding:5px 10px; border-radius:8px; font-size:11px; margin-bottom:12px; font-weight:600; }
.draft{ background:#ececec; color:#666; }
.review{ background:#ffe2cf; color:#c26b2d; }
.revision{ background:#fef3cd; color:#856404; }
.published{ background:#d7f0df; color:#4f8b61; }

.progress-section{ margin-bottom:18px; }
.progress-header{ display:flex; justify-content:space-between; margin-bottom:8px; font-size:13px; color:#666; }
.progress-bar{ width:100%; height:7px; background:#eee; border-radius:20px; }
.progress-fill{ height:100%; border-radius:20px; }
.brown{ background:#7c3f13; }
.gray{ background:#aaa; }
.green{ background:#667b53; }

.book-footer{ display:flex; justify-content:space-between; align-items:center; font-size:13px; color:#888; }
.id-tag{ background:#f3eee9; padding:4px 10px; border-radius:8px; font-size:12px; }

.new-project-card{ border:2px dashed #d8c9bb; border-radius:16px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; padding:40px; cursor:pointer; transition:.2s; }
.new-project-card:hover{ background:#fdf9f5; }
.plus-box{ width:65px; height:65px; border-radius:16px; background:#f3eee9; display:flex; justify-content:center; align-items:center; font-size:38px; color:#8d7a6d; margin-bottom:18px; }
.new-project-card h4{ font-size:20px; margin-bottom:10px; color:#4a3a31; }
.new-project-card p{ color:#888; line-height:1.6; font-size:14px; }
</style>
