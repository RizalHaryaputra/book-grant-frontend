<template>
  <aside class="w-[280px] bg-[#F4EDE4] min-h-screen p-6 flex flex-col justify-between">
    <!-- Logo -->
    <div>
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-[#2B1E18]">Sistem PBL</h1>
        <p class="text-[#6B5B52] mt-1">Book Grant System</p>
      </div>

      <!-- Menu -->
      <nav>
        <ul class="space-y-3">
          <li
            class="bg-[#504137] text-white px-5 py-4 rounded-2xl flex items-center gap-3 font-medium cursor-pointer"
          >
            <span>🏠</span>
            Dashboard
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>📄</span>
            Daftar Naskah
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>🔍</span>
            Pemeriksaan
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>✅</span>
            Keputusan
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>📊</span>
            Rekap
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>❓</span>
            Support
          </li>

          <li
            class="text-[#5C4B42] px-5 py-4 rounded-2xl flex items-center gap-3 hover:bg-[#E5D8CB] transition cursor-pointer"
          >
            <span>⚙️</span>
            Settings
          </li>
        </ul>
      </nav>
    </div>

    <!-- Logout -->
    <button
      class="bg-[#504137] text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition"
    >
      Logout
    </button>
  </aside>
</template>
