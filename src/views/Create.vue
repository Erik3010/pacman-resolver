<template>
  <section>
    <header class="text-center mb-12">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Put the obstacle inside the board</p>
    </header>
    <main class="flex flex-col items-center" ref="main">
      <div class="space-y-3">
        <div class="flex space-x-3" v-for="(row, y) in boardStore.board">
          <Box
            v-for="(column, x) in row"
            :coordinate="{ y, x }"
            :item="column"
          />
        </div>
      </div>
    </main>
    <Button :classNames="['mx-auto', 'mt-12']" @click="startResolve">
      Resolve !
    </Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import WheelMenu from "@/components/organisms/WheelMenu/Index.vue";
import Box from "@/components/organisms/Box.vue";

import { useRouter } from "vue-router";

import { useBoard, BoardItem } from "@/store/board";
import { useNotification, NotificationStatus } from "@/store/notification";

import pathfinding from "@/utils/pathfinding";

import { onMounted, nextTick } from "vue";

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();

if (!boardStore.row || !boardStore.col) {
  notificationStore.show({
    status: NotificationStatus.ERROR,
    title: "Invalid Row and Column",
    subtitle: "Invalid Row and Column you will be redirect back",
    duration: 4500,
  });
  router.push({ name: "Setup" });
}

const board = [
  [
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
  ],
  [
    BoardItem.WALL,
    BoardItem.PACMON,
    BoardItem.STREET,
    BoardItem.STREET,
    BoardItem.WALL,
  ],
  [
    BoardItem.WALL,
    BoardItem.STREET,
    BoardItem.WALL,
    BoardItem.STREET,
    BoardItem.WALL,
  ],
  [
    BoardItem.WALL,
    BoardItem.FOOD,
    BoardItem.WALL,
    BoardItem.FOOD,
    BoardItem.WALL,
  ],
  [
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
    BoardItem.WALL,
  ],
];
onMounted(async () => {
  boardStore.generateBoard();
  await nextTick();

  boardStore.board = board;
});

const startResolve = () => {
  // TODO: Swap animation
  // TODO: Add class to translate
  // TODO: Swap item at the board
  // TODO: Remove the class that used to translate
  boardStore.board[1][1] = BoardItem.STREET;
  boardStore.board[2][1] = BoardItem.PACMON;
  return;

  const paths = pathfinding(boardStore.board);

  boardStore.generateBoardStepCount();

  console.log(paths);
};
</script>
