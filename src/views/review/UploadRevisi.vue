<template>
  <div class="page">
    <Sidebar />
    <div class="content">
      <Topbar title="Upload Revisi Naskah" placeholder="Cari naskah..." />

      <div class="main-card">
        <h1>Revisi Naskah</h1>
        <p class="subtitle">
          Unggah draft terbaru yang telah diperbaiki berdasarkan catatan reviewer.
          <span style="color:#888">(Naskah #{{ manuscriptId }})</span>
        </p>

        

        <!-- Info -->
        <div class="info-grid">
          <div class="info-card">
            <div class="status-label">ID NASKAH</div>
            <div class="book-header">
              <h2>Manuskrip #{{ manuscriptId }}</h2>
              <span class="review-badge">Menunggu Revisi</span>
            </div>
            <p class="description">Pastikan revisi sudah mengakomodasi seluruh catatan reviewer.</p>
            <router-link :to="`/hasil-review/${manuscriptId}`" class="review-link">
              🔍 Lihat Hasil Review Terakhir
            </router-link>
          </div>
          <div class="version-card">
            <div class="version-icon">🗂</div>
            <h3>Versi Berikutnya</h3>
            <p>File ini akan tersimpan sebagai versi baru dalam sistem secara otomatis.</p>
          </div>
        </div>

        <!-- Upload Area -->
        <div
          class="upload-box"
          :class="{ 'has-file': selectedFile, 'drag-over': isDragging }"
          @click="triggerFileInput"
          @dragover.prevent="isDragging = true"
          @dragleave="isDragging = false"
          @drop.prevent="handleDrop"
        >
          <div class="upload-icon">📤</div>
          <h2>Seret &amp; Lepas Naskah</h2>
          <p v-if="!selectedFile">atau klik untuk memilih file dari komputer Anda</p>
          <div v-if="selectedFile" class="selected-file">
            📄 {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
          </div>
          <div class="file-info">PDF, DOCX • Maks. 5 MB</div>
          <input ref="fileInputRef" type="file" accept=".pdf,.docx" style="display:none" @change="handleFileChange" />
        </div>
        <span class="field-error" v-if="errors.file">{{ errors.file }}</span>

        <!-- Changelog — WAJIB sesuai PRD 3.7.2 -->
        <div class="note-section">
          <div class="note-header">
            <label>Catatan Perubahan (Changelog) *</label>
            <small>Wajib diisi — jelaskan poin-poin yang direvisi</small>
          </div>
          <textarea
            v-model="changelog"
            placeholder="Contoh: Bab 3 – diperkuat motivasi tokoh utama. Bab 5 – alur penutup diperbaiki sesuai saran reviewer."
          ></textarea>
          <span class="field-error" v-if="errors.changelog">{{ errors.changelog }}</span>
        </div>

        <div v-if="errorMsg"  class="error-msg">{{ errorMsg }}</div>
        <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>

        <div class="action-section">
          <button class="draft-btn" @click="$router.back()">Batal</button>
          <button class="submit-btn" :disabled="submitting" @click="submitRevision">
            {{ submitting ? 'Mengirim...' : '▶ Kirim Revisi Sekarang' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../../components/Sidebar.vue'
import Topbar from '../../components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  manuscriptId: { type: [String, Number], required: true }
})

const router = useRouter()
const { uploadRevision, getFiles } = useApi()

const fileHistory   = ref([])
const filesLoading  = ref(false)

const fileInputRef = ref(null)
const selectedFile = ref(null)
const isDragging   = ref(false)
const changelog    = ref('')
const submitting   = ref(false)
const errorMsg     = ref(null)
const successMsg   = ref(null)
const errors       = ref({})

const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/

const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  : '-'

onMounted(async () => {
  if (!props.manuscriptId || props.manuscriptId == 0) return
  filesLoading.value = true
  try {
    const res = await getFiles(props.manuscriptId)
    fileHistory.value = res.data.data ?? res.data ?? []
  } catch (e) {
    console.warn('Gagal memuat riwayat file:', e.message)
  } finally {
    filesLoading.value = false
  }
})

function triggerFileInput() { fileInputRef.value?.click() }

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) setFile(file)
}

function handleDrop(e) {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file) setFile(file)
}

