<template>
  <div class="page">
    <Sidebar />

    <div class="content">

      <Topbar title="Hasil Review" />

      <!-- Loading / Error -->
      <div v-if="loading" class="state-msg">Memuat hasil review...</div>
      <div v-else-if="error" class="state-msg error">{{ error }}</div>

      <div v-else-if="reviews.length === 0" class="state-msg">
        Belum ada hasil review yang tersedia untuk naskah ini.
      </div>

      <div v-else class="review-container">

        <div class="review-header">
          <div>
            <span class="badge">Hasil Review Editorial</span>
            <h1>{{ manuscript?.title || 'Naskah' }}</h1>
            <p class="author">{{ manuscript?.category }}</p>
          </div>

          <div class="reviewer">
            <p>Jumlah Reviewer</p>
            <h2>{{ reviews.length }}</h2>
            <span>Reviewer anonim</span>
          </div>
        </div>

        <!-- Ringkasan: Overall Score + Rekomendasi (tampil jika ada data dummy) -->
        <div v-if="overallScore !== null || recommendation !== null" class="summary-banner">
          <div class="summary-item" v-if="overallScore !== null">
            <span class="summary-label">Skor Keseluruhan</span>
            <span class="summary-value">{{ overallScore }} <small>/ 100</small></span>
          </div>
          <div class="summary-divider" v-if="overallScore !== null && recommendation !== null"></div>
          <div class="summary-item" v-if="recommendation !== null">
            <span class="summary-label">Rekomendasi</span>
            <span class="summary-value recommendation">{{ recommendation }}</span>
          </div>
        </div>

        <!-- Per-Reviewer Cards -->
        <div v-for="(rev, idx) in reviews" :key="idx" class="summary-grid" style="margin-top:20px">

          <div class="score-card">
            <p class="card-label">{{ rev.reviewer_alias ?? 'Reviewer Anonim' }}</p>

            <div class="score">
              {{ rev.score ?? '-' }}
              <span v-if="rev.score">/ 100</span>
            </div>

            <div class="progress">
              <div class="progress-fill" :style="{ width: rev.score ? rev.score + '%' : '0%' }"></div>
            </div>
          </div>

          <div class="status-card">
            <p class="card-label">Komentar Reviewer</p>
            <p style="margin-top:12px;line-height:1.7;color:#555">{{ rev.feedback || 'Tidak ada catatan.' }}</p>

            <div class="review-meta">
              <div class="meta-row">
                <span class="meta-label">Status Review</span>
                <span class="review-status-badge" :class="rev.status === 'completed' ? 'done' : 'pending'">
                  {{ rev.status === 'completed' ? '✔ Selesai' : rev.status ?? 'Dalam Proses' }}
                </span>
              </div>
              <div class="meta-row" v-if="rev.reviewed_at || rev.created_at">
                <span class="meta-label">Tanggal Review</span>
                <span class="meta-value">{{ formatDate(rev.reviewed_at ?? rev.created_at) }}</span>
              </div>
            </div>
          </div>

        </div>

        <div class="revision-box" v-if="manuscriptId">

          <div class="revision-icon">📄</div>

          <div class="revision-content">
            <h3>Kirim Revisi</h3>

            <p>
              Terapkan saran dari reviewer dan unggah revisi naskah Anda.
            </p>

            <router-link
              :to="`/revisi-naskah/${manuscriptId}`"
              class="editor-link"
            >
              Upload Revisi →
            </router-link>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '../../components/Sidebar.vue'
import Topbar from '../../components/Topbar.vue'
import { useApi } from '@/composables/useApi'

const props = defineProps({
  manuscriptId: {
    type: [String, Number],
    required: true
  }
})

const reviews = ref([])
const manuscript = ref(null)
const overallScore = ref(null)
const recommendation = ref(null)
const loading = ref(true)
const error = ref(null)
const { getReviews, getManuscriptDetail } = useApi()

