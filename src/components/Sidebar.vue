<template>
  <div class="sidebar">

    <div class="brand">
      <h1 class="logo">Sistem PBL</h1>
      <p class="subtitle">Book Grant System</p>
    </div>

    <nav class="menu">

      <router-link to="/" class="menu-item">
        Dashboard
      </router-link>

      <router-link to="/buku-saya" class="menu-item">
        Buku Saya
      </router-link>

      <router-link to="/daftar-reviewer" class="menu-item">
        Daftar Reviewer
      </router-link>

      <router-link to="/hibah-disetujui" class="menu-item">
        Hibah Disetujui
      </router-link>

      <router-link to="/hasil-review" class="menu-item">
        Hasil Review
      </router-link>

      <router-link to="/support" class="menu-item">
        Support
      </router-link>

      <router-link to="/settings" class="menu-item">
        Settings
      </router-link>

    </nav>

    <div class="logout-wrapper">
      <button class="logout-btn">
        Log Out
      </button>
    </div>

  </div>
</template>

<style scoped>

.sidebar{
  width:280px;
  min-width:280px;
  min-height:100vh;

  background:#F8F5F0;
  border-right:1px solid #ECE5DB;

  padding:32px 22px;

  display:flex;
  flex-direction:column;
}

.brand{
  margin-bottom:42px;
}

.logo{
  font-size:30px;
  font-weight:700;
  color:#3A2A20;
  margin:0;
  line-height:1.1;
}

.subtitle{
  margin-top:8px;
  font-size:14px;
  color:#7A6D61;
}

.menu{
  display:flex;
  flex-direction:column;
  gap:12px;
}

.menu-item{
  height:56px;

  display:flex;
  align-items:center;

  padding:0 18px;

  text-decoration:none;
  color:#5E4B3D;

  border-radius:14px;

  font-size:15px;
  font-weight:500;

  transition:.2s;
}

.menu-item:hover{
  background:#EDE5DC;
}

.router-link-active{
  background:#7A6151;
  color:white;
}

.logout-wrapper{
  margin-top:auto;
  padding-top:24px;
}

.logout-btn{
  width:100%;
  height:52px;

  border:none;
  border-radius:14px;

  background:#7A6151;
  color:white;

  font-size:15px;
  cursor:pointer;
}

</style>
