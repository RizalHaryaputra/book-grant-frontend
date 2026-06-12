<template>
  <div class="sidebar">

    <div class="brand">
      <h1 class="logo">Sistem PBL</h1>
      <p class="subtitle">Book Grant System</p>
    </div>

    <nav class="menu">
      <router-link 
        v-for="item in currentMenu" 
        :key="item.path"
        :to="item.path" 
        class="menu-item" 
        exact-active-class="router-link-active"
      >
        <component :is="item.icon" class="icon" :size="18" :stroke-width="2" />
        {{ item.label }}
      </router-link>
    </nav>

    <div class="logout-wrapper">
      <button class="logout-btn" @click="logout">Log Out</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AppSidebar'
}
</script>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  LayoutDashboard,
  Users,
  FileText,
  FileSignature,
  BookOpen,
  CheckSquare,
  BarChart2,
  Settings,
  Upload,
  HelpCircle
} from 'lucide-vue-next'

const router = useRouter()
const role = ref('')

onMounted(() => {
  const currentUserRaw = localStorage.getItem("current_user")
  if (currentUserRaw) {
    try {
      const userObj = JSON.parse(currentUserRaw)
      if (userObj && userObj.role) {
        if (typeof userObj.role === "string") {
          role.value = userObj.role.toLowerCase()
        } else if (typeof userObj.role === "object") {
          const roleName = userObj.role.name || userObj.role.role_name || userObj.role.nama || ""
          role.value = String(roleName).toLowerCase()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
})

const adminMenu = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Manajemen User', path: '/users', icon: Users },
  { label: 'Hibah Buku', path: '/hibah', icon: FileText },
  { label: 'Kontrak', path: '/contracts', icon: FileSignature },
  { label: 'Proposal Buku (M3)', path: '/admin/proposal-buku', icon: BookOpen },
  { label: 'Plotting Reviewer', path: '/admin/plotting-reviewer', icon: Users },
  { label: 'Monitoring Reviewer', path: '/admin/monitoring-reviewer', icon: BarChart2 },
  { label: 'Kompilasi Review', path: '/admin/kompilasi-hasil-review', icon: CheckSquare },
  { label: 'Rubrik Penilaian', path: '/admin/rubrik-penilaian', icon: FileText },
]

const penulisMenu = [
  { label: 'Dashboard', path: '/dashboard-penulis', icon: LayoutDashboard },
  { label: 'Upload Kontrak', path: '/upload-kontrak', icon: FileSignature },
  { label: 'Status Kontrak', path: '/status-kontrak', icon: CheckSquare },
  { label: 'Buku Saya', path: '/buku-saya', icon: BookOpen },
  { label: 'Upload Draft', path: '/upload-draft', icon: Upload },
  { label: 'Support', path: '/support', icon: HelpCircle },
]

const reviewerMenu = [
  { label: 'Dashboard', path: '/reviewer/dashboard', icon: LayoutDashboard },
  { label: 'Daftar Tugas', path: '/reviewer/daftar-tugas', icon: FileText },
  { label: 'Rubrik Penilaian', path: '/reviewer/rubrik-penilaian', icon: CheckSquare },
  { label: 'Riwayat Review', path: '/reviewer/riwayat-review', icon: BarChart2 },
  { label: 'Support', path: '/reviewer/support', icon: HelpCircle },
]

const publisherMenu = [
  { label: 'Dashboard', path: '/publisher/dashboard', icon: LayoutDashboard },
  { label: 'Daftar Naskah', path: '/publisher/daftar-naskah', icon: FileText },
  { label: 'Pemeriksaan', path: '/publisher/pemeriksaan', icon: Users },
  { label: 'Keputusan', path: '/publisher/keputusan', icon: CheckSquare },
  { label: 'Rekap', path: '/publisher/rekap', icon: BarChart2 },
  { label: 'Settings', path: '/publisher/settings', icon: Settings },
]

const currentMenu = computed(() => {
  if (role.value === 'admin') return adminMenu
  if (role.value === 'reviewer') return reviewerMenu
  if (role.value === 'penerbit' || role.value === 'publisher') return publisherMenu
  return penulisMenu // fallback / penulis / author
})

const logout = () => {
  localStorage.clear()
  sessionStorage.clear()
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  min-width: 260px;
  min-height: 100vh;
  background: #F8F5F0;
  border-right: 1px solid #ECE5DB;
  padding: 32px 22px;
  display: flex;
  flex-direction: column;
}

.brand { margin-bottom: 42px; }
.logo { font-size: 28px; font-weight: 700; color: #3A2A20; margin: 0; line-height: 1.1; }
.subtitle { margin-top: 8px; font-size: 13px; color: #7A6D61; }

.menu { display: flex; flex-direction: column; gap: 4px; overflow-y: auto; }

.menu-item {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  text-decoration: none;
  color: #54433A;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  transition: .2s;
}
.menu-item:hover { background: #EDE5DC; }
.router-link-active { background: #7A6151; color: white; }

.icon {
  flex-shrink: 0;
}

.logout-wrapper { margin-top: auto; padding-top: 24px; }
.logout-btn {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #7A6151;
  color: white;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}
</style>
