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
            @click="activeMenu = item.name"
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

    <!-- Logout -->
    <button
      class="bg-[#4E3629] text-white py-3.5 px-4 rounded-2xl text-[14.5px] font-semibold
             hover:bg-[#3D281E] active:scale-[0.98] transition-all duration-200
             flex items-center justify-center gap-2.5 w-full mt-7 shadow-sm"
    >
      <LogOut :size="18" :stroke-width="1.75" />
      <span>Log Out</span>
    </button>

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import {
  LayoutDashboard,
  FileText,
  Users,
  CheckSquare,
  BarChart2,
  HelpCircle,
  Settings,
  LogOut
} from 'lucide-vue-next'

const activeMenu = ref('Dashboard')

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