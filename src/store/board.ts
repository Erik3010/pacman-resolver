import { defineStore } from "pinia";

export enum BoardItem {
  WALL = "wall",
  FOOD = "food",
  STREET = "street",
  PACMON = "pacmon",
  EMPTY = "",
}

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface BoardStep {
  id: String;
  count: number;
  swapDirection: Direction | null;
  callback: (() => void) | null;
}

export type Board = Array<Array<BoardItem>>;

export const useBoard = defineStore("board", {
  state: () => ({
    row: 5,
    col: 5,
    board: <Board>[],
    selectedCoorindate: <Coordinate[]>[],
    boardStepCount: <BoardStep[]>[],
    isPathRunning: false,
  }),
  getters: {
    getBoardStepCountId() {
      return ({ y, x }: Coordinate) => `${y},${x}`;
    },
  },
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
    getSelectedCoordinateIndex(payload: Coordinate) {
      return this.selectedCoorindate.findIndex(
        (coordinate) => JSON.stringify(payload) === JSON.stringify(coordinate)
      );
    },
    removeSelectedCoordinate(payload: Coordinate) {
      this.selectedCoorindate.splice(
        this.getSelectedCoordinateIndex(payload),
        1
      );
    },
    clearSelectedCoordinate() {
      this.selectedCoorindate = [];
    },
    generateBoardStepCount() {
      this.boardStepCount = this.board.reduce((total, current, i) => {
        return [
          ...total,
          ...current.map((_, j) => ({
            id: this.getBoardStepCountId({ y: i, x: j }),
            count: 0,
            swapDirection: null,
            callback: null,
          })),
        ];
      }, <BoardStep[]>[]);
    },
    setBoardStepCount<K extends keyof BoardStep>(
      id: Coordinate,
      key: K,
      value: BoardStep[K]
    ) {
      const index = this.boardStepCount.findIndex(
        (board) => board.id === this.getBoardStepCountId(id)
      );

      this.boardStepCount[index][key] = value;
    },
    changeBoardStepDirection(id: Coordinate, direction: Direction) {
      this.setBoardStepCount(id, "swapDirection", direction);
    },
  },
});
