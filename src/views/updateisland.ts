import {inject} from 'aurelia-framework';
import {Island, RegionCategory, User} from "../services/island-types";
import { IslandService } from '../services/island-service';
import { ImageStore } from '../services/image-store';

@inject(IslandService, ImageStore)
export class UpdateIsland {
  // islands: Island[];
  // regionCategories: RegionCategory[]; // NOTE naming convention for this in islands view i.e., region-category
  // userDetails: User;
    currentIslandDetails;

  constructor(private ds: IslandService, private is: ImageStore) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    // this.islands = ds.islands; // sets islands array to the one defined in IslandService
    // this.regionCategories = ds.regionCategories;
    // this.userDetails = ds.userDetails;
    // console.log(`here is island ID UPDATEISLAND CONSTRUCTOR ${this.currentIslandDetails}`);
  }

  // https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/ & https://elanderson.net/2015/10/aurelia-routing-with-a-parameter/
  async activate(params) {
    let currentIslandDetails = await this.ds.retrieveIslandToUpdate(params.id); // retrieve the island details for the user using the userId passed in from the users page
    this.currentIslandDetails = currentIslandDetails.islandDetails;
  }


}
