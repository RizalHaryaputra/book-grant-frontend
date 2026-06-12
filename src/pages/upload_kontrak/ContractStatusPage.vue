<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Topbar title="Status Verifikasi Kontrak" placeholder="Cari..." />

      <div class="space-y-6">

        <!-- Header Card -->
        <div class="bg-white rounded-[28px] p-6 border border-[#EBE4DE] shadow-sm flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 class="text-2xl font-extrabold text-[#2B211C]">Status Verifikasi Kontrak</h2>
            <p class="text-[#7C7169] mt-1">Pantau proses validasi dokumen kontrak hibah buku Anda.</p>
          </div>
          <div class="flex gap-3">
            <!-- Refresh -->
            <button @click="fetchContracts" class="border border-[#D9C5B2] bg-white text-[#4B3027] rounded-xl p-3 hover:bg-[#FAF8F6]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.213 15M16 11h5V6" />
              </svg>
            </button>
            <!-- Upload Kontrak Baru -->
            <button
              v-if="contracts[0] && (contracts[0].status === 'rejected' || contracts[0].status === 'revision')"
              @click="$router.push('/upload-kontrak')"
              class="bg-white border border-[#4B3027] text-[#4B3027] px-5 py-3 rounded-xl font-bold hover:bg-[#FAF8F6] transition"
            >
              Upload Kontrak Baru
            </button>
          </div>
        </div>

        <!-- Info Dokumen Terakhir -->
        <div v-if="latestContract" class="bg-white rounded-[28px] shadow-sm border border-[#EBE4DE] p-8">
          <h2 class="text-xl font-bold text-[#2B211C] mb-6">Informasi Dokumen Kontrak</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <!-- File Icon -->
            <div class="flex gap-5">
              <div class="w-28 h-32 rounded-xl bg-[#F5EEE8] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-[#2B211C]">{{ latestContract.fileName }}</h3>
                <p class="text-sm text-[#7C7169] mt-2">{{ latestContract.fileSize }}</p>
              </div>
            </div>
            <!-- Detail -->
            <div class="space-y-4">
              <div>
                <p class="text-sm text-[#7C7169]">Nama File</p>
                <p class="font-semibold text-[#2B211C]">{{ latestContract.fileName }}</p>
              </div>
              <div>
                <p class="text-sm text-[#7C7169]">Tanggal Upload</p>
                <p class="font-semibold text-[#2B211C]">{{ formatDate(latestContract.createdAt) }}</p>
              </div>
              <div>
                <p class="text-sm text-[#7C7169]">Status</p>
                <span class="inline-flex px-4 py-2 rounded-full text-sm font-bold" :class="getStatusClass(latestContract.status)">
                  {{ getStatusLabel(latestContract.status) }}
                </span>
              </div>
            </div>
          </div>

          <div class="mt-8 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl p-4">
            Dokumen yang sudah diunggah akan diverifikasi oleh Admin sebelum dinyatakan valid.
          </div>

          <div
            v-if="latestContract && latestContract.status === 'rejected' && latestContract.rejectionReason"
            class="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 flex gap-3"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h4 class="font-bold text-red-800 text-lg">Kontrak Ditolak oleh Admin</h4>
              <p class="mt-1 text-sm text-red-700 leading-relaxed">
                <strong>Catatan Perbaikan:</strong> "{{ latestContract.rejectionReason }}"
              </p>
              <p class="mt-3 text-xs text-red-600 font-medium">
                *Silakan klik tombol <strong>"Upload Kontrak Baru"</strong> di atas untuk mengunggah dokumen yang telah diperbaiki.
              </p>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else-if="!isLoading" class="bg-white rounded-[28px] shadow-sm border border-[#EBE4DE] p-12 text-center text-[#7C7169]">
          <p class="text-lg font-semibold mb-2">Belum ada kontrak diunggah</p>
          <p class="text-sm mb-4">Silakan upload dokumen kontrak Anda.</p>
          <button @click="$router.push('/upload-kontrak')" class="bg-[#4B3027] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3A241D] transition">
            Upload Kontrak
          </button>
        </div>

        <!-- Tabel Riwayat -->
        <div class="bg-white rounded-[28px] shadow-sm overflow-hidden border border-[#EBE4DE]">
          <div class="p-6 border-b border-[#EBE4DE] flex justify-between items-center">
            <h2 class="font-bold text-[#2B211C] text-lg">Riwayat Upload Kontrak</h2>
            <span class="bg-[#F4EFEA] text-[#4B3027] px-3 py-1 rounded-full text-xs font-medium">
              {{ contracts.length }} Dokumen
            </span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead class="bg-[#F5EEE8] text-[#6F645C]">
                <tr>
                  <th class="px-6 py-4 text-left">Nama File</th>
                  <th class="px-6 py-4 text-left">Tanggal Upload</th>
                  <th class="px-6 py-4 text-left">Ukuran</th>
                  <th class="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="isLoading">
                  <td colspan="4" class="text-center py-10">Memuat data...</td>
                </tr>
                <tr v-else-if="contracts.length === 0">
                  <td colspan="4" class="text-center py-10 text-[#7C7169]">Belum ada data kontrak.</td>
                </tr>
                <tr v-for="contract in contracts" :key="contract.id" class="border-t hover:bg-[#FAF8F6]">
                  <td class="px-6 py-4">{{ contract.fileName }}</td>
                  <td class="px-6 py-4">{{ formatDate(contract.createdAt) }}</td>
                  <td class="px-6 py-4">{{ contract.fileSize }}</td>
                  <td class="px-6 py-4">
                    <span class="px-3 py-1 rounded-full text-xs font-bold" :class="getStatusClass(contract.status)">
                      {{ getStatusLabel(contract.status) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import api from "../../services/api";

const contracts = ref([]);
const isLoading = ref(false);

const latestContract = computed(() => {
  if (!contracts.value.length) return null;
  return contracts.value[0];
});

const fetchContracts = async () => {
  isLoading.value = true;
  try {
    const response = await api.get("/author/contracts/my-contract");
    if (response.data.success && response.data.data) {
      const realData = response.data.data;
      if (Array.isArray(realData)) {
        contracts.value = realData.map(c => ({
          id: c.id,
          fileName: c.file_url ? c.file_url.split('/').pop() : 'Dokumen Kontrak',
          createdAt: c.uploaded_at || c.created_at,
          fileSize: "—",
          status: c.status,
          rejectionReason: c.rejection_reason
        }));
      } else {
        contracts.value = [{
          id: realData.id,
          fileName: realData.file_url ? realData.file_url.split('/').pop() : 'Dokumen Kontrak',
          createdAt: realData.uploaded_at || realData.created_at,
          fileSize: "—",
          status: realData.status,
          rejectionReason: realData.rejection_reason
        }];
      }
    }
  } catch (error) {
    console.error("Gagal mengambil data kontrak:", error);
    contracts.value = [];
  } finally {
    isLoading.value = false;
  }
};

const getStatusLabel = (status) => {
  switch (status) {
    case "pending":    return "Menunggu Validasi";
    case "uploaded":   return "Menunggu Validasi";
    case "validated":  return "Disetujui";
    case "rejected":   return "Ditolak";
    case "revision":   return "Perlu Revisi";
    default:           return "Diproses";
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case "pending":
    case "uploaded":   return "bg-yellow-100 text-yellow-700";
    case "validated":  return "bg-green-100 text-green-700";
    case "rejected":   return "bg-red-100 text-red-700";
    case "revision":   return "bg-orange-100 text-orange-700";
    default:           return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchContracts();
});
</script>

<style scoped>
.dashboard { display: flex; min-height: 100vh; background: #e8ded3; }
.main-content { flex: 1; padding: 25px; display: flex; flex-direction: column; gap: 20px; }
</style>