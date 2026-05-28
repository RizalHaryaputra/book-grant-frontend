<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <!-- Navbar -->
      <TopNavbar title="Halaman Keputusan Terbit" />

      <!-- Content Card -->
      <div
        class="mt-6 flex-1 bg-[#EEE8DE]/95 border border-[#E4DDD4] rounded-[28px] shadow-sm overflow-hidden flex flex-col"
        style="font-family: 'Manrope', sans-serif;"
      >
        <!-- Section Title -->
        <div class="px-6 pt-5 pb-3">
          <h2 class="uppercase text-[12px] font-extrabold tracking-[0.07em] text-[#1F1712]">
            Naskah yang Perlu Di Tinjau
          </h2>
        </div>

        <!-- Table Wrapper -->
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <table class="w-full border-collapse">
            <!-- Header -->
            <thead>
              <tr class="border-b border-[#4E3629]/10 bg-white/20">
                <th class="text-left pl-6 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6F655D]">Judul Naskah</th>
                <th class="text-left py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6F655D]">Kategori</th>
                <th class="text-left py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6F655D]">Reviewer</th>
                <th class="text-center py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6F655D]">Status</th>
                <th class="text-left py-3 pl-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6F655D]">Tindakan</th>
              </tr>
            </thead>

            <!-- Body -->
            <tbody>
              <template v-for="item in naskahList" :key="item.id">

                <!-- Data Row -->
                <tr class="border-b border-[#4E3629]/5 hover:bg-white/30 transition-colors duration-150">

                  <!-- Judul dengan green line -->
                  <td class="pl-6 py-5 relative">
                    <div class="absolute left-0 top-0 h-full w-[4px] bg-[#2C8C50] rounded-r-sm"></div>
                    <span class="text-[13.5px] font-semibold text-[#2B221C]">{{ item.judul }}</span>
                  </td>

                  <!-- Kategori -->
                  <td class="py-5 text-[12.5px] text-[#5B524A] font-medium">
                    {{ item.kategori }}
                  </td>

                  <!-- Reviewer chips -->
                  <td class="py-5">
                    <div class="flex flex-col gap-1.5">
                      <span
                        v-for="reviewer in item.reviewers"
                        :key="reviewer"
                        class="inline-flex items-center px-3 py-[3px] rounded-full text-[10.5px] font-semibold bg-white border border-[#A56A4F]/40 text-[#5C473D] w-fit"
                      >
                        {{ reviewer }}
                      </span>
                    </div>
                  </td>

                  <!-- Status badges -->
                  <td class="py-5">
                    <div class="flex flex-col items-center gap-2">
                      <span
                        class="flex items-center justify-center h-[28px] w-[140px] rounded-full bg-[#C8EFC5] text-[#388A46] text-[10.5px] font-semibold"
                      >
                        Lengkap
                      </span>
                      <span
                        class="flex items-center justify-center h-[28px] w-[140px] rounded-full bg-[#C8EFC5] text-[#388A46] text-[10.5px] font-semibold"
                      >
                        Selesai Review
                      </span>
                    </div>
                  </td>

                  <!-- Tindakan -->
                  <td class="py-5 pl-4">
                    <div class="flex items-center gap-2">
                      <button
                        @click="handleApprove(item)"
                        class="border border-[#67B886] text-[#3A3A3A] bg-white rounded-[8px] text-[11px] font-medium px-[16px] py-[5px] hover:bg-[#F0FFF4] transition-all duration-200 active:scale-[0.97]"
                      >
                        Approve
                      </button>
                      <button
                        @click="toggleRevisi(item.id)"
                        :class="[
                          'border rounded-[8px] text-[11px] font-medium px-[16px] py-[5px] transition-all duration-200 active:scale-[0.97]',
                          expandedId === item.id
                            ? 'bg-[#FFF3CD] border-[#FFC107] text-[#856404]'
                            : 'border-[#C98A8A] text-[#3A3A3A] bg-white hover:bg-[#FFF8F8]'
                        ]"
                      >
                        Revisi
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Expand: Form Catatan Revisi -->
                <tr v-if="expandedId === item.id" :key="'revisi-' + item.id">
                  <td colspan="5" class="px-6 pb-4 pt-0 bg-white/20">
                    <div class="bg-white/80 backdrop-blur-sm border border-[#FFC107]/30 rounded-2xl p-5">
                      <p class="text-[12px] font-bold text-[#856404] mb-3 flex items-center gap-1.5">
                        ✏️ Catatan Revisi untuk
                        <span class="text-[#1C1209]">{{ item.judul }}</span>
                      </p>
                      <textarea
                        v-model="catatanRevisi[item.id]"
                        rows="3"
                        placeholder="Tuliskan catatan revisi yang perlu diperbaiki penulis..."
                        class="w-full px-4 py-3 rounded-xl border border-[#4E3629]/15 bg-white text-[13px] text-[#3D2E22] focus:outline-none focus:ring-2 focus:ring-[#4E3629]/20 resize-none placeholder:text-[#C4B5A8]"
                        style="font-family: 'Manrope', sans-serif;"
                      ></textarea>
                      <div class="flex justify-end gap-2 mt-3">
                        <button
                          @click="toggleRevisi(null)"
                          class="px-4 py-2 rounded-xl text-[12px] font-bold border border-[#4E3629]/20 text-[#8F8073] bg-white hover:bg-[#FAF7F2] transition-all duration-200"
                        >
                          Batal
                        </button>
                        <button
                          @click="submitRevisi(item)"
                          :disabled="!catatanRevisi[item.id]"
                          :class="[
                            'px-5 py-2 rounded-xl text-[12px] font-bold transition-all duration-200',
                            catatanRevisi[item.id]
                              ? 'bg-[#4E3629] text-white hover:bg-[#3a2920]'
                              : 'bg-[#D9C5B2] text-[#8F8073] cursor-not-allowed'
                          ]"
                        >
                          Kirim Catatan Revisi
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>

              </template>

              <!-- Empty state -->
              <tr v-if="naskahList.length === 0">
                <td colspan="5" class="py-16 text-center text-[#8F8073] text-[13px] font-semibold">
                  Tidak ada naskah yang perlu ditinjau saat ini.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-6 right-6 px-5 py-3.5 rounded-2xl shadow-lg text-[13px] font-bold flex items-center gap-2 z-50',
          toast.type === 'approve'
            ? 'bg-[#DEF7EC] text-[#0E9F6E] border border-[#0E9F6E]/20'
            : 'bg-[#FFF3CD] text-[#856404] border border-[#FFC107]/30'
        ]"
        style="font-family: 'Manrope', sans-serif;"
      >
        <span>{{ toast.type === 'approve' ? '✓' : '↩' }}</span>
        {{ toast.message }}
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'

