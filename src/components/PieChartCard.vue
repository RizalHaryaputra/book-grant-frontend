<template>
  <div class="bg-white rounded-[24px] p-6 shadow-sm border border-[#4E3629]/5 flex flex-col justify-between" style="height: 300px;">
    <!-- TITLE -->
    <h2 class="text-[17px] font-bold text-center text-[#4C3427] mb-2" style="font-family: 'Manrope', sans-serif;">
      Total Rekap Naskah
    </h2>

    <div class="flex items-center justify-around mt-4 flex-1">
      <!-- DONUT -->
      <div class="relative w-[150px] h-[150px] flex-shrink-0">
        <div
          class="w-full h-full rounded-full transition-all duration-500"
          :style="gradientStyle"
        ></div>

        <!-- INNER CIRCLE -->
        <div
          class="absolute top-1/2 left-1/2 w-[95px] h-[95px] bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>

      <!-- LEGEND -->
      <div class="space-y-3.5 pr-2">
        <!-- Item: Selesai -->
        <div class="flex items-center justify-between w-[180px]">
          <div class="flex items-center gap-3">
            <div class="w-[18px] h-[18px] rounded-full bg-[#4C3427]"></div>
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Disetujui</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">{{ approvedPct }}%</span>
        </div>

        <!-- Item: Berjalan -->
        <div class="flex items-center justify-between w-[180px]">
          <div class="flex items-center gap-3">
            <div class="w-[18px] h-[18px] rounded-full bg-[#A98467]"></div>
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Direvisi</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">{{ revisedPct }}%</span>
        </div>

        <!-- Item: Belum Dimulai -->
        <div class="flex items-center justify-between w-[180px]">
          <div class="flex items-center gap-3">
            <div class="w-[18px] h-[18px] rounded-full bg-[#EBE5DC] border border-[#4C3427]/10"></div>
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Belum Diperiksa</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">{{ preprintPct }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Calculate totals and percentages
const total = computed(() => 
  props.data.approved_count_this_month + 
  props.data.revised_count_this_month + 
  props.data.preprint_count
)

const approvedPct = computed(() => total.value === 0 ? 0 : Math.round((props.data.approved_count_this_month / total.value) * 100))
const revisedPct = computed(() => total.value === 0 ? 0 : Math.round((props.data.revised_count_this_month / total.value) * 100))
const preprintPct = computed(() => total.value === 0 ? 0 : Math.round((props.data.preprint_count / total.value) * 100))

// For conical gradient (start at 0, approved takes approvedPct, revised takes revisedPct, etc)
const gradientStyle = computed(() => {
  if (total.value === 0) return 'background: #EBE5DC'
  
  const stop1 = approvedPct.value
  const stop2 = stop1 + revisedPct.value
  
  return `background: conic-gradient(#4C3427 0% ${stop1}%, #A98467 ${stop1}% ${stop2}%, #EBE5DC ${stop2}% 100%)`
})
</script>
