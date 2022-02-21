<template>
  <div
    :class="[
      'box',
      'select-none',
      { 'box--active': boardStore.isInSelectedCoordinate(props.coordinate) },
    ]"
    @click="clickHandler(props.coordinate)"
  >
    <ZoomTransition :duration="300">
      <img
        v-if="!!props.item"
        :class="[
          'w-8',
          'h-8',
          'transition-transform',
          'duration-1000',
          animationClass,
        ]"
        :src="boardItemImage[props.item]"
        :alt="props.item"
        ref="box"
      />
    </ZoomTransition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from "vue";

import { useBoard, Coordinate, BoardItem } from "@/store/board";
import useShiftKey from "@/hooks/useShiftKey";
import ZoomTransition from "@/components/transitions/ZoomTransition.vue";

import Street from "@/assets/street.png";
import Food from "@/assets/food.png";
import Pacmon from "@/assets/pacmon.png";
import Wall from "@/assets/wall.png";

const props = defineProps<{
  coordinate: Coordinate;
  item: BoardItem;
}>();

const animationClass = computed(() => {
  const direction =
    boardStore.boardStepCount.find(
      (item) => item.id === boardStore.getBoardStepCountId(props.coordinate)
    )?.swapDirection ?? "";

  return { [direction]: isAnimating.value };
});

const boardStore = useBoard();
const { isShiftKeyPressed } = useShiftKey();

const boardItemImage = {
  [BoardItem.STREET]: Street,
  [BoardItem.FOOD]: Food,
  [BoardItem.PACMON]: Pacmon,
  [BoardItem.WALL]: Wall,
};

const clickHandler = (coordinate: Coordinate) => {
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

const box = ref<HTMLDivElement | null>(null);
const isAnimating = ref(false);

const sleep = (time = 500) =>
  new Promise((resolve) => setTimeout(resolve, time));

watch(
  () =>
    boardStore.boardStepCount.find(
      (item) => item.id === `${props.coordinate.y},${props.coordinate.x}`
    )?.swapDirection,
  (val) => {
    // if (!val?.swapDirection || !box.value) return;
    if (!box.value) return;

    isAnimating.value = true;

    const cb = async () => {
      box.value!.removeEventListener("transitionend", cb);

      // val?.callback && val?.callback();
      const callback = boardStore.boardStepCount.find(
        (item) => item.id === `${props.coordinate.y},${props.coordinate.x}`
      )!.callback;
      callback && callback();

      isAnimating.value = false;

      boardStore.boardStepCount.find(
        (item) => item.id === `${props.coordinate.y},${props.coordinate.x}`
      )!.swapDirection = null;

      boardStore.boardStepCount.find(
        (item) => item.id === `${props.coordinate.y},${props.coordinate.x}`
      )!.callback = null;
    };

    box.value!.addEventListener("transitionend", cb);
  },
  { deep: true }
);
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 hover:bg-main rounded-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center overflow-hidden;
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
