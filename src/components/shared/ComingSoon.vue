<script setup>
defineProps({
  title: { type: String, required: true },
  icon:  { type: String, default: 'build' }
})
</script>

<template>
  <div class="coming-soon">
    <div class="cs-icon">
      <!-- Build / wrench icon (default) -->
      <svg v-if="icon === 'build'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M13.7 2.3c-.4-.4-1-.4-1.4 0L9 5.6 8 4.6c-.4-.4-1-.4-1.4 0L5.2 6c-.4.4-.4 1 0 1.4L6.2 8.4l-3.3 3.3c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l3.3-3.3 1 1-6 6c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l6-6 1 1-3.3 3.3c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l3.3-3.3 1 1c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4l-1-1 .6-.6c1.5-1.5 1.8-3.7.8-5.5l-2.4 2.4c.1.7-.2 1.5-.8 2l-1.4-1.4.6-.6c.4-.4.4-1 0-1.4l-1.4-1.4c-.4-.4-1-.4-1.4 0l-.6.6L10.6 8c1.5-1.5 3.8-1.7 5.5-.8l-2.4 2.4c1.8 1 4 .7 5.5-.8l.6-.6c1-1.8.7-4-.8-5.5l-1.4-1.4z"/>
      </svg>
      <!-- Dashboard icon -->
      <svg v-else-if="icon === 'dashboard'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
      </svg>
      <!-- People icon -->
      <svg v-else-if="icon === 'people'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
      </svg>
      <!-- Book icon -->
      <svg v-else-if="icon === 'book'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
      </svg>
      <!-- Layers icon -->
      <svg v-else-if="icon === 'layers'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/>
      </svg>
      <!-- Bell icon -->
      <svg v-else-if="icon === 'bell'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
      <!-- Settings icon -->
      <svg v-else-if="icon === 'settings'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
      <!-- History icon -->
      <svg v-else-if="icon === 'history'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
      </svg>
      <!-- Support icon -->
      <svg v-else-if="icon === 'support'" width="56" height="56" viewBox="0 0 24 24" fill="#d4b896">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
      </svg>
    </div>

    <h2 class="cs-title">{{ title }}</h2>
    <p class="cs-desc">Modul ini sedang di bangun</p>
    <div class="cs-badge">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#a89070"><path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5v-5l-2.28 2.28C7.31 17.97 6 15.12 6 12c0-4.08 3.05-7.44 7-7.93V2.05z"/></svg>
      <span>Coming Soon</span>
    </div>
  </div>
</template>

<style scoped>
.coming-soon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 380px;
  gap: 12px;
  text-align: center;
  padding: 40px;
}
.cs-icon { margin-bottom: 4px; opacity: 0.85; }
.cs-title {
  font-size: 22px; font-weight: 700;
  color: #2a1a10; letter-spacing: -0.3px;
}
.cs-desc { font-size: 14px; color: #999; font-style: italic; }
.cs-badge {
  display: inline-flex; align-items: center; gap: 6px;
  margin-top: 8px; padding: 6px 16px;
  border-radius: 20px; background: #f5ece0;
  border: 1px solid #e0cdb8;
  font-size: 12px; font-weight: 600; color: #a89070;
  letter-spacing: 0.5px; text-transform: uppercase;
}
</style>
