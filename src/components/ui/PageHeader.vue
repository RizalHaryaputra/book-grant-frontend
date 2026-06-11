<template>
  <div
    class="bg-white rounded-[28px] px-8 py-6 flex items-center justify-between shadow-sm"
  >

    <div>

      <h1
        class="text-[34px] leading-none tracking-[-1px] font-extrabold"
      >
        {{ title }}
      </h1>

      <p
        class="text-[#80746b] mt-2 text-[15px]"
      >
        {{ subtitle }}
      </p>

    </div>

    <slot />

  </div>
</template>

<script setup>
defineProps({
  title: String,
  subtitle: String,
})
</script>