<template>
  <div class="reviewer-page">

    <Sidebar />

    <main class="main-content">

      <Topbar title="Daftar Reviewer" placeholder="Cari Reviewer..." />

      <section class="content-card">

        <h1>Daftar Reviewer</h1>

        <p class="description">
          Temukan dan kelola reviewer profesional untuk manuskrip Anda.
          Tingkatkan kualitas tulisan Anda dengan umpan balik dari para ahli di bidangnya.
        </p>

        <!-- Filter -->
        <div class="filter-row">
          <div class="categories">
            <button class="category active-category">Semua Kategori</button>
            <button class="category">Fiksi Sejarah</button>
            <button class="category">Esai Budaya</button>
            <button class="category">Akademik</button>
          </div>
          <button class="advanced-filter">Filter Lanjutan</button>
        </div>

        <!-- Reviewer Grid -->
        <div class="reviewer-grid">

          <div class="reviewer-card" v-for="r in reviewers" :key="r.id">
            <div class="reviewer-top">
              <img :src="`https://i.pravatar.cc/70?img=${r.img}`" alt="" />
              <div class="rating">
                ★ {{ r.rating }}
                <span>{{ r.total }} REVIEW</span>
              </div>
            </div>
            <h3>{{ r.name }}</h3>
            <p class="job">{{ r.specialty }}</p>
            <div class="tags">
              <span :class="r.available ? 'green-tag' : 'gray-tag'">
                {{ r.available ? 'TERSEDIA' : 'SIBUK' }}
              </span>
              <span class="gray-tag">{{ r.role }}</span>
            </div>
            <button class="profile-btn">Lihat Profil</button>
            <button class="request-btn">Kirim Permintaan</button>
          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'

const reviewers = [
  { id: 1, img: 12, name: 'Budi Santoso',    rating: 4.9, total: 124, specialty: 'Buku Ajar',       available: true,  role: 'AKADEMISI' },
  { id: 2, img: 32, name: 'Siti Rahayu',     rating: 4.8, total: 89,  specialty: 'Buku Referensi',  available: false, role: 'EDITOR SENIOR' },
  { id: 3, img: 15, name: 'Ahmad Fauzi',     rating: 5.0, total: 42,  specialty: 'Buku Ajar',       available: true,  role: 'PENULIS AKTIF' },
  { id: 4, img: 25, name: 'Dewi Kusuma',     rating: 4.7, total: 215, specialty: 'Buku Ajar',       available: true,  role: 'AHLI AKADEMIK' },
  { id: 5, img: 53, name: 'Rian Prasetyo',   rating: 4.5, total: 67,  specialty: 'Buku Referensi',  available: false, role: 'JURNALIS' },
  { id: 6, img: 47, name: 'Lina Suharto',    rating: 4.9, total: 31,  specialty: 'Buku Referensi',  available: true,  role: 'KRITIKUS SASTRA' },
]
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

.main-content{ flex:1; padding:20px; }

.content-card{
  background:white;
  border-radius:20px;
  padding:25px;
}

.content-card h1{ font-size:42px; margin-bottom:10px; color:#2f2f2f; }
.description{ color:#666; line-height:1.6; margin-bottom:25px; }

.filter-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
}

.categories{ display:flex; gap:12px; }

.category{
  border:none;
  padding:10px 18px;
  border-radius:12px;
  background:#f3f3f3;
  cursor:pointer;
}

.active-category{ background:#f1e6d9; color:#5c4033; }

.advanced-filter{
  border:none;
  padding:12px 20px;
  border-radius:12px;
  background:#f3f3f3;
  cursor:pointer;
}

.reviewer-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

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

.rating{ font-size:14px; font-weight:600; color:#4a2f1f; text-align:right; }
.rating span{ display:block; font-size:11px; color:#777; margin-top:5px; }

.reviewer-card h3{ font-size:28px; margin-bottom:8px; color:#2f2f2f; }
.job{ color:#777; margin-bottom:18px; }

.tags{ display:flex; gap:10px; margin-bottom:20px; }

.green-tag{ background:#d7f0df; color:#4f8b61; padding:6px 10px; border-radius:8px; font-size:11px; }
.gray-tag{ background:#ececec; color:#666; padding:6px 10px; border-radius:8px; font-size:11px; }

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
  height:48px;
  display:flex;
  justify-content:center;
  align-items:center;
  border:1px solid #d8d8d8;
  border-radius:12px;
  background:#fff;
  color:#6d5c4f;
  font-size:15px;
  font-weight:500;
  cursor:pointer;
  transition:0.2s;
}

.request-btn:hover{ background:#f8f8f8; }

</style>
