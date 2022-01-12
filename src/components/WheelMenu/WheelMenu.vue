<template>
  <ZoomTransition :duration="250">
    <div ref="wheelMenuEl" class="absolute top-32 left-24" v-if="props.isOpen">
      <div class="relative">
        <div
          class="border-2 border-blue-300 bg-gray-900 rounded-full w-52 h-52 grid grid-cols-2 grid-rows-2 transform rotate-45 overflow-hidden shadow-xl shadow-gray-900 divide-gray-700 divide-x divide-y"
        >
          <WheelMenuItem>
            <img src="@/assets/wall.png" class="w-9 h-9" />
          </WheelMenuItem>
          <WheelMenuItem>
            <img src="@/assets/street.png" class="w-9 h-9" />
          </WheelMenuItem>
          <WheelMenuItem>
            <img src="@/assets/food2.png" class="w-9 h-9"
          /></WheelMenuItem>
          <WheelMenuItem>
            <img src="@/assets/pacmon.png" class="w-9 h-9" />
          </WheelMenuItem>
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 w-20 h-20 flex justify-center items-center p-1.5 shadow-md"
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
import WheelMenuItem from "@/components/WheelMenu/WheelMenuItem.vue";
import ZoomTransition from "@/components/ZoomTransition.vue";

import { ref } from "vue";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const wheelMenuEl = ref<HTMLDivElement>();

window.addEventListener("click", (e) => {
  // to prevent further event bubbling
  e.stopPropagation();

  if (!props.isOpen) return;

  const target = e.target as HTMLInputElement;
  if (!(wheelMenuEl.value as HTMLInputElement).contains(target)) {
    emit("close");
  }
});
</script>