function setFile(file) {
  const allowed = ['application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  errors.value.file = null
  if (!allowed.includes(file.type)) { errors.value.file = 'Format file tidak didukung. Gunakan .docx atau .pdf.'; return }
  if (file.size > 5 * 1024 * 1024) { errors.value.file = 'Ukuran file melebihi batas 5 MB.'; return }
  if (INVALID_CHARS.test(file.name)) { errors.value.file = 'Nama file mengandung karakter yang tidak diizinkan.'; return }
  selectedFile.value = file
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function validate() {
  const e = {}
  if (!selectedFile.value)      e.file      = 'File revisi wajib diunggah.'
  if (!changelog.value.trim())  e.changelog = 'Catatan perubahan wajib diisi.'
  return e
}

async function submitRevision() {
  errors.value  = validate()
  errorMsg.value = null
  if (Object.keys(errors.value).length) return

  submitting.value = true
  try {
    const formData = new FormData()
    formData.append('file_revision', selectedFile.value)   // field sesuai backend: file_revision
    formData.append('revision_note', changelog.value)      // field sesuai backend: revision_note

    const res = await uploadRevision(props.manuscriptId, formData)
    if (!res.data.success) throw new Error(res.data.message)

    successMsg.value = '✅ Revisi berhasil diunggah! Status naskah diperbarui.'
    setTimeout(() => router.push('/'), 1800)
  } catch (err) {
    const msg = err.response?.data?.message
    if (err.response?.status === 422) errorMsg.value = msg || 'Validasi gagal. Pastikan status naskah adalah revision_requested.'
    else if (err.response?.status === 403) errorMsg.value = 'Anda tidak memiliki akses ke naskah ini.'
    else if (err.response?.status === 404) errorMsg.value = 'Naskah tidak ditemukan.'
    else errorMsg.value = msg || 'Gagal mengirim revisi.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.page{ display:flex; min-height:100vh; background:#F6F1E6; }
.content{ flex:1; padding:20px; }
.main-card{ background:white; border-radius:20px; padding:30px; }
h1{ color:#3F2D24; margin-bottom:10px; }
.subtitle{ color:#777; margin-bottom:30px; }

/* Riwayat File */
.riwayat-section{ margin-bottom:30px; padding-bottom:28px; border-bottom:1px solid #f0ece7; }
.section-title{ font-size:18px; color:#3F2D24; margin-bottom:16px; }
.files-loading{ color:#888; font-size:14px; padding:10px 0; }
.files-empty{ color:#aaa; font-size:14px; padding:10px 0; }
.files-table{ width:100%; border-collapse:collapse; font-size:14px; }
.files-table thead{ background:#f8f5f1; }
.files-table th{ padding:10px 14px; text-align:left; color:#777; font-size:12px; text-transform:uppercase; }
.files-table td{ padding:12px 14px; border-bottom:1px solid #f0ece7; color:#444; }
.filename{ color:#3F2D24; font-weight:500; }
.version-tag{ background:#e8e3de; color:#5E4335; padding:3px 10px; border-radius:20px; font-size:12px; }
.info-grid{ display:grid; grid-template-columns:2fr 1fr; gap:20px; margin-bottom:25px; }
.info-card,.version-card{ border:1px solid #ddd; border-radius:12px; padding:20px; }
.status-label{ font-size:12px; color:#888; margin-bottom:10px; }
.book-header{ display:flex; justify-content:space-between; align-items:center; }
.book-header h2{ margin:0; color:#3F2D24; }
.review-badge{ background:#F6E6DA; color:#C67D47; padding:6px 10px; border-radius:20px; font-size:12px; }
.description{ margin:20px 0; line-height:1.7; color:#555; }
.review-link{ color:#3F2D24; font-weight:600; text-decoration:none; }
.version-icon{ font-size:28px; margin-bottom:10px; }
.version-card h3{ margin-bottom:10px; }
.version-card p{ color:#666; line-height:1.6; }
.upload-box{ border:2px dashed #D8C6B6; border-radius:12px; padding:60px 20px; text-align:center; margin-bottom:8px; background:#FCFAF7; cursor:pointer; transition:.2s; }
.upload-box:hover,.upload-box.drag-over{ background:#f3ede4; border-color:#8b4a16; }
.upload-box.has-file{ border-style:solid; border-color:#60774c; background:#f2f7ee; }
.upload-icon{ font-size:40px; margin-bottom:10px; }
.upload-box h2{ color:#3F2D24; margin-bottom:10px; }
.upload-box p{ color:#777; }
.file-info{ margin-top:15px; color:#999; font-size:14px; }
.selected-file{ margin-top:10px; background:#e8f4e8; color:#3a6b3a; padding:8px 16px; border-radius:8px; display:inline-block; }
.field-error{ display:block; margin-top:5px; color:#c0392b; font-size:12px; margin-bottom:10px; }
.error-msg{ background:#fde8e8; color:#c0392b; padding:12px 16px; border-radius:8px; margin-bottom:15px; }
.success-msg{ background:#e8f4e8; color:#3a6b3a; padding:12px 16px; border-radius:8px; margin-bottom:15px; }
.note-section{ margin-top:20px; }
.note-header{ display:flex; justify-content:space-between; margin-bottom:10px; align-items:center; }
.note-header label{ font-weight:600; color:#3F2D24; }
.note-header small{ color:#999; }
textarea{ width:100%; min-height:140px; border:1px solid #ddd; border-radius:10px; padding:15px; resize:none; font-family:inherit; font-size:14px; }
.action-section{ display:flex; justify-content:flex-end; gap:15px; margin-top:30px; padding-top:20px; border-top:1px solid #eee; }
.draft-btn{ border:1px solid #BDBDBD; background:white; padding:12px 20px; border-radius:8px; cursor:pointer; }
.submit-btn{ background:#5E4335; color:white; border:none; padding:12px 20px; border-radius:8px; cursor:pointer; }
.submit-btn:disabled{ opacity:.5; cursor:not-allowed; }
.submit-btn:hover:not(:disabled){ opacity:.9; }
</style>
