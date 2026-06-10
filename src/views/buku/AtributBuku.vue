<template>
  <div class="atribut-page">
    <Sidebar />
    <main class="main-content">

      <div class="topbar">
        <div class="breadcrumb">Manuskrip Baru › Unggah Draf Awal › Verifikasi Draf › Atribut Buku</div>
        <img src="https://i.pravatar.cc/40" alt="" />
      </div>

      <div v-if="!draftFileMeta" class="error-msg">
        Data draf tidak ditemukan.
        <button @click="router.push('/upload-draft')">← Kembali Unggah Draf</button>
      </div>

      <template v-else>
        <section class="form-card">
          <span class="mini-breadcrumb">Langkah 3 dari 3</span>
          <h1>Atribut Buku</h1>
          <p class="desc">
            Lengkapi metadata buku. Data ini digunakan reviewer, penerbit, dan admin dalam proses kurasi.
          </p>

          <!-- Ringkasan file -->
          <div class="file-summary">
            <span class="file-icon-sm">📄</span>
            <div>
              <strong>{{ draftFileMeta.name }}</strong>
              <p>{{ formatFileSize(draftFileMeta.size) }} • {{ draftFileMeta.type.includes('pdf') ? 'PDF' : 'DOCX' }}</p>
            </div>
            <button class="change-file-btn" @click="router.push('/upload-draft')">Ganti File</button>
          </div>

          <div class="form-box">
            <div class="grid-form">

              <!-- Jenis Buku -->
              <div class="form-group">
                <label>Jenis Buku *</label>
                <select v-model="form.book_type">
                  <option value="">Pilih jenis naskah</option>
                  <option value="Buku Ajar">Buku Ajar</option>
                  <option value="Buku Referensi">Referensi</option>
                </select>
                <span class="field-error" v-if="errors.book_type">{{ errors.book_type }}</span>
              </div>

              <!-- Judul -->
              <div class="form-group">
                <label>Judul Buku *</label>
                <input type="text" v-model="form.title" placeholder="Masukkan judul lengkap" />
                <span class="field-error" v-if="errors.title">{{ errors.title }}</span>
              </div>

              <!-- Bidang Ilmu -->
              <div class="form-group">
                <label>Bidang Ilmu *</label>
                <select v-model="form.science_field">
                  <option value="">Pilih bidang ilmu</option>
                  <option value="Ilmu Komputer">Ilmu Komputer</option>
                  <option value="Teknik Informatika">Teknik Informatika</option>
                  <option value="Matematika">Matematika</option>
                  <option value="Fisika">Fisika</option>
                  <option value="Bahasa & Sastra">Bahasa &amp; Sastra</option>
                  <option value="Ekonomi">Ekonomi</option>
                  <option value="Hukum">Hukum</option>
                  <option value="Kedokteran">Kedokteran</option>
                  <option value="Pendidikan">Pendidikan</option>
                  <option value="Sosial & Politik">Sosial &amp; Politik</option>
                </select>
                <span class="field-error" v-if="errors.science_field">{{ errors.science_field }}</span>
              </div>


              <!-- Jumlah Halaman -->
              <div class="form-group">
                <label>Jumlah Halaman (Estimasi) *</label>
                <input type="number" v-model="form.total_pages" placeholder="Estimasi jumlah halaman" min="1" />
                <span class="field-error" v-if="errors.total_pages">{{ errors.total_pages }}</span>
              </div>

            </div>

            <!-- Abstrak -->
            <div class="textarea-group">
              <label>Abstrak / Deskripsi * <span class="optional">(min. 10 karakter)</span></label>
              <textarea v-model="form.abstract" placeholder="Tuliskan ringkasan buku Anda di sini..."></textarea>
              <div class="textarea-footer">
                <span class="field-error" v-if="errors.abstract">{{ errors.abstract }}</span>
                <span :class="{ 'char-warn': form.abstract.length < 10 && form.abstract.length > 0 }" style="margin-left:auto">
                  {{ form.abstract.length }} karakter (min. 10)
                </span>
              </div>
            </div>

            <div class="error-msg" v-if="submitError">{{ submitError }}</div>
            <div class="success-msg" v-if="submitSuccess">✅ Manuskrip berhasil dikirim! Mengarahkan ke dasbor...</div>

            <div class="button-group">
              <div>
                <button class="cancel-btn" @click="router.push('/verifikasi-draft')" :disabled="loading">← Kembali</button>
              </div>
              <button class="save-btn" @click="handleSubmit" :disabled="loading || submitSuccess">
                <span v-if="loading">Mengirim...</span>
                <span v-else>Kirim Manuskrip</span>
              </button>
            </div>
          </div>
        </section>
      </template>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import { useApi } from '@/composables/useApi'

const router = useRouter()
const { createDraft } = useApi()

const draftFileMeta = ref(null)

const form = ref({
  book_type      : '',
  title          : '',
  science_field : '',
  total_pages: '',
  abstract       : '',
})

const errors        = ref({})
const loading       = ref(false)
const submitError   = ref(null)
const submitSuccess = ref(false)

