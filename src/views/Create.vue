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
    <Button :classNames="['mx-auto', 'mt-5']" @click="getPath"> Get ! </Button>
    <Button :classNames="['mx-auto', 'mt-5']" @click="test()"> Test ! </Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/atoms/Button.vue";
import WheelMenu from "@/components/organisms/WheelMenu/Index.vue";
import Box from "@/components/organisms/Box.vue";

import { useRouter } from "vue-router";

import { useBoard, BoardItem, Direction } from "@/store/board";
import { useNotification, NotificationStatus } from "@/store/notification";

import pathfinding, { Path } from "@/utils/pathfinding";

import { onMounted, nextTick, ref } from "vue";

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
// const board = [
//   [
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//   ],
//   [
//     BoardItem.WALL,
//     BoardItem.PACMON,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//   ],
//   [
//     BoardItem.WALL,
//     BoardItem.STREET,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//   ],
//   [
//     BoardItem.WALL,
//     BoardItem.FOOD,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//   ],
//   [
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//     BoardItem.WALL,
//   ],
// ];
onMounted(async () => {
  boardStore.generateBoard();
  await nextTick();

  boardStore.board = board;
});

function* pathGenerator(paths: Path[]) {
  const temp = [...paths];

  while (temp.length) {
    const current = temp.shift();
    yield current;
  }
}
let generator: Generator<Path | undefined, void, unknown> | null = null;

const startResolve = () => {
  // TODO: Swap animation
  // TODO: Add class to translate
  // TODO: Swap item at the board
  // TODO: Remove the class that used to translate
  // boardStore.board[1][1] = BoardItem.STREET;
  // boardStore.board[2][1] = BoardItem.PACMON;
  // return;

  const paths = pathfinding(boardStore.board);

  boardStore.generateBoardStepCount();
  console.log(paths);

  generator = pathGenerator(paths);
};

const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

const getBoardId = (y: number, x: number) => `${y},${x}`;

const temp = ref(true);
const test = () => {
  boardStore.boardStepCount.find(
    (item) => item.id === getBoardId(1, 1)
  )!.swapDirection = temp.value ? Direction.DOWN : null;
  temp.value = !temp.value;
};

const getPath = async () => {
  // const promise = new Promise((resolve) => {
  //   boardStore.boardStepCount.find(
  //     (item) => item.id === `${1},${1}`
  //   )!.callback = resolve as () => void;
  // });

  // await promise;

  let path = generator!.next().value;
  while (!!path) {
    for (let i = 0; i < path.path.length; i++) {
      if (i === path.path.length - 1) continue;

      const p = path.path[i];
      const nextP = path.path[i + 1];

      const [y, x] = p;

      const [curY, curX] = p;
      const current = boardStore.board[curY][curX];

      const [nextY, nextX] = nextP;
      const next = boardStore.board[nextY][nextX];

      if (curX !== nextX) {
        if (curX > nextX) {
          boardStore.boardStepCount.find(
            (item) => item.id === `${curY},${curX}`
          )!.swapDirection = Direction.LEFT;
          boardStore.boardStepCount.find(
            (item) => item.id === `${nextY},${nextX}`
          )!.swapDirection = Direction.RIGHT;
        } else {
          boardStore.boardStepCount.find(
            (item) => item.id === `${curY},${curX}`
          )!.swapDirection = Direction.RIGHT;
          boardStore.boardStepCount.find(
            (item) => item.id === `${nextY},${nextX}`
          )!.swapDirection = Direction.LEFT;
        }
      }
      if (curY !== nextY) {
        if (curY > nextY) {
          boardStore.boardStepCount.find(
            (item) => item.id === `${curY},${curX}`
          )!.swapDirection = Direction.UP;
          boardStore.boardStepCount.find(
            (item) => item.id === `${nextY},${nextX}`
          )!.swapDirection = Direction.DOWN;
        } else {
          boardStore.boardStepCount.find(
            (item) => item.id === `${curY},${curX}`
          )!.swapDirection = Direction.DOWN;
          boardStore.boardStepCount.find(
            (item) => item.id === `${nextY},${nextX}`
          )!.swapDirection = Direction.UP;
        }
      }

      // console.log(p);

      await new Promise<void>((resolve) => {
        boardStore.boardStepCount.find(
          (item) => item.id === `${y},${x}`
        )!.callback = async () => {
          boardStore.board[curY][curX] = next;
          boardStore.board[nextY][nextX] = current;

          resolve();
        };
      });

      // SWAP
    }

    path = generator!.next().value;
  }
};
</script>
