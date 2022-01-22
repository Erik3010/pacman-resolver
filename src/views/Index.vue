<template>
  <section class="max-w-2xl w-full mx-auto text-center">
    <h1 class="font-bold text-5xl sm:text-7xl mb-2">
      Pacman
      <span
        class="bg-gradient-to-br from-cyan-500 to-blue-600 text-transparent bg-clip-text"
      >
        Resolver
      </span>
    </h1>
    <p class="text-md text-gray-400">Resolve your pacman maze</p>
    <RouterLink :to="{ name: 'Setup' }">
      <Button :classNames="['mt-12', 'mx-auto']">Start Resolve</Button>
    </RouterLink>
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
</script>