const expandedId = ref(null)
const catatanRevisi = reactive({})
const toast = reactive({ show: false, message: '', type: '' })

// Dummy data — nanti diganti: GET /manuscripts?status=preprint
const naskahList = ref([
  {
    id: 1,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina'],
  },
  {
    id: 2,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina'],
  },
  {
    id: 3,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina'],
  },
])

function toggleRevisi(id) {
  expandedId.value = expandedId.value === id ? null : id
}

function showToast(message, type) {
  toast.show = true
  toast.message = message
  toast.type = type
  setTimeout(() => { toast.show = false }, 3000)
}

function handleApprove(item) {
  // TODO: PATCH /manuscripts/{item.id}/decision  body: { decision: 'approved' }
  console.log({ manuscript_id: item.id, decision: 'approved' })
  showToast(`"${item.judul}" berhasil di-approve!`, 'approve')
}

function submitRevisi(item) {
  if (!catatanRevisi[item.id]) return
  // TODO: PATCH /manuscripts/{item.id}/decision  body: { decision: 'revised', notes: catatanRevisi[item.id] }
  console.log({ manuscript_id: item.id, decision: 'revised', notes: catatanRevisi[item.id] })
  showToast(`Catatan revisi untuk "${item.judul}" terkirim!`, 'revisi')
  expandedId.value = null
  catatanRevisi[item.id] = ''
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 8px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(78,54,41,0.03); border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #735C4D; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }

.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px); }
</style>