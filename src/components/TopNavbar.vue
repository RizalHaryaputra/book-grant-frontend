<template>
  <div class="bg-[#F4EDE4] rounded-[20px] p-4">
    <nav class="bg-white rounded-2xl px-5 py-2.5 border border-[#504137]/15 flex items-center justify-between">
      <!-- Title -->
      <h1 class="text-[18px] font-bold text-[#2e1e14]" style="font-family: 'Libre Caslon Text', serif;">
        Dashboard Penerbit A
      </h1>

      <!-- Right Section -->
      <div class="flex items-center gap-4">
        <!-- Notification -->
        <button
          class="text-[#504137] p-1.5 rounded-lg hover:bg-[#f4ede4] transition"
          aria-label="Notifikasi"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        <!-- Divider -->
        <div class="w-px h-7 bg-[#504137]/15"></div>

        <!-- Profile -->
        <div class="flex items-center gap-2.5">
          <div class="text-right leading-tight">
            <p class="text-sm font-semibold text-[#2e1e14]" style="font-family: 'Manrope', sans-serif;">Sayanery</p>
            <p class="text-xs text-[#8a7060]" style="font-family: 'Manrope', sans-serif;">Penerbit</p>
          </div>
          <div class="w-[38px] h-[38px] rounded-full overflow-hidden border-[1.5px] border-[#504137] flex-shrink-0">
            <img src="https://i.pravatar.cc/150?img=12" alt="Foto profil Sayanery" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>