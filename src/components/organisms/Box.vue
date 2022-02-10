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
        class="w-8 h-8 transition-all duration-300"
        :src="boardItemImage[props.item]"
        :alt="props.item"
      />
    </ZoomTransition>
  </div>
</template>

<script setup lang="ts">
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
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 hover:bg-main rounded-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center overflow-hidden;
}
.box--active {
  @apply border-2 border-blue-600 scale-110 bg-main;
}
</style>
