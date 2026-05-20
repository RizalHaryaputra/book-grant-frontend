<template>
  <aside class="w-[230px] bg-[#F5ECE3] min-h-screen px-4 py-8 flex flex-col justify-between rounded-[24px]">

    <!-- Logo -->
    <div>
      <div class="mb-7 px-1.5">
        <h1
          class="text-[26px] font-bold text-[#1C1209] leading-tight"
          style="font-family: 'Libre Caslon Text', serif;"
        >
          Sistem PBL
        </h1>
        <p class="text-[12.5px] text-[#7A6A5A] font-medium mt-0.5">
          Book Grant System
        </p>
      </div>

      <!-- Menu -->
      <nav>
        <ul class="flex flex-col gap-px">
          <li
            v-for="item in menuItems"
            :key="item.name"
            @click="activeMenu = item.name"
            :class="[
              'flex items-center gap-3 px-3.5 py-[13px] rounded-2xl cursor-pointer transition-all duration-150 text-[14.5px]',
              activeMenu === item.name
                ? 'bg-[#2E1E12] text-white font-semibold'
                : 'text-[#3D2E22] font-medium hover:bg-[#EBE0D6]'
            ]"
          >
            <component
              :is="item.icon"
              :class="activeMenu === item.name ? 'text-white' : 'text-[#3D2E22]'"
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
      class="bg-[#2E1E12] text-white py-3.5 px-4 rounded-2xl text-[14.5px] font-semibold
             hover:bg-[#1e1209] active:scale-[0.98] transition-all duration-150
             flex items-center justify-center gap-2.5 w-full mt-7"
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