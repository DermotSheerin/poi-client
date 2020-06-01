import {inject} from 'aurelia-framework';
import {Island, RegionCategory, User} from "../services/island-types";
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class UpdateIsland {
  islands: Island[];
  regionCategories: RegionCategory[]; // NOTE naming convention for this in islands view i.e., region-category
  userDetails: User;
  currentIslandDetails;

  constructor(private ds: IslandService) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    this.islands = ds.islands; // sets islands array to the one defined in IslandService
    this.regionCategories = ds.regionCategories;
    this.userDetails = ds.userDetails;
  }

  // https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/ & https://elanderson.net/2015/10/aurelia-routing-with-a-parameter/
  async activate(params) {
    let currentIslandDetails = await this.ds.retrieveIslandToUpdate(params.id); // retrieve the island details to View/Edit when selected in category list
    this.currentIslandDetails = currentIslandDetails.islandDetails;
  }


}
