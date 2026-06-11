<template>

  <div class="min-h-screen bg-[#F4EDE4] py-8 px-4 flex justify-center">

    <div
      class="w-full max-w-5xl bg-[#F8F7F7] border border-[#D7C7B7] rounded-[30px] overflow-hidden"
    >

      <div
        class="h-[75px] bg-[#504137] flex items-center px-8"
      >

        <div class="flex items-center gap-4">

          <h1
            class="text-white text-lg font-bold"
          >

            Sistem Penulisan Hibah Buku

          </h1>

        </div>

      </div>

      <div class="p-8">

        <h2
          class="text-[40px] font-extrabold text-[#2B211C] leading-tight"
        >

          Form Konfirmasi Kesediaan Menulis Buku Hibah

        </h2>

        <p
          class="text-[#7C7169] mt-3 mb-8"
        >

          Silakan lengkapi data berikut untuk menyatakan kesediaan
          menulis buku hibah.

        </p>

        <div
          v-if="errorMessage"
          class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600"
        >

          {{ errorMessage }}

        </div>

        <div
          v-if="successMessage"
          class="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700"
        >

          {{ successMessage }}

        </div>

        <form
          @submit.prevent="handleSubmit"
        >

          <div class="section-header">

            <div class="section-icon">

              <img
                :src="userIcon"
                class="icon-image"
              >

            </div>

            <h3 class="section-title">

              Data Diri Penulis

            </h3>

          </div>

          <div class="mb-5">

            <label class="label">

              Nama Lengkap

              <span class="required">

                *

              </span>

            </label>

            <input
              v-model="form.name"
              type="text"
              required
              autocomplete="name"
              class="input"
              placeholder="Masukkan nama lengkap"
            >

          </div>

          <div class="mb-5">

            <label class="label">

              Email

              <span class="required">

                *

              </span>

            </label>

            <input
              v-model="form.email"
              type="email"
              required
              spellcheck="false"
              autocapitalize="off"
              autocomplete="email"
              class="input"
              placeholder="nama@email.com"
            >

          </div>

          <div class="mb-10">

            <label class="label">

              Institusi

              <span class="required">

                *

              </span>

            </label>

            <input
              v-model="form.institution"
              type="text"
              required
              class="input"
              placeholder="Masukkan institusi"
            >

          </div>

          <div class="section-header">

            <div class="section-icon">

              <img
                :src="bookIcon"
                class="icon-image"
              >

            </div>

            <h3 class="section-title">

              Informasi Buku

            </h3>

          </div>

          <div class="mb-5">

            <label class="label">

              Judul Buku

              <span class="required">

                *

              </span>

            </label>

            <input
              v-model="form.bookTitle"
              required
              type="text"
              class="input"
              placeholder="Masukkan judul buku"
            >

          </div>

          <div class="mb-10">

            <label class="label">

              Jenis Buku

              <span class="required">

                *

              </span>

            </label>

          <select
            v-model="form.bookType"
            required
            class="input"
            :style="{ color: form.bookType ? '#2B211C' : '#A7A19C' }"
          >
            <option value="" disabled>
              Pilih Jenis Buku
            </option>
          
            <option value="buku ajar" style="color:#2B211C">
              Buku Ajar
            </option>
          
            <option value="buku referensi" style="color:#2B211C">
              Buku Referensi
            </option>
          </select>

          </div>

          <div class="section-header">

            <div class="section-icon">

              <img
                :src="usersIcon"
                class="icon-image"
              >

            </div>

            <h3 class="section-title">

              Anggota Tim Penulis

            </h3>

          </div>

          <div class="mb-5">

            <label class="label">

              Anggota Penulis 1

              <span class="required">

                *

              </span>

            </label>

            <input
              v-model="form.member1"
              required
              type="text"
              class="input"
              placeholder="Nama Lengkap & Gelar"
            >

          </div>
                    <div class="grid md:grid-cols-2 gap-5 mb-5">

            <div>

              <label class="label">

                Anggota Penulis 2

              </label>

              <input
                v-model="form.member2"
                type="text"
                class="input"
                placeholder="Opsional"
              >

            </div>

            <div>

              <label class="label">

                Anggota Penulis 3

              </label>

              <input
                v-model="form.member3"
                type="text"
                class="input"
                placeholder="Opsional"
              >

            </div>

          </div>

          <div class="mb-10">

            <label class="label">

              Anggota Penulis 4

            </label>

            <input
              v-model="form.member4"
              type="text"
              class="input"
              placeholder="Opsional"
            >

          </div>

          <div class="ethic-box">

            <input
              v-model="form.agree"
              type="checkbox"
              class="checkbox"
            >

            <div>

              <h3 class="ethic-title">

                Pernyataan Etik AI

                <span class="required">

                  *

                </span>

              </h3>

              <p class="ethic-text">

                Penulis wajib menjunjung tinggi norma akademik,
                menghindari plagiarisme,
                menjamin keaslian karya,
                serta bertanggung jawab penuh atas isi naskah.
                Penggunaan AI hanya diperbolehkan
                sebagai alat bantu dan tidak menggantikan
                peran intelektual penulis.

              </p>

            </div>

          </div>

          <div class="mt-10">

            <h3 class="confirm-title">

              Apakah Anda bersedia menyelesaikan buku hibah?

            </h3>

            <div class="grid md:grid-cols-2 gap-6">

              <button
                type="button"
                class="confirm-box"
                :class="{
                  active:
                  form.confirmation === 1
                }"
                @click="
                  form.confirmation=1
                "
              >

                ✓ Bersedia

              </button>

              <button
                type="button"
                class="confirm-box"
                :class="{
                  active:
                  form.confirmation === 0
                }"
                @click="
                  form.confirmation=0
                "
              >

                ✕ Tidak Bersedia

              </button>

            </div>

          </div>

          <button

            type="submit"

            :disabled="loading"

            class="submit-btn mt-10 disabled:opacity-60 disabled:cursor-not-allowed"

          >

            {{ loading ? "Mengirim..." : "Kirim Konfirmasi" }}

          </button>

        </form>

      </div>

    </div>

  </div>

