import { Board } from "@/types/Board";
import { BoardItem } from "@/types/BoardItem";

type Coordinate = [number, number];
type Stack = {
  from: Coordinate;
  to: Coordinate;
};
export type Path = {
  id: string;
  path: Coordinate[];
};

const pathfinding = (payload: Board) => {
  const board: Board = JSON.parse(JSON.stringify(payload));

  const possibleRoutes = ([curY, curX]: Coordinate) => {
    const directions: Coordinate[] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const validRoutes = ([y, x]: Coordinate) =>
      y >= 0 && y < board.length && x >= 0 && x < board[0].length;

    const allowedRoutes = ([y, x]: Coordinate) =>
      [BoardItem.FOOD, BoardItem.STREET, BoardItem.PACMON].includes(
        board[y][x]
      );

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

    let from: Coordinate | null = to;
    while (from) {
      const parent = stack.find((s) => s.to.toString() === from?.toString());

      parent && path.push(parent.from);
      from = parent?.from ?? null;
    }

    return path.reverse();
  };

  const bfs = (
    initialPosition: Coordinate,
    paths: Path[]
  ): Coordinate[] | null => {
    const stack: Stack[] = [];
    const visited = new Set();

    const queue = [initialPosition];

    while (queue.length) {
      const current = queue.shift()!;
      visited.add(current.toString());

      const [y, x] = current;
      const isSearched = paths.find((path) => path.id === current.toString());

      if (board[y][x] === BoardItem.FOOD && !isSearched)
        return buildPath(stack, current);

      for (const route of possibleRoutes(current)) {
        if (!visited.has(route.toString())) {
          stack.push({ from: current, to: route });
          queue.push(route);
        }
      }
    }

    return null;
  };

  const traverse = () => {
    const paths: Path[] = [];

    let lastPacmonPosition = getPacmonInitialPosition();
    if (!lastPacmonPosition) return [];

    let path = bfs(lastPacmonPosition!, paths);
    while (path) {
      lastPacmonPosition = path[path.length - 1];
      paths.push({
        id: lastPacmonPosition.toString(),
        path,
      });
      path = bfs(lastPacmonPosition, paths);
    }

    return paths;
  };

  return traverse();
};

export default pathfinding;
