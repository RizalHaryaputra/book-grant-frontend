<template>
  <div
    class="flex h-screen w-full overflow-hidden bg-[#E9E2D8]"
    style="
      background:
        radial-gradient(circle at top right,
          #7A695D 0%,
          #B9AA9B 18%,
          #D9D0C5 35%,
          #EEE7DE 60%,
          #F4EFE8 100%);
      font-family: 'Manrope', sans-serif;
    "
  >
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <div class="flex-1 px-[34px] pt-[30px] pb-[24px] flex flex-col">

      <!-- Navbar -->
      <div
        class="h-[46px] bg-[#F7F5F2] rounded-[14px] border border-[#DDD5CC]
        shadow-[0_2px_6px_rgba(0,0,0,0.08)]
        flex items-center justify-between px-[16px]"
      >
        <h1
          class="text-[13.5px] font-extrabold text-[#2E241E] tracking-[-0.01em]"
        >
          Halaman Keputusan Terbit
        </h1>

        <div class="flex items-center gap-[18px]">

          <!-- Bell -->
          <button
            class="text-[#3A2D26] text-[14px] flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-[15px] h-[15px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67
                6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595
                1.436L4 17h5m6 0v1a3 3 0 11-6
                0v-1m6 0H9"
              />
            </svg>
          </button>

          <!-- User -->
          <div class="flex items-center gap-[10px]">
            <div class="text-right leading-none">
              <p class="text-[12px] font-extrabold text-[#2B221C]">
                Sayanery
              </p>
              <p class="text-[9px] text-[#7E7369] mt-[3px]">
                Penerbit
              </p>
            </div>

            <img
              src="https://i.pravatar.cc/100?img=12"
              class="w-[33px] h-[33px] rounded-full object-cover border border-[#CBBEB2]"
            />
          </div>

        </div>
      </div>

      <!-- Main Container -->
      <div
        class="mt-[10px] flex-1 bg-[#EEE8DE]/95 border border-[#E4DDD4]
        px-[16px] pt-[12px] overflow-hidden"
      >

        <!-- Title -->
        <div class="mb-[12px]">
          <h2
            class="uppercase text-[12px] font-extrabold tracking-[0.07em]
            text-[#1F1712]"
          >
            Naskah yang perlu di tinjau
          </h2>
        </div>

        <!-- Table -->
        <div class="overflow-hidden">
          <table class="w-full border-collapse bg-[#FBFAF8]">

            <!-- Header -->
            <thead>
              <tr class="border-b border-[#CFC7BE]">

                <th
                  class="text-left pl-[18px] py-[12px]
                  text-[11px] font-bold uppercase tracking-[0.08em]
                  text-[#6F655D]"
                >
                  Judul Naskah
                </th>

                <th
                  class="text-left py-[12px]
                  text-[11px] font-bold uppercase tracking-[0.08em]
                  text-[#6F655D]"
                >
                  Kategori
                </th>

                <th
                  class="text-left py-[12px]
                  text-[11px] font-bold uppercase tracking-[0.08em]
                  text-[#6F655D]"
                >
                  Reviewer
                </th>

                <!-- STATUS -->
                <th
                  class="text-center py-[12px]
                  text-[11px] font-bold uppercase tracking-[0.08em]
                  text-[#6F655D]"
                >
                  STATUS
                </th>

                <th
                  class="text-left py-[12px] pl-[6px]
                  text-[11px] font-bold uppercase tracking-[0.08em]
                  text-[#6F655D]"
                >
                  Tindakan
                </th>

              </tr>
            </thead>

            <!-- Body -->
            <tbody>

              <tr
                v-for="item in naskahList"
                :key="item.id"
                class="border-b border-[#E5DED6]"
              >

                <!-- Judul -->
                <td class="pl-[18px] py-[18px] relative">

                  <!-- Green Line -->
                  <div
                    class="absolute left-0 top-0 h-full w-[5px] bg-[#2C8C50]"
                  ></div>

                  <p
                    class="text-[13px] font-semibold text-[#2B221C]"
                  >
                    {{ item.judul }}
                  </p>
                </td>

                <!-- Kategori -->
                <td
                  class="text-[12px] text-[#5B524A] font-medium"
                >
                  {{ item.kategori }}
                </td>

                <!-- Reviewer -->
                <td>
                  <div class="flex flex-col gap-[6px]">

                    <span
                      v-for="reviewer in item.reviewers"
                      :key="reviewer"
                      class="
                        border border-[#A56A4F]
                        rounded-full
                        px-[10px]
                        py-[2px]
                        text-[10px]
                        text-[#5C473D]
                        bg-white
                        leading-[15px]
                        w-fit
                      "
                    >
                      {{ reviewer }}
                    </span>

                  </div>
                </td>

                <!-- STATUS TENGAH -->
                <td class="py-[18px] align-middle">
                  <div class="w-full flex flex-col items-center justify-center gap-[10px]">

                    <!-- Lengkap -->
                    <span
                      class="
                        flex items-center justify-center
                        h-[30px]
                        w-[156px]
                        rounded-full
                        bg-[#C8EFC5]
                        text-[#388A46]
                        text-[10px]
                        font-semibold
                        text-center
                        leading-none
                      "
                    >
                      Lengkap
                    </span>

                    <!-- Selesai Review -->
                    <span
                      class="
                        flex items-center justify-center
                        h-[30px]
                        w-[184px]
                        rounded-full
                        bg-[#C8EFC5]
                        text-[#388A46]
                        text-[10px]
                        font-semibold
                        text-center
                        leading-none
                      "
                    >
                      Selesai Review
                    </span>

                  </div>
                </td>

                <!-- Tindakan -->
                <td class="pl-[6px]">

                  <div class="flex items-center gap-[4px]">

                    <button
                      class="
                        border border-[#67B886]
                        text-[#4A4A4A]
                        bg-white
                        rounded-[8px]
                        text-[10px]
                        px-[14px]
                        py-[3px]
                        hover:bg-[#F7FFF9]
                        transition-all
                      "
                    >
                      Approve
                    </button>

                    <button
                      class="
                        border border-[#C98A8A]
                        text-[#4A4A4A]
                        bg-white
                        rounded-[8px]
                        text-[10px]
                        px-[14px]
                        py-[3px]
                        hover:bg-[#FFF8F8]
                        transition-all
                      "
                    >
                      Revisi
                    </button>

                  </div>

                </td>

              </tr>

            </tbody>

          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'

const naskahList = [
  {
    id: 1,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina']
  },
  {
    id: 2,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina']
  },
  {
    id: 3,
    judul: 'Pemrograman Berorientasi Objek',
    kategori: 'Buku Ajar',
    reviewers: ['Dr. Arief', 'Prof. Rina']
  }
]
</script>

<style scoped>
* {
  font-family: 'Manrope', sans-serif;
}

table {
  border-spacing: 0;
}

button {
  outline: none;
}

button:focus {
  outline: none;
  box-shadow: none;
}
</style>