onMounted(() => {
  const raw = sessionStorage.getItem('draftFile')
  if (raw) {
    try { draftFileMeta.value = JSON.parse(raw) }
    catch { draftFileMeta.value = null }
  }
})

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function validate() {
  const e = {}
  if (!form.value.book_type)                          e.book_type       = 'Jenis buku wajib dipilih.'
  if (!form.value.title.trim())                       e.title           = 'Judul buku wajib diisi.'
  if (!form.value.science_field)                     e.science_field  = 'Bidang ilmu wajib dipilih.'
  
  if (!form.value.total_pages || form.value.total_pages < 1)
                                                      e.total_pages = 'Jumlah halaman harus lebih dari 0.'
  
  if (!form.value.abstract.trim())                    e.abstract        = 'Abstrak wajib diisi.'
  else if (form.value.abstract.trim().length < 10)   e.abstract        = 'Abstrak minimal 10 karakter.'
  return e
}

async function handleSubmit() {
  errors.value      = validate()
  submitError.value = null

  if (Object.keys(errors.value).length) return

  const draftFile = window.__draftFile
  if (!draftFile) {
    submitError.value = 'File draf tidak ditemukan. Silakan unggah ulang.'
    return
  }

  loading.value = true
  try {
    // POST /api/manuscripts – kirim metadata + file sekaligus (PRD 6.2)
    const formData = new FormData()

    formData.append('file_draft', draftFile)
    formData.append('title', form.value.title)
    formData.append('book_type', form.value.book_type)
    formData.append('science_field', form.value.science_field)
    formData.append('total_pages', form.value.total_pages)
    formData.append('abstract', form.value.abstract)

    const res = await createDraft(formData)
    if (!res.data.success) throw new Error(res.data.message)

    sessionStorage.removeItem('draftFile')
    delete window.__draftFile

    submitSuccess.value = true
    setTimeout(() => router.push('/'), 1800)
  } catch (err) {
    const msg = err.response?.data?.message || err.message
    submitError.value = 'Gagal mengirim: ' + msg
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.atribut-page{ display:flex; min-height:100vh; background:#e9dfd2; }
.main-content{ flex:1; padding:20px; }
.topbar{ background:#f6f1e9; padding:18px 25px; border-radius:18px; display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; }
.breadcrumb{ color:#75685e; font-size:14px; }
.topbar img{ width:42px; height:42px; border-radius:50%; }
.error-msg{ background:#fdecea; color:#c0392b; padding:15px 20px; border-radius:12px; margin-bottom:20px; display:flex; align-items:center; gap:12px; }
.error-msg button{ background:none; border:1px solid #c0392b; color:#c0392b; padding:6px 12px; border-radius:8px; cursor:pointer; font-size:13px; }
.success-msg{ background:#d7f0df; color:#2e7d32; padding:15px 20px; border-radius:12px; margin-bottom:20px; font-weight:500; }
.form-card{ background:white; border-radius:22px; padding:35px; }
.mini-breadcrumb{ color:#888; font-size:13px; }
.form-card h1{ font-size:40px; margin:12px 0; color:#35261d; }
.desc{ color:#666; max-width:700px; line-height:1.7; margin-bottom:20px; }
.file-summary{ display:flex; align-items:center; gap:14px; border:1px solid #d8eed0; background:#f4faf1; border-radius:12px; padding:16px 20px; margin-bottom:25px; }
.file-icon-sm{ font-size:30px; }
.file-summary strong{ font-size:15px; color:#35261d; }
.file-summary p{ color:#777; font-size:13px; margin-top:3px; }
.change-file-btn{ margin-left:auto; background:none; border:1px solid #8b4a16; color:#8b4a16; padding:8px 14px; border-radius:8px; cursor:pointer; font-size:13px; }
.form-box{ border:1px solid #e5ddd3; border-radius:16px; padding:35px; }
.grid-form{ display:grid; grid-template-columns:repeat(2,1fr); gap:25px; margin-bottom:30px; }
.span-2{ grid-column:1/-1; }
.form-group label{ display:block; margin-bottom:8px; font-weight:600; color:#35261d; }
.optional{ font-weight:400; color:#999; font-size:13px; }
.form-group input,.form-group select{ width:100%; padding:14px; border-radius:10px; border:1px solid #d7d7d7; outline:none; font-size:15px; }
.field-error{ display:block; margin-top:5px; color:#c0392b; font-size:12px; }
.textarea-group{ margin-bottom:30px; }
.textarea-group label{ display:block; margin-bottom:8px; font-weight:600; }
.textarea-group textarea{ width:100%; height:200px; border-radius:12px; border:1px solid #d7d7d7; padding:18px; resize:none; outline:none; font-size:15px; }
.textarea-footer{ display:flex; justify-content:space-between; margin-top:8px; color:#777; font-size:13px; align-items:flex-start; }
.char-warn{ color:#e67e22 !important; }
.button-group{ display:flex; justify-content:space-between; align-items:center; border-top:1px solid #eee; padding-top:25px; }
.save-btn{ background:#5a4031; color:white; border:none; padding:14px 28px; border-radius:10px; cursor:pointer; font-size:15px; }
.save-btn:hover:not(:disabled){ background:#7a5041; }
.cancel-btn{ background:#ccc; color:#333; border:none; padding:14px 28px; border-radius:10px; cursor:pointer; font-size:15px; }
.save-btn:disabled,.cancel-btn:disabled{ opacity:.6; cursor:not-allowed; }
</style>
