<template>
  <div class="relative cursor-pointer hover:bg-gray-800 transition">
    <div
      class="absolute flex justify-center items-center w-full h-full transform -rotate-45 text-xl select-none"
    >
      <slot />
    </div>
  </div>
</template>
