import { Direction } from "@/enums/Direction";

export interface Cell {
  id: string;
  count: number;
  swapDirection: Direction | null;
  swap: (() => void) | null;
  resolve: (() => Promise<void>) | null;
}
