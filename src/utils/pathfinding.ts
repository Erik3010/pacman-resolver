import { Board, BoardItem } from "@/store/board";

type Coordinate = [number, number];
interface Stack {
  from: Coordinate;
  to: Coordinate;
}

const pathfinding = (payload: Board) => {
  const board = JSON.parse(JSON.stringify(payload));

  const possibleRoutes = ([curY, curX]: Coordinate) => {
    const directions: Coordinate[] = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    const validRoutes = () =>
      curY >= 0 && curY < board.length && curX >= 0 && curX < board[0].length;

    return directions
      .map(([y, x]) => <Coordinate>[y + curY, x + curX])
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

  const buildPath = (stack: Stack[]): Stack[] => {
    const to = stack[stack.length - 1];
    const path = [to];

    let from: Coordinate | null = to.from ?? null;

    while (from !== null) {
      const temp = stack.find((s) => s.to.toString() === from?.toString());
      from = temp?.from ?? null;

      temp && path.push(temp);
    }

    return path.reverse();
  };

  const traverse = (initialPosition: Coordinate): Stack[] | null => {
    const stack: Stack[] = [];
    const visited = new Set();

    const queue = [initialPosition];

    while (queue.length) {
      const current = queue.shift()!;
      visited.add(current.toString());

      const [y, x] = current;
      if (board[y][x] === BoardItem.FOOD) return buildPath(stack);

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
