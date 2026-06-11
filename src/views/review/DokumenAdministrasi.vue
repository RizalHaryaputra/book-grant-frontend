<template>
  <div class="page">
    <Sidebar />
    <div class="content">
      <Topbar title="Dokumen Administrasi" placeholder="Cari naskah..." />

      <div class="main-card">
        <h1>Dokumen Administrasi</h1>
        <p class="subtitle">
          Unggah dokumen legalitas untuk melanjutkan proses verifikasi hibah buku Anda.
          <span style="color:#888">(Naskah #{{ manuscriptId }})</span>
        </p>

        <div v-if="!isValidId" class="alert-msg error-msg">
          ⚠️ ID manuskrip tidak valid. Silakan buka halaman ini dari Detail Buku.
          <button @click="router.push('/buku-saya')">← Buku Saya</button>
        </div>

        <template v-else>
          <div class="checklist-bar">
            <span>Kelengkapan Dokumen</span>
            <strong>{{ uploadedCount }} / {{ requiredCount }} dokumen wajib</strong>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: (uploadedCount / requiredCount * 100) + '%' }"></div>
            </div>
          </div>

          <div v-if="errorMsg"   class="alert-msg error-msg">{{ errorMsg }}</div>
          <div v-if="successMsg" class="alert-msg success-msg">{{ successMsg }}</div>

          <div class="document-grid">

            <!-- 1. Surat Pernyataan -->
            <div class="doc-card" :class="cardClass('surat_pernyataan')">
              <div class="doc-top">
                <div class="doc-icon">📋</div>
                <span class="badge" :class="badgeClass('surat_pernyataan')">
                  {{ badgeLabel('surat_pernyataan') }}
                </span>
              </div>
              <h2>Surat Pernyataan</h2>
              <p>Surat pernyataan yang menyatakan keaslian dan kelengkapan naskah.</p>
              <small class="format-hint">Format: PDF / JPG / PNG • Wajib</small>
              <div class="upload-area" @click="inputSuratPernyataan.click()">
                <span>☁</span>
                <p>{{ uploads.surat_pernyataan ? uploads.surat_pernyataan.name : 'Ketuk untuk unggah' }}</p>
                <small>PDF / JPG / PNG • Maks. 5 MB</small>
              </div>
              <input
                ref="inputSuratPernyataan"
                type="file" accept=".pdf,.jpg,.jpeg,.png" style="display:none"
                @change="handleFileSelect($event, 'surat_pernyataan')"
              />
              <span class="field-error" v-if="errors.surat_pernyataan">{{ errors.surat_pernyataan }}</span>
              <button
                v-if="uploads.surat_pernyataan && !submitted.surat_pernyataan"
                class="upload-submit-btn"
                :disabled="submitting === 'surat_pernyataan'"
                @click="submitDocument('surat_pernyataan')"
              >
                {{ submitting === 'surat_pernyataan' ? 'Mengirim...' : 'Kirim Dokumen' }}
              </button>
              <div v-if="submitted.surat_pernyataan" class="done-label">✅ Berhasil diunggah</div>
            </div>

            <!-- 2. Scan Bermeterai -->
            <div class="doc-card" :class="cardClass('scan_bermeteri')">
              <div class="doc-top">
                <div class="doc-icon">🔏</div>
                <span class="badge" :class="badgeClass('scan_bermeteri')">
                  {{ badgeLabel('scan_bermeteri') }}
                </span>
              </div>
              <h2>Scan Bermeterai</h2>
              <p>Scan dokumen bermeterai yang telah ditandatangani oleh penulis.</p>
              <small class="format-hint">Format: PDF / JPG / PNG • Wajib</small>
              <div class="upload-area" @click="inputScanBermeteri.click()">
                <span>☁</span>
                <p>{{ uploads.scan_bermeteri ? uploads.scan_bermeteri.name : 'Ketuk untuk unggah' }}</p>
                <small>PDF / JPG / PNG • Maks. 5 MB</small>
              </div>
              <input
                ref="inputScanBermeteri"
                type="file" accept=".pdf,.jpg,.jpeg,.png" style="display:none"
                @change="handleFileSelect($event, 'scan_bermeteri')"
              />
              <span class="field-error" v-if="errors.scan_bermeteri">{{ errors.scan_bermeteri }}</span>
              <button
                v-if="uploads.scan_bermeteri && !submitted.scan_bermeteri"
                class="upload-submit-btn"
                :disabled="submitting === 'scan_bermeteri'"
                @click="submitDocument('scan_bermeteri')"
              >
                {{ submitting === 'scan_bermeteri' ? 'Mengirim...' : 'Kirim Dokumen' }}
              </button>
              <div v-if="submitted.scan_bermeteri" class="done-label">✅ Berhasil diunggah</div>
            </div>

          </div>

          <div class="tips-box">
            <div class="tips-icon">💡</div>
            <div>
              <h3>Tips Unggah Dokumen</h3>
              <ul>
                <li>Gunakan resolusi minimal 150 DPI untuk hasil scan yang jelas.</li>
                <li>Pastikan dokumen tidak terpotong dan tanda tangan terlihat jelas.</li>
                <li>Meterai harus terpasang pada dokumen sebelum di-scan.</li>
              </ul>
            </div>
          </div>
        </template>
      </div>

      <div class="bottom-bar" v-if="isValidId">
        <div class="progress-section">
          <p>Dokumen Wajib <strong>{{ uploadedCount }} / {{ requiredCount }} Selesai</strong></p>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: (uploadedCount / requiredCount * 100) + '%' }"></div>
          </div>
          <p v-if="allRequiredDone" class="all-done-text">✅ Semua dokumen wajib terpenuhi.</p>
        </div>
        <div class="button-group">
          <button class="draft-btn" @click="$router.back()">Kembali</button>
          <button class="submit-btn" :disabled="!allRequiredDone" @click="router.push(`/detail-buku/${manuscriptId}`)">
            Selesai
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../../components/Sidebar.vue'
import Topbar  from '../../components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  manuscriptId: { type: [String, Number], required: true }
})

