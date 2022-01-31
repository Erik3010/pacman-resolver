import { defineStore } from "pinia";

export enum BoardItem {
  WALL = "wall",
  FOOD = "food",
  STREET = "street",
  PACMON = "pacmon",
  EMPTY = "",
}

export interface Coordinate {
  x: number;
  y: number;
}

export const useBoard = defineStore("board", {
  state: () => ({
    row: 0,
    col: 0,
    board: <Array<Array<BoardItem>>>[],
    selectedCoorindate: <Coordinate[]>[],
  }),
  actions: {
    generateBoard() {
      this.board = Array(this.row)
        .fill([])
        .map(() => Array(this.col).fill(BoardItem.EMPTY));
    },
    setBoardItem({ y, x }: Coordinate, item: BoardItem) {
      this.board[y][x] = item;
    },
    setBulkBoardItem(item: BoardItem) {
      this.selectedCoorindate.forEach((coordinate) =>
        this.setBoardItem(coordinate, item)
      );
    },
    setSelectedCoordinate(payload: Coordinate) {
      this.selectedCoorindate.push(payload);
    },
    isSelectedCoordinate(payload: Coordinate) {
      return this.selectedCoorindate.some(
        (coordinate) => JSON.stringify(payload) === JSON.stringify(coordinate)
      );
    },
    clearSelectedCoordinate() {
      this.selectedCoorindate = [];
    },
  },
});
