<template>
  <section
    class="relative mt-8 rounded-[35px] overflow-hidden min-h-[420px]"
    :style="{
      backgroundImage: `linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.50)), url('https://images.unsplash.com/photo-1512820790803-83ca734da794')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <div class="p-8 flex justify-between items-center h-full gap-8">

      <!-- LEFT CONTENT -->
      <div class="text-white flex-1">
        <p class="uppercase tracking-[4px] text-xs mb-5 text-white/60">Periode 2026 - 2027</p>
        <p class="uppercase tracking-[3px] text-sm font-light text-white/80 mb-1">Total Penulis</p>
        <h1 class="text-[90px] font-bold leading-none mb-5">150</h1>
        <p class="text-sm leading-7 text-white/75 max-w-[360px]">
          78% Penulis Terdaftar Telah Memvalidasi Kontrak Hibah, 47 Naskah
          Sedang Dalam Proses Peninjauan Aktif, Dan 18 Judul Sedang Dalam
          Antrean Untuk Dicetak Pada Kuartal Ini — Sehingga Program Ini Tetap
          Berada Di Jalur Yang Tepat Untuk Mencapai Target Publikasi Tahunannya.
        </p>
      </div>

      <!-- RIGHT STAT CARDS -->
      <div class="grid grid-cols-2 gap-3 flex-shrink-0">

        <!-- Card: Total Penulis -->
        <div class="rounded-[28px] p-7 flex flex-col justify-between"
          style="
            width: 210px; height: 210px;
            background: rgba(255,255,255,0.13);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.22);
          ">
          <p class="text-white text-[11px] font-semibold uppercase tracking-[2px] leading-tight">Total Penulis</p>
          <h2 class="text-white font-bold leading-none" style="font-size: 72px;">150</h2>
          <div></div>
        </div>

        <!-- Card: Sedang Di Review -->
        <div class="rounded-[28px] p-7 flex flex-col justify-between"
          style="
            width: 210px; height: 210px;
            background: rgba(255,255,255,0.13);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.22);
          ">
          <p class="text-white text-[11px] font-semibold uppercase tracking-[2px] leading-tight">Sedang Di Review</p>
          <h2 class="text-white font-bold leading-none" style="font-size: 72px;">47</h2>
          <button class="flex items-center gap-2 text-white text-[12px] font-medium px-4 py-2.5 rounded-full w-fit transition hover:opacity-80"
            style="background: rgba(80,50,35,0.85);">
            Lihat Daftar Naskah
            <ArrowUpRight :size="13" :stroke-width="2.5" />
          </button>
        </div>

        <!-- Card: Siap Di Setujui -->
        <div class="rounded-[28px] p-7 flex flex-col justify-between"
          style="
            width: 210px; height: 210px;
            background: rgba(255,255,255,0.13);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.22);
          ">
          <p class="text-white text-[11px] font-semibold uppercase tracking-[2px] leading-tight">Siap Di Setujui</p>
          <h2 class="text-white font-bold leading-none" style="font-size: 72px;">117</h2>
          <button class="flex items-center gap-2 text-white text-[12px] font-medium px-4 py-2.5 rounded-full w-fit transition hover:opacity-80"
            style="background: rgba(80,50,35,0.85);">
            Pemeriksaan
            <ArrowUpRight :size="13" :stroke-width="2.5" />
          </button>
        </div>

        <!-- Card: Siap Dicetak -->
        <div class="rounded-[28px] p-7 flex flex-col justify-between"
          style="
            width: 210px; height: 210px;
            background: rgba(255,255,255,0.13);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.22);
          ">
          <p class="text-white text-[11px] font-semibold uppercase tracking-[2px] leading-tight">Siap Dicetak</p>
          <h2 class="text-white font-bold leading-none" style="font-size: 72px;">117</h2>
          <button class="flex items-center gap-2 text-white text-[12px] font-medium px-4 py-2.5 rounded-full w-fit transition hover:opacity-80"
            style="background: rgba(80,50,35,0.85);">
            Lihat Rekap
            <ArrowUpRight :size="13" :stroke-width="2.5" />
          </button>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ArrowUpRight } from 'lucide-vue-next'
</script>