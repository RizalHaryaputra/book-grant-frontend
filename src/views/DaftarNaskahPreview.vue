<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <!-- TopNavbar dibungkus backdrop-blur agar background di belakangnya blur -->
      <div class="rounded-[20px] overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 shadow-sm">
        <TopNavbar title="Daftar Naskah" />
      </div>

      <!-- Tombol Kembali — di luar card, tepat di bawah navbar -->
      <div class="mt-4 mb-3">
        <button
          @click="kembali"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#4E3629] hover:bg-[#3a2a1f] text-white text-[12px] font-bold transition-all duration-200"
          style="font-family: 'Manrope', sans-serif;"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Kembali
        </button>
      </div>

      <div class="flex-1 bg-white/70 backdrop-blur-xl border border-white/40 rounded-[28px] p-6 shadow-sm overflow-hidden flex flex-col">

        <!-- Info Naskah -->
        <div class="mb-4 px-1">
          <h2
            class="text-[18px] font-extrabold text-[#1C1209]"
            style="font-family: 'Manrope', sans-serif;"
          >
            {{ naskah.title }}
          </h2>
          <div
            class="flex items-center gap-2 text-[12px] text-[#8F8073] font-semibold mt-1 flex-wrap"
            style="font-family: 'Manrope', sans-serif;"
          >
            <span>{{ naskah.author }}</span>
            <span class="w-1 h-1 rounded-full bg-[#8F8073]/30 inline-block"></span>
            <span>{{ naskah.type }}</span>
            <span class="w-1 h-1 rounded-full bg-[#8F8073]/30 inline-block"></span>
            <span
              v-for="status in naskah.statuses"
              :key="status"
              :class="['px-3 py-0.5 rounded-full text-[10px] font-extrabold', getStatusClass(status)]"
            >
              {{ status }}
            </span>
          </div>
        </div>

        <!-- PDF Viewer Container -->
        <div class="flex-1 overflow-hidden rounded-[16px] border border-[#4E3629]/10 bg-white flex flex-col">

          <!-- PDF Toolbar -->
          <div class="flex items-center justify-between px-4 py-2 bg-white border-b border-[#E8E0D8] gap-3">

            <!-- Kiri: Icon PDF + Nama File + Badge Halaman -->
            <div class="flex items-center gap-2 min-w-0 flex-1">
              <div class="flex items-center justify-center w-7 h-7 rounded-md bg-red-50 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
                </svg>
              </div>
              <span class="text-[12px] font-bold text-[#4E3629] truncate" style="font-family: 'Manrope', sans-serif;">
                {{ naskah.title }}.pdf
              </span>
              <span class="px-2 py-0.5 rounded-md bg-[#4E3629] text-[10px] font-bold text-white flex-shrink-0" style="font-family: 'Manrope', sans-serif;">
                {{ currentPage }}/{{ totalPage }}
              </span>
            </div>

            <!-- Tengah: Zoom Controls -->
            <div class="flex items-center gap-1 flex-shrink-0">
              <!-- Zoom Out -->
              <button
                @click="zoomOut"
                class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F5F1EB] text-[#4E3629] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                </svg>
              </button>

              <!-- Zoom Badge -->
              <span
                class="px-2.5 py-0.5 rounded-md bg-[#F5F1EB] text-[11px] font-bold text-[#4E3629] min-w-[44px] text-center border border-[#4E3629]/10"
                style="font-family: 'Manrope', sans-serif;"
              >
                {{ zoom }}%
              </span>

              <!-- Zoom In -->
              <button
                @click="zoomIn"
                class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F5F1EB] text-[#4E3629] transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <!-- Divider -->
              <span class="w-px h-5 bg-[#4E3629]/10 mx-1"></span>

              <!-- Print icon -->
              <button class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F5F1EB] text-[#4E3629] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                  <rect x="6" y="14" width="12" height="8" rx="1"/>
                </svg>
              </button>

              <!-- Menu / Hamburger -->
              <button class="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F5F1EB] text-[#4E3629] transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          <!-- PDF Content Area: thumbnail kiri + main kanan -->
          <div class="flex-1 overflow-hidden flex">

            <!-- Thumbnail Sidebar -->
            <div class="hidden lg:flex flex-col gap-3 w-[100px] flex-shrink-0 overflow-y-auto custom-scrollbar bg-[#BFB0A0] p-3">
              <div
                v-for="page in Math.min(totalPage, 8)"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'rounded-[6px] overflow-hidden cursor-pointer transition-all duration-200 flex flex-col',
                  currentPage === page
                    ? 'ring-2 ring-[#4E3629] ring-offset-1 shadow-md'
                    : 'opacity-80 hover:opacity-100'
                ]"
              >
                <!-- Preview halaman simulasi -->
                <div class="w-full bg-white px-2 pt-2 pb-1 flex flex-col gap-[2.5px]" style="height: 112px;">
                  <div class="w-full h-[3px] bg-[#1C1209]/25 rounded-full mb-1"></div>
                  <div class="w-3/4 mx-auto h-[2.5px] bg-[#1C1209]/15 rounded-full mb-1"></div>
                  <div v-for="i in 11" :key="i"
                    :class="['h-[2.5px] rounded-full', i % 4 === 0 ? 'w-3/4' : 'w-full']"
                    style="background: rgba(28,18,9,0.08)"
                  ></div>
                  <div class="mt-1 w-full h-[2.5px] rounded-full" style="background: rgba(28,18,9,0.15)"></div>
                  <div class="w-4/5 h-[2.5px] rounded-full" style="background: rgba(28,18,9,0.08)"></div>
                </div>
                <!-- Nomor halaman -->
                <div class="bg-[#F0EBE4] flex items-center justify-center py-[3px]">
                  <span class="text-[9px] font-bold text-[#6B5344]" style="font-family: 'Manrope', sans-serif;">{{ page }}</span>
                </div>
              </div>
            </div>

            <!-- PDF Main View -->
            <div class="flex-1 overflow-auto custom-scrollbar bg-[#C8BAB0] flex items-start justify-center p-6">
              <div
                class="bg-white shadow-2xl rounded-[2px] overflow-hidden transition-all duration-300"
                :style="{ width: zoom + '%', maxWidth: '760px', minWidth: '300px' }"
              >
                <div class="w-full px-10 pt-10 pb-14 min-h-[900px]">

                  <!-- Header dokumen -->
                  <div class="text-center mb-6">
                    <h2 class="text-[14px] font-extrabold text-[#1C1209] mb-1 tracking-wide uppercase" style="font-family: 'Manrope', sans-serif;">
                      KONTRAK HIBAH PENULISAN BUKU
                    </h2>
                    <p class="text-[11px] text-[#8F8073]" style="font-family: 'Manrope', sans-serif;">
                      Nomor: HBK/2024/00123
                    </p>
                  </div>

                  <div class="space-y-4 text-[11px]" style="font-family: 'Manrope', sans-serif;">
                    <p class="text-[#4E3629] leading-[1.8]">
                      Pada hari ini, Jumat tanggal Dua Belas bulan Januari tahun Dua Ribu Dua Puluh Empat (12-01-2024), yang bertanda tangan di bawah ini:
                    </p>

                    <!-- Pihak Pertama -->
                    <div>
                      <p class="font-bold text-[#1C1209] mb-2">PIHAK PERTAMA (Pemberi Hibah)</p>
                      <table class="w-full text-[#4E3629] text-[11px] border-collapse">
                        <tbody>
                          <tr>
                            <td class="w-1/3 text-[#8F8073] py-0.5 align-top">Nama</td>
                            <td class="py-0.5 align-top">: Lembaga Pengelola Hibah Buku</td>
                          </tr>
                          <tr>
                            <td class="text-[#8F8073] py-0.5 align-top">Alamat</td>
                            <td class="py-0.5 align-top">: Jl. Pendidikan No. 1, Yogyakarta</td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="text-[#4E3629] mt-2 leading-[1.8]">
                        Dalam hal ini bertindak untuk dan atas nama Lembaga Pengelola Hibah Buku, selanjutnya disebut <strong>PIHAK PERTAMA</strong>.
                      </p>
                    </div>

                    <!-- Pihak Kedua -->
                    <div>
                      <p class="font-bold text-[#1C1209] mb-2">PIHAK KEDUA (Penulis)</p>
                      <table class="w-full text-[#4E3629] text-[11px] border-collapse">
                        <tbody>
                          <tr>
                            <td class="w-1/3 text-[#8F8073] py-0.5 align-top">Nama</td>
                            <td class="py-0.5 align-top">: Dr. Rina Wulandari</td>
                          </tr>
                          <tr>
                            <td class="text-[#8F8073] py-0.5 align-top">Institusi</td>
                            <td class="py-0.5 align-top">: Universitas Negeri Malang</td>
                          </tr>
                          <tr>
                            <td class="text-[#8F8073] py-0.5 align-top">Alamat</td>
                            <td class="py-0.5 align-top">: Jl. Semarang No. 5, Malang</td>
                          </tr>
                          <tr>
                            <td class="text-[#8F8073] py-0.5 align-top">No. HP</td>
                            <td class="py-0.5 align-top">: 0812-3456-7890</td>
                          </tr>
                          <tr>
                            <td class="text-[#8F8073] py-0.5 align-top">Email</td>
                            <td class="py-0.5 align-top">: rina.wulandari@unm.ac.id</td>
                          </tr>
                        </tbody>
                      </table>
                      <p class="text-[#4E3629] mt-2 leading-[1.8]">
                        Selanjutnya disebut <strong>PIHAK KEDUA</strong>.
                      </p>
                    </div>

                    <p class="text-[#4E3629] leading-[1.8]">
                      PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut PARA PIHAK, sepakat mengadakan Perjanjian Hibah Penulisan Buku dengan ketentuan dan syarat-syarat sebagai berikut:
                    </p>

                    <!-- Pasal 1 -->
                    <div class="pt-2">
                      <p class="font-bold text-[#1C1209] text-center mb-2">PASAL 1<br>TUJUAN</p>
                      <p class="text-[#4E3629] leading-[1.8]">
                        1. PIHAK PERTAMA memberikan hibah kepada PIHAK KEDUA untuk menulis buku sesuai dengan judul dan nama buku yang telah disepakati.
                      </p>
                    </div>
                  </div>

                  <!-- Footer halaman -->
                  <div class="mt-10 text-center text-[9px] text-[#A19489]" style="font-family: 'Manrope', sans-serif;">
                    — Halaman {{ currentPage }} dari {{ totalPage }} —
                  </div>
                </div>
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
import { useRouter, useRoute } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'