const router = useRouter()
const { uploadDocument, getDocuments } = useApi()

const isValidId = computed(() => {
  const id = Number(props.manuscriptId)
  return !isNaN(id) && id > 0
})

// Template refs untuk input file
const inputSuratPernyataan = ref(null)
const inputScanBermeteri   = ref(null)

const requiredDocs  = ['surat_pernyataan', 'scan_bermeteri']
const requiredCount = requiredDocs.length

// ✅ reactive() — perubahan properti di dalam object selalu terdeteksi Vue
const uploads   = reactive({ surat_pernyataan: null, scan_bermeteri: null })
const submitted = reactive({ surat_pernyataan: false, scan_bermeteri: false })
const errors    = reactive({ surat_pernyataan: null,  scan_bermeteri: null  })

const submitting = ref(null)
const errorMsg   = ref(null)
const successMsg = ref(null)

const uploadedCount   = computed(() => requiredDocs.filter(d => submitted[d]).length)
const allRequiredDone = computed(() => uploadedCount.value >= requiredCount)

function cardClass(docType) {
  if (submitted[docType]) return 'card-done'
  if (uploads[docType])   return 'card-ready'
  return 'card-waiting'
}
function badgeClass(docType) {
  if (submitted[docType]) return 'badge-done'
  if (uploads[docType])   return 'badge-ready'
  return 'badge-waiting'
}
function badgeLabel(docType) {
  if (submitted[docType]) return '✔ SELESAI'
  if (uploads[docType])   return 'SIAP KIRIM'
  return 'BELUM DIUNGGAH'
}

function handleFileSelect(e, docType) {
  const file = e.target.files[0]
  if (!file) return

  errors[docType] = null

  if (file.size > 5 * 1024 * 1024) {
    errors[docType] = 'Ukuran file melebihi batas 5 MB.'
    e.target.value = ''
    return
  }
  const allowedTypes = [
    'application/pdf',
    'image/jpeg',
    'image/png',
  ]
  if (!allowedTypes.includes(file.type)) {
    errors[docType] = 'Hanya file PDF, JPG, atau PNG yang diterima.'
    e.target.value = ''
    return
  }

  uploads[docType] = file
}

async function submitDocument(docType) {
  const file = uploads[docType]
  if (!file) return

  errorMsg.value   = null
  successMsg.value = null
  submitting.value = docType

  try {
    const formData = new FormData()
    formData.append('document_file', file)
    formData.append('document_type', docType)

    const res = await uploadDocument(props.manuscriptId, formData)
    if (!res.data.success) throw new Error(res.data.message)

    submitted[docType] = true
    uploads[docType]   = null  // bersihkan file setelah berhasil
    successMsg.value   = 'Dokumen berhasil diunggah!'
  } catch (err) {
    errorMsg.value = 'Gagal mengunggah: ' + (err.response?.data?.message || 'Terjadi kesalahan server.')
  } finally {
    submitting.value = null
  }
}

onMounted(async () => {
  if (!isValidId.value) return
  try {
    const res = await getDocuments(props.manuscriptId)
    if (!res.data.success) throw new Error(res.data.message)

    const docs = res.data.data ?? []
    docs.forEach(doc => {
      // Pengecekan eksplisit — hindari masalah 'in' operator pada reactive proxy
      if (doc.document_type === 'surat_pernyataan') submitted.surat_pernyataan = true
      if (doc.document_type === 'scan_bermeteri')   submitted.scan_bermeteri   = true
    })
  } catch (e) {
    // Tampilkan ke user, jangan diam-diam di console
    errorMsg.value = 'Gagal memuat status dokumen: ' + (e.response?.data?.message || e.message)
  }
})
</script>

