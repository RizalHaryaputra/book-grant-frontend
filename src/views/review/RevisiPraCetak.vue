<template>
  <div class="page">
    <Sidebar />
    <main class="main-content">

      <Topbar title="Revisi Pra-Cetak" placeholder="Cari naskah..." />

      <div v-if="loading" class="state-msg">Memuat data...</div>

      <div v-else-if="!publisherCheck" class="state-msg error">
        Data pemeriksaan penerbit belum tersedia.
      </div>

      <template v-else>
        <div class="detail-layout">

          <!-- Kartu Hasil Pemeriksaan -->
          <section class="detail-card">

            <div class="card-title-row">
              <span class="card-icon">🖨️</span>
              <h2>Hasil Pemeriksaan Penerbit</h2>
              <span
                class="status-badge"
                :class="publisherCheck.decision === 'approved' ? 'green' : 'orange'"
              >
                {{ publisherCheck.decision === 'approved' ? 'Disetujui' : 'Revisi Diperlukan' }}
              </span>
            </div>

            <hr class="divider" />

            <!-- Checklist Grid -->
            <div class="check-grid">

              <div class="check-item">
                <div class="check-label">Cover</div>
                <div class="check-status" :class="publisherCheck.cover_ok ? 'ok' : 'need-revisi'">
                  <span class="check-icon">{{ publisherCheck.cover_ok ? '✅' : '❌' }}</span>
                  {{ publisherCheck.cover_ok ? 'Sesuai' : 'Perlu Revisi' }}
                </div>
              </div>

              <div class="check-item">
                <div class="check-label">Jumlah Halaman</div>
                <div class="check-status" :class="publisherCheck.page_count_ok ? 'ok' : 'need-revisi'">
                  <span class="check-icon">{{ publisherCheck.page_count_ok ? '✅' : '❌' }}</span>
                  {{ publisherCheck.page_count_ok ? 'Sesuai' : 'Perlu Revisi' }}
                </div>
              </div>

              <div class="check-item">
                <div class="check-label">Dokumen Administrasi</div>
                <div class="check-status" :class="publisherCheck.admin_docs_ok ? 'ok' : 'need-revisi'">
                  <span class="check-icon">{{ publisherCheck.admin_docs_ok ? '✅' : '❌' }}</span>
                  {{ publisherCheck.admin_docs_ok ? 'Lengkap' : 'Belum Lengkap' }}
                </div>
              </div>

            </div>

            <hr class="divider" />

            <div class="meta-item full-width">
              <label>Catatan Penerbit</label>
              <p class="notes-text">{{ publisherCheck.notes || 'Tidak ada catatan.' }}</p>
            </div>

          </section>

          <!-- Panel Aksi -->
          <aside class="action-panel">

            <h3>Aksi Cepat</h3>

            <template v-if="publisherCheck.decision === 'revised'">

              <!-- Form Upload -->
              <div class="upload-section">

                <div class="form-group">
                  <label>File Revisi</label>
                  <div class="file-input-wrapper" @click="$refs.fileInput.click()">
                    <input
                      ref="fileInput"
                      type="file"
                      class="hidden-input"
                      @change="handleFile"
                    />
                    <div class="file-drop-area">
                      <span class="file-icon">📎</span>
                      <span class="file-text">
                        {{ revisionFile ? revisionFile.name : 'Pilih atau seret file...' }}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label>Catatan Revisi</label>
                  <textarea
                    v-model="revisionNote"
                    class="form-textarea"
                    rows="4"
                    placeholder="Jelaskan perubahan yang dilakukan..."
                  />
                </div>

                <button
                  class="action-btn submit-btn"
                  :disabled="!revisionFile || uploading"
                  @click="uploadRevision"
                >
                  {{ uploading ? '⏳ Mengunggah...' : '📤 Upload Revisi' }}
                </button>

              </div>

            </template>

            <div v-else class="approved-msg">
              <span>🎉</span>
              <p>Naskah Anda telah disetujui oleh penerbit. Tidak ada revisi yang diperlukan.</p>
            </div>

            <router-link :to="`/detail-buku/${manuscriptId}`" class="action-btn back-btn">
              ← Kembali ke Detail Buku
            </router-link>

          </aside>

        </div>
      </template>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'

const route        = useRoute()
const manuscriptId = route.params.id

const publisherCheck = ref(null)
const revisionFile   = ref(null)
const revisionNote   = ref('')
const loading        = ref(false)
const uploading      = ref(false)

onMounted(() => loadPublisherCheck())

