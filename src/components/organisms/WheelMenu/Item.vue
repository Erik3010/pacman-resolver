<template>
  <div
    class="relative cursor-pointer transition hover:bg-gray-800"
    @click="emit('click')"
  >
    <div
      class="absolute flex justify-center items-center w-full h-full text-2xl transform -rotate-45 select-none"
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
