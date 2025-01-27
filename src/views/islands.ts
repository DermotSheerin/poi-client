import { inject } from 'aurelia-framework';
import {Island, RegionCategory, User} from "../services/island-types";
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Islands {
  islands: Island[];
  regionCategories: RegionCategory[]; // NOTE naming convention for this in islands view i.e., region-category
  islandTotal = 0; // NOTE the naming convention for this in the islands view is NOT the same as above
  filterIslands: Island[];
  userDetails: User;

  constructor(private ds: IslandService) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    this.islands = ds.islands; // sets islands array to the one defined in IslandService
    this.regionCategories = ds.regionCategories;
    this.islandTotal = ds.islandTotal;
    this.filterIslands = ds.filterIslands;
    this.userDetails = ds.userDetails;
    //ds.clearFilterIslands(); // clear the filter search each time the Islands main page is accessed
    console.log(`here in Island Constructor`);
  }


}
