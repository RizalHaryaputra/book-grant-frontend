<template>
  <div
    class="bg-white rounded-[28px] h-[88px] px-8 flex items-center justify-between shadow-sm mb-7"
  >
    <div>
      <h1 
        v-if="isDashboard" 
        class="text-[30px] font-extrabold tracking-[-2px] capitalize"
      >
        Selamat Datang, {{ userRole }}
      </h1>
    </div>

    <div class="flex items-center gap-5">
      <div class="text-right">
        <h3 class="font-bold text-sm">
          {{ userName }}
        </h3>
        <p class="text-[#8B8178] text-xs mt-1 capitalize">
          {{ userRole }}
        </p>
      </div>

      <img
        src="https://i.pravatar.cc/300"
        class="w-12 h-12 rounded-full object-cover"
        alt="User Avatar"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import apiClient from "../../services/api";

const route = useRoute();

const userName = ref("Memuat...");
const userRole = ref("User");

// Membuat logic pengecekan halaman (akan bernilai true jika di path /dashboard)
const isDashboard = computed(() => {
  return route.path === '/dashboard' || route.name === 'dashboard';
});

const fetchCurrentUser = async () => {
  try {
    // Memanggil API Kontrak Modul 1: GET /auth/me
    const response = await apiClient.get('/auth/me');
    
    // Menangkap data user dari backend
    const user = response.data?.data || response.data;
    
    if (user) {
      userName.value = user.name;
      // Handle format data dari backend
      userRole.value = user.role?.name || user.role || localStorage.getItem('user_role') || "User";
    }
  } catch (error) {
    console.error("Gagal mengambil data profil:", error);
    // Fallback: Jika gagal ambil nama
    userName.value = "Pengguna Sistem";
    userRole.value = localStorage.getItem('user_role') || "User";
  }
};

onMounted(() => {
  fetchCurrentUser();
});
</script>