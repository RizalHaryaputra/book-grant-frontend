<template>
  <div
    class="bg-[#F3EEE7] rounded-3xl p-6 shadow-md h-[320px]"
  >
    <!-- Title -->
    <h2
      class="text-2xl font-bold text-center text-[#3E2C23] mb-6"
    >
      Status Distribusi Naskah
    </h2>

    <!-- Chart -->
    <div
      class="flex items-end justify-around h-[220px] px-4"
    >
      <!-- Draft -->
      <div class="flex flex-col items-center">
        <div
          class="w-14 bg-[#5B4335] rounded-t-xl"
          style="height: 180px"
        ></div>
        <p class="mt-2 text-sm text-[#3E2C23]">
          Draft
        </p>
      </div>

      <!-- Under Review -->
      <div class="flex flex-col items-center">
        <div
          class="w-14 bg-[#5B4335] rounded-t-xl"
          style="height: 130px"
        ></div>
        <p class="mt-2 text-sm text-[#3E2C23]">
          Under Review
        </p>
      </div>

      <!-- Revision -->
      <div class="flex flex-col items-center">
        <div
          class="w-14 bg-[#5B4335] rounded-t-xl"
          style="height: 85px"
        ></div>
        <p class="mt-2 text-sm text-[#3E2C23]">
          Revision
        </p>
      </div>

      <!-- Preprint -->
      <div class="flex flex-col items-center">
        <div
          class="w-14 bg-[#5B4335] rounded-t-xl"
          style="height: 60px"
        ></div>
        <p class="mt-2 text-sm text-[#3E2C23]">
          Preprint
        </p>
      </div>

      <!-- Ready -->
      <div class="flex flex-col items-center">
        <div
          class="w-14 bg-[#5B4335] rounded-t-xl"
          style="height: 40px"
        ></div>
        <p class="mt-2 text-sm text-[#3E2C23]">
          Ready
        </p>
      </div>
    </div>
  </div>
</template>
