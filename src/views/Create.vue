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

import { useBoard, BoardItem, Direction, Coordinate } from "@/store/board";
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
  boardStore.setBoardStepCount({ y: 1, x: 1 }, "swapDirection", Direction.UP);
};

const getPath = async () => {
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

      const currentEntity: Coordinate = { y: curY, x: curX };
      const nextEntity: Coordinate = { y: nextY, x: nextX };
      const axis = [
        {
          axis: "x",
          direction: [Direction.LEFT, Direction.RIGHT],
        },
        {
          axis: "y",
          direction: [Direction.UP, Direction.DOWN],
        },
      ];

      axis.forEach(({ axis, direction }) => {
        const { current, next } = {
          current: currentEntity[axis as keyof Coordinate],
          next: nextEntity[axis as keyof Coordinate],
        };

        if (current === next) return;
        const index = current > next ? 0 : 1;

        boardStore.changeBoardStepDirection(
          currentEntity,
          direction[index % 2]
        );
        boardStore.changeBoardStepDirection(
          nextEntity,
          direction[(index + 1) % 2]
        );
      });

      await new Promise<void>((resolve) => {
        boardStore.boardStepCount.find(
          (item) => item.id === `${y},${x}`
        )!.callback = async () => {
          boardStore.setBoardItem({ y: curY, x: curX }, next);
          boardStore.setBoardItem({ y: nextY, x: nextX }, current);

          await sleep(1100);

          resolve();
        };
      });
    }

    path = generator!.next().value;
  }
};
</script>
