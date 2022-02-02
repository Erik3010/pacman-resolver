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
    row: 5,
    col: 5,
    board: <Array<Array<BoardItem>>>[],
    selectedCoorindate: <Coordinate[]>[],
  }),
  actions: {
    generateBoard() {
      this.board = Array(this.row)
        .fill([])
        .map(() => Array(this.col).fill(BoardItem.EMPTY));
    },
    setBoardItem({ y, x }: Coordinate, payload: BoardItem) {
      this.board[y][x] = payload;
    },
    setBulkBoardItem(payload: BoardItem) {
      this.selectedCoorindate.forEach((coordinate) =>
        this.setBoardItem(coordinate, payload)
      );
    },
    setSelectedCoordinate(coordinate: Coordinate) {
      this.selectedCoorindate.push(coordinate);
    },
    setBulkSelectedCoordinate(coordinate: Coordinate) {
      const lastSelectedCoordinate =
        this.selectedCoorindate[this.selectedCoorindate.length - 1] ?? null;

      if (!lastSelectedCoordinate) return;

      const start = {
        y: Math.min(lastSelectedCoordinate.y, coordinate.y),
        x: Math.min(lastSelectedCoordinate.x, coordinate.x),
      };
      const end = {
        y: Math.max(lastSelectedCoordinate.y, coordinate.y),
        x: Math.max(lastSelectedCoordinate.x, coordinate.x),
      };

      for (let y = start.y; y <= end.y; y++) {
        for (let x = start.x; x <= end.x; x++) {
          if (this.isInSelectedCoordinate({ y, x })) continue;

          this.setSelectedCoordinate({ y, x });
        }
      }
    },
    isInSelectedCoordinate(payload: Coordinate) {
      return this.selectedCoorindate.some(
        (coordinate) => JSON.stringify(payload) === JSON.stringify(coordinate)
      );
    },
    clearSelectedCoordinate() {
      this.selectedCoorindate = [];
    },
  },
});
