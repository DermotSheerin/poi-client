import {Island} from "./island-types";

export class TotalIslandUpdate {
  islandTotal: number;
  island: Island;

  constructor(islandTotal: number, island: Island) {
    this.islandTotal = islandTotal;
    this.island = island;
  }
}
