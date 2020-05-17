import { inject } from 'aurelia-framework';
import { Island } from "../services/island-types";
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Islands {
  islands: Island[] = [];
  regions: string[];
  islandTotal = 0;

  constructor(private ds: IslandService) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    this.islands = ds.islands; // sets islands array to the one defined in IslandService
    this.regions = ds.regions;
    this.islandTotal = ds.islandTotal;
  }

  // PLACE REGION INTO ITS OWN CLASS
//  regions: Region[] = [];
}
