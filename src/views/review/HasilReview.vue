<template>
  <div class="page">
    <Sidebar />

    <div class="content">

      <Topbar title="Hasil Review" />

      <div class="review-container">

        <div class="review-header">
          <div>
            <span class="badge">
              Hasil Review Editorial
            </span>

            <h1>Jaringan Komputer Dasar</h1>
            <p class="author">Oleh Budi</p>
          </div>

          <div class="reviewer">
            <p>Reviewer Utama</p>
            <h2>Budi Santoso</h2>
            <span>Senior Editor & Kritikus Sastra</span>
          </div>
        </div>

        <div class="summary-grid">

          <div class="score-card">
            <p>Skor Keseluruhan</p>

            <div class="score">
              4.5
              <span>/ 5.0</span>
            </div>

            <div class="progress">
              <div class="progress-fill"></div>
            </div>
          </div>

          <div class="status-card">
            <p>Status Keputusan</p>

            <h3>Disetujui dengan Catatan</h3>

            <span>
              Dianjurkan untuk revisi minor pada transisi bab
            </span>
          </div>

        </div>

        <hr />

        <section>
          <h2 class="section-title">
            Ringkasan Ulasan
          </h2>

          <div class="summary-box">
            <p>
              Naskah "Jaringan Komputer Dasar" menunjukkan kedalaman
              materi yang solid dan terstruktur dengan baik sebagai
              buku ajar untuk kalangan mahasiswa teknik informatika
              maupun sistem informasi.
            </p>

            <p>
              Penggunaan ilustrasi diagram jaringan pada setiap bab
              sangat membantu pemahaman pembaca yang baru mengenal
              dunia jaringan komputer.
            </p>
          </div>
        </section>

        <section>
          <h2 class="section-title">
            Komentar Mendalam
          </h2>

          <div class="review-grid">

            <div class="rating">
              <span>STRUKTUR & SISTEMATIKA</span>
              <h3>4.2 ★★★★☆</h3>
            </div>

            <div class="review-text">
              Struktur penulisan antar bab sudah runtut dan mengikuti
              alur pembelajaran yang logis. Namun perpindahan antar
              topik masih dapat diperhalus agar pembaca lebih mudah
              mengikuti isi materi.
            </div>

            <div class="rating">
              <span>KEDALAMAN MATERI</span>
              <h3>4.8 ★★★★★</h3>
            </div>

            <div class="review-text">
              Pembahasan topik-topik inti seperti IP, subnetting,
              routing dan protokol jaringan dijelaskan secara
              komprehensif dengan contoh yang relevan.
            </div>

            <div class="rating">
              <span>BAHASA & PENYAJIAN</span>
              <h3>4.6 ★★★★★</h3>
            </div>

            <div class="review-text">
              Bahasa yang digunakan lugas, teknis namun tetap mudah
              dipahami oleh pembaca pemula.
            </div>

            <div class="rating">
              <span>POTENSI KOMERSIAL</span>
              <h3>4.4 ★★★★☆</h3>
            </div>

            <div class="review-text">
              Buku ini memiliki potensi adopsi yang tinggi sebagai
              referensi wajib pada mata kuliah Jaringan Komputer.
            </div>

          </div>
        </section>

        <div class="recommendation-box">

          <h2>
            Rekomendasi & Langkah Selanjutnya
          </h2>

          <div class="recommend-item">
            <div class="number">1</div>

            <div>
              <h4>Perbaikan Transisi Antar Bab</h4>

              <p>
                Tambahkan subbab ringkasan dan pratinjau di akhir
                setiap bab.
              </p>
            </div>
          </div>

          <div class="recommend-item">
            <div class="number">2</div>

            <div>
              <h4>Penambahan Contoh Kasus Praktis</h4>

              <p>
                Perbanyak studi kasus nyata dan latihan berbasis
                skenario jaringan.
              </p>
            </div>
          </div>

          <div class="recommend-item">
            <div class="number">3</div>

            <div>
              <h4>Sinopsis Pemasaran</h4>

              <p>
                Susun sinopsis ringkas yang menonjolkan keunggulan
                buku sebagai referensi komprehensif.
              </p>
            </div>
          </div>

          <div class="action-buttons">
            <button class="primary-btn">
              Unduh Laporan Lengkap (PDF)
            </button>

            <button class="secondary-btn">
              Hubungi Reviewer
            </button>
          </div>

        </div>

        <div class="revision-box">

          <div class="revision-icon">
            📄
          </div>

          <div class="revision-content">
            <h3>Lihat Draf Revisi</h3>

            <p>
              Buka editor untuk mulai menerapkan saran revisi
              dari reviewer langsung pada naskah Anda.
            </p>

            <router-link
              to="/upload-revisi"
              class="editor-link"
            >
              Buka Editor Naskah →
            </router-link>
          </div>

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
  background:#f5efe5;
  min-height:100vh;
}

.content{
  flex:1;
  padding:24px;
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
  font-size:48px;
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
  margin-top:30px;
}

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
  width:90%;
  height:100%;
  background:#b88763;
  border-radius:10px;
}

.section-title{
  margin-top:40px;
  margin-bottom:20px;
  color:#32261e;
}

.summary-box{
  border:1px solid #e5ddd4;
  padding:24px;
  line-height:1.9;
}

.review-grid{
  display:grid;
  grid-template-columns:260px 1fr;
  gap:24px;
}

.rating span{
  font-size:11px;
  letter-spacing:2px;
  color:#8d8378;
}

.rating h3{
  margin-top:10px;
  font-size:30px;
}

.review-text{
  background:#f7f4ef;
  padding:24px;
  line-height:1.8;
}

.recommendation-box{
  background:#eef4e8;
  padding:30px;
  border-radius:10px;
  margin-top:40px;
}

.recommend-item{
  display:flex;
  gap:18px;
  margin-top:24px;
}

.number{
  width:30px;
  height:30px;
  border-radius:50%;
  background:#60724e;
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
}

.action-buttons{
  display:flex;
  gap:16px;
  margin-top:30px;
}

.primary-btn{
  background:#4f2f1d;
  color:white;
  border:none;
  padding:14px 24px;
  cursor:pointer;
}

.secondary-btn{
  background:white;
  border:1px solid #60724e;
  color:#60724e;
  padding:14px 24px;
  cursor:pointer;
}

.revision-box{
  margin-top:30px;
  border:1px solid #e5ddd4;
  padding:24px;
  display:flex;
  gap:24px;
}

.revision-icon{
  width:100px;
  height:120px;
  background:#e5e2dc;
  display:flex;
  align-items:center;
  justify-content:center;
  font-size:42px;
}

.editor-link{
  color:#32261e;
  font-weight:600;
  text-decoration:none;
}

</style>
