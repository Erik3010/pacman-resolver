<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-base text-gray-200 font-semibold"
    >
      {{ label }}
    </label>
    <div class="relative flex items-center group">
      <div class="absolute left-3">
        <slot name="prefix-icon" />
      </div>
      <input
        :id="id"
        :type="type"
        placeholder="Row"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type fieldType = "text" | "number" | "date" | "search" | "tel";

const props = defineProps<{
  label: string | null;
  id: string;
  type: fieldType;
}>();
</script>

<style scoped>
input {
  @apply shadow-md
        bg-gray-800
        border-t border-gray-700
        rounded-md
        appearance-none
        text-white
        py-3
        pr-5
        pl-12
        h-full
        placeholder-gray-400
        font-semibold
        transition
        ease-in-out
        duration-300
        focus:outline-none
        focus:ring-2
        focus:ring-blue-600
        focus:ring-offset-2
        focus:ring-offset-gray-900;
}
</style>
