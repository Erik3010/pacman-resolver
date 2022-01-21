<template>
  <section>
    <header class="text-center mb-12">
      <h1 class="font-bold text-3xl mb-1">Setup your Board</h1>
      <p class="text-gray-400 text-sm">Put the obstacle inside the board</p>
    </header>
    <main class="flex flex-col items-center" ref="main">
      <div class="space-y-3">
        <div class="flex space-x-3">
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
        </div>
        <div class="flex space-x-3">
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
        </div>
        <div class="flex space-x-3">
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
          <div class="box" @click="boxClickHandler"></div>
        </div>
      </div>
    </main>
    <Button :classNames="['mx-auto', 'mt-12']">Start!</Button>

    <WheelMenu :visible="false" />
  </section>
</template>

<script setup lang="ts">
import Button from "@/components/Button.vue";
import WheelMenu from "@/components/WheelMenu/WheelMenu.vue";

import { ref } from "vue";

import { useBoard } from "@/store/board";

const boardStore = useBoard();

const boxClickHandler = (e: Event) => {
  const target = e.target as HTMLInputElement;
  target.classList.toggle("box--active");
};
</script>

<style scoped>
.box {
  @apply w-14 h-14 bg-gray-800 hover:bg-main rounded-lg cursor-pointer transition duration-300 ease-in-out;
}
.box--active {
  @apply border-2 border-blue-600 scale-110 bg-main;
}
</style>
