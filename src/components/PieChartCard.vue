<template>
  <div class="bg-[#F4EEE6] rounded-[28px] p-8 shadow-md">
    <!-- TITLE -->
    <h2 class="text-[34px] font-semibold text-center text-[#2B1E18]">Total Rekap Naskah</h2>

    <div class="flex items-center justify-between mt-10">
      <!-- DONUT -->
      <div class="relative w-[260px] h-[260px]">
        <div
          class="w-full h-full rounded-full"
          style="background: conic-gradient(#4e382f 0% 65%, #b6906b 65% 90%, #ece7e1 90% 100%)"
        ></div>

        <!-- INNER CIRCLE -->
        <div
          class="absolute top-1/2 left-1/2 w-[150px] h-[150px] bg-[#F4EEE6] rounded-full -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>

      <!-- LEGEND -->
      <div class="space-y-8 mr-6">
        <!-- ITEM -->
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-full bg-[#4E382F]"></div>

          <div class="flex items-center gap-10">
            <span class="text-3xl text-[#2B1E18]"> Selesai </span>

            <span class="text-3xl font-bold text-[#2B1E18]"> 65% </span>
          </div>
        </div>

        <!-- ITEM -->
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-full bg-[#B6906B]"></div>

          <div class="flex items-center gap-10">
            <span class="text-3xl text-[#2B1E18]"> Berjalan </span>

            <span class="text-3xl font-bold text-[#2B1E18]"> 25% </span>
          </div>
        </div>

        <!-- ITEM -->
        <div class="flex items-center gap-5">
          <div class="w-12 h-12 rounded-full bg-[#ECE7E1] border"></div>

          <div class="flex items-center gap-10">
            <span class="text-3xl text-[#2B1E18]"> Belum Dimulai </span>

            <span class="text-3xl font-bold text-[#2B1E18]"> 10% </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
