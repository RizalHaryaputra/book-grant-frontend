<script setup>
import AdminSidebar from '../../layouts/admin/AdminSidebar.vue'
import AppTopbar   from '../../layouts/shared/AppTopbar.vue'
import ComingSoon  from '../../components/shared/ComingSoon.vue'
</script>
<template>
  <div class="layout">
    <AdminSidebar />
    <div class="main-area">
      <AppTopbar page-title="Monitoring Reviewer" user-name="Ngafifah" user-role="Admin" />
      <div class="card"><ComingSoon title="Monitoring Reviewer" icon="layers" /></div>
    </div>
  </div>
</template>
<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg,#f0ebe3,#e8ddd0); }
.main-area { margin-left: 210px; flex: 1; padding: 20px 24px; }
.card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
</style>
