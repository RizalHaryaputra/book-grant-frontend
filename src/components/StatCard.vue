<template>
  <div class="bg-white rounded-3xl p-6 card-shadow flex flex-col relative overflow-hidden h-40">
    <div class="flex justify-between items-start mb-4">
      <div :class="[iconBg[0], 'p-2 rounded-lg']">
        <slot></slot>
      </div>
      <span :class="[badgeBg[0], badgeBg[1], 'text-[10px] font-bold px-2 py-1 rounded-full']">
        {{ badge }}
      </span>
    </div>
    <p class="text-xs text-gray-400 font-medium">{{ title }}</p>
    <p class="text-3xl font-bold text-pbl-brown">{{ value }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    required: true
  },
  badgeBg: {
    type: Array,
    required: true
  },
  iconBg: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.card-shadow {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
</style>
