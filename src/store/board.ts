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

export interface Cell {
  id: string;
  count: number;
  swapDirection: Direction | null;
  callback: (() => void) | null;
  resolve: (() => Promise<void>) | null;
}

export type Board = Array<Array<BoardItem>>;

export const useBoard = defineStore("board", {
  state: () => ({
    row: 5,
    col: 5,
    board: <Board>[],
    selectedCoordinate: <Coordinate[]>[],
    cells: <Cell[]>[],
    isAnimating: false,
  }),
  getters: {
    getCellId() {
      return ({ y, x }: Coordinate) => `${y},${x}`;
    },
    hasPacmonInBoard(): boolean {
      return this.board.some((row) =>
        row.some((item) => item === BoardItem.PACMON)
      );
    },
    getPacmonCoordinate(): Coordinate | null {
      for (let y = 0; y < this.board.length; y++) {
        for (let x = 0; x < this.board[y].length; x++) {
          if (this.board[y][x] === BoardItem.PACMON) return { y, x };
        }
      }
      return null;
    },
    hasSelectedCoordinate(): boolean {
      return this.selectedCoordinate.length > 0;
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
      this.selectedCoordinate.forEach((coordinate) =>
        this.setBoardItem(coordinate, payload)
      );
    },
    setSelectedCoordinate(coordinate: Coordinate) {
      this.selectedCoordinate.push(coordinate);
    },
    setBulkSelectedCoordinate(coordinate: Coordinate) {
      const lastSelectedCoordinate =
        this.selectedCoordinate[this.selectedCoordinate.length - 1] ?? null;

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
      return this.selectedCoordinate.some(
        (coordinate) => JSON.stringify(payload) === JSON.stringify(coordinate)
      );
    },
    getSelectedCoordinateIndex(payload: Coordinate) {
      return this.selectedCoordinate.findIndex(
        (coordinate) => JSON.stringify(payload) === JSON.stringify(coordinate)
      );
    },
    removeSelectedCoordinate(payload: Coordinate) {
      this.selectedCoordinate.splice(
        this.getSelectedCoordinateIndex(payload),
        1
      );
    },
    clearSelectedCoordinate() {
      this.selectedCoordinate = [];
    },
    generateCells() {
      this.cells = this.board.reduce((cells, row, y) => {
        return [
          ...cells,
          ...row.map((_, x) => ({
            id: this.getCellId({ y, x }),
            count: 0,
            swapDirection: null,
            callback: null,
            resolve: null,
          })),
        ];
      }, <Cell[]>[]);
    },
    getCell(payload: Coordinate) {
      return this.cells.find(
        (item) => item.id === this.getCellId(payload)
      ) as Cell;
    },
    setCell<K extends keyof Cell>(id: Coordinate, key: K, value: Cell[K]) {
      const index = this.cells.findIndex(
        (board) => board.id === this.getCellId(id)
      );

      this.cells[index][key] = value;
    },
    setCellDirection(id: Coordinate, direction: Direction | null) {
      this.setCell(id, "swapDirection", direction);
    },
  },
});
