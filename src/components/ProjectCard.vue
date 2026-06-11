<template>
  <div class="bg-[#F2EFE9] rounded-3xl p-6 border border-white/50 relative">
    <div class="flex justify-between items-start mb-2">
      <h3 class="text-lg font-bold text-pbl-brown leading-tight">{{ title }}</h3>
      <button class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>
    </div>
    <p class="text-xs text-gray-400 mb-4">{{ subtitle }}</p>
    <div class="mb-6">
      <div class="flex justify-between items-center mb-2">
        <span class="text-[10px] font-bold text-pbl-brown">Progres Penulisan</span>
        <span class="text-[10px] font-bold text-pbl-brown">{{ progress }}%</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-[#9B6A43] h-2 rounded-full transition-all"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
    <div class="flex -space-x-2">
      <div
        v-for="(collaborator, index) in collaborators.split(',')"
        :key="index"
        class="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold"
        :style="{ backgroundColor: getCollaboratorColor(index) }"
      >
        {{ collaborator.trim() }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    required: true
  },
  collaborators: {
    type: String,
    required: true
  }
})

const colors = ['#D9D9D9', '#E5D5C5', '#C2CDC2', '#D4C4B4']

const getCollaboratorColor = (index) => {
  return colors[index % colors.length]
}
</script>

<style scoped>
</style>
