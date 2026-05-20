<template>
  <div class="upload-page">

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
      <section class="upload-card">

        <h1>Unggah Draf Awal</h1>

        <p class="desc">
          Selamat datang di tahap awal publikasi.
          Pastikan draf Anda sudah matang sebelum dikirim
          ke editor untuk proses review literasi pertama.
        </p>

        <!-- Book -->
        <div class="book-box">

          <div class="book-left">

            <img
              src="https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg"
              alt=""
            />

            <div>

              <h3>Jaringan Komputer Dasar</h3>
              <p>ID: LI-2024-0892</p>

            </div>

          </div>

          <div class="status">
            KONTRAK VALID
          </div>

        </div>

        <!-- Upload -->
        <div class="upload-section">

          <label>File Naskah</label>

          <div class="upload-box">

            <div class="upload-icon">
              ☁
            </div>

            <p>
              Ketuk atau seret file untuk memilih
            </p>

            <span>
              Format .pdf atau .docx (Maks. 25MB)
            </span>

          </div>

        </div>

        <!-- Textarea -->
        <div class="editor-note">

          <label>
            Catatan untuk Editor (Opsional)
          </label>

          <textarea
            placeholder="Berikan konteks tambahan atau bagian tertentu yang ingin Anda fokuskan..."
          ></textarea>

        </div>

        <!-- Confirm -->
        <div class="confirm-box">

          <input type="checkbox" />

          <p>
            Saya mengonfirmasi bahwa naskah ini adalah karya asli saya,
            tidak mengandung plagiarisme, dan belum pernah diterbitkan
            sebelumnya secara komersial.
          </p>

        </div>

        <!-- Buttons -->
        <div class="button-group">

          <button class="save-btn">
            Simpan Draf
          </button>

          <router-link
            to="/verifikasi-draft"
            class="upload-btn"
          >
            Unggah Sekarang
          </router-link>

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

.upload-page{
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

.upload-card{
  background:white;
  border-radius:22px;
  padding:35px;
}

.upload-card h1{
  font-size:48px;
  color:#34261f;
  margin-bottom:12px;
}

.desc{
  color:#6f6f6f;
  width:700px;
  line-height:1.7;
  margin-bottom:25px;
}

/* Book */

.book-box{
  border:1px solid #e5e5e5;
  border-left:4px solid #60774c;
  border-radius:12px;
  padding:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:30px;
}

.book-left{
  display:flex;
  gap:18px;
  align-items:center;
}

.book-left img{
  width:70px;
  height:95px;
  object-fit:cover;
  border-radius:8px;
}

.book-left h3{
  font-size:28px;
  color:#34261f;
}

.book-left p{
  color:#777;
  margin-top:8px;
}

.status{
  background:#d8e8c7;
  color:#5f754a;
  padding:10px 18px;
  border-radius:30px;
  font-size:13px;
}

/* Upload */

.upload-section{
  margin-bottom:25px;
}

.upload-section label{
  display:block;
  margin-bottom:12px;
  font-weight:600;
}

.upload-box{
  border:1px solid #ddd;
  background:#f8f6f2;
  border-radius:12px;
  height:230px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  text-align:center;
}

.upload-icon{
  font-size:45px;
  margin-bottom:15px;
}

.upload-box p{
  font-size:20px;
  margin-bottom:8px;
}

.upload-box span{
  color:#777;
}

/* Textarea */

.editor-note{
  margin-bottom:25px;
}

.editor-note label{
  display:block;
  margin-bottom:12px;
  font-weight:600;
}

.editor-note textarea{
  width:100%;
  height:140px;
  border:1px solid #ddd;
  border-radius:12px;
  padding:18px;
  resize:none;
  outline:none;
  font-size:15px;
}

/* Confirm */

.confirm-box{
  display:flex;
  gap:15px;
  border:1px solid #ddd;
  background:#f7f3ee;
  padding:20px;
  border-radius:12px;
  margin-bottom:30px;
}

.confirm-box p{
  color:#666;
  line-height:1.7;
}

/* Buttons */

.button-group{
  display:flex;
  justify-content:flex-end;
  gap:15px;
}

.save-btn{
  background:#6b564a;
  color:white;
  border:none;
  padding:16px 30px;
  border-radius:10px;
  cursor:pointer;
}

.upload-btn{
  background:#3f2617;
  color:white;
  text-decoration:none;
  padding:16px 30px;
  border-radius:10px;
}

</style>
