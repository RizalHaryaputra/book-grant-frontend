<template>
  <div
    class="flex min-h-screen w-full"
    style="
      background: radial-gradient(
        circle at 100% 0%,
        #cbb8a5 0%,
        #e4d8ca 30%,
        #f5f1eb 70%,
        #faf8f5 100%
      );
    "
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
      <div v-if="!loading" class="grid grid-cols-2 gap-6 mt-8">
        <PieChartCard :data="dashboardData" />
        <ReviewCard :preprints="dashboardData.latest_preprints" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Sidebar from "../components/Sidebar.vue";
import TopNavbar from "../components/TopNavbar.vue";
import HeroBanner from "../components/HeroBanner.vue";
import PieChartCard from "../components/PieChartCard.vue";
import ReviewCard from "../components/ReviewCard.vue";
import { getPublisherDashboard } from "../services/publisherService"

const loading = ref(true)
const dashboardData = ref({
  preprint_count: 0,
  approved_count_this_month: 0,
  revised_count_this_month: 0,
  latest_preprints: []
})

const loadDashboard = async () => {
  try {
    const data = await getPublisherDashboard()
    dashboardData.value = data
  } catch (e) {
    console.error("Failed to load publisher dashboard", e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDashboard()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 7px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 99px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #b09a8a;
  border-radius: 99px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4e3629;
}
</style>
