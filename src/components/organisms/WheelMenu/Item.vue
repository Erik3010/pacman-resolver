<template>
  <div
    class="relative cursor-pointer transition hover:bg-gray-800"
    @click="emit('click')"
  >
    <div
      class="absolute w-full h-full flex justify-center items-center transform -rotate-45 text-2xl select-none"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>
