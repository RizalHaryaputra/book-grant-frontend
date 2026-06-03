<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import { API_BASE_URL } from '../../config.js'
import { authHeaders } from '../../services/auth.js'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const pdfUrl = ref('')
const downloadUrl = ref('')
const pdfTitle = ref('Draft_Awal.pdf')

onMounted(async () => {
  const manuscriptId = route.params.id
  if (manuscriptId) {
    // Set the download endpoint URL
    downloadUrl.value = `${API_BASE_URL}/reviewer/manuscripts/${manuscriptId}/download`
    
    try {
      const res = await fetch(`${API_BASE_URL}/reviewer/manuscripts/${manuscriptId}`, {
        headers: authHeaders(false)
      })
      const data = await res.json()
      if (data.success && data.data) {
        // Use file_url for viewing in iframe
        pdfUrl.value = data.data.file_url || ''
        if (data.data.title) {
          pdfTitle.value = `Draft_${data.data.title.replace(/\s+/g, '_')}.pdf`
        }
      }
    } catch (err) {
      console.error('Gagal memuat detail naskah:', err)
    } finally {
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})

function goBack() {
  router.push('/reviewer/daftar-tugas')
}
</script>

<template>
  <div class="layout">
    <ReviewerSidebar />

    <div class="main-area">
      <!-- Custom Topbar for Draft Naskah -->
      <div class="draft-header">
        <button class="btn-kembali" @click="goBack">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Kembali
        </button>

        <div class="doc-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
          </svg>
          <span>{{ pdfTitle }}</span>
        </div>

        <div class="header-actions">
          <div class="search-bar">
            <input type="text" placeholder="Cari" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#999">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
          <a :href="downloadUrl" class="btn-unduh">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
            </svg>
            Unduh
          </a>
        </div>
      </div>

      <div class="pdf-container">
        <div v-if="isLoading" class="loading-state">Memuat Dokumen...</div>
        <iframe v-else :src="pdfUrl" class="pdf-viewer"></iframe>
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout { display: flex; min-height: 100vh; background: #2a1a10; } /* Dark background for this view outside the sidebar */
.main-area { margin-left: 210px; flex: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: linear-gradient(135deg, #f0ebe3, #e8ddd0); }

/* Draft Header */
.draft-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; background: #5a4030; color: #fff; }

.btn-kembali { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; background: #fff; color: #333; border: none; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
.btn-kembali:hover { background: #f0f0f0; }

.doc-title { display: flex; align-items: center; gap: 10px; font-size: 16px; font-weight: 600; flex: 1; justify-content: center; }

.header-actions { display: flex; align-items: center; gap: 12px; }
.search-bar { display: flex; align-items: center; background: #fff; border-radius: 20px; padding: 6px 14px; width: 160px; justify-content: space-between; }
.search-bar input { border: none; outline: none; background: transparent; font-size: 13px; width: 80%; }
.btn-unduh { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; background: #e8d0bd; color: #4a2e1b; border: none; border-radius: 20px; font-size: 13px; font-weight: 600; cursor: pointer; text-decoration: none; transition: background 0.15s; }
.btn-unduh:hover { background: #dcbfa8; }

/* PDF Container */
.pdf-container { flex: 1; padding: 24px 60px; display: flex; justify-content: center; align-items: flex-start; overflow-y: auto; }
.pdf-viewer { width: 100%; max-width: 900px; height: 85vh; background: #fff; border: none; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }

.loading-state { display: flex; align-items: center; justify-content: center; height: 100%; color: #888; font-size: 15px; }
</style>
