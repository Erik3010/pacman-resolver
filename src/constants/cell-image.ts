import { BoardItem } from "@/types/BoardItem";

import Street from "@/assets/street.png";
import Food from "@/assets/food.png";
import Pacmon from "@/assets/pacmon.png";
import Wall from "@/assets/wall.png";

const cellImage = {
  [BoardItem.STREET]: Street,
  [BoardItem.FOOD]: Food,
  [BoardItem.PACMON]: Pacmon,
  [BoardItem.WALL]: Wall,
};

export default cellImage;