const router = useRouter()
const route = useRoute()

const id = route.params.id

const naskahList = [
  {
    id: '1',
    title: 'Pemrograman Berorientasi',
    author: 'Budi Santoso',
    type: 'Buku Ajar',
    statuses: ['Selesai Review', 'Selesai', 'Belum Terbit']
  },
  {
    id: '2',
    title: 'Dasar Jaringan Komputer',
    author: 'Ihsanul Fikri',
    type: 'Buku Ajar',
    statuses: ['Selesai', 'Sedang di Review', 'Belum Terbit']
  },
]

const naskah = ref(naskahList.find(n => n.id === id) || {
  title: 'Naskah Tidak Ditemukan',
  author: '-',
  type: '-',
  statuses: []
})

const currentPage = ref(1)
const totalPage = ref(51)
const zoom = ref(100)

const kembali = () => {
  router.push({ name: 'daftar-naskah' })
}

const zoomIn = () => {
  if (zoom.value < 150) zoom.value += 10
}

const zoomOut = () => {
  if (zoom.value > 60) zoom.value -= 10
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Selesai':
    case 'Selesai Review':
      return 'bg-[#DEF7EC] text-[#0E9F6E] border border-[#c3f0dc]'
    case 'Sedang di Review':
      return 'bg-[#DBEAFE] text-[#1D4ED8] border border-[#bfdbfe]'
    case 'Belum Terbit':
      return 'bg-[#FEF2F2] text-[#991B1B] border border-[#fecaca]'
    default:
      return 'bg-gray-100 text-gray-700 border border-gray-200'
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #C4B0A2; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }
</style>