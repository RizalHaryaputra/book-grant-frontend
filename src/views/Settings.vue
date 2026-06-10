<template>
  <div
    class="flex h-screen w-full"
    style="
      background: radial-gradient(
        circle at 100% 0%,
        #cbb8a5 0%,
        #e4d8ca 30%,
        #f5f1eb 70%,
        #faf8f5 100%
      );
    "
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main
      class="flex-1 overflow-y-auto custom-scrollbar p-8"
      style="font-family: &quot;Manrope&quot;, sans-serif"
    >
      <TopNavbar title="Halaman Pengaturan" />

      <!-- Wrapper -->
      <div class="mt-6 rounded-[10px]" style="background-color: rgba(84, 67, 58, 0.1)">
        <!-- Profile -->
        <div class="flex flex-col items-center pt-10 pb-8">
          <div
            class="w-[80px] h-[80px] rounded-full overflow-hidden mb-4"
            style="border: 3px solid rgba(255, 255, 255, 0.6)"
          >
            <img
              src="https://i.pravatar.cc/80?img=11"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>

          <h2
            class="text-[22px] font-bold text-[#1C1209]"
            style="font-family: &quot;Libre Caslon Text&quot;, serif"
          >
            PT. Mizan Group
          </h2>

          <p class="text-[13px] text-[#8F8073] mt-1 font-medium">Penerbit</p>
        </div>

        <!-- Informasi Akun -->
        <div
          class="mx-6 mb-5 bg-white rounded-[10px] p-6"
          style="box-shadow: 0 1px 4px rgba(84, 67, 58, 0.08)"
        >
          <h3 class="text-[15px] font-bold text-[#1C1209] mb-5">Informasi Akun</h3>

          <div class="border-t mb-5" style="border-color: rgba(84, 67, 58, 0.1)"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Nama Penerbit</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">PT. Mizan Group</p>
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Email</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">Mizan@gmail.com</p>
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Role</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">Penerbit</p>
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">NPWP</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">1234567891123456</p>
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Nomor Telepon</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">088888888888</p>
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Alamat</p>
              <p class="text-[14px] font-semibold text-[#1C1209] leading-relaxed">
                Jl. Cinambo No. 135, Cisaranten Wetan, Kec. Cinambo, Kota Bandung, Jawa Barat 40293.
              </p>
            </div>
          </div>
        </div>

        <!-- Keamanan Akun -->
        <div
          class="mx-6 mb-8 bg-white rounded-[10px] p-6"
          style="box-shadow: 0 1px 4px rgba(84, 67, 58, 0.08)"
        >
          <h3 class="text-[15px] font-bold text-[#1C1209] mb-5">Keamanan Akun</h3>

          <div class="border-t mb-5" style="border-color: rgba(84, 67, 58, 0.1)"></div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-2">Password Lama</p>

              <input
                v-model="passwordLama"
                type="password"
                placeholder="••••••••"
                class="w-full rounded-lg px-4 py-3 text-[14px] text-[#1C1209] outline-none"
                style="background-color: #f0eeec; border: 1px solid rgba(84, 67, 58, 0.12)"
              />
            </div>

            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-2">Password Baru</p>

              <input
                v-model="passwordBaru"
                type="password"
                placeholder="••••••••"
                class="w-full rounded-lg px-4 py-3 text-[14px] text-[#1C1209] outline-none"
                style="background-color: #f0eeec; border: 1px solid rgba(84, 67, 58, 0.12)"
              />
            </div>
          </div>

          <div class="flex justify-end mt-6">
            <button
              @click="perbaruiPassword"
              class="px-6 py-2.5 rounded-full text-white text-[13px] font-semibold hover:opacity-90 transition"
              style="background-color: #3daa7d"
            >
              Perbarui Password
            </button>
          </div>
        </div>

        <!-- Spacer bawah -->
        <div class="h-8"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Sidebar from "../components/Sidebar.vue";
import TopNavbar from "../components/TopNavbar.vue";

const passwordLama = ref("");
const passwordBaru = ref("");

const perbaruiPassword = () => {
  console.log("Password diperbarui");
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #b09a8a;
  border-radius: 999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #4e3629;
}
</style>