</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import * as authorService from "../../services/authorService"; 

import userIcon from "../../assets/icons/user.png";
import usersIcon from "../../assets/icons/users.png";
import bookIcon from "../../assets/icons/book.png";

const router = useRouter();
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const form = reactive({
  name: "",
  email: "",
  institution: "",
  bookTitle: "",
  bookType: "",
  member1: "",
  member2: "",
  member3: "",
  member4: "",
  agree: false,
  confirmation: null, // Default null
});

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  // Validasi lokal UI 
  if (!form.name || !form.email || !form.institution || !form.bookTitle || !form.bookType || !form.member1) {
    errorMessage.value = "Semua data ber-bintang wajib diisi.";
    return;
  }
  if (!form.agree) {
    errorMessage.value = "Anda harus menyetujui Pernyataan Etik AI.";
    return;
  }
  if (form.confirmation === null) {
    errorMessage.value = "Mohon pilih Bersedia atau Tidak Bersedia.";
    return;
  }

  loading.value = true;

  try {
    // PERBAIKAN 3: Mapping payload ditambahkan ai_ethics_agreed dan willingness_statement
    await authorService.submitConfirmation({
      name: form.name,
      email: form.email,
      institution: form.institution,
      phone: "08000000000", 
      book_title: form.bookTitle,
      book_type: form.bookType,
      ai_ethics_agreed: form.agree ? 1 : 0,           // Diubah menjadi integer 1/0
      willingness_statement: form.confirmation,       // Sudah berupa integer 1/0 dari tombol
      members: [form.member1, form.member2, form.member3, form.member4].filter(Boolean) // Opsional: jika backend juga menerima array penulis
    });

    successMessage.value = "Konfirmasi berhasil dikirim.";
    
    // Redirect ke halaman login setelah 1.5 detik
    setTimeout(() => {
      router.push("/login");
    }, 1500);

  } catch (error) {
    // Menampilkan pesan error validasi langsung dari Laravel (jika ada array errors)
    if (error.response?.data?.data?.errors) {
       const firstError = Object.values(error.response.data.data.errors)[0][0];
       errorMessage.value = firstError;
    } else {
       errorMessage.value = error.response?.data?.message || "Terjadi kesalahan saat mengirim data ke server.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>

@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap");

*{

  font-family:"Manrope",sans-serif;

  box-sizing:border-box;

}

.section-header{

  display:flex;

  align-items:center;

  gap:14px;

  margin-bottom:24px;

}

.section-icon{

  width:54px;

  height:54px;

  border-radius:18px;

  background:#F2E8E2;

  display:flex;

  align-items:center;

  justify-content:center;

}

.icon-image{

  width:26px;

  height:26px;

  object-fit:contain;

}

.section-title{

  font-size:20px;

  font-weight:800;

  color:#2B211C;

}

.label{

  display:block;

  margin-bottom:8px;

  font-size:14px;

  font-weight:700;

  color:#2B211C;

}

.required{

  color:#DC2626;

}

.input{

  width:100%;

  height:56px;

  border:1px solid #DED4CB;

  border-radius:16px;

  padding:0 18px;

  background:#FFFFFF;

  outline:none;

  transition:.25s;

}

.input:focus{

  border-color:#504137;

  box-shadow:0 0 0 3px rgba(80,65,55,.08);

}

.input::placeholder{

  color:#A7A19C;

}

.ethic-box{

  background:#F6F2DF;

  border:1px solid #D7C75A;

  border-radius:22px;

  padding:24px;

  display:flex;

  gap:16px;

}

.checkbox{

  width:18px;

  height:18px;

  margin-top:4px;

  cursor:pointer;

}

.ethic-title{

  font-size:18px;

  font-weight:800;

  margin-bottom:8px;

}

.ethic-text{

  font-size:14px;

  line-height:1.8;

  color:#4A3A30;

}

.confirm-title{

  font-size:18px;

  font-weight:800;

  color:#2B211C;

  margin-bottom:20px;

}

.confirm-box{

  height:140px;

  border:2px solid #D9C5B2;

  border-radius:22px;

  background:#FFFFFF;

  font-size:22px;

  font-weight:800;

  cursor:pointer;

  transition:.2s;

}

.confirm-box:hover{

  background:#F7F2EE;

}

.confirm-box.active{

  background:#F5EEE9;

  border-color:#504137;

}

.submit-btn{

  width:100%;

  height:64px;

  border-radius:20px;

  background:#504137;

  color:#FFFFFF;

  font-size:20px;

  font-weight:800;

  transition:.25s;

}

.submit-btn:hover{

  opacity:.9;

  transform:translateY(-1px);

}

.submit-btn:active{

  transform:scale(.98);

}

.submit-btn:disabled{

  opacity:.6;

  cursor:not-allowed;

}

</style>