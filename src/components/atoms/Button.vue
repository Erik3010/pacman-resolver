<template>
  <button :class="['button', `button--${color}`, props.classNames]">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  classNames?: string[];
  color: "primary" | "error";
}

const props = withDefaults(defineProps<Props>(), {
  color: "primary",
});
</script>
<style scoped>
.button {
  @apply flex
          items-center
          rounded-lg
          px-8
          py-4
          font-medium
          transition
          ease-in-out
          duration-300
          disabled:shadow-none
          disabled:cursor-not-allowed
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          hover:shadow-2xl;
}
.button--primary {
  @apply bg-blue-700 
        hover:bg-blue-800 
        focus:ring-blue-700 
        focus:ring-offset-gray-900 
        hover:shadow-blue-900
        disabled:bg-gray-800;
}

.button--error {
  @apply bg-red-600 
        hover:bg-red-700 
        focus:ring-red-600 
        focus:ring-offset-red-900
        hover:shadow-red-900
        disabled:bg-gray-800;
}
</style>
