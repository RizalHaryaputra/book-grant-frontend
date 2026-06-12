<template>
  <div class="dashboard">
    <Sidebar />

    <main class="main-content">
      <Topbar title="Upload Kontrak" placeholder="Cari..." />

      <div class="space-y-6">

        <!-- Upload Area -->
        <div class="bg-white rounded-[28px] shadow-sm p-8 border border-[#EBE4DE]">
          <h2 class="text-xl font-bold text-[#2B211C] mb-6">Unggah Dokumen Kontrak</h2>
          <p class="text-[#7C7169] mb-6">Pusat pengelolaan dokumen legalitas hibah buku</p>

          <div
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop"
            :class="[
              'border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center transition-all',
              isDragging ? 'border-[#4B3027] bg-[#FAF8F6]' : 'border-[#C6B29E] bg-[#FAF8F6]'
            ]"
          >
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
              accept=".pdf"
              @change="handleFileSelect"
            />

            <button @click="fileInput?.click()" class="bg-[#4B3027] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3A241D] transition">
              Pilih File
            </button>

            <p class="text-sm text-[#7C7169] mt-4">Format: .pdf | Maksimal 10 MB</p>

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
        <div class="flex justify-end">
          <button
            @click="submitContract"
            :disabled="!selectedFile || isSubmitting"
            class="px-12 py-4 rounded-xl font-bold text-base bg-[#4B3027] text-white hover:bg-[#3A241D] transition-all shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? "Mengunggah..." : "Submit Kontrak" }}
          </button>
        </div>

      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
import { uploadContract } from "../../services/contractService";
import api from "../../services/api";

const router = useRouter();

const fileInput = ref(null);
const selectedFile = ref(null);
const isDragging = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");

const MAX_SIZE = 10 * 1024 * 1024; // 10MB

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
  if (file.type !== "application/pdf") {
    errorMessage.value = "Format file tidak didukung. Gunakan PDF.";
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
    formData.append("contract_file", selectedFile.value);
    
    await uploadContract(formData);
    
    alert("Kontrak berhasil diunggah.");
    selectedFile.value = null;
    router.push("/status-kontrak");
  } catch (error) {
    console.error("Upload kontrak gagal:", error);
    let errMsg = error?.response?.data?.message || "Gagal mengunggah kontrak.";
    if (error?.response?.data?.errors) {
      const errs = error.response.data.errors;
      const detail = Object.values(errs).flat().join(", ");
      errMsg += " (" + detail + ")";
    }
    errorMessage.value = errMsg;
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  try {
    const response = await api.get('/author/contracts/my-contract');
    const data = response.data?.data;
    const latestContract = Array.isArray(data) ? data[0] : data;
    const status = latestContract?.status;
    if (response.data.success && status === 'validated') {
      router.push('/status-kontrak');
    }
  } catch (error) {
    console.log("Belum ada kontrak, silakan upload dokumen baru.", error);
  }
});
</script>

<style scoped>
.dashboard { display: flex; min-height: 100vh; background: #e8ded3; }
.main-content { flex: 1; padding: 25px; display: flex; flex-direction: column; gap: 20px; }
</style>