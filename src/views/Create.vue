<template>
  <section>
    <header class="text-center mb-12">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Put the obstacle inside the board</p>
    </header>
    <main class="flex flex-col items-center" ref="main">
      <div class="space-y-3">
        <div class="flex space-x-3" v-for="row in boardStore.board">
          <div v-for="column in row" class="box" @click="boxClickHandler">
            {{ column }}
          </div>
        </div>
      </div>
    </main>
    <Button :classNames="['mx-auto', 'mt-12']" @click="startResolve">
      Start!
    </Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import WheelMenu from "@/components/organisms/WheelMenu/Index.vue";

import { ref } from "vue";
import { useRouter } from "vue-router";

import { useBoard, BoardItem } from "@/store/board";
import { useNotification, NotificationStatus } from "@/store/notification";

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();

type Coordinate = [number, number];

const selectedBox = ref<Coordinate[]>([]);

if (!boardStore.row || !boardStore.col) {
  notificationStore.show({
    status: NotificationStatus.ERROR,
    title: "Invalid Row and Column",
    subtitle: "Invalid Row and Column you will be redirect back",
    duration: 4500,
  });
  router.push({ name: "Setup" });
}

boardStore.generateBoard();

const boxClickHandler = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.classList.toggle("box--active");
};

const startResolve = () => {
  boardStore.setBoardItem(0, 0, BoardItem.STREET);

  console.log(boardStore.board);
};
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 hover:bg-main rounded-lg cursor-pointer transition duration-300 ease-in-out;
}
.box--active {
  @apply border-2 border-blue-600 scale-110 bg-main;
}
</style>
