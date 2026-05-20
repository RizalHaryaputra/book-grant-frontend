<template>
  <div class="dashboard">

    <!-- Sidebar -->
    <aside class="sidebar">

      <div>

        <div class="logo">
          <h1>Sistem PBL</h1>
          <p>Book Grant System</p>
        </div>

        <nav class="menu">

          <router-link to="/" class="menu-item active">
  Dashboard
</router-link>
          <router-link to="/buku-saya" class="menu-item">
  Buku Saya
</router-link>

          <router-link to="/daftar-reviewer" class="menu-item">
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

    <!-- Main Content -->
    <main class="main-content">

      <!-- Topbar -->
      <div class="topbar">

        <h2>Selamat Datang, Penulis!</h2>

        <div class="profile">

          <div class="profile-text">
            <h4>Hafizh</h4>
            <p>Penulis</p>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
          />

        </div>

      </div>

      <!-- Statistik -->
      <div class="stats-container">

        <div class="stat-card">

          <div class="badge green">
            Target 80%
          </div>

          <p>Kata Ditulis</p>

          <h1>84,200</h1>

        </div>

        <div class="stat-card">

          <div class="badge orange">
            Aktif
          </div>

          <p>Hibah Disetujui</p>

          <h1>03</h1>

        </div>

        <div class="stat-card">

          <div class="badge green">
            +2 Bulan Ini
          </div>

          <p>Total Manuskrip</p>

          <h1>12</h1>

        </div>

        <button class="new-book-btn">
          + Mulai Manuskrip Baru
        </button>

      </div>

      <!-- Proyek Aktif -->
      <section class="project-section">

        <div class="section-header">

          <h3>Proyek Aktif</h3>

          <span>Lihat Semua</span>

        </div>

        <div class="project-container">

          <!-- Card -->
          <div class="project-card">

            <h4>Jaringan Komputer Dasar</h4>

            <p>Buku Ajar • Bab 12 dari 20</p>

            <div class="progress-header">
              <span>Progress Penulisan</span>
              <span>65%</span>
            </div>

            <div class="progress-bar">

              <div
                class="progress-fill brown"
                style="width:65%"
              ></div>

            </div>

          </div>

          <!-- Card -->
          <div class="project-card">

            <h4>Aplikasi Mobile</h4>

            <p>Buku Ajar • Draft Final</p>

            <div class="progress-header">
              <span>Progress Penulisan</span>
              <span>92%</span>
            </div>

            <div class="progress-bar">

              <div
                class="progress-fill green-fill"
                style="width:92%"
              ></div>

            </div>

          </div>

        </div>

      </section>

      <!-- Table -->
      <section class="table-section">

        <div class="section-header">

          <h3>Manuskrip Terbaru</h3>

          <button class="filter-btn">
            Filter
          </button>

        </div>

        <table>

          <thead>

            <tr>

              <th>JUDUL MANUSKRIP</th>
              <th>KATEGORI</th>
              <th>STATUS</th>
              <th>TERAKHIR DIUBAH</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Pemrograman Berorientasi</td>
              <td>Buku Ajar</td>

              <td>
                <span class="status green-status">
                  Dalam Review
                </span>
              </td>

              <td>24 Okt 2023</td>

            </tr>

            <tr>

              <td>Pemrograman Web</td>
              <td>Buku Ajar</td>

              <td>
                <span class="status gray-status">
                  Draft
                </span>
              </td>

              <td>21 Okt 2023</td>

            </tr>

            <tr>

              <td>Struktur Data</td>
              <td>Buku Referensi</td>

              <td>
                <span class="status green-status">
                  Diterbitkan
                </span>
              </td>

              <td>15 Okt 2023</td>

            </tr>

          </tbody>

        </table>

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

.dashboard{
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
  font-size:36px;
  color:#3b2e28;
}

.logo p{
  color:#666;
  margin-top:5px;
  font-size:14px;
}

.menu{
  margin-top:40px;
}

.menu-item{
  display:block;
  padding:14px 18px;
  border-radius:12px;
  margin-bottom:10px;
  text-decoration:none;
  color:#6a5a4d;
  transition:0.3s;
}

.menu-item:hover{
  background:white;
}

.active{
  background:#6a5144;
  color:white;
}

.logout-btn{
  background:#5c4033;
  color:white;
  border:none;
  padding:15px;
  border-radius:12px;
  cursor:pointer;
  font-size:15px;
}

/* Main */

.main-content{
  flex:1;
  padding:25px;
}

/* Topbar */

.topbar{
  background:white;
  border-radius:18px;
  padding:18px 25px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
  box-shadow:0 2px 10px rgba(0,0,0,0.05);
}

.topbar h2{
  font-size:26px;
  color:#2f2f2f;
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

/* Statistik */

.stats-container{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
  margin-bottom:25px;
}

.stat-card{
  background:white;
  border-radius:20px;
  padding:25px;
  box-shadow:0 2px 10px rgba(0,0,0,0.04);
}

.stat-card p{
  margin-top:18px;
  color:#666;
}

.stat-card h1{
  margin-top:10px;
  font-size:50px;
  color:#1f2230;
}

.badge{
  display:inline-block;
  padding:6px 12px;
  border-radius:20px;
  font-size:12px;
}

.green{
  background:#d7f0df;
  color:#4f8b61;
}

.orange{
  background:#ffe5cf;
  color:#c56d2d;
}

.new-book-btn{
  background:#8b4a16;
  color:white;
  border:none;
  border-radius:16px;
  cursor:pointer;
  font-size:16px;
}

/* Project */

.project-section{
  background:white;
  border-radius:20px;
  padding:20px;
  margin-bottom:25px;
}

.section-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.section-header h3{
  font-size:32px;
  color:#2f2f2f;
}

.section-header span{
  color:#8b4a16;
  cursor:pointer;
}

.project-container{
  display:flex;
  gap:20px;
}

.project-card{
  flex:1;
  background:#f8f5f1;
  border-radius:20px;
  padding:25px;
}

.project-card h4{
  font-size:26px;
  margin-bottom:10px;
}

.project-card p{
  color:gray;
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
  height:10px;
  background:#ddd;
  border-radius:20px;
}

.progress-fill{
  height:100%;
  border-radius:20px;
}

.brown{
  background:#8b4a16;
}

.green-fill{
  background:#6b7a55;
}

/* Table */

.table-section{
  background:white;
  border-radius:20px;
  padding:20px;
}

.filter-btn{
  border:none;
  background:#f3f3f3;
  padding:10px 18px;
  border-radius:12px;
  cursor:pointer;
}

table{
  width:100%;
  border-collapse:collapse;
}

thead{
  background:#f6f2ed;
}

th{
  padding:18px;
  text-align:left;
  color:#777;
  font-size:13px;
}

td{
  padding:22px 18px;
  border-bottom:1px solid #eee;
}

.status{
  padding:6px 12px;
  border-radius:20px;
  font-size:12px;
}

.green-status{
  background:#d7f0df;
  color:#4f8b61;
}

.gray-status{
  background:#ececec;
  color:#666;
}

</style>
