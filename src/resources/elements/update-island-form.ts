import {bindable, inject} from 'aurelia-framework';
import {Island, RegionCategory, User} from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class UpdateIslandForm {
  //region: RegionCategory;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  @bindable
  islands: Island[];
  @bindable
  regionCategories: RegionCategory[];
  @bindable
  currentIslandDetails: Island;

  response = "";
  selectedRegionCategory: RegionCategory = null;

  constructor(private ds: IslandService) {
    console.log(`here in Edit-Island-Form Constructor`);
  }

  async editIsland() { // https://aurelia.io/docs/binding/binding-behaviors#self
    if(this.description === undefined) { // temporary workaround here, when using textarea element, if the user does not modify the description then it will be undefined. This sets the description to its original value in this instance
      this.description = this.currentIslandDetails.description;
    }
    const updatedIsland = await this.ds.editIsland(this.currentIslandDetails._id, this.selectedRegionCategory, this.name, this.description, this.latitude, this.longitude);
    // this.ds.refreshFilterIslands(this.selectedRegionCategory.region); // refresh the list of islands in this region ==== old way

    const currentIndex = this.findIslandIndex(this.currentIslandDetails);
    this.ds.updateFilterIslandAfterEdit(currentIndex, updatedIsland); // pass in updated Island and island index to a function that will replace the old island details with the updated details

    // this.response = response;
  }

  findIslandIndex(island) {
    return this.ds.filterIslands.findIndex(x => x._id === island._id);
  }

}
