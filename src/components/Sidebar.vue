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

    <!-- User Profile Card -->
    <div
      class="bg-[#4E3629] text-white p-4 rounded-2xl flex items-center gap-3.5 w-full mt-auto shadow-sm select-none"
    >
      <div class="w-[40px] h-[40px] rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center font-bold text-white shadow-inner">
        <span class="text-[15px] font-bold">S</span>
      </div>
      <div class="text-left leading-tight flex-1">
        <p class="text-[14.5px] font-bold" style="font-family: 'Manrope', sans-serif;">Sayanery</p>
        <p class="text-[11.5px] text-white/70 font-semibold" style="font-family: 'Manrope', sans-serif;">Penerbit</p>
      </div>
    </div>

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
  Settings
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const activeMenu = computed(() => {
  if (route.path === '/') return 'Dashboard'
  if (route.path === '/daftar-naskah') return 'DaftarNaskah'
  if (route.path === '/pemeriksaan') return 'Pemeriksaan'
  return ''
})

const navigateTo = (item) => {
  if (item.name === 'Dashboard') {
    router.push('/')
  } else if (item.name === 'DaftarNaskah') {
    router.push('/daftar-naskah')
  } else if (item.name === 'Pemeriksaan') {
    router.push('/pemeriksaan')
  } else {
    // Other routes could be mapped as well in the future
  }
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