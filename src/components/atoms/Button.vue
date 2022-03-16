<template>
  <button :class="['button', props.classNames]">
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  classNames?: string[];
}>();
</script>
<style scoped>
.button {
  @apply bg-blue-700
          flex
          items-center
          hover:bg-blue-800
          rounded-lg
          px-8
          py-4
          font-medium
          transition
          ease-in-out
          duration-300
          disabled:bg-gray-800
          disabled:shadow-none
          disabled:cursor-not-allowed
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-blue-700
          focus:ring-offset-gray-900
          hover:shadow-blue-900 hover:shadow-2xl;
}
</style>
