<script setup>
import ReviewerSidebar from '../../layouts/reviewer/ReviewerSidebar.vue'
import AppTopbar       from '../../layouts/shared/AppTopbar.vue'
import ComingSoon      from '../../components/shared/ComingSoon.vue'
</script>
<template>
  <div class="layout">
    <ReviewerSidebar />
    <div class="main-area">
      <AppTopbar page-title="Rubrik Penilaian" user-name="Inna" user-role="Reviewer" />
      <div class="card"><ComingSoon title="Rubrik Penilaian" icon="build" /></div>
    </div>
  </div>
</template>
<style scoped>
.layout { display: flex; min-height: 100vh; background: linear-gradient(135deg,#f0ebe3,#e8ddd0); }
.main-area { margin-left: 210px; flex: 1; padding: 20px 24px; }
.card { background: #fff; border-radius: 16px; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
</style>