<style scoped>
*{ margin:0; padding:0; box-sizing:border-box; font-family:'Segoe UI',sans-serif; }
.page{ display:flex; min-height:100vh; background:#F6F1E6; }
.content{ flex:1; padding:20px; }
.main-card{ background:white; border-radius:20px; padding:30px; margin-bottom:20px; }
h1{ color:#3f2d24; margin-bottom:10px; }
.subtitle{ color:#666; margin-bottom:20px; }
.alert-msg{ padding:12px 16px; border-radius:8px; margin-bottom:15px; display:flex; align-items:center; gap:12px; }
.error-msg{ background:#fde8e8; color:#c0392b; }
.error-msg button{ background:none; border:1px solid #c0392b; color:#c0392b; padding:5px 10px; border-radius:6px; cursor:pointer; font-size:13px; }
.success-msg{ background:#e8f4e8; color:#3a6b3a; }
.checklist-bar{ display:flex; align-items:center; gap:15px; margin-bottom:20px; flex-wrap:wrap; }
.checklist-bar span{ color:#666; }
.checklist-bar strong{ color:#3f2d24; }
.checklist-bar .progress-track{ flex:1; min-width:150px; height:8px; background:#ddd; border-radius:10px; overflow:hidden; }
.checklist-bar .progress-fill{ height:100%; background:#60774c; border-radius:10px; transition:width .4s; }
.document-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:25px; }
.doc-card{ border-radius:12px; padding:22px; border:1px solid #ddd; transition:border-color .3s,background .3s; }
.card-waiting{ border-left:4px solid #C9B7A6; }
.card-ready  { border-left:4px solid #D59A63; background:#fffaf5; }
.card-done   { border-left:4px solid #60774c; background:#f4faf1; }
.doc-top{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
.doc-icon{ font-size:26px; }
.badge{ font-size:11px; padding:4px 10px; border-radius:20px; font-weight:600; }
.badge-waiting{ background:#efefef; color:#888; }
.badge-ready  { background:#fef0e0; color:#b87a3a; }
.badge-done   { background:#e6f4e4; color:#50703C; }
.doc-card h2{ font-size:17px; color:#36261d; margin-bottom:8px; }
.doc-card p{ color:#666; line-height:1.6; margin-bottom:6px; font-size:14px; }
.format-hint{ color:#999; font-size:12px; }
.upload-area{ margin-top:15px; height:100px; border:2px dashed #d8c6b6; border-radius:8px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; gap:4px; cursor:pointer; font-size:22px; }
.upload-area p{ font-size:13px; color:#555; margin:0; }
.upload-area small{ color:#aaa; font-size:11px; }
.upload-area:hover{ background:#f5ede3; }
.field-error{ display:block; margin-top:5px; color:#c0392b; font-size:12px; }
.upload-submit-btn{ margin-top:12px; background:#5E4335; color:white; border:none; padding:9px 18px; border-radius:8px; cursor:pointer; width:100%; font-size:14px; }
.upload-submit-btn:disabled{ opacity:.5; cursor:not-allowed; }
.done-label{ margin-top:12px; color:#50703C; font-weight:600; font-size:14px; }
.tips-box{ display:flex; gap:20px; border:1px solid #ddd; border-radius:12px; padding:22px; }
.tips-icon{ font-size:26px; flex-shrink:0; }
.tips-box h3{ margin-bottom:10px; color:#3f2d24; }
.tips-box ul{ padding-left:18px; }
.tips-box li{ margin-bottom:7px; color:#555; line-height:1.6; font-size:14px; }
.bottom-bar{ background:white; padding:20px; border-radius:16px; display:flex; justify-content:space-between; align-items:center; }
.progress-section{ flex:1; margin-right:30px; }
.progress-section p{ color:#555; font-size:14px; margin-bottom:6px; }
.progress-track{ height:8px; background:#ddd; border-radius:10px; overflow:hidden; }
.progress-fill{ height:100%; background:#5E4335; transition:width .4s; }
.all-done-text{ margin-top:8px; color:#50703C; font-size:13px; font-weight:600; }
.button-group{ display:flex; gap:15px; }
.draft-btn{ border:1px solid #ccc; background:white; padding:12px 22px; border-radius:8px; cursor:pointer; }
.submit-btn{ background:#5E4335; color:white; border:none; padding:12px 22px; border-radius:8px; cursor:pointer; }
.submit-btn:disabled{ opacity:.5; cursor:not-allowed; }
</style>