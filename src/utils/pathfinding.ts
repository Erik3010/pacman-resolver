import { Board, BoardItem } from "@/store/board";

type Coordinate = [number, number];

const pathfinding = (payload: Board) => {
  const board = JSON.parse(JSON.stringify(payload));

  const possibleRoutes = ([curY, curX]: Coordinate) => {
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const validRoutes = () =>
      curY >= 0 && curY < board.length && curX >= 0 && curX < board[0].length;

    return directions
      .map(([y, x]) => [y + curY, x + curX])
      .filter(validRoutes)
      .filter(
        ([y, x]) =>
          board[y][x] === BoardItem.FOOD || board[y][x] === BoardItem.STREET
      );
  };

  const getPacmonInitialPosition = (): Coordinate | null => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === BoardItem.PACMON) return [i, j];
      }
    }

    return null;
  };

  const traverse = (initialPosition: Coordinate) => {
    const stack = [];
    const visited = new Set();

    const queue = [initialPosition];

    while (queue.length) {
      const current = queue.shift();
      visited.add(JSON.stringify(current));
    }

    return visited;
  };

  console.log(traverse(getPacmonInitialPosition()!));
};

export default pathfinding;
