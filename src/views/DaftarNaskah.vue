<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 flex flex-col h-screen overflow-hidden">
      <TopNavbar title="Daftar Naskah" />

      <div class="mt-6 flex-1 bg-white border border-white/40 rounded-[28px] p-6 shadow-sm overflow-hidden flex flex-col">
        <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="item in naskahList"
              :key="item.id"
              class="bg-white rounded-[20px] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.015)] border border-[#4E3629]/5 flex flex-col gap-2 hover:shadow-[0_12px_40px_rgba(78,54,41,0.05)] hover:border-[#4E3629]/10 transition-all duration-300 group"
            >
              <!-- Cover — klik di sini untuk preview -->
              <div
                class="w-full relative overflow-hidden rounded-[14px] cursor-pointer"
                @click="bukaPreview(item)"
              >
                <BookCover :title="item.coverTitle" :author="item.coverAuthor" />
              </div>

              <!-- Details -->
              <div class="flex flex-col gap-1 px-1">
                <h3
                  class="text-[13px] font-extrabold text-[#1C1209] group-hover:text-[#4E3629] transition-colors duration-200 leading-snug"
                  style="font-family: 'Manrope', sans-serif;"
                >
                  {{ item.title }}
                </h3>
                <div
                  class="flex items-center gap-1.5 text-[11px] text-[#8F8073] font-semibold mt-0.5"
                  style="font-family: 'Manrope', sans-serif;"
                >
                  <span>{{ item.author }}</span>
                  <span class="w-1 h-1 rounded-full bg-[#8F8073]/30"></span>
                  <span>{{ item.type }}</span>
                </div>
                <p
                  class="text-[10px] text-[#A19489] font-medium mt-0.5"
                  style="font-family: 'Manrope', sans-serif;"
                >
                  {{ item.timeAgo }}
                </p>
              </div>

              <!-- Status Badges -->
              <div class="flex flex-wrap gap-1.5 px-1 mt-auto pt-1">
                <span
                  v-for="status in item.statuses"
                  :key="status"
                  :class="[
                    'px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide text-center flex items-center justify-center transition-colors duration-200',
                    getStatusClass(status)
                  ]"
                  style="font-family: 'Manrope', sans-serif;"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'
import BookCover from '../components/BookCover.vue'
import { getPrePrintManuscripts } from '../services/publisherService'

const router = useRouter()

const naskahList = ref([])
const loading = ref(true)

const loadManuscripts = async () => {
  try {
    const data = await getPrePrintManuscripts()
    naskahList.value = data.items.map(item => ({
      id: item.id,
      title: item.title,
      author: item.author_name,
      type: 'Buku Ajar', // Assuming a default or could come from API
      timeAgo: new Date(item.submitted_at).toLocaleDateString(),
      coverTitle: item.title,
      coverAuthor: item.author_name,
      statuses: [
        item.cover_checked ? 'Cover Selesai' : 'Cover Pending',
        item.pages_checked ? 'Halaman Selesai' : 'Halaman Pending',
        item.admin_checked ? 'Admin Selesai' : 'Admin Pending'
      ]
    }))
  } catch (e) {
    console.error("Gagal memuat daftar naskah", e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadManuscripts()
})

const bukaPreview = (item) => {
  router.push({ name: 'daftar-naskah-preview', params: { id: item.id } })
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
.custom-scrollbar::-webkit-scrollbar { width: 7px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #B09A8A; border-radius: 99px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4E3629; }
</style>
