<template>
  <aside class="w-[260px] bg-white min-h-screen px-6 py-8 flex flex-col justify-between border-r border-[#4E3629]/10 shadow-sm flex-shrink-0">

    <!-- Logo -->
    <div>
      <div class="mb-8 px-1.5">
        <h1
          class="text-[26px] font-bold text-[#1C1209] leading-tight"
          style="font-family: 'Libre Caslon Text', serif;"
        >
          Sistem PBL
        </h1>
        <p class="text-[12.5px] text-[#8F8073] font-medium mt-0.5">
          Book Grant System
        </p>
      </div>

      <!-- Menu -->
      <nav>
        <ul class="flex flex-col gap-1">
          <li
            v-for="item in menuItems"
            :key="item.name"
            @click="navigateTo(item)"
            :class="[
              'flex items-center gap-3.5 px-4 py-[13px] rounded-2xl cursor-pointer transition-all duration-200 text-[14.5px]',
              activeMenu === item.name
                ? 'bg-[#4E3629] text-white font-semibold shadow-sm'
                : 'text-[#8F8073] font-medium hover:text-[#4E3629] hover:bg-[#FAF7F2]'
            ]"
          >
            <component
              :is="item.icon"
              :class="activeMenu === item.name ? 'text-white' : 'text-[#8F8073]'"
              :size="19"
              :stroke-width="1.75"
            />
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Log Out Button — pixel perfect sesuai Figma spec -->
    <!-- width:250px, height:41px, radius:10px, color:#412E28, shadow: 0 1 5 0 #00000040 -->
    <button
      @click="logout"
      class="w-full flex items-center justify-center gap-3 text-white font-semibold transition-colors duration-200 mt-auto select-none hover:brightness-110"
      style="
        height: 41px;
        border-radius: 10px;
        background-color: #412E28;
        box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.25);
        font-family: 'Manrope', sans-serif;
        font-size: 14.5px;
      "
    >
      <!-- Log-out door icon — sesuai tampilan di desain -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <!-- Door rectangle putih -->
        <rect x="3" y="2" width="13" height="20" rx="1.5" fill="white"/>
        <!-- Panah keluar ke kanan -->
        <path d="M15 12H22M22 12L19 9M22 12L19 15" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Log Out</span>
    </button>

  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  LayoutDashboard,
  FileText,
  Users,
  CheckSquare,
  BarChart2,
  HelpCircle,
  Settings,
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const routeMap = {
  Dashboard:    '/',
  DaftarNaskah: '/daftar-naskah',
  Pemeriksaan:  '/pemeriksaan',
  Keputusan:    '/keputusan',
  Rekap:        '/rekap',
  Support:      '/support',
  Settings:     '/settings',
}

const activeMenu = computed(() => {
  const match = Object.entries(routeMap).find(([, path]) => route.path === path)
  return match ? match[0] : ''
})

const navigateTo = (item) => {
  const path = routeMap[item.name]
  if (path && route.path !== path) {
    router.push(path)
  }
}

const logout = () => {
  // tambahkan logika logout di sini
  router.push('/login')
}

const menuItems = [
  { name: 'Dashboard',    label: 'Dashboard',     icon: LayoutDashboard },
  { name: 'DaftarNaskah', label: 'Daftar Naskah', icon: FileText        },
  { name: 'Pemeriksaan',  label: 'Pemeriksaan',   icon: Users           },
  { name: 'Keputusan',    label: 'Keputusan',     icon: CheckSquare     },
  { name: 'Rekap',        label: 'Rekap',         icon: BarChart2       },
  { name: 'Support',      label: 'Support',       icon: HelpCircle      },
  { name: 'Settings',     label: 'Settings',      icon: Settings        },
]
</script>