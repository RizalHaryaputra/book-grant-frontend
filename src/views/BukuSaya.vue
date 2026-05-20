<template>
  <div class="buku-page">

    <!-- Sidebar -->
    <aside class="sidebar">

      <div>

        <div class="logo">
          <h1>Sistem PBL</h1>
          <p>Book Grant System</p>
        </div>

        <nav class="menu">

          <router-link to="/" class="menu-item">
            Dashboard
          </router-link>

          <router-link
            to="/buku-saya"
            class="menu-item active"
          >
            Buku Saya
          </router-link>

          <router-link
            to="/daftar-reviewer"
            class="menu-item"
          >
            Daftar Reviewer
          </router-link>

          <a href="#" class="menu-item">
            Hibah Disetujui
          </a>

          <a href="#" class="menu-item">
            Hasil Evaluasi
          </a>

          <a href="#" class="menu-item">
            Support
          </a>

          <a href="#" class="menu-item">
            Settings
          </a>

        </nav>

      </div>

      <button class="logout-btn">
        Log Out
      </button>

    </aside>

    <!-- Main -->
    <main class="main-content">

      <!-- Topbar -->
      <div class="topbar">

        <h2>Buku Saya</h2>

        <div class="search-box">
          <input
            type="text"
            placeholder="Cari Naskah..."
          />
        </div>

        <div class="profile">

          <div class="profile-text">
            <h4>Hafizh</h4>
            <p>Penulis</p>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt=""
          />

        </div>

      </div>

      <!-- Content -->
      <section class="library-card">

        <div class="library-header">

          <div>

            <h1>Perpustakaan Pribadi Anda</h1>

            <p>
              Kelola dan pantau semua manuskrip yang sedang Anda kerjakan.
              Ruang tenang untuk karya-karya hebat yang sedang tumbuh.
            </p>

          </div>

          <router-link to="/upload-draft" class="btn-upload">
  Mulai Manuskrip Baru
</router-link>

        </div>

        <!-- Tabs -->
        <div class="tabs">

          <button class="tab active-tab">
            Semua (12)
          </button>

          <button class="tab">
            Draf (5)
          </button>

          <button class="tab">
            Dalam Review (4)
          </button>

          <button class="tab">
            Diterbitkan (3)
          </button>

        </div>

        <!-- Grid -->
        <div class="book-grid">

          <!-- Card -->
          <div class="book-card">

            <div class="book-top">

              <img
                src="https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg"
                alt=""
              />

              <div class="book-info">

                <span class="status review">
                  DALAM REVIEW
                </span>

                <h3>Jaringan Komputer Dasar</h3>

                <p>Buku Ajar</p>

              </div>

            </div>

            <div class="progress-section">

              <div class="progress-header">

                <span>Progress Penulisan</span>
                <span>75%</span>

              </div>

              <div class="progress-bar">

                <div
                  class="progress-fill brown"
                  style="width:75%"
                ></div>

              </div>

            </div>

            <div class="book-footer">

              <span>Diupdate 2 hari lalu</span>

              <div class="avatars">

                <img
                  src="https://i.pravatar.cc/30?img=12"
                  alt=""
                />

                <img
                  src="https://i.pravatar.cc/30?img=15"
                  alt=""
                />

              </div>

            </div>

          </div>

          <!-- Card -->
          <div class="book-card">

            <div class="book-top">

              <img
                src="https://images-na.ssl-images-amazon.com/images/I/71XESK0l4-L.jpg"
                alt=""
              />

              <div class="book-info">

                <span class="status draft">
                  DRAF
                </span>

                <h3>Pemrograman Web Digital</h3>

                <p>Buku Ajar</p>

              </div>

            </div>

            <div class="progress-section">

              <div class="progress-header">

                <span>Progress Penulisan</span>
                <span>32%</span>

              </div>

              <div class="progress-bar">

                <div
                  class="progress-fill gray"
                  style="width:32%"
                ></div>

              </div>

            </div>

            <div class="book-footer">

              <span>Diupdate 5 jam lalu</span>

              <span>Belum ada reviewer</span>

            </div>

          </div>

          <!-- Card -->
          <div class="book-card">

            <div class="book-top">

              <img
                src="https://images-na.ssl-images-amazon.com/images/I/71g2ednj0JL.jpg"
                alt=""
              />

              <div class="book-info">

                <span class="status published">
                  DITERBITKAN
                </span>

                <h3>Struktur Data</h3>

                <p>Buku Referensi</p>

              </div>

            </div>

            <div class="progress-section">

              <div class="progress-header">

                <span>Status</span>
                <span>SELESAI</span>

              </div>

              <div class="progress-bar">

                <div
                  class="progress-fill green"
                  style="width:100%"
                ></div>

              </div>

            </div>

            <div class="book-footer">

              <span>1.2k Pembaca</span>

              <span>Lihat Statistik →</span>

            </div>

          </div>

          <!-- Card -->
          <div class="book-card">

            <div class="book-top">

              <img
                src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg"
                alt=""
              />

              <div class="book-info">

                <span class="status review">
                  DALAM REVIEW
                </span>

                <h3>Pemrograman Berorientasi</h3>

                <p>Buku Ajar</p>

              </div>

            </div>

            <div class="progress-section">

              <div class="progress-header">

                <span>Progress Penulisan</span>
                <span>90%</span>

              </div>

              <div class="progress-bar">

                <div
                  class="progress-fill brown"
                  style="width:90%"
                ></div>

              </div>

            </div>

            <div class="book-footer">

              <span>Diupdate 1 minggu lalu</span>

              <span class="review-tag">
                3 Review Baru
              </span>

            </div>

          </div>

          <!-- New Project -->
          <div class="new-project-card">

            <div class="plus-box">
              +
            </div>

            <h4>Mulai Proyek Baru</h4>

            <p>
              Tuangkan ide Anda ke dalam manuskrip digital baru sekarang.
            </p>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
