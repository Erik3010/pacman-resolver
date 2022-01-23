<template>
  <transition name="slide">
    <slot />
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translate(100%);
}
</style>
