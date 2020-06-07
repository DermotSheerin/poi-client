import {inject} from 'aurelia-framework';
import { IslandService } from '../services/island-service';
import { ImageStore } from '../services/image-store';

@inject(IslandService, ImageStore)
export class UpdateIsland {
    currentIslandDetails;

  constructor(private ds: IslandService, private is: ImageStore) {
  }

  // https://aurelia.io/docs/api/router/interface/RoutableComponentActivate/method/activate/ & https://elanderson.net/2015/10/aurelia-routing-with-a-parameter/
  async activate(params) {
    let currentIslandDetails = await this.ds.retrieveIslandToUpdate(params.id); // retrieve the island details for the user using the userId passed in from the users page
    this.currentIslandDetails = currentIslandDetails.islandDetails;
  }


}
