<template>
  <main class="w-full z-10">
    <section class="max-w-2xl w-full mx-auto">
      <h1 class="text-center font-bold text-7xl">Pacman Resolver</h1>
      <p class="mt-2 text-center text-md text-gray-400">
        Resolve your pacman maze
      </p>
      <RouterLink :to="{ name: 'Create' }">
        <Button>Start Resolve</Button>
      </RouterLink>
    </section>
    <Footer />
  </main>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
</script>
