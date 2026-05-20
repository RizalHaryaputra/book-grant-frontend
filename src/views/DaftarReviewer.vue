<template>
  <div class="reviewer-page">

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

          <router-link to="/buku-saya" class="menu-item">
  Buku Saya
</router-link>

          <a href="#" class="menu-item active">
            Daftar Reviewer
          </a>

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

        <h2>Daftar Reviewer</h2>

        <div class="search-box">
          <input
            type="text"
            placeholder="Cari Reviewer..."
          />
        </div>

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

      <!-- Content -->
      <section class="content-card">

        <h1>Daftar Reviewer</h1>

        <p class="description">
          Temukan dan kelola reviewer profesional untuk manuskrip Anda.
          Tingkatkan kualitas tulisan Anda dengan umpan balik dari para ahli di bidangnya.
        </p>

        <!-- Filter -->
        <div class="filter-row">

          <div class="categories">

            <button class="category active-category">
              Semua Kategori
            </button>

            <button class="category">
              Fiksi Sejarah
            </button>

            <button class="category">
              Esai Budaya
            </button>

            <button class="category">
              Akademik
            </button>

          </div>

          <button class="advanced-filter">
            Filter Lanjutan
          </button>

        </div>

        <!-- Reviewer Grid -->
        <div class="reviewer-grid">

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=12"
                alt=""
              />

              <div class="rating">
                ★ 4.9
                <span>124 REVIEW</span>
              </div>

            </div>

            <h3>Budi Santoso</h3>

            <p class="job">
              Buku Ajar
            </p>

            <div class="tags">

              <span class="green-tag">
                TERSEDIA
              </span>

              <span class="gray-tag">
                AKADEMISI
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=32"
                alt=""
              />

              <div class="rating">
                ★ 4.8
                <span>89 REVIEW</span>
              </div>

            </div>

            <h3>Siti</h3>

            <p class="job">
              Buku Referensi
            </p>

            <div class="tags">

              <span class="gray-tag">
                SIBUK
              </span>

              <span class="gray-tag">
                EDITOR SENIOR
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=15"
                alt=""
              />

              <div class="rating">
                ★ 5.0
                <span>42 REVIEW</span>
              </div>

            </div>

            <h3>Budi santosoo</h3>

            <p class="job">
              Buku Ajar
            </p>

            <div class="tags">

              <span class="green-tag">
                TERSEDIA
              </span>

              <span class="gray-tag">
                PENULIS AKTIF
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=25"
                alt=""
              />

              <div class="rating">
                ★ 4.7
                <span>215 REVIEW</span>
              </div>

            </div>

            <h3>Sitii</h3>

            <p class="job">
              Buku Ajar
            </p>

            <div class="tags">

              <span class="green-tag">
                TERSEDIA
              </span>

              <span class="gray-tag">
                AHLI AKADEMIK
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=53"
                alt=""
              />

              <div class="rating">
                ★ 4.5
                <span>67 REVIEW</span>
              </div>

            </div>

            <h3>Budii santoso</h3>

            <p class="job">
              Buku Referensi
            </p>

            <div class="tags">

              <span class="gray-tag">
                SIBUK
              </span>

              <span class="gray-tag">
                JURNALIS
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

          <!-- Card -->
          <div class="reviewer-card">

            <div class="reviewer-top">

              <img
                src="https://i.pravatar.cc/70?img=47"
                alt=""
              />

              <div class="rating">
                ★ 4.9
                <span>31 REVIEW</span>
              </div>

            </div>

            <h3>Siiti</h3>

            <p class="job">
              Buku Referensi
            </p>

            <div class="tags">

              <span class="green-tag">
                TERSEDIA
              </span>

              <span class="gray-tag">
                KRITIKUS SASTRA
              </span>

            </div>

            <button class="profile-btn">
              Lihat Profil
            </button>

            <button class="request-btn">
              Kirim Permintaan
            </button>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
</script>

<style scoped>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Segoe UI', sans-serif;
}

.reviewer-page{
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
  box-shadow:0 2px 10px rgba(0,0,0,0.05);
}

.topbar h2{
  font-size:30px;
  color:#2f2f2f;
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

/* Content */

.content-card{
  background:white;
  border-radius:20px;
  padding:25px;
}

.content-card h1{
  font-size:42px;
  margin-bottom:10px;
  color:#2f2f2f;
}

.description{
  color:#666;
  line-height:1.6;
  margin-bottom:25px;
}

/* Filter */

.filter-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
}

.categories{
  display:flex;
  gap:12px;
}

.category{
  border:none;
  padding:10px 18px;
  border-radius:12px;
  background:#f3f3f3;
  cursor:pointer;
}

.active-category{
  background:#f1e6d9;
  color:#5c4033;
}

.advanced-filter{
  border:none;
  padding:12px 20px;
  border-radius:12px;
  background:#f3f3f3;
  cursor:pointer;
}

/* Grid */

.reviewer-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

/* Card */

.reviewer-card{
  border:1px solid #e6e6e6;
  border-radius:16px;
  padding:20px;
}

.reviewer-top{
  display:flex;
  justify-content:space-between;
  margin-bottom:20px;
}

.reviewer-top img{
  width:70px;
  height:70px;
  border-radius:14px;
  object-fit:cover;
}

.rating{
  font-size:14px;
  font-weight:600;
  color:#4a2f1f;
  text-align:right;
}

.rating span{
  display:block;
  font-size:11px;
  color:#777;
  margin-top:5px;
}

.reviewer-card h3{
  font-size:36px;
  margin-bottom:8px;
  color:#2f2f2f;
}

.job{
  color:#777;
  margin-bottom:18px;
}

.tags{
  display:flex;
  gap:10px;
  margin-bottom:20px;
}

.green-tag{
  background:#d7f0df;
  color:#4f8b61;
  padding:6px 10px;
  border-radius:8px;
  font-size:11px;
}

.gray-tag{
  background:#ececec;
  color:#666;
  padding:6px 10px;
  border-radius:8px;
  font-size:11px;
}

.profile-btn{
  width:100%;
  border:none;
  background:#3d2415;
  color:white;
  padding:14px;
  border-radius:10px;
  margin-bottom:12px;
  cursor:pointer;
}

.request-btn{
  width:100%;
  border:1px solid #b5b5b5;
  background:white;
  color:#666;
  padding:14px;
  border-radius:10px;
  cursor:pointer;
}

</style>
