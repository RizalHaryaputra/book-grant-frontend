<template>
  <div class="flex min-h-screen" style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 p-8">
      <!-- Navbar -->
      <TopNavbar />

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