</script>

<style scoped>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Segoe UI', sans-serif;
}

.buku-page{
  display:flex;
  min-height:100vh;
  background:#e8ded3;
}

/* Sidebar */

.sidebar{
  width:240px;
  background:#f5f1eb;
  padding:20px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.logo h1{
  font-size:38px;
  color:#3b2e28;
}

.logo p{
  font-size:14px;
  color:#666;
}

.menu{
  margin-top:40px;
}

.menu-item{
  display:block;
  padding:15px 18px;
  border-radius:12px;
  text-decoration:none;
  margin-bottom:12px;
  color:#6d5c4f;
  transition:0.3s;
}

.menu-item:hover{
  background:white;
}

.active{
  background:#6b564b;
  color:white;
}

.btn-upload{
  background: #6b4b3e;
  color: white;
  padding: 16px 28px;
  border-radius: 14px;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s;
}

.btn-upload:hover{
  background: #5a3d31;
}

.logout-btn{
  border:none;
  background:#5c4033;
  color:white;
  padding:16px;
  border-radius:12px;
  cursor:pointer;
  font-size:15px;
}

/* Main */

.main-content{
  flex:1;
  padding:20px;
}

/* Topbar */

.topbar{
  background:white;
  border-radius:18px;
  padding:18px 25px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:20px;
}

.topbar h2{
  font-size:30px;
}

.search-box{
  flex:1;
  margin:0 40px;
}

.search-box input{
  width:100%;
  padding:12px 18px;
  border:none;
  background:#f5f1eb;
  border-radius:12px;
  outline:none;
}

.profile{
  display:flex;
  align-items:center;
  gap:12px;
}

.profile-text{
  text-align:right;
}

.profile-text h4{
  font-size:14px;
}

.profile-text p{
  font-size:12px;
  color:gray;
}

.profile img{
  width:42px;
  height:42px;
  border-radius:50%;
}

/* Library */

.library-card{
  background:white;
  border-radius:22px;
  padding:30px;
}

.library-header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:30px;
}

.library-header h1{
  font-size:48px;
  margin-bottom:10px;
  color:#2f2f2f;
}

.library-header p{
  color:#666;
  line-height:1.6;
  width:700px;
}

.new-btn{
  background:#5b3d2d;
  color:white;
  text-decoration:none;
  padding:18px 26px;
  border-radius:14px;
  font-size:15px;
}

/* Tabs */

.tabs{
  display:flex;
  gap:30px;
  margin-bottom:30px;
  border-bottom:1px solid #ddd;
  padding-bottom:14px;
}

.tab{
  border:none;
  background:none;
  font-size:15px;
  cursor:pointer;
  color:#666;
}

.active-tab{
  color:#2f2f2f;
  border-bottom:3px solid #5b3d2d;
  padding-bottom:10px;
}

/* Grid */

.book-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}

/* Card */

.book-card{
  border:1px solid #e7e7e7;
  border-radius:16px;
  padding:20px;
}

.book-top{
  display:flex;
  gap:18px;
  margin-bottom:22px;
}

.book-top img{
  width:90px;
  height:120px;
  object-fit:cover;
  border-radius:10px;
}

.book-info h3{
  font-size:22px;
  line-height:1.4;
  margin-bottom:8px;
  color:#2f2f2f;
}

.book-info p{
  color:#777;
}

.status{
  display:inline-block;
  padding:7px 12px;
  border-radius:8px;
  font-size:11px;
  margin-bottom:16px;
}

.review{
  background:#ffe2cf;
  color:#c26b2d;
}

.draft{
  background:#ececec;
  color:#666;
}

.published{
  background:#d7f0df;
  color:#4f8b61;
}

/* Progress */

.progress-section{
  margin-bottom:20px;
}

.progress-header{
  display:flex;
  justify-content:space-between;
  margin-bottom:10px;
  font-size:14px;
}

.progress-bar{
  width:100%;
  height:8px;
  background:#ddd;
  border-radius:20px;
}

.progress-fill{
  height:100%;
  border-radius:20px;
}

.brown{
  background:#7c3f13;
}

.gray{
  background:#8e8e8e;
}

.green{
  background:#667b53;
}

/* Footer */

.book-footer{
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-size:13px;
  color:#777;
}

.avatars{
  display:flex;
}

.avatars img{
  width:28px;
  height:28px;
  border-radius:50%;
  margin-left:-8px;
}

.review-tag{
  background:#ffe2cf;
  padding:6px 10px;
  border-radius:8px;
  color:#7c3f13;
  font-size:11px;
}

/* New Project */

.new-project-card{
  border:2px dashed #d8c9bb;
  border-radius:16px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
  padding:40px;
}

.plus-box{
  width:70px;
  height:70px;
  border-radius:16px;
  background:#f3eee9;
  display:flex;
  justify-content:center;
  align-items:center;
  font-size:40px;
  color:#8d7a6d;
  margin-bottom:20px;
}

.new-project-card h4{
  font-size:24px;
  margin-bottom:12px;
  color:#4a3a31;
}

.new-project-card p{
  color:#777;
  line-height:1.6;
}

</style>
