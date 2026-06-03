<template>
  <div class="page">
    <Sidebar />

    <div class="content">
      <Topbar
        title="Dokumen Administrasi"
        placeholder="Cari naskah..."
      />

      <div class="main-card">

        <h1>Dokumen Administrasi</h1>

        <p class="subtitle">
          Silakan unggah dokumen legalitas untuk melanjutkan proses verifikasi hibah buku Anda.
        </p>

        <div class="document-grid">

          <!-- KTP -->
          <div class="doc-card verified">

            <div class="card-header">
              <h2>Kartu Tanda Penduduk (KTP)</h2>

              <div class="action-buttons">
                <button class="secondary-btn">
                  Lihat File
                </button>

                <button class="primary-btn">
                  Ganti
                </button>
              </div>
            </div>

            <span class="status success">
              ✔ TERVERIFIKASI
            </span>

          </div>

          <!-- NPWP -->
          <div class="doc-card waiting">

            <h2>NPWP Pribadi</h2>

            <span class="status gray">
              BELUM DIUNGGAH
            </span>

            <div class="upload-area">
              ☁
              <p>Ketik untuk unggah dokumen</p>
            </div>

          </div>

          <!-- Surat Pernyataan -->
          <div class="doc-card rejected">

            <h2>Surat Pernyataan Keaslian</h2>

            <span class="status danger">
              DITOLAK
            </span>

            <div class="error-box">
              Foto kurang jelas atau buram. Mohon unggah ulang.
            </div>

            <div class="reupload-box">
              ⬆
              <p>Unggah ulang dokumen yang jelas</p>
            </div>

          </div>

          <!-- Portofolio -->
          <div class="doc-card pending">

            <h2>Portofolio Penulis</h2>

            <span class="status warning">
              MENUNGGU VERIFIKASI
            </span>

            <div class="file-row">

              <span>
                📄 Portofolio_LoomInk_2024.pdf
              </span>

              <button class="delete-btn">
                🗑
              </button>

            </div>

          </div>

        </div>

        <!-- Tips -->
        <div class="tips-box">

          <div class="tips-icon">
            💡
          </div>

          <div>
            <h2>Tips Unggah Dokumen</h2>

            <ul>
              <li>
                Gunakan resolusi minimal 150 DPI untuk pemindaian yang jelas.
              </li>

              <li>
                Format dokumen PDF, JPG, atau PNG (maksimal 5MB).
              </li>

              <li>
                Pastikan dokumen tidak terpotong dan mudah dibaca.
              </li>
            </ul>
          </div>

        </div>

      </div>

      <!-- Footer Action -->
      <div class="bottom-bar">

        <div class="progress-section">

          <p>
            Progres Unggahan
            <strong>3 / 4 Selesai</strong>
          </p>

          <div class="progress-track">
            <div class="progress-fill"></div>
          </div>

        </div>

        <div class="button-group">

          <button class="draft-btn">
            Simpan Draft
          </button>

          <button class="submit-btn">
            Kirim Semua Dokumen
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
  color:#3f2d24;
  margin-bottom:10px;
}

.subtitle{
  color:#666;
  margin-bottom:30px;
}

.document-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.doc-card{
  border-radius:12px;
  padding:20px;
  border:1px solid #ddd;
  min-height:220px;
}

.card-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
}

.action-buttons{
  display:flex;
  gap:10px;
}

.primary-btn{
  background:#5E4335;
  color:white;
  border:none;
  padding:10px 15px;
  border-radius:6px;
}

.secondary-btn{
  border:1px solid #ccc;
  background:white;
  padding:10px 15px;
  border-radius:6px;
}

.verified{
  border-left:4px solid #50703C;
}

.waiting{
  border-left:4px solid #C9B7A6;
}

.rejected{
  border-left:4px solid red;
}

.pending{
  border-left:4px solid #D59A63;
}

.status{
  display:inline-block;
  margin-top:10px;
  font-size:12px;
  padding:6px 12px;
  border-radius:20px;
}

.success{
  background:#e6f4e4;
  color:#50703C;
}

.gray{
  background:#efefef;
}

.danger{
  background:#ffe4e4;
  color:red;
}

.warning{
  background:#ffe7d2;
  color:#b96f29;
}

.upload-area{
  margin-top:20px;
  height:120px;
  border:2px dashed #d8c6b6;
  border-radius:8px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

.error-box{
  margin-top:15px;
  padding:10px;
  border:1px solid #ffb8b8;
  color:red;
  border-radius:8px;
}

.reupload-box{
  margin-top:15px;
  height:90px;
  border:2px dashed red;
  border-radius:8px;
  color:red;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
}

.file-row{
  margin-top:20px;
  border:1px solid #ddd;
  border-radius:8px;
  padding:12px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.delete-btn{
  border:none;
  background:none;
  cursor:pointer;
}

.tips-box{
  margin-top:30px;
  display:flex;
  gap:20px;
  border:1px solid #ddd;
  border-radius:12px;
  padding:25px;
}

.tips-icon{
  font-size:28px;
}

.tips-box ul{
  margin-top:10px;
}

.tips-box li{
  margin-bottom:8px;
}

.bottom-bar{
  background:white;
  margin-top:20px;
  padding:20px;
  border-radius:16px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.progress-section{
  width:300px;
}

.progress-track{
  height:8px;
  background:#ddd;
  border-radius:10px;
  overflow:hidden;
  margin-top:8px;
}

.progress-fill{
  width:75%;
  height:100%;
  background:#5E4335;
}

.button-group{
  display:flex;
  gap:15px;
}

.draft-btn{
  border:1px solid #ccc;
  background:white;
  padding:12px 22px;
  border-radius:8px;
}

.submit-btn{
  background:#5E4335;
  color:white;
  border:none;
  padding:12px 22px;
  border-radius:8px;
}
</style>
