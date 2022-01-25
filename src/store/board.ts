import { defineStore } from "pinia";

export const useBoard = defineStore("board", {
  state: () => ({
    row: 0,
    col: 0,
    board: [],
  }),
  actions: {
    generateBoard() {},
  },
});
