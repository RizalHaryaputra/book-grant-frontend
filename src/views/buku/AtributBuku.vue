<template>
  <div class="atribut-page">

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
          Drafts > Atribut Buku
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

      <!-- Form Card -->
      <section class="form-card">

        <span class="mini-breadcrumb">
          Manuscripts > Atribut Buku
        </span>

        <h1>Atribut Buku</h1>

        <p class="desc">
          Lengkapi data atribut buku Anda untuk mempermudah proses
          kurasi dan publikasi oleh dewan editor kami.
        </p>

        <!-- Form -->
        <div class="form-box">

          <div class="grid-form">

            <!-- Jenis Buku -->
            <div class="form-group">

              <label>
                Jenis Buku *
              </label>

              <select>
                <option>
                  Pilih jenis naskah
                </option>
              </select>

            </div>

            <!-- Judul -->
            <div class="form-group">

              <label>
                Judul Buku *
              </label>

              <input
                type="text"
                placeholder="Masukkan judul lengkap"
              />

            </div>

            <!-- Bidang -->
            <div class="form-group">

              <label>
                Bidang Ilmu
              </label>

              <input
                type="text"
                placeholder="E.g. Filsafat, Teknologi, Sejarah"
              />

              <small>
                Pisahkan dengan koma.
              </small>

            </div>

            <!-- Kategori -->
            <div class="form-group">

              <label>
                Kategori Buku *
              </label>

              <select>
                <option>
                  Pilih kategori
                </option>
              </select>

            </div>

          </div>

          <!-- Deskripsi -->
          <div class="textarea-group">

            <label>
              Abstrak / Deskripsi *
            </label>

            <textarea
              placeholder="Tuliskan ringkasan buku Anda di sini..."
            ></textarea>

            <div class="textarea-footer">

              <span>
                Minimal 200 kata untuk kurasi optimal.
              </span>

              <span>
                0 / 1000 kata
              </span>

            </div>

          </div>

          <!-- Halaman -->
          <div class="page-group">

            <label>
              Jumlah Halaman *
            </label>

            <div class="page-input">

              <span>
                Halaman Estimasi
              </span>

              <input
                type="number"
                placeholder="0"
              />

            </div>

          </div>

          <!-- Buttons -->
          <div class="button-group">

            <div class="left-btn">

              <button class="save-btn">
                Simpan Perubahan
              </button>

              <button class="cancel-btn">
                Batal
              </button>

            </div>

            <div class="auto-save">
              Draft Tersimpan Otomatis
            </div>

          </div>

        </div>

        <!-- Info Cards -->
        <div class="info-grid">

          <!-- Card -->
          <div class="info-card">

            <div class="info-icon">
              📖
            </div>

            <h3>Metadata Kuat</h3>

            <p>
              Isian yang akurat membantu algoritma pencarian kami
              menempatkan karya Anda di depan audiens yang tepat.
            </p>

          </div>

          <!-- Card -->
          <div class="info-card">

            <div class="info-icon">
              ✍
            </div>

            <h3>Abstrak Jelas</h3>

            <p>
              Fokus pada 'hook' utama cerita atau argumen inti non-fiksi
              Anda pada 100 kata pertama.
            </p>

          </div>

          <!-- Card -->
          <div class="info-card">

            <div class="info-icon">
              🛡
            </div>

            <h3>Etika Literasi</h3>

            <p>
              Pastikan semua atribut mencerminkan isi naskah
              yang sebenarnya untuk menjaga integritas penulis.
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

.atribut-page{
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

/* Form Card */

.form-card{
  background:white;
  border-radius:22px;
  padding:35px;
}

.mini-breadcrumb{
  color:#777;
  font-size:13px;
}

.form-card h1{
  font-size:48px;
  margin:15px 0;
  color:#35261d;
}

.desc{
  color:#666;
  width:700px;
  line-height:1.7;
  margin-bottom:30px;
}

/* Form Box */

.form-box{
  border:1px solid #e5ddd3;
  border-radius:16px;
  padding:35px;
  margin-bottom:35px;
}

.grid-form{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:25px;
  margin-bottom:30px;
}

.form-group label{
  display:block;
  margin-bottom:10px;
  font-weight:600;
  color:#35261d;
}

.form-group input,
.form-group select{
  width:100%;
  padding:16px;
  border-radius:10px;
  border:1px solid #d7d7d7;
  outline:none;
  font-size:15px;
}

.form-group small{
  display:block;
  margin-top:8px;
  color:#888;
  font-size:12px;
}

/* Textarea */

.textarea-group{
  margin-bottom:30px;
}

.textarea-group label{
  display:block;
  margin-bottom:10px;
  font-weight:600;
}

.textarea-group textarea{
  width:100%;
  height:220px;
  border-radius:12px;
  border:1px solid #d7d7d7;
  padding:20px;
  resize:none;
  outline:none;
  font-size:15px;
}

.textarea-footer{
  display:flex;
  justify-content:space-between;
  margin-top:10px;
  color:#777;
  font-size:13px;
}

/* Page */

.page-group{
  margin-bottom:35px;
}

.page-group label{
  display:block;
  margin-bottom:15px;
  font-weight:600;
}

.page-input{
  display:flex;
  align-items:center;
  gap:20px;
}

.page-input span{
  color:#666;
}

.page-input input{
  width:120px;
  padding:14px;
  border-radius:10px;
  border:1px solid #d7d7d7;
}

/* Buttons */

.button-group{
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-top:1px solid #eee;
  padding-top:30px;
}

.left-btn{
  display:flex;
  gap:15px;
}

.save-btn{
  background:#5a4031;
  color:white;
  border:none;
  padding:16px 28px;
  border-radius:10px;
  cursor:pointer;
}

.cancel-btn{
  background:#6c5446;
  color:white;
  border:none;
  padding:16px 28px;
  border-radius:10px;
  cursor:pointer;
}

.auto-save{
  background:#d9ebc5;
  color:#60774c;
  padding:12px 20px;
  border-radius:30px;
  font-size:14px;
}

/* Info Grid */

.info-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
}

.info-card{
  background:#f8f5f1;
  border:1px solid #e5ddd3;
  border-radius:14px;
  padding:25px;
}

.info-icon{
  font-size:28px;
  margin-bottom:18px;
}

.info-card h3{
  font-size:24px;
  margin-bottom:15px;
  color:#35261d;
}

.info-card p{
  color:#666;
  line-height:1.8;
}

</style>
