<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 font-semibold text-base text-gray-200"
    >
      {{ label }}
    </label>
    <div class="group relative flex items-center">
      <div class="input__prefix-icon absolute left-3">
        <slot name="prefix-icon" />
      </div>
      <input
        :id="id"
        type="text"
        :value="modelValue"
        @input="inputHandler"
        :placeholder="label ?? ''"
        class="input__field"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type fieldType = "text" | "number";

const props = defineProps<{
  label: string | null;
  id: string;
  type: fieldType;
  modelValue: string | number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const inputHandler = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  props.type === "number" &&
    ((event.target as HTMLInputElement).value = value.replace(/[^\d]/g, ""));

  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<style scoped>
.input__field {
  @apply shadow-md
        bg-gray-800
        h-full
        border-t border-gray-700
        rounded-md
        appearance-none
        text-white
        py-3
        pr-5
        pl-12
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
.input__prefix-icon {
  @apply h-5
          w-5
          text-gray-400
          group-focus-within:text-white
          transition
          ease-in-out
          duration-300;
}
</style>
