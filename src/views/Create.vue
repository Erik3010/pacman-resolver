<template>
  <section>
    <header class="text-center mb-12">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Put the obstacle inside the board</p>
    </header>
    <main class="flex flex-col items-center" ref="main">
      <div class="space-y-3">
        <div class="flex space-x-3" v-for="(row, y) in boardStore.board">
          <div
            v-for="(column, x) in row"
            :class="[
              'box',
              'select-none',
              { 'box--active': boardStore.isInSelectedCoordinate({ y, x }) },
            ]"
            @click="boxClickHandler({ y, x })"
          >
            <img
              v-if="!!column"
              class="w-8 h-8"
              :src="boardItemImage[column]"
              :alt="column"
            />
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

import { useRouter } from "vue-router";

import useShiftKey from "@/hooks/useShiftKey";
import { useBoard, BoardItem, Coordinate } from "@/store/board";
import { useNotification, NotificationStatus } from "@/store/notification";

import Street from "@/assets/street.png";
import Food from "@/assets/food.png";
import Pacmon from "@/assets/pacmon.png";
import Wall from "@/assets/wall.png";

import pathfinding from "@/utils/pathfinding";

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();
const { isShiftKeyPressed } = useShiftKey();

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

const boardItemImage = {
  [BoardItem.STREET]: Street,
  [BoardItem.FOOD]: Food,
  [BoardItem.PACMON]: Pacmon,
  [BoardItem.WALL]: Wall,
};

const boxClickHandler = (coordinate: Coordinate) => {
  if (boardStore.isInSelectedCoordinate(coordinate)) {
    boardStore.removeSelectedCoordinate(coordinate);
    return;
  }

  if (isShiftKeyPressed.value) {
    boardStore.setBulkSelectedCoordinate(coordinate);
  } else {
    boardStore.setSelectedCoordinate(coordinate);
  }
};

const startResolve = () => {
  pathfinding(boardStore.board);
};
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 hover:bg-main rounded-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center;
}
.box--active {
  @apply border-2 border-blue-600 scale-110 bg-main;
}
</style>
