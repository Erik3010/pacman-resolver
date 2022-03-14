<template>
  <SlideTransition>
    <div
      v-if="notificationStore.isShow"
      class="fixed z-50 top-8 right-8 bg-gray-800 rounded-md shadow-2xl border border-gray-700 inline-flex items-start p-4"
    >
      <div class="mr-3">
        <svg
          v-if="notificationStore.status === NotificationStatus.SUCCESS"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="notificationStore.status === NotificationStatus.ERROR"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div>
        <h4 class="text-base text-white font-medium">
          {{ notificationStore.title }}
        </h4>
        <p
          v-if="notificationStore.subtitle"
          class="text-gray-400 text-sm mt-0.5"
        >
          {{ notificationStore.subtitle }}
        </p>
      </div>
      <button
        class="group ml-8 cursor-pointer p-0.5 rounded-md transition duration-150 focus:outline-none hover:bg-gray-700"
        @click="notificationStore.hide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400 group-hover:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </SlideTransition>
</template>

<script setup lang="ts">
import { useNotification } from "@/store/notification";
import { NotificationStatus } from "@/enums/NotificationStatus";
import SlideTransition from "@/components/transitions/SlideTransition.vue";

const notificationStore = useNotification();
</script>
