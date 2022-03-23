<template>
  <div
    :class="[
      'box',
      'select-none',
      'm-1',
      { 'box--active': boardStore.isInSelectedCoordinate(props.coordinate) },
      { 'cursor-not-allowed': boardStore.isAnimating },
      { 'cursor-pointer': !boardStore.isAnimating },
    ]"
    @click="clickHandler(props.coordinate)"
    :data-coordinate="`${props.coordinate.y}|${props.coordinate.x}`"
  >
    <ZoomTransition :duration="300">
      <img
        v-if="!!props.item"
        :class="['w-8', 'h-8', 'transition-transform', 'duration-300']"
        :src="boardItemImage[props.item]"
        :alt="props.item"
        ref="box"
      />
    </ZoomTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import ZoomTransition from "@/components/transitions/ZoomTransition.vue";

import useShiftKey from "@/hooks/useShiftKey";
import usePromiseAnimation from "@/hooks/usePromiseAnimation";

import { Coordinate } from "@/types/Coordinate";
import { BoardItem } from "@/types/BoardItem";

import { useBoard } from "@/store/board";

import boardItemImage from "@/constants/cell-image";

const props = defineProps<{
  coordinate: Coordinate;
  item: BoardItem;
}>();

const boardStore = useBoard();
const { isShiftKeyPressed } = useShiftKey();

const box = ref<HTMLDivElement | null>(null);

const clickHandler = (coordinate: Coordinate) => {
  if (boardStore.isAnimating) return;

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

watch(
  () => boardStore.getCell(props.coordinate)?.swapDirection,
  async (direction) => {
    if (!box.value || !direction) return;

    const { callback, resolve } = boardStore.getCell(props.coordinate);
    const { animate } = usePromiseAnimation(box);

    await animate(direction!);
    callback && callback();
    await animate(direction!, { unmountClass: true });

    boardStore.setCellDirection(props.coordinate, null);

    resolve && (await resolve());
  }
);
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 rounded-lg transition duration-300 ease-in-out flex items-center justify-center overflow-hidden hover:bg-main;
}
.box--active {
  @apply border-2 border-blue-600 scale-110 bg-main;
}
.up {
  @apply transform -translate-y-14;
}
.down {
  @apply transform translate-y-14;
}
.left {
  @apply transform -translate-x-14;
}
.right {
  @apply transform translate-x-14;
}
</style>
