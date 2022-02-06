import { Board, BoardItem } from "@/store/board";

type Coordinate = [number, number];
type Stack = {
  from: Coordinate;
  to: Coordinate;
};

const pathfinding = (payload: Board) => {
  const board = JSON.parse(JSON.stringify(payload));

  const paths = [];

  const possibleRoutes = ([curY, curX]: Coordinate) => {
    const directions: Coordinate[] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const validRoutes = () =>
      curY >= 0 && curY < board.length && curX >= 0 && curX < board[0].length;

    const allowedRoutes = ([y, x]: Coordinate) =>
      [BoardItem.FOOD, BoardItem.STREET].includes(board[y][x]);

    return directions
      .map(([y, x]) => <Coordinate>[y + curY, x + curX])
      .filter(validRoutes)
      .filter(allowedRoutes);
  };

  const getPacmonInitialPosition = (): Coordinate | null => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === BoardItem.PACMON) return [i, j];
      }
    }

    return null;
  };

  const buildPath = (stack: Stack[], to: Coordinate): Coordinate[] => {
    const path = [to];

    let from: Coordinate | null = to ?? null;
    while (from) {
      const parent = stack.find((s) => s.to.toString() === from?.toString());

      parent && path.push(parent.from);
      from = parent?.from ?? null;
    }

    return path.reverse();
  };

  const traverse = (initialPosition: Coordinate): Coordinate[] | null => {
    const stack: Stack[] = [];
    const visited = new Set();

    const queue = [initialPosition];

    while (queue.length) {
      const current = queue.shift()!;
      visited.add(current.toString());

      const [y, x] = current;
      if (board[y][x] === BoardItem.FOOD) return buildPath(stack, [y, x]);

      for (const route of possibleRoutes(current)) {
        if (!visited.has(route.toString())) {
          stack.push({ from: current, to: route });
          queue.push(route);
        }
      }
    }

    return null;
  };

  console.log(traverse(getPacmonInitialPosition()!));
};

export default pathfinding;
