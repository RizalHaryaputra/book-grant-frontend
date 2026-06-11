<template>
  <AdminLayout>
    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-600 p-4 rounded-[20px] mb-6"
    >
      {{ error }}
    </div>

    <section class="bg-[#EEE3D8] rounded-[34px] p-10">
      <h1 class="text-[42px] font-extrabold text-[#2B211C]">
        Pengajuan Hibah Buku
      </h1>
      <p class="mt-4 text-[#6F645C] max-w-[700px]">
        Daftar pengajuan hibah buku yang berasal dari Form Kesediaan Penulis.
      </p>
    </section>

    <section class="bg-white rounded-[28px] shadow-sm p-6 mt-6">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama penulis atau judul buku..."
        class="w-full h-[56px] rounded-[18px] border border-[#E9DED3] px-5 outline-none"
      />
    </section>

    <section class="bg-white rounded-[28px] shadow-sm p-6 mt-6 overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b">
            <th class="py-4 text-left">No</th>
            <th class="py-4 text-left">Nama Penulis</th>
            <th class="py-4 text-left">Email</th>
            <th class="py-4 text-left">Institusi</th>
            <th class="py-4 text-left">Judul Buku</th>
            <th class="py-4 text-left">Jenis Buku</th>
            <th class="py-4 text-left">Status</th>
            <th class="py-4 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="loading">
            <td colspan="8" class="py-12 text-center text-[#8B8178]">
              Memuat data pengajuan...
            </td>
          </tr>

          <tr
            v-else
            v-for="(item, index) in filteredAuthors"
            :key="item.id"
            class="border-b hover:bg-[#F9F5F1] transition"
          >
            <td class="py-5">{{ index + 1 }}</td>
            <td class="py-5 font-semibold">{{ item.name }}</td>
            <td class="py-5">{{ item.email }}</td>
            <td class="py-5">{{ item.institution }}</td>
            <td class="py-5">{{ item.book_title }}</td>
            <td class="py-5">{{ item.book_type }}</td>
            <td class="py-5">
              <span
                v-if="item.status === 'pending'"
                class="px-3 py-2 rounded-full bg-yellow-100 text-yellow-700 text-xs"
              >
                Menunggu Proses
              </span>
              <span
                v-else-if="item.status === 'processed'"
                class="px-3 py-2 rounded-full bg-green-100 text-green-700 text-xs"
              >
                Diproses
              </span>
              <span
                v-else
                class="px-3 py-2 rounded-full bg-gray-100 text-gray-700 text-xs"
              >
                {{ item.status || 'Draft' }}
              </span>
            </td>
            <td class="py-5 text-center">
              <button
                @click="showDetail(item)"
                class="bg-[#504137] text-white px-5 h-[42px] rounded-xl hover:opacity-90"
              >
                Detail
              </button>
            </td>
          </tr>

          <tr v-if="!loading && filteredAuthors.length === 0">
            <td colspan="8" class="py-12 text-center text-[#8B8178]">
              Belum ada pengajuan hibah buku yang sesuai.
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div
      v-if="selected"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-[28px] p-8 w-[700px] max-w-[92%]">
        <h2 class="text-[30px] font-bold">
          Detail Pengajuan Hibah Buku
        </h2>

        <div class="grid grid-cols-2 gap-6 mt-8">
          <div>
            <b>Nama Penulis</b>
            <p>{{ selected.name }}</p>
          </div>
          <div>
            <b>Email</b>
            <p>{{ selected.email }}</p>
          </div>
          <div>
            <b>Institusi</b>
            <p>{{ selected.institution }}</p>
          </div>
          <div>
            <b>Nomor Telepon</b>
            <p>{{ selected.phone || '-' }}</p>
          </div>
          <div>
            <b>Judul Buku</b>
            <p>{{ selected.book_title }}</p>
          </div>
          <div>
            <b>Jenis Buku</b>
            <p>{{ selected.book_type }}</p>
          </div>
          <div>
            <b>Status</b>
            <p class="capitalize">{{ selected.status }}</p>
          </div>
        </div>

        <div class="flex justify-end mt-8">
          <button
            @click="selected = null"
            class="bg-[#504137] text-white px-8 h-[50px] rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "../../components/layout/AdminLayout.vue";
import { useAuthorConfirmation } from "../../composables/useAuthorConfirmation";

// Inisialisasi Composable
const { authors, loading, error, fetchAuthors } = useAuthorConfirmation();

const selected = ref(null);
const search = ref("");

// Fitur Pencarian Lokal (Mencocokkan dengan properti bahasa Inggris dari DB)
const filteredAuthors = computed(() => {
  if (!search.value) {
    return authors.value;
  }
  
  const keyword = search.value.toLowerCase();
  
  return authors.value.filter((item) =>
    (item.name || "").toLowerCase().includes(keyword) ||
    (item.email || "").toLowerCase().includes(keyword) ||
    (item.book_title || "").toLowerCase().includes(keyword) ||
    (item.institution || "").toLowerCase().includes(keyword)
  );
});

const showDetail = (item) => {
  selected.value = item;
};

// Panggil fungsi fetch saat halaman pertama kali dimuat
onMounted(() => {
  fetchAuthors();
});
</script>