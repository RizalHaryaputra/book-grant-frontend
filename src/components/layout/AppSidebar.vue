<template>
  <aside
    class="w-[280px] min-h-screen overflow-y-auto bg-[#FAF7F4] border-r border-[#E9DED3] px-6 py-7 flex flex-col justify-between"
  >
    <div>
      <div class="mb-12">
        <div class="flex items-end gap-2">
          <h1 class="text-[34px] leading-[0.95] tracking-[-2px] font-extrabold text-[#2B211B]">
            Sistem
          </h1>
          <h1 class="text-[34px] leading-[0.95] tracking-[-2px] font-extrabold text-[#504137]">
            PBL
          </h1>
        </div>
        <p class="text-[#8B8178] text-sm mt-4 leading-relaxed">
          Sistem Penulisan Hibah Buku
        </p>
      </div>

      <nav class="space-y-2">
        <RouterLink
          v-for="item in filteredMenus"
          :key="item.name"
          :to="item.path"
          class="menu-item"
          active-class="menu-active"
        >
          <component
            :is="item.icon"
            :size="22"
            stroke-width="2.2"
          />
          <span>{{ item.name }}</span>
        </RouterLink>
      </nav>
    </div>

    <div>
      <button
        @click="handleLogout"
        class="w-full h-[58px] rounded-[18px] bg-[#504137] text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-3"
      >
        <LogOut :size="20" />
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  FileUp, // Mengimpor ikon baru untuk Upload Kontrak
  CircleHelp,
  Settings,
  LogOut,
} from "lucide-vue-next"

import { useAuth } from "../../composables/useAuth"

const { logout } = useAuth()
const userRole = localStorage.getItem('user_role') || ''

// Definisi Matriks Akses Menu
const allMenus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard, roles: ['admin']},
  { name: "Pengajuan Hibah", path: "/hibah", icon: BookOpen, roles: ['admin'] },
  { name: "Manajemen User", path: "/users", icon: Users, roles: ['admin'] },
  { name: "Kontrak Hibah", path: "/contracts", icon: FileText, roles: ['admin', 'penerbit'] },
  // === MENU UPLOAD KONTRAK BARU ===
  { name: "Upload Kontrak", path: "/upload-kontrak", icon: FileUp, roles: ['penulis'] },
]

// Filter otomatis berdasarkan role user yang sedang login
const filteredMenus = computed(() => {
  return allMenus.filter(item => item.roles.includes(userRole.toLowerCase()))
})

const handleLogout = async () => {
  await logout()
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 68px;
  padding: 0 22px;
  border-radius: 22px;
  text-decoration: none;
  color: #6C5B4F;
  font-size: 15px;
  font-weight: 700;
  transition: all .25s ease;
}
.menu-item:hover { background: #F3EBE3; }
.menu-active {
  background: #504137;
  color: white;
  box-shadow: 0 10px 30px rgba(80,65,55,.18);
}
.menu-active :deep(svg) { color: white; }
</style>