<template>
  <div style="display:flex;min-height:100vh;background:#e8ded3;">
    <Sidebar />
    <main style="flex:1;padding:30px;">
      <Topbar :title="pageTitle" />
      <div style="background:white;border-radius:20px;padding:40px;margin-top:10px;text-align:center;color:#888;">
        <p style="font-size:18px;">Halaman sedang dalam pengembangan.</p>
        <router-link to="/" style="color:#8b4a16;text-decoration:none;display:inline-block;margin-top:16px;">← Kembali ke Dashboard</router-link>
      </div>
    </main>
  </div>
</template>
<script setup>
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'
const pageTitle = 'DetailStatusBuku'
defineProps({ id: { type: [String, Number], default: null } })
</script>
