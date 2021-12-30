<template>
  <div
    class="
      min-h-screen
      w-full
      flex flex-col
      justify-center
      items-center
      text-white
      bg-main
      content
    "
  >
    <section class="w-full z-10">
      <main>
        <h1 class="text-center font-bold text-7xl">Pacman Resolver</h1>
        <p class="mt-3 text-center text-md text-gray-400">
          Resolve your pacman maze
        </p>
      </main>
      <footer class="w-full text-center fixed bottom-8 text-gray-500 text-sm">
        Build by <a target="_blank" class="hover:underline hover:underline-offset-2" href="https://github.com/Erik3010">Erik3010</a> ✌
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.content::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
}
</style>
