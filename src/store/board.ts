import { defineStore } from "pinia";

export const useBoard = defineStore("board", {
  state: () => ({
    row: 0,
    col: 0,
    board: [],
  }),
  actions: {
    generateBoard() {
      return Array(this.row)
        .fill([])
        .map((row) => Array(this.col).fill(0));
    },
  },
});
