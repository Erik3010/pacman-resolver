import { Direction } from "@/store/board";

const axis = [
  {
    axis: "x",
    direction: [Direction.LEFT, Direction.RIGHT],
  },
  {
    axis: "y",
    direction: [Direction.UP, Direction.DOWN],
  },
];

export default axis;