async function loadPublisherCheck() {
  try {
    loading.value = true
    const res = await axios.get(
      `http://127.0.0.1:8000/api/author/manuscripts/${manuscriptId}/publisher-check`
    )
    publisherCheck.value = res.data.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function handleFile(event) {
  revisionFile.value = event.target.files[0]
}

async function uploadRevision() {
  try {
    uploading.value = true
    const formData = new FormData()
    formData.append('revision_file', revisionFile.value)
    formData.append('revision_note', revisionNote.value)

    const res = await axios.post(
      `http://127.0.0.1:8000/api/author/manuscripts/${manuscriptId}/preprint-revision`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    alert(res.data.message)
    revisionFile.value = null
    revisionNote.value = ''
  } catch (e) {
    alert(e.response?.data?.message || 'Gagal upload revisi')
  } finally {
    uploading.value = false
  }
}
</script>

<style scoped>
* { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
.page { display: flex; min-height: 100vh; background: #e8ded3; }
.main-content { flex: 1; padding: 25px; }

.state-msg { padding: 20px; text-align: center; color: #888; }
.state-msg.error { color: #c0392b; background: #fde8e8; border-radius: 12px; }

.detail-layout { display: grid; grid-template-columns: 1fr 280px; gap: 22px; margin-top: 10px; }

/* Detail Card */
.detail-card { background: white; border-radius: 22px; padding: 32px; }

.card-title-row {
  display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
}
.card-icon { font-size: 28px; }
.card-title-row h2 { font-size: 22px; color: #2f2f2f; flex: 1; }

.status-badge { display: inline-block; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; }
.green  { background: #d7f0df; color: #4f8b61; }
.orange { background: #ffe5cf; color: #c56d2d; }

.divider { border: none; border-top: 1px solid #f0ece7; margin: 0 0 24px; }

/* Check Grid */
.check-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
.check-item { background: #faf8f5; border-radius: 14px; padding: 18px; }
.check-label { font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 10px; }
.check-status { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; }
.check-status.ok          { color: #4f8b61; }
.check-status.need-revisi { color: #c0392b; }
.check-icon { font-size: 18px; }

.meta-item.full-width { grid-column: 1/-1; }
.meta-item label { display: block; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }
.notes-text { color: #555; font-size: 15px; line-height: 1.8; background: #faf8f5; border-radius: 10px; padding: 16px; }

/* Action Panel */
.action-panel { background: white; border-radius: 22px; padding: 24px; height: fit-content; }
.action-panel h3 { font-size: 18px; color: #2f2f2f; margin-bottom: 20px; }

.upload-section { display: flex; flex-direction: column; gap: 16px; margin-bottom: 16px; }

.form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-weight: 500; }

.file-input-wrapper { cursor: pointer; }
.hidden-input { display: none; }
.file-drop-area {
  border: 2px dashed #ddd; border-radius: 12px; padding: 16px;
  display: flex; align-items: center; gap: 10px;
  background: #faf8f5; transition: .2s;
}
.file-drop-area:hover { border-color: #c56d2d; background: #fff5ee; }
.file-icon { font-size: 20px; }
.file-text { font-size: 13px; color: #888; word-break: break-all; }

.form-textarea {
  width: 100%; border: 1px solid #e5e0d8; border-radius: 10px;
  padding: 12px; font-size: 14px; resize: vertical; outline: none;
  font-family: 'Segoe UI', sans-serif; color: #2f2f2f; background: #faf8f5;
}
.form-textarea:focus { border-color: #c56d2d; }

.action-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 14px 16px; border-radius: 12px;
  text-decoration: none; color: #3f2d24;
  background: #f8f5f1; font-size: 14px; font-weight: 500;
  margin-bottom: 10px; transition: .2s; border: none; cursor: pointer; width: 100%;
}
.action-btn:hover { background: #ede5db; }
.action-btn:disabled { opacity: .4; cursor: not-allowed; }

.submit-btn { background: #3f2d24; color: white; }
.submit-btn:hover:not(:disabled) { background: #5a3e30; }

.back-btn { background: none; border: 1px solid #ddd; color: #888; margin-top: 4px; }
.back-btn:hover { background: #f5f5f5; }

.approved-msg {
  display: flex; flex-direction: column; align-items: center; gap: 12px;
  text-align: center; padding: 20px; background: #d7f0df; border-radius: 14px;
  margin-bottom: 16px;
}
.approved-msg span { font-size: 36px; }
.approved-msg p { color: #4f8b61; font-size: 14px; line-height: 1.6; font-weight: 500; }
</style>