<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 p-8 flex flex-col h-screen overflow-y-auto custom-scrollbar">
      <!-- Navbar -->
      <TopNavbar title="Dashboard" />

      <!-- Hero Banner -->
      <div class="mt-6">
        <HeroBanner />
      </div>

      <!-- Chart Section -->
      <div class="grid grid-cols-2 gap-6 mt-8">
        <PieChartCard />
        <BarChartCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import TopNavbar from "../components/TopNavbar.vue";
import HeroBanner from "../components/HeroBanner.vue";
import PieChartCard from "../components/PieChartCard.vue";
import BarChartCard from "../components/BarChartCard.vue";
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 7px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #B09A8A; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }
</style>