<template>
  <DefaultLayout>
    <ZoomTransition>
      <RouterView />
    </ZoomTransition>
  </DefaultLayout>

  <Notification />
</template>

<script setup lang="ts">
import DefaultLayout from "@/layouts/Default.vue";
import ZoomTransition from "@/components/transitions/ZoomTransition.vue";
import Notification from "@/components/organisms/Notification.vue";
</script>
