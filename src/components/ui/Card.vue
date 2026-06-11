<template>
  <div
    class="bg-whiteSoft rounded-3xl p-6 shadow-soft"
  >

    <div
      class="w-12 h-12 rounded-2xl bg-[#f5eee8] flex items-center justify-center mb-4"
    >
      <component
        :is="icon"
        class="text-primary"
      />
    </div>

    <p class="text-gray-500">
      {{ title }}
    </p>

    <h2 class="text-4xl font-bold text-primary mt-2">
      {{ value }}
    </h2>

  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: [String, Number],
  icon: Object,
})
</script>