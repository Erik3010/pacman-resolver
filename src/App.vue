<template>
  <DefaultLayout>
    <RouterView />
  </DefaultLayout>
  <Footer />
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import Footer from "@/components/Footer.vue";
</script>

<style scoped></style>