onMounted(async () => {
  try {
    const [reviewRes, detailRes] = await Promise.allSettled([
      getReviews(props.manuscriptId),
      getManuscriptDetail(props.manuscriptId),
    ])

    if (reviewRes.status === 'fulfilled') {
      const data = reviewRes.value.data.data

      // Struktur dummy: data.reviews, data.overall_score, data.recommendation
      // Struktur real:  data langsung array
      if (Array.isArray(data)) {
        reviews.value = data
      } else if (data?.reviews) {
        reviews.value        = data.reviews
        overallScore.value   = data.overall_score ?? null
        recommendation.value = data.recommendation ?? null
      } else {
        reviews.value = []
      }
    } else {
      const err = reviewRes.reason
      if (err.response?.status === 403) error.value = 'Anda tidak memiliki akses ke naskah ini.'
      else if (err.response?.status === 404) error.value = 'Naskah tidak ditemukan.'
      else error.value = 'Gagal memuat hasil review.'
    }

    if (detailRes.status === 'fulfilled') {
      manuscript.value = detailRes.value.data.data ?? detailRes.value.data
    }
  } finally {
    loading.value = false
  }
})
const formatDate = (d) => d
  ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  : '-'
</script>

<style scoped>

.page{
  display:flex;
  background:#f5efe5;
  min-height:100vh;
}

.content{
  flex:1;
  padding:24px;
}

.state-msg{
  margin-top:30px;
  padding:20px;
  text-align:center;
  color:#888;
}

.state-msg.error{
  color:#c0392b;
  background:#fde8e8;
  border-radius:12px;
}

.review-container{
  background:white;
  border-radius:20px;
  padding:32px;
  margin-top:20px;
}

.review-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
}

.badge{
  display:inline-block;
  background:#dbe8c4;
  color:#536348;
  padding:8px 14px;
  border-radius:20px;
  font-size:13px;
}

.review-header h1{
  margin-top:16px;
  font-size:40px;
  color:#32261e;
}

.author{
  margin-top:10px;
  color:#777;
}

.reviewer{
  text-align:right;
}

.reviewer h2{
  margin:10px 0;
}

.summary-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.card-label{ font-weight:600; color:#555; margin-bottom:4px; }

.review-meta{ margin-top:20px; border-top:1px solid #f0ece7; padding-top:14px; display:flex; flex-direction:column; gap:10px; }
.meta-row{ display:flex; justify-content:space-between; align-items:center; font-size:14px; }
.meta-label{ color:#999; }
.meta-value{ color:#333; font-weight:500; }

.review-status-badge{ padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600; }
.review-status-badge.done{ background:#d7f0df; color:#4f8b61; }
.review-status-badge.pending{ background:#ffe5cf; color:#c56d2d; }

.score-card,
.status-card{
  border:1px solid #e5ddd4;
  border-radius:10px;
  padding:24px;
}

.score{
  font-size:48px;
  font-weight:700;
}

.score span{
  font-size:22px;
  color:#888;
}

.progress{
  height:8px;
  background:#eee;
  margin-top:20px;
  border-radius:10px;
}

.progress-fill{
  height:100%;
  background:#b88763;
  border-radius:10px;
  transition:width 0.5s;
}

.revision-box{
  margin-top:30px;
  border:1px solid #e5ddd4;
  padding:24px;
  display:flex;
  gap:24px;
  border-radius:12px;
}

.revision-icon{
  width:80px;
  height:80px;
  background:#e5e2dc;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:36px;
  border-radius:10px;
}

.editor-link{
  color:#32261e;
  font-weight:600;
  text-decoration:none;
  display:block;
  margin-top:10px;
}

</style>

<style scoped>
/* Tambahan style untuk summary banner overall score & rekomendasi */
.summary-banner {
  display: flex;
  gap: 0;
  border: 1px solid #e5ddd4;
  border-radius: 12px;
  margin-top: 24px;
  overflow: hidden;
}

.summary-item {
  flex: 1;
  padding: 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #faf7f3;
}

.summary-divider {
  width: 1px;
  background: #e5ddd4;
}

.summary-label {
  font-size: 13px;
  color: #999;
  font-weight: 500;
}

.summary-value {
  font-size: 28px;
  font-weight: 700;
  color: #32261e;
}

.summary-value small {
  font-size: 14px;
  color: #888;
  font-weight: 400;
}

.summary-value.recommendation {
  font-size: 16px;
  color: #b8630a;
  background: #fff3e0;
  padding: 6px 14px;
  border-radius: 20px;
  display: inline-block;
  width: fit-content;
}
</style>
