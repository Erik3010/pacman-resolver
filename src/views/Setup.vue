<template>
  <section>
    <header class="text-center">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Define your board row and column</p>
    </header>
    <form class="flex flex-col items-center mt-16" @submit.prevent>
      <div
        class="flex flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-7"
      >
        <TextField
          label="Row"
          id="row"
          type="number"
          v-model.number="boardStore.row"
        >
          <template #prefix-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
              />
            </svg>
          </template>
        </TextField>
        <TextField
          label="Column"
          id="col"
          type="number"
          v-model.number="boardStore.col"
        >
          <template #prefix-icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </template>
        </TextField>
      </div>
      <Button @click="redirectToCreatePage" :classNames="['mt-12', 'mx-auto']">
        Start Building Now!
      </Button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import TextField from "@/components/atoms/TextField.vue";
import Button from "@/components/atoms/Button.vue";

import { useBoard } from "@/store/board";
import { useNotification, NotificationStatus } from "@/store/notification";

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();

const redirectToCreatePage = () => {
  if (!boardStore.row || !boardStore.col) {
    notificationStore.show({
      status: NotificationStatus.ERROR,
      title: "Invalid Row and Column",
      subtitle: "Please input a valid number in Row and Column field!",
      duration: 4500,
    });
    return;
  }

  router.push({ name: "Create" });
};
</script>
