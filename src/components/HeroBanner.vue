<template>
  <section
    class="relative rounded-[40px] overflow-hidden min-h-[420px] shadow-xl border border-black/15 transition-all duration-300"
    :style="{
      backgroundImage: `linear-gradient(135deg, rgba(35, 30, 27, 0.88) 0%, rgba(48, 41, 36, 0.78) 50%, rgba(24, 21, 19, 0.88) 100%), url('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 62%'
    }"
  >
    <div class="p-10 flex flex-col lg:flex-row justify-between items-center h-full gap-10">

      <!-- LEFT CONTENT -->
      <div class="text-white flex-1 flex flex-col justify-between h-full">
        <div>
          <!-- Periode Label -->
          <p class="uppercase tracking-[0.25em] text-[11.5px] font-extrabold text-white/50 mb-7" style="font-family: 'Manrope', sans-serif;">
            PERIODE 2026 -2027
          </p>
          
          <!-- Total Penulis Main Title -->
          <p class="uppercase tracking-[0.2em] text-[12px] font-bold text-white/50 mb-1" style="font-family: 'Manrope', sans-serif;">
            TOTAL PENULIS
          </p>
          <h1 class="text-[96px] font-extrabold leading-none mb-5 tracking-tight" style="font-family: 'Manrope', sans-serif;">
            150
          </h1>
          
          <!-- Description Paragraph -->
          <p class="text-[13.5px] leading-[1.85] text-white/70 max-w-[480px] font-light" style="font-family: 'Poppins', sans-serif;">
            78% Penulis Terdaftar Telah Memvalidasi Kontrak Hibah, 47 Naskah
            Sedang Dalam Proses Peninjauan Aktif, Dan 18 Judul Sedang Dalam
            Antrean Untuk Dicetak Pada Kuartal Ini — Sehingga Program Ini Tetap
            Berada Di Jalur Yang Tepat Untuk Mencapai Target Publikasi Tahunannya.
          </p>
        </div>
      </div>

      <!-- RIGHT STAT CARDS -->
      <div class="grid grid-cols-2 gap-5 flex-shrink-0">

        <!-- Card 1: Total Penulis -->
        <div class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
          style="
            width: 195px; height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          ">
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px] leading-tight" style="font-family: 'Manrope', sans-serif;">TOTAL PENULIS</p>
            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px; font-family: 'Manrope', sans-serif;">150</h2>
          </div>
          <!-- Card 1 has no pill at the bottom as per user design image -->
          <div class="h-[28px]"></div>
        </div>

        <!-- Card 2: Sedang Di Review -->
        <div class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
          style="
            width: 195px; height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          ">
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px] leading-tight" style="font-family: 'Manrope', sans-serif;">SEDANG DI REVIEW</p>
            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px; font-family: 'Manrope', sans-serif;">47</h2>
          </div>
          <div class="flex items-center">
            <button class="bg-[#3D2C22]/85 hover:bg-[#3D2C22] text-white/95 text-[10.5px] font-medium py-1.5 px-3.5 rounded-full flex items-center gap-1 transition-all duration-200 cursor-pointer border border-white/5 active:scale-[0.97]" style="font-family: 'Poppins', sans-serif;">
              Lihat Daftar Naskah <span class="text-[9px] font-bold leading-none">↗</span>
            </button>
          </div>
        </div>

        <!-- Card 3: Siap Di Setujui -->
        <div class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
          style="
            width: 195px; height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          ">
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px] leading-tight" style="font-family: 'Manrope', sans-serif;">SIAP DI SETUJUI</p>
            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px; font-family: 'Manrope', sans-serif;">117</h2>
          </div>
          <div class="flex items-center">
            <button class="bg-[#3D2C22]/85 hover:bg-[#3D2C22] text-white/95 text-[10.5px] font-medium py-1.5 px-3.5 rounded-full flex items-center gap-1 transition-all duration-200 cursor-pointer border border-white/5 active:scale-[0.97]" style="font-family: 'Poppins', sans-serif;">
              Pemeriksaan <span class="text-[9px] font-bold leading-none">↗</span>
            </button>
          </div>
        </div>

        <!-- Card 4: Siap Dicetak -->
        <div class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl"
          style="
            width: 195px; height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          ">
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px] leading-tight" style="font-family: 'Manrope', sans-serif;">SIAP DICETAK</p>
            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px; font-family: 'Manrope', sans-serif;">117</h2>
          </div>
          <div class="flex items-center">
            <button class="bg-[#3D2C22]/85 hover:bg-[#3D2C22] text-white/95 text-[10.5px] font-medium py-1.5 px-3.5 rounded-full flex items-center gap-1 transition-all duration-200 cursor-pointer border border-white/5 active:scale-[0.97]" style="font-family: 'Poppins', sans-serif;">
              Lihat Rekap <span class="text-[9px] font-bold leading-none">↗</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
</script>