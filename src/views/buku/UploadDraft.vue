<template>
  <div class="upload-page">
    <Sidebar />
    <main class="main-content">

      <div class="topbar">
        <div class="breadcrumb">Manuskrip Baru › Unggah Draf Awal</div>
        <img src="https://i.pravatar.cc/40" alt="" />
      </div>

      <section class="upload-card">
        <span class="mini-breadcrumb">Langkah 1 dari 3</span>
        <h1>Unggah Draf Awal</h1>
        <p class="desc">
          Unggah file naskah Anda dalam format PDF atau DOCX (maks. 50 MB).
          Pastikan nama file tidak mengandung karakter khusus.
        </p>

        <!-- Upload File -->
        <div class="upload-section">
          <label>File Naskah *</label>
          <div
            class="upload-box"
            :class="{ 'has-file': selectedFile, 'drag-over': isDragging }"
            @click="triggerFileInput"
            @dragover.prevent="isDragging = true"
            @dragleave="isDragging = false"
            @drop.prevent="handleDrop"
          >
            <template v-if="!selectedFile">
              <div class="upload-icon">☁</div>
              <p>Ketuk atau seret file untuk memilih</p>
              <span>Format .pdf atau .docx (Maks. 50 MB)</span>
            </template>
            <template v-else>
              <div class="file-preview">
                <span class="file-icon">📄</span>
                <div>
                  <strong>{{ selectedFile.name }}</strong>
                  <p>{{ formatFileSize(selectedFile.size) }}</p>
                </div>
                <button class="remove-file" @click.stop="removeFile">✕</button>
              </div>
            </template>
          </div>
          <input ref="fileInput" type="file" accept=".pdf,.docx" style="display:none" @change="handleFileChange" />
          <span class="field-error" v-if="errors.file">{{ errors.file }}</span>
        </div>

        <!-- Konfirmasi -->
        <div class="confirm-box" :class="{ confirmed }">
          <input type="checkbox" id="confirm-check" v-model="confirmed" />
          <label for="confirm-check">
            Saya mengonfirmasi bahwa naskah ini adalah karya asli saya,
            tidak mengandung plagiarisme, dan belum pernah diterbitkan sebelumnya secara komersial.
          </label>
        </div>
        <span class="field-error" v-if="errors.confirmed">{{ errors.confirmed }}</span>

        <div class="button-group">
          <button class="cancel-btn" @click="router.push('/')">Batal</button>
          <button class="upload-btn" @click="handleLanjut">Lanjut ke Verifikasi →</button>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'

const router = useRouter()

const fileInput    = ref(null)
const selectedFile = ref(null)
const isDragging   = ref(false)
const confirmed    = ref(false)
const errors       = ref({})

const INVALID_CHARS = /[<>:"/\\|?*\x00-\x1f]/

function triggerFileInput() { fileInput.value?.click() }

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

  if (!allowed.includes(file.type)) {
    errors.value.file = 'Format file tidak didukung. Gunakan .docx atau .pdf.'
    return
  }
  if (file.size > 50 * 1024 * 1024) {
    errors.value.file = 'Ukuran file melebihi batas 50 MB.'
    return
  }
  if (INVALID_CHARS.test(file.name)) {
    errors.value.file = 'Nama file mengandung karakter yang tidak diizinkan.'
    return
  }
  selectedFile.value = file
}

function removeFile() {
  selectedFile.value = null
  if (fileInput.value) fileInput.value.value = ''
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function validate() {
  const e = {}
  if (!selectedFile.value) e.file      = 'File naskah wajib diunggah.'
  if (!confirmed.value)    e.confirmed = 'Anda harus menyetujui pernyataan ini.'
  return e
}

function handleLanjut() {
  errors.value = validate()
  if (Object.keys(errors.value).length) return

  sessionStorage.setItem('draftFile', JSON.stringify({
    name: selectedFile.value.name,
    size: selectedFile.value.size,
    type: selectedFile.value.type,
  }))
  window.__draftFile = selectedFile.value
  router.push('/verifikasi-draft')
}
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.upload-page{ display:flex; min-height:100vh; background:#e9dfd2; }
.main-content{ flex:1; padding:20px; }
.topbar{ background:#f6f1e9; padding:18px 25px; border-radius:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
.breadcrumb{ color:#75685e; font-size:14px; }
.topbar img{ width:42px; height:42px; border-radius:50%; }
.upload-card{ background:white; border-radius:22px; padding:35px; }
.mini-breadcrumb{ color:#888; font-size:13px; }
.upload-card h1{ font-size:40px; color:#34261f; margin:12px 0; }
.desc{ color:#6f6f6f; max-width:700px; line-height:1.7; margin-bottom:25px; }
.upload-section{ margin-bottom:25px; }
.upload-section label{ display:block; margin-bottom:10px; font-weight:600; }
.upload-box{ border:2px dashed #ddd; background:#f8f6f2; border-radius:12px; height:200px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; cursor:pointer; transition:.2s; }
.upload-box:hover,.upload-box.drag-over{ border-color:#8b4a16; background:#fdf5ef; }
.upload-box.has-file{ border-style:solid; border-color:#60774c; background:#f2f7ee; }
.upload-icon{ font-size:45px; margin-bottom:12px; }
.upload-box p{ font-size:18px; margin-bottom:6px; }
.upload-box span{ color:#777; font-size:14px; }
.file-preview{ display:flex; align-items:center; gap:16px; padding:0 20px; }
.file-icon{ font-size:36px; }
.file-preview strong{ display:block; font-size:15px; }
.file-preview p{ color:#666; font-size:13px; margin-top:4px; }
.remove-file{ background:none; border:none; font-size:18px; color:#999; cursor:pointer; margin-left:auto; }
.remove-file:hover{ color:#c0392b; }
.field-error{ display:block; margin-top:5px; color:#c0392b; font-size:12px; }
.confirm-box{ display:flex; gap:14px; align-items:flex-start; border:1px solid #ddd; background:#f7f3ee; padding:18px; border-radius:12px; margin-bottom:12px; }
.confirm-box.confirmed{ border-color:#60774c; background:#f2f7ee; }
.confirm-box input{ margin-top:3px; width:16px; height:16px; cursor:pointer; flex-shrink:0; }
.confirm-box label{ color:#555; line-height:1.7; cursor:pointer; font-size:14px; }
.button-group{ display:flex; justify-content:flex-end; gap:14px; margin-top:25px; }
.cancel-btn{ background:#ccc; color:#333; border:none; padding:14px 28px; border-radius:10px; cursor:pointer; font-size:15px; }
.upload-btn{ background:#3f2617; color:white; border:none; padding:14px 32px; border-radius:10px; cursor:pointer; font-size:15px; }
.upload-btn:hover{ background:#5a3a25; }
</style>
