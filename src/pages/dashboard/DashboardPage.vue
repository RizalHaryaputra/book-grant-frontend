<template>
  <AdminLayout>
    <div v-if="error" class="bg-red-50 border border-red-200 rounded-[24px] p-5 mb-6 text-red-600">
      {{ error }}
    </div>

    <div v-if="loading" class="bg-white rounded-[32px] p-10 animate-pulse">
      <div class="h-8 w-56 bg-gray-200 rounded"></div>
      <div class="grid grid-cols-5 gap-4 mt-8">
        <div v-for="i in 5" :key="i" class="h-32 rounded-[24px] bg-gray-100"></div>
      </div>
    </div>

    <template v-else>
      <section class="bg-[#EEE3D8] rounded-[34px] p-10 relative overflow-hidden">
        <div class="relative z-10 max-w-[760px]">
          <p class="uppercase tracking-[4px] text-[11px] font-bold text-[#8A8178]">Dashboard Admin</p>
          <h1 class="text-[68px] leading-[0.95] tracking-[-5px] font-extrabold mt-6 text-[#2B211C]">
            Status Program Hibah Buku Hari Ini
          </h1>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mt-7">
        <div v-for="item in stats" :key="item.label" class="bg-white rounded-[30px] p-6 shadow-sm border">
          <p class="text-[#8B8178] text-sm">{{ item.label }}</p>
          <h1 class="text-[48px] font-extrabold mt-4 text-[#2B211C]">{{ item.value }}</h1>
        </div>
      </section>
    </template>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import AdminLayout from "../../components/layout/AdminLayout.vue"
import { getDashboard } from "../../services/dashboardService"

const loading = ref(true)
const error = ref("")
const dashboardData = ref({
  total_penulis: 0,
  total_kontrak_valid: 0,
  total_draft_masuk: 0,
  total_review_berjalan: 0,
  total_revisi: 0,
  total_pracetak: 0,
  total_siap_cetak: 0
})

const stats = computed(() => [
  { label: "Total Penulis", value: dashboardData.value.total_penulis },
  { label: "Kontrak Valid", value: dashboardData.value.total_kontrak_valid },
  { label: "Draft Masuk", value: dashboardData.value.total_draft_masuk },
  { label: "Review", value: dashboardData.value.total_review_berjalan },
  { label: "Siap Cetak", value: dashboardData.value.total_siap_cetak },
])

const loadDashboard = async () => {
  loading.value = true
  try {
    const data = await getDashboard() // Memanggil /admin/dashboard-stats
    dashboardData.value = data
  } catch (err) {
    error.value = "Gagal memuat statistik dasbor."
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>