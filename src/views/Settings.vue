<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 overflow-y-auto" style="font-family: 'Manrope', sans-serif;">
      <TopNavbar title="Halaman Pengaturan" />

      <!-- Main card wrapper -->
      <div
        class="mt-6 rounded-[10px] overflow-hidden"
        style="background-color: rgba(84, 67, 58, 0.10);"
      >
        <!-- Profile hero section -->
        <div class="flex flex-col items-center pt-10 pb-8">
          <!-- Avatar -->
          <div
            class="w-[80px] h-[80px] rounded-full overflow-hidden mb-4"
            style="border: 3px solid rgba(255,255,255,0.6);"
          >
            <img
              src="https://i.pravatar.cc/80?img=11"
              alt="Avatar"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Name & role -->
          <h2
            class="text-[22px] font-bold text-[#1C1209]"
            style="font-family: 'Libre Caslon Text', serif;"
          >
            PT. Mizan Group
          </h2>
          <p class="text-[13px] text-[#8F8073] mt-0.5 font-medium">Penerbit</p>
        </div>

        <!-- Informasi Akun card -->
        <div class="mx-6 mb-5 bg-white rounded-[10px] p-6" style="box-shadow: 0 1px 4px rgba(84,67,58,0.08);">
          <h3 class="text-[15px] font-bold text-[#1C1209] mb-5">Informasi Akun</h3>

          <!-- Divider -->
          <div class="border-t mb-5" style="border-color: rgba(84,67,58,0.10);"></div>

          <div class="grid grid-cols-3 gap-6">
            <!-- Nama Penerbit -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Nama Penerbit</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">PT. Mizan Group</p>
            </div>

            <!-- Email -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Email</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">Mizan@gmail.com</p>
            </div>

            <!-- Role -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Role</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">Penerbit</p>
            </div>

            <!-- NPWP -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">NPWP</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">1234567891123456</p>
            </div>

            <!-- Nomor Telepon -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Nomor Telepon</p>
              <p class="text-[14px] font-semibold text-[#1C1209]">088888888888</p>
            </div>

            <!-- Alamat -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-1">Alamat</p>
              <p class="text-[14px] font-semibold text-[#1C1209] leading-snug">
                Jl. Cinambo No. 135, Cisaranten Wetan,<br/>
                Kec. Cinambo, Kota Bandung, Jawa<br/>
                Barat 40293.
              </p>
            </div>
          </div>
        </div>

        <!-- Keamanan Akun card -->
        <div class="mx-6 mb-6 bg-white rounded-[10px] p-6" style="box-shadow: 0 1px 4px rgba(84,67,58,0.08);">
          <h3 class="text-[15px] font-bold text-[#1C1209] mb-5">Keamanan Akun</h3>

          <!-- Divider -->
          <div class="border-t mb-5" style="border-color: rgba(84,67,58,0.10);"></div>

          <div class="grid grid-cols-2 gap-5">
            <!-- Password Lama -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-2">Password Lama</p>
              <input
                type="password"
                v-model="passwordLama"
                class="w-full rounded-lg px-4 py-2.5 text-[13.5px] text-[#1C1209] outline-none transition-all"
                style="
                  background-color: #F0EEEC;
                  border: 1px solid rgba(84,67,58,0.12);
                  font-family: 'Manrope', sans-serif;
                "
                placeholder="••••••••"
              />
            </div>

            <!-- Password Baru -->
            <div>
              <p class="text-[12px] text-[#8F8073] font-medium mb-2">Password Baru</p>
              <input
                type="password"
                v-model="passwordBaru"
                class="w-full rounded-lg px-4 py-2.5 text-[13.5px] text-[#1C1209] outline-none transition-all"
                style="
                  background-color: #F0EEEC;
                  border: 1px solid rgba(84,67,58,0.12);
                  font-family: 'Manrope', sans-serif;
                "
                placeholder="••••••••"
              />
            </div>
          </div>

          <!-- Perbarui Password button — kanan bawah -->
          <div class="flex justify-end mt-5">
            <button
              @click="perbaruiPassword"
              class="text-white text-[13px] font-semibold px-5 py-2 rounded-full transition-all hover:brightness-110"
              style="
                background-color: #3DAA7D;
                font-family: 'Manrope', sans-serif;
                letter-spacing: 0.01em;
              "
            >
              Perbarui Password
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import TopNavbar from '../components/TopNavbar.vue'

const passwordLama = ref('')
const passwordBaru = ref('')

const perbaruiPassword = () => {
  // logika ganti password di sini
  console.log('Perbarui password')
}
</script>