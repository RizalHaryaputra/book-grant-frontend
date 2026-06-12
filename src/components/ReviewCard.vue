<template>
  <div
    class="bg-[#F7F4EE] rounded-[24px] p-6 shadow-md border border-white"
  >
    <h2
      class="text-center text-[28px] font-bold text-[#2A1B12] mb-6"
      style="font-family: 'Libre Caslon Text', serif;"
    >
      Perlu Di Tinjau
    </h2>

    <div class="space-y-3">
      <div v-if="preprints.length === 0" class="text-center text-gray-500 py-4">
        Tidak ada naskah yang perlu ditinjau.
      </div>
      <div
        v-for="book in preprints"
        :key="book.id"
        class="bg-white rounded-xl px-4 py-3 flex justify-between items-center border-l-4 border-green-600 shadow-sm"
      >
        <div>
          <h3 class="font-medium text-[#2A1B12]">
            {{ book.title }}
          </h3>
        </div>

        <span class="text-sm text-gray-500">
          {{ book.author }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  preprints: {
    type: Array,
    default: () => []
  }
})
</script>
