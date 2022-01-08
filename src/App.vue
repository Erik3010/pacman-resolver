<template>
  <DefaultLayout>
    <RouterView #default="{ Component }">
      <transition name="zoom" mode="in-out">
        <component :is="Component" />
      </transition>
    </RouterView>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
</script>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  animation: zoom 0.5s both;
}

.zoom-leave-active {
  animation-direction: reverse;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  to {
    opacity: 1;
  }
}
</style>
