<template>
  <AdminLayout>
    <div class="space-y-6 w-full px-4 md:px-8 pb-10 pt-4">
      
      <div class="bg-white rounded-3xl shadow-sm px-8 py-6 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-extrabold text-[#2B211C]">Kontrak Hibah</h1>
          <p class="text-[#7C7169] mt-2">Pusat pengelolaan dokumen legalitas hibah buku</p>
        </div>
        <button 
          v-if="canUpload" 
          @click="showUploadModal = true" 
          class="bg-[#4B3027] text-white px-6 py-3 rounded-2xl font-bold hover:opacity-90 transition shadow-lg"
        >
          + Upload Kontrak
        </button>
      </div>

      <div class="bg-white rounded-3xl shadow-sm px-8 py-6 w-full">
        <div v-if="loading" class="text-center py-10 text-gray-500">Memuat data kontrak...</div>
        
        <div v-else class="overflow-hidden rounded-2xl border border-[#EBE4DE]">
          <table class="w-full">
            <thead class="bg-[#F5EEE8]">
              <tr>
                <th class="p-4 text-left font-semibold text-[#4B3027]">Nama Penulis</th>
                <th class="p-4 text-left font-semibold text-[#4B3027]">File Kontrak</th>
                <th class="p-4 text-center font-semibold text-[#4B3027]">Status</th>
                <th class="p-4 text-center font-semibold text-[#4B3027]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="contracts.length === 0">
                <td colspan="4" class="p-8 text-center text-gray-500">Belum ada dokumen kontrak yang diunggah.</td>
              </tr>
              <tr v-for="contract in contracts" :key="contract.id" class="border-b border-[#EBE4DE] hover:bg-[#FAF8F6] transition">
                <td class="p-4 text-[#2B211C]">{{ contract.author_profile?.user?.name || 'User ' + contract.author_profile_id }}</td>
                <td class="p-4 font-medium text-[#2B211C] truncate max-w-[200px]" :title="contract.file_url">
                  {{ contract.file_url ? contract.file_url.split('/').pop() : 'Tidak ada file' }}
                </td>
                <td class="p-4 text-center">
                  <span class="px-3 py-1 rounded-full text-xs font-bold" :class="statusClass(contract.status)">
                    {{ contract.status }}
                  </span>
                </td>
                <td class="p-4 text-center">
                  <button @click="openModal(contract)" class="bg-[#4B3027] text-white px-5 py-2 rounded-xl hover:bg-[#3A241D] transition font-medium">
                    {{ isAdmin ? 'Validasi' : 'Lihat Detail' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
      <div class="bg-[#F4EFEA] rounded-[32px] w-full max-w-[1280px] h-[85vh] flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
        
        <div class="w-full md:w-2/3 bg-white flex flex-col border-r border-[#D9C5B2] rounded-l-[32px]">
          <div class="flex items-center justify-between px-6 py-4 bg-[#F9F5F1] border-b border-[#D9C5B2] rounded-tl-[32px]">
            <div class="flex items-center gap-3">
              <div class="border border-red-500 text-red-500 p-1.5 rounded-lg flex items-center justify-center">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                </svg>
              </div>
              <span class="font-bold text-[#2B211C] truncate max-w-[300px] text-[15px]">
                {{ selectedContract.file_url ? selectedContract.file_url.split('/').pop() : 'Dokumen_Kontrak.pdf' }}
              </span>
            </div>
            
            <div class="hidden sm:flex items-center gap-4 bg-[#504137] text-white px-5 py-1.5 rounded-full text-sm font-medium">
              <span>1/51</span>
              <span>—</span>
              <span>100%</span>
              <span>+</span>
            </div>
            
            <div class="flex items-center gap-5 text-[#2B211C]">
              <svg class="w-6 h-6 cursor-pointer hover:text-[#4B3027]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              <svg class="w-6 h-6 cursor-pointer hover:text-[#4B3027]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </div>
          </div>
          
          <div class="flex-1 bg-gray-200 rounded-bl-[32px] overflow-hidden">
            <iframe 
              v-if="selectedContract.file_url" 
              :src="'http://localhost:8000/storage/' + selectedContract.file_url" 
              class="w-full h-full" 
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-500 font-medium">
              Tidak ada dokumen PDF
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/3 bg-[#F4EFEA] p-8 flex flex-col h-full overflow-y-auto rounded-r-[32px]">
          <h2 class="text-[22px] font-bold text-[#2B211C] mb-6">Informasi Kontrak</h2>
          
          <div class="space-y-4 flex-1">
            <div>
              <p class="text-[13px] text-[#7C7169] mb-0.5">Nama Penulis</p>
              <p class="font-bold text-[#2B211C] text-[15px]">{{ selectedContract.author_profile?.user?.name || '-' }}</p>
            </div>
            
            <div>
              <p class="text-[13px] text-[#7C7169] mb-0.5">Email</p>
              <p class="font-medium text-[#2B211C] text-[15px]">{{ selectedContract.author_profile?.user?.email || '-' }}</p>
            </div>
            
            <div>
              <p class="text-[13px] text-[#7C7169] mb-0.5">Institusi</p>
              <p class="font-medium text-[#2B211C] text-[15px]">{{ selectedContract.author_profile?.institution || 'Universitas Negeri Yogyakarta' }}</p>
            </div>
            
            <div>
              <p class="text-[13px] text-[#7C7169] mb-0.5">Judul Buku</p>
              <p class="font-bold text-[#2B211C] text-[15px]">{{ selectedContract.book_title || 'Algoritma Pemograman' }}</p>
            </div>
            
            <div>
              <p class="text-[13px] text-[#7C7169] mb-0.5">Jenis Buku</p>
              <p class="font-medium text-[#2B211C] text-[15px]">Buku Referensi</p>
            </div>

            <div class="pt-1">
              <p class="text-[13px] text-[#7C7169] mb-0.5">Tanggal Upload</p>
              <p class="font-medium text-[#2B211C] text-[15px]">3 Juni 2026</p>
            </div>

            <div>
              <p class="text-[13px] text-[#7C7169] mb-1.5">Status Kontrak</p>
              <span class="px-4 py-1 rounded-full text-xs font-bold bg-[#E6DDD4] text-[#4B3027] inline-block">
                {{ selectedContract.status }}
              </span>
            </div>

            <div class="pb-2">
              <p class="text-[13px] text-[#7C7169] mb-0.5">Tanggal Validasi</p>
              <p class="font-medium text-[#2B211C] text-[15px]">-</p>
            </div>
          </div>

          <hr class="border-[#D9C5B2] my-5" />

          <div class="space-y-3" v-if="isAdmin && selectedContract.status === 'pending'">
            
            <button @click="approveContract" class="w-full flex items-center px-5 py-3.5 bg-white border border-green-600 rounded-[14px] hover:bg-green-50 transition group">
              <div class="flex items-center justify-center w-8 h-8 rounded-full border border-green-600 text-green-600 mr-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <div class="text-left">
                <p class="font-bold text-green-600 text-[15px] leading-tight">Validasi Kontrak</p>
                <p class="text-[11px] text-green-600/70 mt-0.5">Setuju kontrak diunggah</p>
              </div>
            </button>

            <button @click="rejectContract" class="w-full flex items-center px-5 py-3.5 bg-white border border-red-500 rounded-[14px] hover:bg-red-50 transition group">
              <div class="flex items-center justify-center w-8 h-8 rounded-full border border-red-500 text-red-500 mr-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </div>
              <div class="text-left">
                <p class="font-bold text-red-500 text-[15px] leading-tight">Tolak Kontrak</p>
                <p class="text-[11px] text-red-500/70 mt-0.5">Tolak Kontrak dan berikan catatan</p>
              </div>
            </button>

            <a :href="'http://localhost:8000/storage/' + selectedContract.file_url" target="_blank" download class="w-full flex items-center px-5 py-3.5 bg-white border border-[#2B211C] rounded-[14px] hover:bg-gray-50 transition group">
              <div class="flex items-center justify-center w-8 h-8 rounded-full border border-[#2B211C] text-[#2B211C] mr-4">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </div>
              <div class="text-left">
                <p class="font-bold text-[#2B211C] text-[15px] leading-tight">Unduh File</p>
                <p class="text-[11px] text-gray-500 mt-0.5">Download Kontrak</p>
              </div>
            </a>
          </div>

          <div class="flex justify-end mt-6 pt-2">
            <button @click="showModal = false" class="px-6 py-1.5 border border-[#2B211C] text-[#2B211C] rounded-full text-sm font-bold hover:bg-[#EBE4DE] transition">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showUploadModal" class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <h2 class="text-2xl font-bold mb-6 text-[#2B211C]">Upload Kontrak Baru</h2>
        <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="handleFileUpload" />
        <button @click="fileInput?.click()" class="w-full py-6 border-2 border-dashed border-[#C6B29E] rounded-2xl text-[#4B3027] font-semibold hover:bg-[#F8F2EC] transition flex flex-col items-center justify-center gap-2">
          <svg class="w-8 h-8 text-[#C6B29E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
          {{ selectedFile ? selectedFile.name : 'Pilih File PDF' }}
        </button>
        <div class="flex gap-3 mt-8">
          <button @click="showUploadModal = false" class="flex-1 py-3 border border-[#EBE4DE] text-[#4B3027] rounded-xl font-semibold hover:bg-gray-50 transition">Batal</button>
          <button @click="submitContract" :disabled="isUploading" class="flex-1 py-3 bg-[#4B3027] text-white rounded-xl font-semibold hover:bg-[#3A241D] transition shadow-sm disabled:opacity-50">
            {{ isUploading ? 'Mengunggah...' : 'Submit' }}
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import AdminLayout from "../../components/layout/AdminLayout.vue"
import axios from "axios" 

const showModal = ref(false)
const showUploadModal = ref(false)
const fileInput = ref(null)
const selectedFile = ref(null)
const contracts = ref([]) 
const selectedContract = ref(null)
const loading = ref(true)
const isUploading = ref(false)

const userRole = localStorage.getItem("user_role")
const isAdmin = computed(() => userRole === 'admin')
const canUpload = computed(() => ['penulis', 'penerbit'].includes(userRole))

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const fetchContracts = async () => {
  loading.value = true
  try {
    const endpoint = isAdmin.value ? '/admin/contracts' : '/contracts/my-contract'
    const response = await api.get(endpoint)
    contracts.value = response.data.data || response.data
  } catch (error) {
    console.error("Gagal mengambil data kontrak:", error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchContracts()
})

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file?.type === 'application/pdf') selectedFile.value = file
  else alert("File harus berupa PDF")
}

const submitContract = async () => {
  if (!selectedFile.value) return alert("Pilih file PDF terlebih dahulu")
  
  isUploading.value = true
  const formData = new FormData()
  formData.append('contract_file', selectedFile.value) 

  try {
    await api.post('/author/contracts/upload', formData) 
    alert("Kontrak berhasil diunggah!")
    selectedFile.value = null
    showUploadModal.value = false
    await fetchContracts() 
  } catch (error) {
    console.error("Gagal upload:", error)
    alert("Gagal mengunggah dokumen. Silakan coba kembali beberapa saat lagi.")
  } finally {
    isUploading.value = false
  }
}

const openModal = (contract) => {
  selectedContract.value = contract;
  showModal.value = true;
}

const approveContract = async () => {
  if(!confirm("Yakin ingin memvalidasi kontrak ini?")) return;
  
  try {
    // KITA TAMBAHKAN DATA BODY: { status: 'validated' }
    await api.post(`/admin/contracts/${selectedContract.value.id}/validate`, {
      status: 'validated'
    });
    
    alert("Kontrak berhasil divalidasi!");
    showModal.value = false;
    await fetchContracts(); 
  } catch (error) {
    console.error("Error validasi:", error);
    alert("Gagal memvalidasi kontrak.");
  }
}

const rejectContract = async () => {
  const note = prompt("Masukkan alasan penolakan kontrak ini:");
  if (note === null) return; 
  if (note.trim() === '') {
    alert("Alasan penolakan tidak boleh kosong!");
    return;
  }
  
  try {
    // 1. URL DISAMAKAN DENGAN ROUTE (pakai /validate, bukan /reject)
    // 2. DATA BODY DISESUAIKAN DENGAN CONTROLLER (status dan rejection_reason)
    await api.post(`/admin/contracts/${selectedContract.value.id}/validate`, { 
      status: 'rejected',
      rejection_reason: note 
    });
    
    alert("Kontrak telah ditolak.");
    showModal.value = false;
    await fetchContracts();
  } catch (error) {
    console.error("Error penolakan:", error);
    alert("Gagal menolak kontrak.");
  }
}

const statusClass = (s) => ({
  'validated': 'bg-green-100 text-green-700 border border-green-200',
  'rejected': 'bg-red-100 text-red-700 border border-red-200',
  'pending': 'bg-yellow-100 text-yellow-700 border border-yellow-200'
}[s] || 'bg-gray-100 text-gray-700 border border-gray-200')
</script>