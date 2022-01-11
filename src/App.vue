<template>
  <DefaultLayout>
    <ZoomTransition>
      <RouterView />
    </ZoomTransition>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import ZoomTransition from "@/components/ZoomTransition.vue";
</script>
