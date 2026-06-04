<template>
  <div
    class="flex min-h-screen w-full"
    style="background: radial-gradient(circle at 100% 0%, #CBB8A5 0%, #E4D8CA 30%, #F5F1EB 70%, #FAF8F5 100%);"
  >
    <Sidebar />

    <div class="flex-1 p-8 overflow-y-auto">
      <TopNavbar title="Support Center" />

      <div class="mt-6 grid grid-cols-3 gap-6">
        <!-- FAQ -->
        <div class="col-span-2 bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-[#3B1F0F] mb-4">
            Frequently Asked Questions
          </h2>

          <div class="space-y-4">
            <div class="border rounded-xl p-4">
              <h3 class="font-semibold text-[#8B4513]">
                Bagaimana cara memverifikasi naskah?
              </h3>
              <p class="text-gray-600 mt-2">
                Masuk ke menu Pemeriksaan lalu pilih naskah yang ingin
                diverifikasi.
              </p>
            </div>

            <div class="border rounded-xl p-4">
              <h3 class="font-semibold text-[#8B4513]">
                Bagaimana memberikan keputusan?
              </h3>
              <p class="text-gray-600 mt-2">
                Buka menu Keputusan kemudian pilih status Approved,
                Revised, atau Rejected.
              </p>
            </div>

            <div class="border rounded-xl p-4">
              <h3 class="font-semibold text-[#8B4513]">
                Bagaimana melihat laporan?
              </h3>
              <p class="text-gray-600 mt-2">
                Semua laporan tersedia pada menu Rekap.
              </p>
            </div>
          </div>
        </div>

        <!-- Contact -->
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="text-xl font-semibold text-[#3B1F0F] mb-4">
            Hubungi Kami
          </h2>

          <div class="space-y-4">
            <div>
              <p class="font-semibold">Email</p>
              <p class="text-gray-600">support@publisher.ac.id</p>
            </div>

            <div>
              <p class="font-semibold">Telepon</p>
              <p class="text-gray-600">(0274) 123456</p>
            </div>

            <div>
              <p class="font-semibold">Jam Operasional</p>
              <p class="text-gray-600">
                Senin - Jumat<br />
                08.00 - 16.00 WIB
              </p>
            </div>
          </div>

          <button
            class="w-full mt-6 bg-[#8B4513] text-white py-3 rounded-lg hover:bg-[#6f360e]"
          >
            Buat Tiket Bantuan
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="mt-6 bg-white rounded-2xl p-6 shadow-sm">
        <h2 class="text-xl font-semibold text-[#3B1F0F] mb-4">
          Kirim Pesan
        </h2>

        <div class="space-y-4">
          <input
            type="text"
            placeholder="Subjek"
            class="w-full border rounded-lg p-3"
          />

          <textarea
            rows="5"
            placeholder="Tuliskan kendala Anda..."
            class="w-full border rounded-lg p-3"
          ></textarea>

          <button
            class="bg-[#8B4513] text-white px-6 py-3 rounded-lg hover:bg-[#6f360e]"
          >
            Kirim Pesan
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