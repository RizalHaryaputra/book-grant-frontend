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
          class="w-full h-full rounded-full"
          style="background: conic-gradient(#4C3427 0% 65%, #A98467 65% 90%, #EBE5DC 90% 100%)"
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
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Selesai</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">65%</span>
        </div>

        <!-- Item: Berjalan -->
        <div class="flex items-center justify-between w-[180px]">
          <div class="flex items-center gap-3">
            <div class="w-[18px] h-[18px] rounded-full bg-[#A98467]"></div>
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Berjalan</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">25%</span>
        </div>

        <!-- Item: Belum Dimulai -->
        <div class="flex items-center justify-between w-[180px]">
          <div class="flex items-center gap-3">
            <div class="w-[18px] h-[18px] rounded-full bg-[#EBE5DC] border border-[#4C3427]/10"></div>
            <span class="text-[13.5px] font-semibold text-[#8F8073]" style="font-family: 'Poppins', sans-serif;">Belum Dimulai</span>
          </div>
          <span class="text-[14px] font-extrabold text-[#4C3427]" style="font-family: 'Manrope', sans-serif;">10%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
