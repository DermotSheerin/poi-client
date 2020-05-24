import { inject } from 'aurelia-framework';
import {Island, RegionCategory} from "../services/island-types";
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Islands {
  islands: Island[];
  regionCategories: RegionCategory[]; // NOTE naming convention for this in islands view i.e., region-category
  islandTotal = 0; // NOTE the naming convention for this in the islands view is NOT the same as above

  constructor(private ds: IslandService) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    this.islands = ds.islands; // sets islands array to the one defined in IslandService
    this.regionCategories = ds.regionCategories;
    this.islandTotal = ds.islandTotal;
    console.log(`i am in islands.ts view-model ${this.regionCategories}`);
  }

}
