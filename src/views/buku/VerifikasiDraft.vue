<template>
  <div class="verifikasi-page">

    <!-- Sidebar -->
    <aside class="sidebar">

      <div>

        <div class="logo">
          <h1>Sistem PBL</h1>
          <p>Book Grant System</p>
        </div>

        <nav class="menu">

          <router-link
            to="/"
            class="menu-item"
          >
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

        <div class="breadcrumb">
          Drafts > Unggah Draf Awal
        </div>

        <div class="top-right">

          <input
            type="text"
            placeholder="Cari naskah..."
          />

          <img
            src="https://i.pravatar.cc/40"
            alt=""
          />

        </div>

      </div>

      <!-- Card -->
      <section class="verify-card">

        <span class="mini-title">
          SATU LANGKAH LAGI
        </span>

        <h1>
          Sedang memeriksa kelengkapan naskah Anda...
        </h1>

        <p class="desc">
          Sistem kami sedang memvalidasi struktur,
          metadata, dan format dokumen untuk memastikan
          standar kualitas Loom & Ink terpenuhi.
        </p>

        <!-- Validation Box -->
        <div class="validation-box">

          <!-- Item -->
          <div class="validation-item active-item">

            <div class="icon">
              📄
            </div>

            <h3>Status: Memproses...</h3>

            <h2>Jenis File</h2>

            <p>
              Memastikan format dokumen
              adalah .pdf atau .docx.
            </p>

            <span>Status: Pemindaian...</span>

          </div>

          <!-- Item -->
          <div class="validation-item">

            <div class="icon">
              💾
            </div>

            <h2>Ukuran File</h2>

            <p>
              Maksimum kapasitas berkas
              25MB untuk optimasi.
            </p>

            <span>Status: Menunggu...</span>

          </div>

          <!-- Item -->
          <div class="validation-item">

            <div class="icon">
              ⚙
            </div>

            <h2>Metadata</h2>

            <p>
              Verifikasi judul, sinopsis,
              dan kategori naskah.
            </p>

            <span>Status: Menunggu...</span>

          </div>

        </div>

        <!-- Progress -->
        <div class="progress-bar">

          <div class="progress-fill"></div>

        </div>

        <!-- Button -->
        <router-link
          to="/"
          class="dashboard-btn"
        >
          Lanjutkan ke Dashboard
        </router-link>

        <p class="bottom-text">
          Proses verifikasi biasanya memakan waktu kurang dari 10 detik.
        </p>

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

.verifikasi-page{
  display:flex;
  min-height:100vh;
  background:#e9dfd2;
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
  font-size:14px;
}

.menu{
  margin-top:40px;
}

.menu-item{
  display:block;
  text-decoration:none;
  padding:15px 18px;
  border-radius:12px;
  margin-bottom:12px;
  color:#6a594d;
}

.menu-item:hover{
  background:white;
}

.active{
  background:#6a564a;
  color:white;
}

.logout-btn{
  background:#5a4031;
  color:white;
  border:none;
  padding:16px;
  border-radius:12px;
  cursor:pointer;
}

/* Main */

.main-content{
  flex:1;
  padding:20px;
}

/* Topbar */

.topbar{
  background:#f6f1e9;
  padding:18px 25px;
  border-radius:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.breadcrumb{
  color:#75685e;
}

.top-right{
  display:flex;
  align-items:center;
  gap:15px;
}

.top-right input{
  padding:12px 18px;
  border-radius:12px;
  border:1px solid #ddd;
  width:260px;
}

.top-right img{
  width:42px;
  height:42px;
  border-radius:50%;
}

/* Card */

.verify-card{
  background:white;
  border-radius:22px;
  padding:50px;
  text-align:center;
}

.mini-title{
  letter-spacing:5px;
  color:#7f7b72;
  font-size:14px;
}

.verify-card h1{
  font-size:56px;
  color:#35261d;
  width:850px;
  margin:20px auto;
  line-height:1.3;
}

.desc{
  color:#666;
  width:850px;
  margin:0 auto 40px;
  line-height:1.8;
  font-size:18px;
}

/* Validation */

.validation-box{
  border:1px solid #e1d6ca;
  border-radius:16px;
  padding:30px;
  display:flex;
  gap:20px;
  justify-content:center;
  margin-bottom:35px;
}

.validation-item{
  width:260px;
  border:1px solid #e5d8cc;
  border-radius:12px;
  padding:25px;
  text-align:left;
  background:#fff;
}

.active-item{
  border-left:4px solid #5d7048;
}

.icon{
  font-size:28px;
  margin-bottom:15px;
}

.validation-item h3{
  font-size:16px;
  color:#60774c;
  margin-bottom:20px;
}

.validation-item h2{
  font-size:30px;
  color:#36261d;
  margin-bottom:15px;
}

.validation-item p{
  color:#666;
  line-height:1.7;
  margin-bottom:20px;
}

.validation-item span{
  color:#999;
  font-size:13px;
}

/* Progress */

.progress-bar{
  width:100%;
  max-width:900px;
  height:8px;
  background:#ddd;
  border-radius:20px;
  margin:0 auto 40px;
}

.progress-fill{
  width:15%;
  height:100%;
  background:#647b50;
  border-radius:20px;
}

/* Button */

.dashboard-btn{
  display:inline-block;
  background:#4a2c1f;
  color:white;
  text-decoration:none;
  padding:18px 45px;
  border-radius:10px;
  margin-bottom:25px;
}

.bottom-text{
  color:#777;
  font-size:14px;
}

</style>
