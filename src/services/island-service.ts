import {Island } from "./island-types";

export class IslandService {
  islands: Island[] = [];
  regions = ['North East', 'East Coast', 'South Coast', 'Mid West'];

  async addIsland(region: string, name: string, description: string, latitude: number, longitude: number) {
    const island = {
      region: region,
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
    };
    this.islands.push(island);
    console.log(island);
  }

}
