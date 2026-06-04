<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 overflow-y-auto">
      <TopNavbar title="Settings" />

      <div class="mt-6 space-y-6">
        <!-- Profil -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-[#3B1F0F] mb-4">
            Profil Publisher
          </h2>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-600">Nama Publisher</label>
              <input
                type="text"
                class="w-full border rounded-lg p-3 mt-1"
                value="Publisher UNY"
              />
            </div>

            <div>
              <label class="text-sm text-gray-600">Email</label>
              <input
                type="email"
                class="w-full border rounded-lg p-3 mt-1"
                value="publisher@uny.ac.id"
              />
            </div>
          </div>

          <button
            class="mt-5 bg-[#8B4513] text-white px-5 py-2 rounded-lg hover:bg-[#6f360e]"
          >
            Simpan Perubahan
          </button>
        </div>

        <!-- Password -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-[#3B1F0F] mb-4">
            Keamanan Akun
          </h2>

          <div class="space-y-4">
            <input
              type="password"
              placeholder="Password Lama"
              class="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Password Baru"
              class="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Konfirmasi Password"
              class="w-full border rounded-lg p-3"
            />
          </div>

          <button
            class="mt-5 bg-[#8B4513] text-white px-5 py-2 rounded-lg hover:bg-[#6f360e]"
          >
            Ganti Password
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import TopNavbar from "../components/TopNavbar.vue";
</script>