import { Island } from "./services/poi-types";

export class App {
  region: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  islands: Island[] = [];

  addIsland() {
    const island = {
      region: this.region,
      name: this.name,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
    };
    this.islands.push(island);
    console.log(island);
  }
}
