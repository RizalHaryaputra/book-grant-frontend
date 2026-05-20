<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: 'Dashboard',           path: '/admin/dashboard',            icon: 'dashboard' },
  { name: 'Manajemen User',      path: '/admin/manajemen-user',       icon: 'people' },
  { name: 'Daftar Tugas',        path: '/admin/daftar-tugas',         icon: 'assignment' },
  { name: 'Proposal Buku',       path: '/admin/proposal-buku',        icon: 'menu_book' },
  { name: 'Plotting Reviewer',   path: '/admin/plotting-reviewer',    icon: 'person_pin' },
  { name: 'Monitoring Reviewer', path: '/admin/monitoring-reviewer',  icon: 'layers' },
  { name: 'Notifikasi',          path: '/admin/notifikasi',           icon: 'notifications' },
  { name: 'Settings',            path: '/admin/settings',             icon: 'settings' },
]
</script>

<template>
  <aside class="sidebar">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="2" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.9"/>
          <rect x="13" y="2" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.6"/>
          <rect x="2" y="13" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.6"/>
          <rect x="13" y="13" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.9"/>
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-title">Sistem PBL</span>
        <span class="logo-subtitle">Book Grant System</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="nav-item"
        :class="{ active: route.path === item.path }"
      >
        <svg v-if="item.icon === 'dashboard'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        <svg v-else-if="item.icon === 'people'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        <svg v-else-if="item.icon === 'assignment'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <svg v-else-if="item.icon === 'menu_book'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
        <svg v-else-if="item.icon === 'person_pin'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-1.67 0-3.14-.85-4-2.15.02-1.32 2.67-2.05 4-2.05 1.32 0 3.98.73 4 2.05-.86 1.3-2.33 2.15-4 2.15z"/></svg>
        <svg v-else-if="item.icon === 'layers'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>
        <svg v-else-if="item.icon === 'notifications'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>
        <svg v-else-if="item.icon === 'settings'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
        <span>{{ item.name }}</span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="sidebar-footer">
      <RouterLink to="/" class="logout-btn">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
        <span>Log Out</span>
      </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 210px;
  min-width: 210px;
  height: 100vh;
  background: linear-gradient(180deg, #e8ddd0 0%, #d4c4b0 50%, #c9b89e 100%);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0; top: 0; bottom: 0;
  z-index: 100;
}
.sidebar-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 24px 18px 20px;
  color: #3d2b1f;
}
.logo-text { display: flex; flex-direction: column; }
.logo-title { font-size: 17px; font-weight: 700; color: #2a1a10; line-height: 1.2; letter-spacing: -0.3px; }
.logo-subtitle { font-size: 10px; font-weight: 400; color: #6b4c38; line-height: 1.3; }
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 10px;
  gap: 2px;
}
.nav-item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #4a3528;
  font-size: 13px;
  font-weight: 400;
  transition: background 0.15s ease, color 0.15s ease;
  text-decoration: none;
}
.nav-item:hover:not(.active) { background: rgba(0,0,0,0.06); color: #2a1a10; }
.nav-item.active {
  background: #2a1a10;
  color: #ffffff;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(42,26,16,0.3);
}
.nav-item svg { flex-shrink: 0; opacity: 0.85; }
.nav-item.active svg { opacity: 1; }
.sidebar-footer { padding: 16px 10px 24px; }
.logout-btn {
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  padding: 11px 12px;
  border-radius: 8px;
  background: #2a1a10;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s ease;
}
.logout-btn:hover { background: #1a0f09; }
</style>
