<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const navItems = [
  { name: 'Dashboard',        path: '/reviewer/dashboard',         icon: 'dashboard' },
  { name: 'Daftar Tugas',     path: '/reviewer/daftar-tugas',      icon: 'assignment' },
  { name: 'Rubrik Penilaian', path: '/reviewer/rubrik-penilaian',  icon: 'rubric' },
  { name: 'Riwayat Review',   path: '/reviewer/riwayat-review',    icon: 'history' },
  { name: 'Support',          path: '/reviewer/support',           icon: 'support' },
  { name: 'Settings',         path: '/reviewer/settings',          icon: 'settings' },
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
        <!-- Dashboard -->
        <svg v-if="item.icon === 'dashboard'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
        <!-- Assignment / Daftar Tugas -->
        <svg v-else-if="item.icon === 'assignment'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <!-- Rubrik Penilaian -->
        <svg v-else-if="item.icon === 'rubric'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 8H3V4h18v4zm0 2H3v4h18v-4zm0 6H3v4h18v-4z"/></svg>
        <!-- Riwayat Review -->
        <svg v-else-if="item.icon === 'history'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
        <!-- Support -->
        <svg v-else-if="item.icon === 'support'" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
        <!-- Settings -->
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
  width: 210px; min-width: 210px; height: 100vh;
  background: linear-gradient(180deg, #e8ddd0 0%, #d4c4b0 50%, #c9b89e 100%);
  display: flex; flex-direction: column;
  position: fixed; left: 0; top: 0; bottom: 0; z-index: 100;
}
.sidebar-logo { display: flex; align-items: center; gap: 10px; padding: 24px 18px 20px; color: #3d2b1f; }
.logo-text { display: flex; flex-direction: column; }
.logo-title { font-size: 17px; font-weight: 700; color: #2a1a10; line-height: 1.2; letter-spacing: -0.3px; }
.logo-subtitle { font-size: 10px; font-weight: 400; color: #6b4c38; line-height: 1.3; }
.sidebar-nav { flex: 1; display: flex; flex-direction: column; padding: 4px 10px; gap: 2px; }
.nav-item {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 12px; border-radius: 8px;
  color: #4a3528; font-size: 13px; font-weight: 400;
  transition: background 0.15s ease, color 0.15s ease; text-decoration: none;
}
.nav-item:hover:not(.active) { background: rgba(0,0,0,0.06); color: #2a1a10; }
.nav-item.active { background: #2a1a10; color: #ffffff; font-weight: 500; box-shadow: 0 2px 8px rgba(42,26,16,0.3); }
.nav-item svg { flex-shrink: 0; opacity: 0.85; }
.nav-item.active svg { opacity: 1; }
.sidebar-footer { padding: 16px 10px 24px; }
.logout-btn {
  display: flex; align-items: center; gap: 11px; width: 100%;
  padding: 11px 12px; border-radius: 8px;
  background: #2a1a10; color: #ffffff; font-size: 13px; font-weight: 500;
  text-decoration: none; transition: background 0.15s ease;
}
.logout-btn:hover { background: #1a0f09; }
</style>
