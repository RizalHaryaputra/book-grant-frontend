<template>

<div class="sidebar">

  <div>
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

  </nav>

</div>

</template>

<style scoped>

.sidebar{
  width: 240px;
  background: #f7f4ef;
  min-height: 100vh;
  padding: 30px 20px;
}

.logo{
  font-size: 36px;
  font-weight: bold;
  color: #3b2a20;
}

.subtitle{
  color: #777;
  margin-top: 5px;
}

.menu{
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.menu-item{
  text-decoration: none;
  color: #5b4636;
  padding: 14px 18px;
  border-radius: 12px;
  transition: 0.2s;
}

.menu-item:hover{
  background: #6b5445;
  color: white;
}

.router-link-active{
  background: #6b5445;
  color: white;
}

</style>
