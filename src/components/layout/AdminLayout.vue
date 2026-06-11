<template>
  <div class="flex min-h-screen bg-[#F4EDE4]">
    <AppSidebar />
    <main class="flex-1 overflow-y-auto h-screen">
      <div class="px-8 py-7">
        <AppTopbar />
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from "./AppSidebar.vue"
import AppTopbar from "./AppTopbar.vue"
</script>