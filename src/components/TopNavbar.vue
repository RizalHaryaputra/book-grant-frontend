<template>
  <nav class="bg-white rounded-[20px] px-6 py-3.5 shadow-sm border border-[#4E3629]/5 flex items-center justify-between">
    <!-- Title -->
    <h1 class="text-[19px] font-bold text-[#4E3629] leading-tight" style="font-family: 'Libre Caslon Text', serif;">
      {{ title }}
    </h1>

    <!-- Right Section -->
    <div class="flex items-center gap-4">
      <!-- Notification -->
      <button
        class="text-[#8F8073] p-2 rounded-xl hover:bg-[#FAF7F2] hover:text-[#4E3629] transition-all duration-200"
        aria-label="Notifikasi"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      </button>

      <!-- Divider -->
      <div class="w-px h-6 bg-[#4E3629]/10"></div>

      <!-- Profile -->
      <div class="flex items-center gap-3">
        <div class="text-right leading-tight">
          <p class="text-[14.5px] font-bold text-[#4E3629]" style="font-family: 'Manrope', sans-serif;">Sayanery</p>
          <p class="text-[11.5px] text-[#8F8073] font-semibold" style="font-family: 'Manrope', sans-serif;">Penerbit</p>
        </div>
        <div class="w-[38px] h-[38px] rounded-full overflow-hidden border-[1.5px] border-[#4E3629]/30 flex-shrink-0 shadow-sm">
          <img src="https://i.pravatar.cc/150?img=12" alt="Foto profil Sayanery" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Dashboard Penerbit A'
  }
});
</script>