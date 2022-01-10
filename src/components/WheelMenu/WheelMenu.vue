<template>
  <div class="absolute top-32 left-24">
    <div class="relative">
      <div
        class="border-2 border-blue-300 bg-gray-900 rounded-full w-52 h-52 grid grid-cols-2 grid-rows-2 transform rotate-45 overflow-hidden shadow-xl shadow-gray-900 divide-gray-700 divide-x divide-y"
      >
        <WheelMenuItem>👾</WheelMenuItem>
        <WheelMenuItem>👾</WheelMenuItem>
        <WheelMenuItem>👾</WheelMenuItem>
        <WheelMenuItem>👾</WheelMenuItem>
      </div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-24 h-24 flex justify-center items-center p-1.5 shadow-md"
      >
        <div class="rounded-full w-full h-full bg-gray-800"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WheelMenuItem from "@/components/WheelMenu/WheelMenuItem.vue";
</script>

<style scoped></style>
