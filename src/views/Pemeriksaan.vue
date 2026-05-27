<template>
  <div class="flex min-h-screen w-full" style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <TopNavbar title="Halaman Pemeriksaan Naskah" />

      <!-- Curved Card Container -->
      <div class="mt-6 flex-1 bg-white/35 backdrop-blur-md border border-white/40 rounded-[28px] p-6 shadow-sm overflow-hidden flex flex-col">
        <!-- Scrollable Table Viewport -->
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <table class="min-w-full text-left border-collapse">
            <thead>
              <tr class="text-[12px] font-bold text-[#8F8073]/90 tracking-wider uppercase border-b border-[#4E3629]/10">
                <th class="pb-4 pl-4 font-extrabold" style="font-family: 'Poppins', sans-serif;">JUDUL NASKAH</th>
                <th class="pb-4 font-extrabold" style="font-family: 'Poppins', sans-serif;">KATEGORI</th>
                <th class="pb-4 text-center font-extrabold" style="font-family: 'Poppins', sans-serif;">REVIEWER</th>
                <th class="pb-4 font-extrabold" style="font-family: 'Poppins', sans-serif;">TENGGAT</th>
                <th class="pb-4 text-center font-extrabold" style="font-family: 'Poppins', sans-serif;">STATUS</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#4E3629]/10">
              <tr
                v-for="item in pemeriksaanList"
                :key="item.id"
                class="hover:bg-white/20 transition-colors duration-200"
              >
                <!-- Judul Naskah -->
                <td class="py-5 pl-4 pr-6 text-[14.5px] font-bold text-[#1C1209] max-w-[280px] leading-snug">
                  {{ item.judul }}
                </td>
                
                <!-- Kategori -->
                <td class="py-5 text-[13.5px] text-[#4E3629]/80 font-semibold" style="font-family: 'Manrope', sans-serif;">
                  {{ item.kategori }}
                </td>

                <!-- Reviewer Capsules -->
                <td class="py-5 text-center">
                  <div class="flex flex-wrap gap-2.5 justify-center">
                    <template v-if="item.reviewers && item.reviewers.length > 0">
                      <span
                        v-for="reviewer in item.reviewers"
                        :key="reviewer"
                        class="bg-[#FAF7F2] text-[#4E3629] border border-[#4E3629]/25 px-3 py-1 rounded-full text-[12px] font-bold shadow-sm select-none"
                        style="font-family: 'Manrope', sans-serif;"
                      >
                        {{ reviewer }}
                      </span>
                    </template>
                    <template v-else>
                      <span
                        class="border border-dashed border-[#8F8073]/40 text-[#8F8073]/80 px-3.5 py-1 rounded-full text-[11.5px] font-semibold bg-white/10 select-none"
                        style="font-family: 'Manrope', sans-serif;"
                      >
                        Belum ada Reviewer
                      </span>
                    </template>
                  </div>
                </td>

                <!-- Tenggat -->
                <td class="py-5 text-[13.5px] text-[#4E3629]/80 font-semibold" style="font-family: 'Manrope', sans-serif;">
                  {{ item.tenggat }}
                </td>

                <!-- Status Badge -->
                <td class="py-5 text-center">
                  <span
                    :class="[
                      'px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide inline-flex items-center justify-center text-center select-none shadow-sm transition-colors duration-200',
                      getStatusClass(item.status)
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'

const pemeriksaanList = ref([
  {
    id: 1,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina'],
    tenggat: '5 Juni 2026',
    status: 'Lengkap'
  },
  {
    id: 2,
    judul: 'Algoritma dan Struktur Data',
    kategori: 'Buku Referensi',
    reviewers: ['Prof. Rina'],
    tenggat: '5 Juni 2026',
    status: 'Lengkap'
  },
  {
    id: 3,
    judul: 'Jaringan Komputer Dasar',
    kategori: 'Buku Ajar',
    reviewers: ['Prof. Rina'],
    tenggat: '5 Juni 2026',
    status: 'Sebagian'
  },
  {
    id: 4,
    judul: 'Basis Data Relasional',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 5,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 6,
    judul: 'Pemrograman Web',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 7,
    judul: 'Data Mining',
    kategori: 'Buku Ajar',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 8,
    judul: 'Basis Data Relasional',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 9,
    judul: 'Basis Data Relasional',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 10,
    judul: 'Basis Data Relasional',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  },
  {
    id: 11,
    judul: 'Basis Data Relasional',
    kategori: 'Buku Referensi',
    reviewers: [],
    tenggat: '5 Juni 2026',
    status: 'Belum diplot'
  }
])

const getStatusClass = (status) => {
  switch (status) {
    case 'Lengkap':
      return 'bg-[#DEF7EC] text-[#0E9F6E] border border-[#DEF7EC]'
    case 'Sebagian':
      return 'bg-[#E1EFFE] text-[#1E40AF] border border-[#E1EFFE]'
    case 'Belum diplot':
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
