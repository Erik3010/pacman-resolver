<template>
  <div
    class="content relative min-h-screen w-full flex flex-col justify-center items-center text-white bg-main"
  >
    <main class="w-full z-10 py-20">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/organisms/Footer.vue";
</script>

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
