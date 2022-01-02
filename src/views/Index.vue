<template>
  <section class="max-w-2xl w-full mx-auto text-center">
    <h1 class="font-bold text-5xl sm:text-7xl mb-2">Pacman Resolver</h1>
    <p class="text-md text-gray-400">Resolve your pacman maze</p>
    <RouterLink :to="{ name: 'Setup' }">
      <Button>Start Resolve</Button>
    </RouterLink>
  </section>
  <Footer />
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
</script>
