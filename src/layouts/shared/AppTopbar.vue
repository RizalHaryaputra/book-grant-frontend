<script setup>
defineProps({
  pageTitle:  { type: String, default: 'Dashboard' },
  userName:   { type: String, default: 'Ngafifah' },
  userRole:   { type: String, default: 'Admin' },
  greetMode:  { type: Boolean, default: false },  // true = tampilkan "Selamat datang, {userName}"
})
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <h1 class="page-title">
        <template v-if="greetMode">Selamat datang, {{ userName }}</template>
        <template v-else>{{ pageTitle }}</template>
      </h1>
    </div>
    <div class="topbar-center" v-if="!greetMode">
      <div class="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="search-icon">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
        </svg>
        <input type="text" placeholder="Cari judul/penulis..." class="search-input" />
      </div>
    </div>
    <div class="topbar-right">
      <button class="notif-btn" id="topbar-notif-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
        </svg>
      </button>
      <div class="user-profile">
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-role">{{ userRole }}</span>
        </div>
        <div class="user-avatar">
          <img :src="`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}&backgroundColor=b6e3f4`" :alt="userName" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 24px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.07);
  margin-bottom: 20px;
}
.topbar-left { flex-shrink: 0; }
.page-title { font-size: 17px; font-weight: 600; color: #1a1a1a; letter-spacing: -0.2px; }
.topbar-center { flex: 1; }
.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f5f5f5;
  border-radius: 22px;
  padding: 9px 16px;
  max-width: 340px;
}
.search-icon { color: #999; flex-shrink: 0; }
.search-input {
  border: none; background: transparent;
  font-size: 13px; color: #333; outline: none; width: 100%;
  font-family: 'Inter', sans-serif;
}
.search-input::placeholder { color: #aaa; }
.topbar-right { display: flex; align-items: center; gap: 14px; margin-left: auto; flex-shrink: 0; }
.notif-btn {
  width: 38px; height: 38px; border-radius: 50%;
  background: #f5f5f5; display: flex; align-items: center;
  justify-content: center; cursor: pointer; color: #555;
  border: none; transition: background 0.15s;
}
.notif-btn:hover { background: #e8e8e8; }
.user-profile { display: flex; align-items: center; gap: 10px; }
.user-info { display: flex; flex-direction: column; align-items: flex-end; }
.user-name { font-size: 13px; font-weight: 600; color: #1a1a1a; line-height: 1.2; }
.user-role { font-size: 11px; color: #888; line-height: 1.2; }
.user-avatar { width: 38px; height: 38px; border-radius: 50%; overflow: hidden; background: #e0d4c8; flex-shrink: 0; }
.user-avatar img { width: 100%; height: 100%; object-fit: cover; }
</style>
