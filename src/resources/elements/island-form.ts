import {bindable, inject} from 'aurelia-framework';
import {Island, RegionCategory, User, Location} from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class IslandForm {
  name: string;
  description: string;
  location: Location = { lat: 53.2734, lng: -7.7783203 };

  @bindable
  islands: Island[];
  @bindable
  regionCategories: RegionCategory[];

  selectedRegionCategory: RegionCategory = null;
  response = "";

  constructor(private ds: IslandService) {
    console.log(`here in Island-Form Constructor`);
  }

  async addIsland() { // using ds to access methods in IslandService class and access the addIsland method
    this.response = ""; // clear any messages from previous activity
    console.log(this.location);
    const response = await this.ds.addIsland(this.selectedRegionCategory, this.name, this.description, this.location);
    // pass the response to the user if island creation was successful
    this.response = response;
  }


}
