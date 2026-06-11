<template>
  <div class="min-h-screen bg-[#FAF7F4] py-10 px-4 md:px-10 relative">
    
    <!-- TOMBOL LOGOUT POJOK KANAN ATAS -->
    <button 
      @click="handleLogout" 
      class="absolute top-6 right-6 md:top-10 md:right-10 flex items-center gap-2 bg-[#4B3027] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#3A241D] transition shadow-sm z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
      Logout
    </button>

    <div class="space-y-6 max-w-5xl mx-auto mt-12 md:mt-0">
      <!-- Header -->
      <div class="bg-[#FAF8F6] rounded-[32px] px-10 py-9 border border-[#EBE4DE]/50">
        <h1 class="text-4xl font-extrabold text-[#2B211C]">Upload Kontrak</h1>
        <p class="text-[#7C7169] mt-3">Pusat pengelolaan dokumen legalitas hibah buku</p>
      </div>

      <!-- Upload Area -->
      <div class="bg-white rounded-[28px] shadow-sm p-8 border border-[#EBE4DE]">
        <div
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @drop.prevent="handleDrop"
          :class="[
            'border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all',
            isDragging ? 'border-[#4B3027] bg-[#FAF8F6]' : 'border-[#C6B29E] bg-[#FAF8F6]'
          ]"
        >
          <!-- Icon -->
          <div class="w-16 h-16 bg-[#F5EEE8] text-[#4B3027] rounded-full flex items-center justify-center mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>

          <h3 class="text-lg font-bold text-[#2B211C] text-center mb-4">
            Seret dan lepas dokumen Anda di sini atau pilih secara manual
          </h3>

          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".pdf,.docx,.txt"
            @change="handleFileSelect"
          />

          <button @click="fileInput?.click()" class="bg-[#4B3027] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3A241D] transition">
            Pilih File
          </button>

          <p class="text-sm text-[#7C7169] mt-4">Format: .pdf, .docx, .txt | Maksimal 10 MB</p>

          <!-- File Preview -->
          <div v-if="selectedFile" class="mt-6 bg-white border border-[#EBE4DE] rounded-xl p-4 w-full max-w-md flex items-center justify-between shadow-sm">
            <div class="overflow-hidden">
              <p class="font-semibold text-[#2B211C] truncate">{{ selectedFile.name }}</p>
              <p class="text-xs text-[#7C7169] mt-1">{{ formatFileSize(selectedFile.size) }}</p>
            </div>
            <button @click="removeSelectedFile" class="text-red-500 hover:text-red-700 font-medium">Hapus</button>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
        {{ errorMessage }}
      </div>

      <!-- Submit -->
      <div class="flex justify-center pt-4">
        <button
          @click="submitContract"
          :disabled="!selectedFile || isSubmitting"
          class="px-16 py-4 rounded-xl font-bold text-lg bg-[#4B3027] text-white hover:bg-[#3A241D] transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? "Mengunggah..." : "Submit Kontrak" }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { uploadContract } from "../../services/contractService";
import api from "../../services/api"; // <-- Import api.js untuk fungsi logout

const router = useRouter();

const fileInput = ref(null);
const selectedFile = ref(null);
const isDragging = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

const ALLOWED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain"
];

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

// FUNGSI LOGOUT
const handleLogout = async () => {
  if (!confirm("Apakah Anda yakin ingin keluar?")) return;
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error("Gagal logout:", error);
  } finally {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("current_user");
    localStorage.removeItem("user_role");
    router.push('/login');
  }
};

const handleDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file) validateAndSetFile(file);
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) validateAndSetFile(file);
};

const validateAndSetFile = (file) => {
  errorMessage.value = "";
  if (!ALLOWED_TYPES.includes(file.type)) {
    errorMessage.value = "Format file tidak didukung. Gunakan PDF, DOCX, atau TXT.";
    return;
  }
  if (file.size > MAX_SIZE) {
    errorMessage.value = "Ukuran file melebihi batas maksimum 10 MB.";
    return;
  }
  selectedFile.value = file;
};

const removeSelectedFile = () => {
  selectedFile.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

const formatFileSize = (bytes) => {
  if (!bytes) return "-";
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(2)} KB`;
};

const submitContract = async () => {
  if (!selectedFile.value) return;

  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append("contract_file", selectedFile.value); // Pastikan ini cocok dengan Laravel!
    
    await uploadContract(formData);
    
    alert("Kontrak berhasil diunggah.");
    selectedFile.value = null;
    router.push("/status-kontrak");
  } catch (error) {
    console.error("Upload kontrak gagal:", error);
    errorMessage.value = error?.response?.data?.message || "Gagal mengunggah kontrak.";
  } finally {
    isSubmitting.value = false;
  }
};

// ==========================================
// CCTV PENGALIHAN OTOMATIS (SANGAT TEGAS)
// ==========================================
onMounted(async () => {
  try {
    const response = await api.get('/author/contracts/my-contract');
    
    // JIKA DATA ADA (Apapun statusnya: uploaded, validated, atau rejected)
    if (response.data.success && response.data.data) {
      console.log("CCTV Check - Kontrak ditemukan, paksa ke halaman status.");
      router.push('/status-kontrak');
    }
  } catch (error) {
    // Hanya jika error 404 (Belum pernah upload), dia diizinkan diam di halaman ini
    console.log("CCTV Check - Belum ada kontrak, silakan upload dokumen baru.");
  }
});

</script>