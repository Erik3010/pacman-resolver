<template>
  <ZoomTransition :duration="250">
    <div
      v-show="isVisible"
      ref="wheelMenu"
      class="absolute"
      :style="positionStyle"
    >
      <div class="relative select-none">
        <div
          class="border-2 border-blue-300 bg-gray-900 rounded-full w-52 h-52 grid grid-cols-2 grid-rows-2 transform rotate-45 overflow-hidden shadow-xl shadow-gray-900 divide-gray-700 divide-x divide-y"
        >
          <WheelMenuItem @click="wheelItemHandler(BoardItem.WALL)">
            <img src="@/assets/wall.png" class="w-9 h-9" />
          </WheelMenuItem>
          <WheelMenuItem @click="wheelItemHandler(BoardItem.STREET)">
            <img src="@/assets/street.png" class="w-9 h-9" />
          </WheelMenuItem>
          <WheelMenuItem @click="wheelItemHandler(BoardItem.FOOD)">
            <img src="@/assets/food.png" class="w-9 h-9" />
          </WheelMenuItem>
          <WheelMenuItem @click="wheelItemHandler(BoardItem.PACMON)">
            <img src="@/assets/pacmon.png" class="w-9 h-9" />
          </WheelMenuItem>
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-20 h-20 flex justify-center items-center p-1.5 shadow-md"
          @click="wheelItemHandler(BoardItem.EMPTY)"
        >
          <div
            class="rounded-full w-full h-full bg-gray-800 hover:bg-gray-700 cursor-pointer flex justify-center items-center text-2xl"
          >
            <img src="@/assets/remove.png" class="w-7 h-7" />
          </div>
        </div>
      </div>
    </div>
  </ZoomTransition>
</template>

<script setup lang="ts">
import { ref } from "vue";

import WheelMenuItem from "@/components/organisms/WheelMenu/Item.vue";
import ZoomTransition from "@/components/transitions/ZoomTransition.vue";

import useContextMenu from "@/hooks/useContextMenu";

import { Coordinate } from "@/types/Coordinate";
import { BoardItem } from "@/types/BoardItem";
import { useBoard } from "@/store/board";
import { useNotification } from "@/store/notification";
import { NotificationStatus } from "@/enums/NotificationStatus";

const props = defineProps<{
  visible: Boolean;
}>();

const boardStore = useBoard();
const notificationStore = useNotification();

const wheelMenu = ref<HTMLDivElement | null>(null);
const { isVisible, positionStyle, closeContextMenu } = useContextMenu({
  element: wheelMenu,
  initialVisible: props.visible,
  canOpenContextMenu: () =>
    boardStore.isAnimating || !boardStore.hasSelectedCoordinate,
});

const wheelItemHandler = (item: BoardItem) => {
  if (item === BoardItem.PACMON) {
    if (boardStore.selectedCoordinate.length > 1) {
      notificationStore.show({
        status: NotificationStatus.ERROR,
        title: "Action Failed",
        subtitle: "Only one pacmon is allowed",
      });
      return;
    } else if (boardStore.hasPacmonInBoard) {
      const lastPacmonCoordinate: Coordinate = boardStore.getPacmonCoordinate!;

      const { y, x } = boardStore.selectedCoordinate[0];
      boardStore.setBoardItem(lastPacmonCoordinate, boardStore.board[y][x]);
    }
  }

  boardStore.setBulkBoardItem(item);

  boardStore.clearSelectedCoordinate();

  closeContextMenu();
};
</script>
