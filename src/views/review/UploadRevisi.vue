<template>
  <div class="page">
    <Sidebar />

    <div class="content">
      <Topbar
        title="Buku Editor Naskah"
        placeholder="Cari naskah..."
      />

      <div class="main-card">

        <h1>Upload Revisi Naskah</h1>

        <p class="subtitle">
          Unggah draft terbaru Anda yang telah diperbaiki berdasarkan catatan reviewer.
        </p>

        <!-- Info Card -->
        <div class="info-grid">

          <div class="info-card">

            <div class="status-label">
              STATUS TERAKHIR
            </div>

            <div class="book-header">

              <h2>Jaringan Komputer Dasar</h2>

              <span class="review-badge">
                Menunggu Revisi
              </span>

            </div>

            <p class="description">
              Draft sebelumnya telah ditinjau oleh Bambang S.
              pada 12 Oktober 2023. Terdapat beberapa catatan
              kritis mengenai Transisi Bab dan yang lain lain.
            </p>

            <router-link
              to="/hasil-review"
              class="review-link"
            >
              🔍 Lihat Hasil Review Terakhir
            </router-link>

          </div>

          <div class="version-card">

            <div class="version-icon">
              🗂
            </div>

            <h3>Versi Berikutnya</h3>

            <p>
              Draf ini akan secara otomatis disimpan
              sebagai Versi 1.2 dalam sistem arsip.
            </p>

          </div>

        </div>

        <!-- Upload Area -->
        <div class="upload-box">

          <div class="upload-icon">
            📤
          </div>

          <h2>Seret & Lepas Naskah</h2>

          <p>
            atau klik untuk memilih file dari komputer Anda
          </p>

          <div class="file-info">
            PDF, DOCX • Maks. 25MB
          </div>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            class="file-input"
          />

        </div>

        <!-- Catatan -->
        <div class="note-section">

          <div class="note-header">

            <label>
              Catatan Revisi
            </label>

            <small>
              Opsional namun sangat disarankan
            </small>

          </div>

          <textarea
            placeholder="Contoh: Memperkuat motivasi tokoh utama di Bab 3, memperbaiki alur di bagian penutup, dan menyesuaikan diksi sesuai masukan reviewer."
          ></textarea>

        </div>

        <!-- Action -->
        <div class="action-section">

          <button class="draft-btn">
            Simpan sebagai Draft
          </button>

          <button
            class="submit-btn"
            @click="$router.push('/dokumen-administrasi')"
          >
            ▶ Kirim Revisi Sekarang
          </button>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue'
import Topbar from '../../components/Topbar.vue'
</script>

<style scoped>
.page{
  display:flex;
  min-height:100vh;
  background:#F6F1E6;
}

.content{
  flex:1;
  padding:20px;
}

.main-card{
  background:white;
  border-radius:20px;
  padding:30px;
}

h1{
  color:#3F2D24;
  margin-bottom:10px;
}

.subtitle{
  color:#777;
  margin-bottom:30px;
}

.info-grid{
  display:grid;
  grid-template-columns:2fr 1fr;
  gap:20px;
  margin-bottom:25px;
}

.info-card,
.version-card{
  border:1px solid #ddd;
  border-radius:12px;
  padding:20px;
}

.status-label{
  font-size:12px;
  color:#888;
  margin-bottom:10px;
}

.book-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.book-header h2{
  margin:0;
  color:#3F2D24;
}

.review-badge{
  background:#F6E6DA;
  color:#C67D47;
  padding:6px 10px;
  border-radius:20px;
  font-size:12px;
}

.description{
  margin:20px 0;
  line-height:1.7;
  color:#555;
}

.review-link{
  color:#3F2D24;
  font-weight:600;
  text-decoration:none;
}

.version-icon{
  font-size:28px;
  margin-bottom:10px;
}

.version-card h3{
  margin-bottom:10px;
}

.version-card p{
  color:#666;
  line-height:1.6;
}

.upload-box{
  border:2px dashed #D8C6B6;
  border-radius:12px;
  padding:60px 20px;
  text-align:center;
  margin-bottom:30px;
  background:#FCFAF7;
}

.upload-icon{
  font-size:40px;
  margin-bottom:10px;
}

.upload-box h2{
  color:#3F2D24;
  margin-bottom:10px;
}

.upload-box p{
  color:#777;
}

.file-info{
  margin-top:15px;
  color:#999;
  font-size:14px;
}

.file-input{
  margin-top:20px;
}

.note-section{
  margin-top:20px;
}

.note-header{
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
}

.note-header label{
  font-weight:600;
  color:#3F2D24;
}

.note-header small{
  color:#999;
}

textarea{
  width:100%;
  min-height:140px;
  border:1px solid #ddd;
  border-radius:10px;
  padding:15px;
  resize:none;
  font-family:inherit;
}

.action-section{
  display:flex;
  justify-content:flex-end;
  gap:15px;
  margin-top:30px;
  padding-top:20px;
  border-top:1px solid #eee;
}

.draft-btn{
  border:1px solid #BDBDBD;
  background:white;
  padding:12px 20px;
  border-radius:8px;
  cursor:pointer;
}

.submit-btn{
  background:#5E4335;
  color:white;
  border:none;
  padding:12px 20px;
  border-radius:8px;
  cursor:pointer;
}

.submit-btn:hover{
  opacity:.9;
}
</style>
