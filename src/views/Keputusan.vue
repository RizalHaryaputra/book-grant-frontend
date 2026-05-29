<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <TopNavbar title="Halaman Keputusan Terbit" />

      <div class="mt-6 flex-1 bg-white border border-white/40 rounded-[28px] shadow-sm overflow-hidden flex flex-col">
        <div class="flex-1 overflow-y-auto custom-scrollbar">
          <table class="min-w-full text-left border-collapse" style="table-layout: fixed;">

            <colgroup>
              <col style="width: 28%;" />
              <col style="width: 14%;" />
              <col style="width: 20%;" />
              <col style="width: 18%;" />
              <col style="width: 20%;" />
            </colgroup>

            <thead>
              <tr style="border-bottom: 1.5px solid rgba(78,54,41,0.10);">
                <th style="padding: 18px 24px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; background: #fffff; letter-spacing: 0.10em; text-transform: uppercase;">Judul Naskah</th>
                <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; background: #fffff; letter-spacing: 0.10em; text-transform: uppercase;">Kategori</th>
                <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; background: #fffff; letter-spacing: 0.10em; text-transform: uppercase; text-align: center;">Reviewer</th>
                <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; background: #fffff; letter-spacing: 0.10em; text-transform: uppercase; text-align: center;">Status</th>
                <th style="padding: 18px 16px; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; color: #4E3629; background: #fffff; letter-spacing: 0.10em; text-transform: uppercase; text-align: center;">Tindakan</th>
              </tr>
            </thead>

            <tbody>
              <template v-for="item in naskahList" :key="item.id">
                <tr
                  style="border-bottom: 1px solid rgba(78,54,41,0.07); transition: background 0.15s;"
                  class="hover:bg-white/20"
                >
                  <!-- Judul -->
                  <td style="padding: 22px 24px; font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 600; color: #1C1209; line-height: 1.35; word-break: break-word; position: relative;">
                    <div style="position: absolute; left: 0; top: 0; height: 100%; width: 4px; background: #2C8C50; border-radius: 0 4px 4px 0;"></div>
                    {{ item.judul }}
                  </td>

                  <!-- Kategori -->
                  <td style="padding: 22px 16px; font-family: 'Manrope', sans-serif; font-size: 13.5px; font-weight: 400; color: rgba(78,54,41,0.70);">
                    {{ item.kategori }}
                  </td>

                  <!-- Reviewer -->
                  <td style="padding: 22px 16px; text-align: center;">
                    <div style="display: flex; flex-wrap: wrap; gap: 7px; justify-content: center; align-items: center;">
                      <template v-if="item.reviewers && item.reviewers.length > 0">
                        <span
                          v-for="reviewer in item.reviewers"
                          :key="reviewer"
                          style="display: inline-flex; align-items: center; background: #fff; border: 1.5px solid rgba(160,100,60,0.35); border-radius: 99px; padding: 5px 14px; font-family: 'Manrope', sans-serif; font-size: 12.5px; font-weight: 500; color: #5C3D28; white-space: nowrap;"
                        >{{ reviewer }}</span>
                      </template>
                      <template v-else>
                        <span style="display: inline-flex; align-items: center; background: transparent; border: 1.5px dashed rgba(143,128,115,0.50); border-radius: 99px; padding: 5px 14px; font-family: 'Manrope', sans-serif; font-size: 12px; font-weight: 400; color: rgba(143,128,115,0.80); white-space: nowrap;">
                          Belum ada Reviewer
                        </span>
                      </template>
                    </div>
                  </td>

                  <!-- Status -->
                  <td style="padding: 22px 16px; text-align: center;">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: 7px;">
                      <span style="display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; padding: 5px 16px; font-family: 'Manrope', sans-serif; font-size: 11.5px; font-weight: 600; white-space: nowrap; background: #DEF7EC; color: #0E9F6E; border: 1px solid #c3f0dc;">
                        Lengkap
                      </span>
                      <span style="display: inline-flex; align-items: center; justify-content: center; border-radius: 99px; padding: 5px 16px; font-family: 'Manrope', sans-serif; font-size: 11.5px; font-weight: 600; white-space: nowrap; background: #DEF7EC; color: #0E9F6E; border: 1px solid #c3f0dc;;">
                        Selesai Review
                      </span>
                    </div>
                  </td>

                  <!-- Tindakan -->
                  <td style="padding: 22px 16px; text-align: center;">
                    <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                      <button
                        @click="handleApprove(item)"
                        style="border: 1.5px solid #67B886; color: #3A3A3A; background: #fff; border-radius: 8px; font-size: 12px; font-weight: 500; padding: 5px 16px; font-family: 'Manrope', sans-serif; cursor: pointer; transition: background 0.2s;"
                        onmouseover="this.style.background='#F0FFF4'"
                        onmouseout="this.style.background='#fff'"
                      >
                        Approve
                      </button>
                      <button
                        @click="toggleRevisi(item.id)"
                        :style="expandedId === item.id
                          ? 'border: 1.5px solid #FFC107; background: #FFF3CD; color: #856404; border-radius: 8px; font-size: 12px; font-weight: 500; padding: 5px 16px; font-family: Manrope, sans-serif; cursor: pointer;'
                          : 'border: 1.5px solid #C98A8A; background: #fff; color: #3A3A3A; border-radius: 8px; font-size: 12px; font-weight: 500; padding: 5px 16px; font-family: Manrope, sans-serif; cursor: pointer;'"
                      >
                        Revisi
                      </button>
                    </div>
                  </td>
                </tr>

                <!-- Expand: Form Catatan Revisi -->
                <tr v-if="expandedId === item.id" :key="'revisi-' + item.id">
                  <td colspan="5" style="padding: 0 24px 16px 24px; background: rgba(255,255,255,0.20);">
                    <div style="background: rgba(255,255,255,0.80); backdrop-filter: blur(8px); border: 1px solid rgba(255,193,7,0.30); border-radius: 16px; padding: 20px;">
                      <p style="font-family: 'Manrope', sans-serif; font-size: 12px; font-weight: 700; color: #856404; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
                        ✏️ Catatan Revisi untuk
                        <span style="color: #1C1209;">{{ item.judul }}</span>
                      </p>
                      <textarea
                        v-model="catatanRevisi[item.id]"
                        rows="3"
                        placeholder="Tuliskan catatan revisi yang perlu diperbaiki penulis..."
                        style="width: 100%; padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(78,54,41,0.15); background: #fff; font-size: 13px; font-family: 'Manrope', sans-serif; color: #3D2E22; outline: none; resize: none; box-sizing: border-box;"
                      ></textarea>
                      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px;">
                        <button
                          @click="toggleRevisi(null)"
                          style="padding: 8px 16px; border-radius: 12px; font-size: 12px; font-weight: 700; border: 1px solid rgba(78,54,41,0.20); color: #8F8073; background: #fff; font-family: 'Manrope', sans-serif; cursor: pointer;"
                        >
                          Batal
                        </button>
                        <button
                          @click="submitRevisi(item)"
                          :disabled="!catatanRevisi[item.id]"
                          :style="catatanRevisi[item.id]
                            ? 'padding: 8px 20px; border-radius: 12px; font-size: 12px; font-weight: 700; background: #4E3629; color: #fff; border: none; font-family: Manrope, sans-serif; cursor: pointer;'
                            : 'padding: 8px 20px; border-radius: 12px; font-size: 12px; font-weight: 700; background: #D9C5B2; color: #8F8073; border: none; font-family: Manrope, sans-serif; cursor: not-allowed;'"
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
                <td colspan="5" style="padding: 64px 16px; text-align: center; font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 600; color: #8F8073;">
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
          'fixed bottom-6 right-6 px-5 py-3.5 rounded-2xl shadow-lg z-50',
          toast.type === 'approve'
            ? 'bg-[#DEF7EC] text-[#0E9F6E] border border-[#0E9F6E]/20'
            : 'bg-[#FFF3CD] text-[#856404] border border-[#FFC107]/30'
        ]"
        style="font-family: 'Manrope', sans-serif; font-size: 13px; font-weight: 700; display: flex; align-items: center; gap: 8px;"
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
  console.log({ manuscript_id: item.id, decision: 'approved' })
  showToast(`"${item.judul}" berhasil di-approve!`, 'approve')
}

function submitRevisi(item) {
  if (!catatanRevisi[item.id]) return
  console.log({ manuscript_id: item.id, decision: 'revised', notes: catatanRevisi[item.id] })
  showToast(`Catatan revisi untuk "${item.judul}" terkirim!`, 'revisi')
  expandedId.value = null
  catatanRevisi[item.id] = ''
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 7px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #B09A8A; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px); }
</style>