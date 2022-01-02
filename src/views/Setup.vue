<template>
  <header class="text-center">
    <h1 class="font-bold text-3xl mb-0.5">Setup Your Board</h1>
    <p class="text-gray-400 text-sm">Define your board row and column</p>
  </header>
  <form class="flex mt-6">
    <InputGroup label="Row" id="row" type="number">
      <template #prefix-icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="
            h-5
            w-5
            text-gray-400
            group-focus-within:text-white
            transition
            ease-in-out
            duration-300
          "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      </template>
    </InputGroup>
  </form>
</template>

<script setup lang="ts">
import InputGroup from "@/components/InputGroup.vue";
</script>
