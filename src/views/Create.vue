<template>
  <section>
    <header class="text-center mb-12">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Put the obstacle inside the board</p>
    </header>
    <main class="flex flex-col items-center" ref="main">
      <div class="grid" :style="gridStyles">
        <!-- <TransitionGroup name="fade">
          <div
            class="flex space-x-3"
            v-for="(row, y) in boardStore.board"
            :key="y"
          >
            <Box
              v-for="(column, x) in row"
              :key="x"
              :coordinate="{ y, x }"
              :item="column"
              :style="{ transitionDelay: `${row.length * x * 0.01}s` }"
            />
          </div>
        </TransitionGroup> -->
        <TransitionGroup name="fade">
          <Box
            v-for="(item, index) in boardGrid"
            :key="index"
            :coordinate="item.id"
            :item="item.value"
            :style="{
              '--transitionDelay': `${index * TRANSITION_DELAY}s`,
            }"
          />
        </TransitionGroup>
      </div>
    </main>
    <Button
      :classNames="['mx-auto', 'mt-12']"
      @click="startResolve"
      :disabled="disabledResolveButton"
    >
      {{ buttonText }}
    </Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";

import Button from "@/components/atoms/Button.vue";
import WheelMenu from "@/components/organisms/WheelMenu/Index.vue";
import Box from "@/components/organisms/Box.vue";

import { useBoard } from "@/store/board";
import { useNotification } from "@/store/notification";

import { NotificationStatus } from "@/enums/NotificationStatus";

import { Path } from "@/types/Path";

import pathfinding from "@/utils/pathfinding";
// import board from "@/utils/board-template";
import { BoardItem } from "@/types/BoardItem";

const TRANSITION_DELAY = 0.1;
const MS_TO_SECOND = 1000;
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

const router = useRouter();
const boardStore = useBoard();
const notificationStore = useNotification();
const latestBoardState = ref<BoardItem[][]>([]);

const buttonText = computed(() =>
  boardStore.isAnimating ? "Resolving..." : "Resolve!"
);
const gridStyles = computed(() => {
  return {
    gridTemplateColumns: `repeat(${boardStore.col}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${boardStore.row}, minmax(0, 1fr))`,
  };
});
const disabledResolveButton = computed(() => {
  return (
    boardStore.isAnimating ||
    boardStore.isAnimatingInitialAnimation ||
    boardStore.isBoardHasEmptyCell
  );
});

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

const boardGrid = computed(() => {
  return boardStore.board.reduce((total: any, row, y) => {
    total.push(...row.map((item, x) => ({ id: { y, x }, value: item })));
    return total;
  }, []);
});

onMounted(async () => {
  boardStore.isAnimatingInitialAnimation = true;

  boardStore.generateBoard();
  await nextTick();

  // boardStore.board = board;

  const animationDuration =
    boardStore.row * boardStore.col * TRANSITION_DELAY * MS_TO_SECOND;

  timeout.value = setTimeout(
    () => (boardStore.isAnimatingInitialAnimation = false),
    animationDuration
  );
});

function* pathGenerator(paths: Path[]) {
  const route = [...paths];

  while (route.length) {
    yield route.shift();
  }
}

const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

const startResolve = () => {
  if (boardStore.isAnimating || boardStore.isAnimatingInitialAnimation) return;

  latestBoardState.value = JSON.parse(JSON.stringify(boardStore.board));

  const paths = pathfinding(boardStore.board);

  boardStore.generateCells();
  console.log(paths);

  generator.value = pathGenerator(paths);

  animatePath();
};

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

      boardStore.setCell({ y, x }, "swap", () => {
        boardStore.setCell({ y, x }, "swap", null);

        boardStore.setBoardItem(
          { y, x },
          next === BoardItem.FOOD ? BoardItem.STREET : next
        );
        boardStore.setBoardItem({ y: nextY, x: nextX }, current);
      });

      await new Promise<void>((resolve) => {
        boardStore.setCell({ y, x }, "resolve", async () => {
          boardStore.setCell({ y, x }, "resolve", null);

          // wait for next frame update
          await sleep(0);
          resolve();
        });
      });
    }
    route = generator.value!.next().value;
  }

  boardStore.isAnimating = false;
  console.log(latestBoardState.value);
};

onUnmounted(() => {
  boardStore.resetBoard();
  timeout.value && clearTimeout(timeout.value);
});
</script>

<style>
.fade-move {
  transition: 0.2s ease var(--transitionDelay);
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease var(--transitionDelay);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(1.25);
}
</style>
