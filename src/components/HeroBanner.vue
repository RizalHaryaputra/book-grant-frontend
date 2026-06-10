<template>
  <section
    class="relative rounded-[40px] overflow-hidden min-h-[420px] lg:min-h-[480px] shadow-xl border border-black/15 transition-all duration-300"
    :style="{
      backgroundImage: `linear-gradient(135deg, rgba(35, 30, 27, 0.88) 0%, rgba(48, 41, 36, 0.78) 50%, rgba(24, 21, 19, 0.88) 100%), url('https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=1200&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 62%',
    }"
  >
    <div class="p-10 flex flex-col lg:flex-row justify-between items-center lg:h-full gap-10">
      <!-- LEFT CONTENT -->
      <div class="text-white flex-1 flex flex-col justify-between lg:h-full">
        <div>
          <p
            class="uppercase tracking-[0.25em] text-[11.5px] font-extrabold text-white/50 mb-7"
            style="font-family: &quot;Manrope&quot;, sans-serif"
          >
            PERIODE 2026 - 2027
          </p>

          <p
            class="uppercase tracking-[0.2em] text-[12px] font-bold text-white/50 mb-1"
            style="font-family: &quot;Manrope&quot;, sans-serif"
          >
            TOTAL PENULIS
          </p>

          <h1
            class="text-[96px] font-extrabold leading-none mb-5 tracking-tight"
            style="font-family: &quot;Manrope&quot;, sans-serif"
          >
            150
          </h1>

          <p
            class="text-[13.5px] leading-[1.85] text-white/70 max-w-[520px] font-light"
            style="font-family: &quot;Manrope&quot;, sans-serif"
          >
            78% Penulis Terdaftar Telah Memvalidasi Kontrak Hibah, 47 Naskah Sedang Dalam Proses
            Peninjauan Aktif, Dan 18 Judul Sedang Dalam Antrean Untuk Dicetak Pada Kuartal Ini —
            Sehingga Program Ini Tetap Berada Di Jalur Yang Tepat Untuk Mencapai Target Publikasi
            Tahunannya.
          </p>
        </div>
      </div>

      <!-- RIGHT STAT CARDS -->
      <div class="grid grid-cols-2 gap-5 flex-shrink-0">
        <!-- CARD 1 -->
        <div
          class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style="
            width: 195px;
            height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          "
        >
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px]">
              TOTAL PENULIS
            </p>

            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px">150</h2>
          </div>

          <div></div>
        </div>

        <!-- CARD 2 -->
        <div
          class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style="
            width: 195px;
            height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          "
        >
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px]">
              SEDANG DI REVIEW
            </p>

            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px">47</h2>
          </div>

          <button
            @click="goToDaftarNaskah"
            class="bg-[#4E3629]/90 hover:bg-[#4E3629] text-white text-[11px] font-medium py-2 px-4 rounded-full transition-all duration-200 w-fit"
          >
            Lihat Daftar Naskah ↗
          </button>
        </div>

        <!-- CARD 3 -->
        <div
          class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style="
            width: 195px;
            height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          "
        >
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px]">
              SIAP DI SETUJUI
            </p>

            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px">117</h2>
          </div>

          <button
            @click="goToPemeriksaan"
            class="bg-[#4E3629]/90 hover:bg-[#4E3629] text-white text-[11px] font-medium py-2 px-4 rounded-full transition-all duration-200 w-fit"
          >
            Pemeriksaan ↗
          </button>
        </div>

        <!-- CARD 4 -->
        <div
          class="rounded-[28px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          style="
            width: 195px;
            height: 185px;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.15);
          "
        >
          <div>
            <p class="text-white/50 text-[10px] font-semibold uppercase tracking-[2px]">
              SIAP DICETAK
            </p>

            <h2 class="text-white font-extrabold leading-none mt-2" style="font-size: 54px">117</h2>
          </div>

          <button
            @click="goToRekap"
            class="bg-[#4E3629]/90 hover:bg-[#4E3629] text-white text-[11px] font-medium py-2 px-4 rounded-full transition-all duration-200 w-fit"
          >
            Lihat Rekap ↗
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToDaftarNaskah = () => {
  router.push("/daftar-naskah");
};

const goToPemeriksaan = () => {
  router.push("/pemeriksaan");
};

const goToRekap = () => {
  router.push("/rekap");
};
</script>
