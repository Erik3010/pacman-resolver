<template>
  <DefaultLayout>
    <transition mode="in-out" name="zoom">
      <RouterView />
    </transition>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import { useRouter } from "vue-router";

const router = useRouter();
router.beforeEach((to, from, next) => {
  next();
});
</script>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  animation: zoom 0.5s;
  animation-fill-mode: both;
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
