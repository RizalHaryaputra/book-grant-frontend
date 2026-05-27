<template>
  <div class="flex min-h-screen w-full" style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <TopNavbar title="Daftar Naskah" />

      <!-- Curved Card Container -->
      <div class="mt-6 flex-1 bg-white/35 backdrop-blur-md border border-white/40 rounded-[28px] p-6 shadow-sm overflow-hidden flex flex-col">
        <!-- Scrollable Grid Container -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <!-- Manuscript Card -->
            <div
              v-for="item in naskahList"
              :key="item.id"
              class="bg-white rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-[#4E3629]/5 flex flex-col gap-4.5 hover:shadow-[0_12px_40px_rgba(78,54,41,0.05)] hover:border-[#4E3629]/10 transition-all duration-300 group"
            >
              <!-- Cover Container -->
              <div class="w-full relative overflow-hidden rounded-[18px]">
                <BookCover :title="item.coverTitle" :author="item.coverAuthor" />
              </div>

              <!-- Details -->
              <div class="flex flex-col gap-1 px-1">
                <!-- Title -->
                <h3 class="text-[16px] font-extrabold text-[#1C1209] group-hover:text-[#4E3629] transition-colors duration-200 leading-snug">
                  {{ item.title }}
                </h3>

                <!-- Author & Type -->
                <div class="flex items-center gap-1.5 text-[13px] text-[#8F8073] font-semibold mt-0.5">
                  <span>{{ item.author }}</span>
                  <span class="w-1.5 h-1.5 rounded-full bg-[#8F8073]/30"></span>
                  <span>{{ item.type }}</span>
                </div>

                <!-- Upload Time -->
                <p class="text-[11px] text-[#A19489] font-medium mt-0.5">
                  {{ item.timeAgo }}
                </p>
              </div>

              <!-- Status Badges -->
              <div class="flex flex-wrap gap-2 px-1 mt-auto pt-2">
                <span
                  v-for="status in item.statuses"
                  :key="status"
                  :class="[
                    'px-3.5 py-1 rounded-full text-[10.5px] font-extrabold tracking-wide text-center flex items-center justify-center transition-colors duration-200',
                    getStatusClass(status)
                  ]"
                >
                  {{ status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'
import BookCover from '../components/BookCover.vue'

const naskahList = ref([
  {
    id: 1,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Selesai Review', 'Belum Terbit']
  },
  {
    id: 2,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Selesai Review', 'Belum Terbit']
  },
  {
    id: 3,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Sedang di Review', 'Belum Terbit']
  },
  {
    id: 4,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Selesai Review', 'Belum Terbit']
  },
  {
    id: 5,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Selesai Review', 'Belum Terbit']
  },
  {
    id: 6,
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    timeAgo: 'Di Upload 2 Jam yang lalu',
    coverTitle: 'DASAR JARINGAN KOMPUTER',
    coverAuthor: 'Ihsanul Fikri, M.Kom',
    statuses: ['Selesai', 'Sedang di Review', 'Belum Terbit']
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'Selesai':
    case 'Selesai Review':
      return 'bg-[#DEF7EC] text-[#0E9F6E] border border-[#DEF7EC]'
    case 'Sedang di Review':
      return 'bg-[#E1EFFE] text-[#1E40AF] border border-[#E1EFFE]'
    case 'Belum Terbit':
      return 'bg-[#FDF2F2] text-[#9B1C1C] border border-[#FDE8E8]'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>

<style scoped>
/* Scrollbar Customization for curved mockup scrollbar effect */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(78, 54, 41, 0.03);
  border-radius: 99px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #735C4D;
  border-radius: 99px;
  border: 1px solid transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4E3629;
}
</style>
