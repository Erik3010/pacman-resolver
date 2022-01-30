import { defineStore } from "pinia";

export enum BoardItem {
  WALL = "wall",
  FOOD = "food",
  STREET = "street",
  PACMON = "pacmon",
  EMPTY = "",
}

export const useBoard = defineStore("board", {
  state: () => ({
    row: 0,
    col: 0,
    board: <Array<Array<BoardItem>>>[],
  }),
  actions: {
    generateBoard() {
      this.board = Array(this.row)
        .fill([])
        .map((row) => Array(this.col).fill(BoardItem.EMPTY));
    },
    setBoardItem(row: number, col: number, item: BoardItem) {
      this.board[row][col] = item;

      console.log(row, col);
    },
  },
});
