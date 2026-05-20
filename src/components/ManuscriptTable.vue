<template>
  <tr class="hover:bg-gray-50 transition-colors">
    <td class="px-8 py-5">
      <div class="flex items-center space-x-3">
        <div class="text-orange-800">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
          </svg>
        </div>
        <span class="font-bold text-sm text-pbl-brown">{{ title }}</span>
      </div>
    </td>
    <td class="px-8 py-5 text-center text-[11px] text-gray-500 font-medium">{{ category }}</td>
    <td class="px-8 py-5 text-center">
      <span :class="[statusBg[0], statusBg[1], 'text-[10px] font-bold px-3 py-1 rounded-lg']">
        {{ status }}
      </span>
    </td>
    <td class="px-8 py-5 text-right text-[11px] text-gray-500 font-medium">{{ date }}</td>
  </tr>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  statusBg: {
    type: Array,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
</style>
