<template>
  <div class="bg-white rounded-2xl px-6 py-3 shadow-sm flex items-center justify-between">
    <!-- Title -->
    <h1 class="text-2xl font-semibold text-[#2B1E18]">Dashboard Penerbit A</h1>

    <!-- Right Section -->
    <div class="flex items-center gap-4">
      <!-- Notification -->
      <button class="text-[#504137] text-xl hover:scale-110 transition">🔔</button>

      <!-- Divider -->
      <div class="w-[1px] h-8 bg-gray-200"></div>

      <!-- Profile -->
      <div class="flex items-center gap-3">
        <div class="text-right leading-tight">
          <h2 class="font-medium text-sm text-[#2B1E18]">Sayanery</h2>

          <p class="text-xs text-gray-500">Penerbit</p>
        </div>

        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full overflow-hidden border border-[#504137]">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</template>
