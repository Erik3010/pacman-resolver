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
      Resolve
    </Button>
    <Button :classNames="['mx-auto', 'mt-5']" @click="animatePath">
      Animate
    </Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import Button from "@/components/atoms/Button.vue";
import WheelMenu from "@/components/organisms/WheelMenu/Index.vue";
import Box from "@/components/organisms/Box.vue";

import { useBoard } from "@/store/board";
import { useNotification } from "@/store/notification";

import { NotificationStatus } from "@/enums/NotificationStatus";

import { Path } from "@/types/Path";

import pathfinding from "@/utils/pathfinding";
import board from "@/utils/board-template";

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();

const generator = ref<Generator<Path | undefined, void, unknown> | null>(null);

if (!boardStore.row || !boardStore.col) {
  notificationStore.show({
    status: NotificationStatus.ERROR,
    title: "Invalid Row and Column",
    subtitle: "Invalid Row and Column you will be redirect back",
    duration: 4500,
  });
  router.push({ name: "Setup" });
}

onMounted(async () => {
  boardStore.generateBoard();
  await nextTick();

  boardStore.board = board;
});

function* pathGenerator(paths: Path[]) {
  const route = [...paths];

  while (route.length) {
    yield route.shift();
  }
}

const startResolve = () => {
  const paths = pathfinding(boardStore.board);

  boardStore.generateCells();
  console.log(paths);

  generator.value = pathGenerator(paths);
};

const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

const animatePath = async () => {
  boardStore.clearSelectedCoordinate();
  boardStore.isAnimating = true;

  let route = generator.value!.next().value;
  while (!!route) {
    for (let i = 0; i < route.path.length; i++) {
      if (i === route.path.length - 1) continue;

      const [y, x] = route.path[i];
      const [nextY, nextX] = route.path[i + 1];

      const current = boardStore.board[y][x];
      const next = boardStore.board[nextY][nextX];

      boardStore.swapCell({
        currentCoordinate: { y, x },
        nextCoordinate: { y: nextY, x: nextX },
      });

      boardStore.setCell({ y, x }, "callback", () => {
        boardStore.setCell({ y, x }, "callback", null);

        boardStore.setBoardItem({ y, x }, next);
        boardStore.setBoardItem({ y: nextY, x: nextX }, current);
      });

      await new Promise<void>((resolve) => {
        boardStore.setCell({ y, x }, "resolve", async () => {
          boardStore.setCell({ y, x }, "resolve", null);

          // prepare for previous
          await sleep(0);
          resolve();
        });
      });
    }
    route = generator.value!.next().value;
  }

  boardStore.isAnimating = false;
};
</script>
