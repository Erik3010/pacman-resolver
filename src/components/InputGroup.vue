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
        type="text"
        v-model="value"
        placeholder="Row"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

type fieldType = "text" | "number";

const props = defineProps<{
  label: string | null;
  id: string;
  type: fieldType;
}>();

const value = ref("");

watch(value, (val: string) => {
  props.type === "number" && (value.value = val.replace(/[^\d]/g, ""));
});
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
