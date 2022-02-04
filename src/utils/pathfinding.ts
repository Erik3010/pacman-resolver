import { Board, BoardItem } from "@/store/board";

const pathfinding = (payload: Board) => {
  const board = JSON.parse(JSON.stringify(payload));

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  console.log(board);
};

export default pathfinding;
