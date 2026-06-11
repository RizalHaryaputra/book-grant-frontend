<template>
  <div class="min-h-screen flex flex-col bg-[#F4EFE5]">

    <!-- NAVBAR -->
    <nav
      class="h-[90px] bg-[#F8F8F8] border-b border-[#D7CFC5] px-8 lg:px-12 flex items-center"
    >

      <div class="flex items-center gap-4">

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-11 h-11 text-[#2E221B]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.7"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6.253C10.832 5.477 9.246 5 7.5 5C5.754 5 4.168 5.477 3 6.253v11.494C4.168 16.971 5.754 16.5 7.5 16.5c1.746 0 3.332.471 4.5 1.247m0-11.494C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v11.494C19.832 16.971 18.246 16.5 16.5 16.5c-1.746 0-3.332.471-4.5 1.247"
          />
        </svg>

        <h1 class="text-[22px] font-bold text-[#2E221B]">
          HIBAH BUKU
        </h1>

      </div>

    </nav>

    <!-- HERO -->

    <section
      class="flex-1 max-w-[1400px] mx-auto w-full px-8 lg:px-14 py-20"
    >

      <div
        class="grid lg:grid-cols-[1.2fr_0.8fr] gap-24 items-center"
      >

        <!-- LEFT -->

        <div class="max-w-[700px]">

          <h1
            class="text-[48px] lg:text-[54px] font-bold leading-[1.15] tracking-[-1px] text-[#2E221B]"
          >

            Kelola Penulisan Hibah Buku

            <br>

            Lebih Mudah, Transparan,

            <br>

            dan Terstruktur

          </h1>

          <p
            class="mt-8 text-[20px] text-[#667085] leading-[1.8]"
          >

            Sistem Penulisan Hibah Buku membantu
            penulis, reviewer, dan penerbit
            berkolaborasi dalam setiap tahapan
            penulisan buku hibah secara digital,
            mulai dari kesediaan penulis hingga
            naskah siap cetak.

          </p>

          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center mt-10 bg-[#4F372E] text-white h-[62px] px-12 rounded-full text-lg font-semibold hover:opacity-90 transition"
          >

            Isi Form Kesediaan

          </RouterLink>

        </div>

        <!-- LOGIN CARD -->

        <div
          class="w-full max-w-[500px] bg-white rounded-[32px] p-8 lg:p-10 shadow-lg mx-auto"
        >

          <div class="mb-8">

            <h2
              class="text-[38px] font-bold text-[#2E221B]"
            >

              Masuk ke Sistem

            </h2>

            <p
              class="text-[#8A8179] mt-2"
            >

              Sistem Penulisan Hibah Buku

            </p>

          <div
            v-if="errorMessage"
            class="mt-5 bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 text-sm"
          >

  {{ errorMessage }}

        </div>
          </div>

          <form
            class="space-y-6"
            novalidate
            @submit.prevent="handleLogin"
          >

            <!-- EMAIL -->

            <div>

              <label
                class="block mb-2 text-sm font-semibold text-[#504137]"
              >

                Email

              </label>

              <input
                v-model="email"
                type="email"
                required
                autofocus
                spellcheck="false"
                autocapitalize="off"
                autocomplete="email"
                placeholder="Masukkan email"
                class="input"
              />

            </div>

            <!-- PASSWORD -->

            <div>

              <label
                class="block mb-2 text-sm font-semibold text-[#504137]"
              >

                Password

              </label>

              <input
                v-model="password"
                type="password"
                required
                spellcheck="false"
                autocomplete="current-password"
                placeholder="Masukkan password"
                class="input"
              />

            </div>

            <button
              type="submit"
              :disabled="loading"
              :class="[
                loading
                  ? 'pointer-events-none opacity-70'
                  : ''
              ]"
              class="w-full h-[58px] rounded-[18px] bg-[#4F372E] text-white font-semibold hover:opacity-90 transition"
            >

              <span v-if="loading">

                Loading...

              </span>

              <span v-else>

                Login

              </span>

            </button>

          </form>

          <div
            class="mt-8 bg-[#F8F3EE] border border-[#EFE3D8] rounded-[20px] p-5"
          >

            <p
              class="font-bold text-[#504137] mb-3"
            >

              Informasi Login

            </p>

            <p
              class="text-sm text-[#6F645C] leading-relaxed"
            >

              Silakan login menggunakan akun
              yang telah diberikan oleh
              Administrator Sistem Penulisan Hibah Buku.

            </p>

          </div>

        </div>

      </div>

    </section>

    <!-- FOOTER -->

    <footer
      class="bg-[#4F372E] text-white mt-auto"
    >

      <div
        class="max-w-[1400px] mx-auto px-8 lg:px-14 py-12"
      >

        <h2
          class="text-2xl font-bold mb-4"
        >

          SISTEM PENULISAN HIBAH BUKU

        </h2>

        <p
          class="text-gray-200 max-w-[700px] leading-relaxed"
        >

          Platform digital untuk mengelola seluruh proses
          penulisan hibah buku secara terintegrasi mulai
          dari kesediaan penulis, proses review,
          hingga penerbitan buku.

        </p>

      </div>

    </footer>

  </div>
</template>

<script setup>
import { ref } from "vue"

// PERHATIKAN BARIS INI: Tambahkan kurung kurawal { } mengapit useAuth
import { useAuth } from "../../composables/useAuth"

const email = ref("")
const password = ref("")

// Ambil fungsi dan state dari composable yang sudah kita buat
const { login, isLoading: loading, errorMessage } = useAuth()

const handleLogin = async () => {
  errorMessage.value = "" // Reset error message setiap kali submit

  if (!email.value.trim()) {
    errorMessage.value = "Email wajib diisi"
    return
  }
  if (!password.value.trim()) {
    errorMessage.value = "Password wajib diisi"
    return
  }

  // Panggil fungsi login dari composable, biarkan routing dan error handling 
  // diurus secara terpusat di useAuth.js
  await login({
    email: email.value.trim(),
    password: password.value
  })
}
</script>

<style scoped>

.input {

  width: 100%;

  height: 58px;

  padding: 0 18px;

  border-radius: 18px;

  background: #FAF7F4;

  border: 1px solid #ECE3DB;

  outline: none;

  font-size: 14px;

  color: #2E221B;

  transition: all .25s ease;

}

.input:focus {

  border-color: #4F372E;

  background: #FFFFFF;

  box-shadow:
    0 0 0 3px rgba(79,55,46,.08);

}

.input::placeholder {

  color: #A89C93;

}

button {

  transition: .25s ease;

}

button:hover {

  transform: translateY(-1px);

}

button:active {

  transform: scale(.98);

}

button:disabled {

  cursor: not-allowed;

  opacity: .65;

}

</style>
