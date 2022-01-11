<template>
  <transition name="zoom" mode="in-out" v-on="hooks">
    <slot />
  </transition>
</template>

<script setup lang="ts">
interface Props {
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 500,
});

const setDuration = (el: Element) => {
  const element = el as HTMLElement;
  element.style.animationDuration = `${props.duration}ms`;

  console.log(element);
};
const cleanUpDuration = (el: Element) => {
  const element = el as HTMLElement;
  element.style.animationDuration = "";
};

const hooks = {
  beforeEnter: setDuration,
  afterEnter: cleanUpDuration,
  beforeLeave: setDuration,
  afterLeave: cleanUpDuration,
};
</script>

<style scoped>
.zoom-enter-active,
.zoom-leave-active {
  animation: zoom;
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
