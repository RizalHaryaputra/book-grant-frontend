<template>
  <section
    class="relative mt-8 rounded-[35px] overflow-hidden min-h-[420px] bg-cover bg-center"
    style="
      background-image:
        linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
        url(&quot;https://images.unsplash.com/photo-1512820790803-83ca734da794&quot;);
    "
  >
    <div class="p-10 flex justify-between h-full">
      <!-- LEFT CONTENT -->
      <div class="max-w-[55%] text-white">
        <p class="uppercase tracking-[4px] text-sm mb-8">Periode 2026 - 2027</p>

        <h2 class="text-2xl font-light uppercase tracking-[3px]">Total Penulis</h2>

        <h1 class="text-8xl font-bold mt-2 mb-6">150</h1>

        <p class="text-lg leading-9 text-gray-200">
          78% Penulis Terdaftar Telah Memvalidasi Kontrak Hibah, 47 Naskah Sedang Dalam Proses
          Peninjauan Aktif, Dan 18 Judul Sedang Dalam Antrean Untuk Dicetak Pada Kuartal Ini —
          Sehingga Program Ini Tetap Berada Di Jalur Yang Tepat Untuk Mencapai Target Publikasi
          Tahunannya.
        </p>

        <!-- Button -->
        <button
          class="mt-10 bg-white text-[#504137] px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
        >
          Lihat Detail
        </button>
      </div>

      <!-- RIGHT STAT CARDS -->
      <div class="grid grid-cols-2 gap-6 self-center">
        <!-- Card -->
        <div
          class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-[180px] h-[170px]"
        >
          <p class="text-white text-sm uppercase">Total Penulis</p>

          <h1 class="text-white text-6xl font-bold mt-3">150</h1>

          <div class="mt-5 h-5 rounded-full bg-white/80"></div>
        </div>

        <!-- Card -->
        <div
          class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-[180px] h-[170px]"
        >
          <p class="text-white text-sm uppercase">Sedang Di Review</p>

          <h1 class="text-white text-6xl font-bold mt-3">47</h1>

          <div class="mt-5 h-5 rounded-full bg-white/80"></div>
        </div>

        <!-- Card -->
        <div
          class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-[180px] h-[170px]"
        >
          <p class="text-white text-sm uppercase">Di Setujui</p>

          <h1 class="text-white text-6xl font-bold mt-3">117</h1>

          <div class="mt-5 h-5 rounded-full bg-white/80"></div>
        </div>

        <!-- Card -->
        <div
          class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-[180px] h-[170px]"
        >
          <p class="text-white text-sm uppercase">Siap Dicetak</p>

          <h1 class="text-white text-6xl font-bold mt-3">18</h1>

          <div class="mt-5 h-5 rounded-full bg-white/80"></div>
        </div>
      </div>
    </div>
  </section>
</template>
