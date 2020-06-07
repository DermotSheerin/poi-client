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
    console.log(`here is island ID UPDATE-ISLAND-FORM CONSTRUCTOR ${this.currentIslandDetails}`);
  }

  async editIsland() { // https://aurelia.io/docs/binding/binding-behaviors#self
    this.response = ""; // clear any messages from previous activity
    try {
      if(this.description === undefined) { // temporary workaround here, when using textarea element, if the user does not modify the description then it will be undefined. This sets the description to its original value in this instance
        this.description = this.currentIslandDetails.description;
      }
      const updatedIsland = await this.ds.editIsland(this.currentIslandDetails._id, this.selectedRegionCategory, this.name, this.description, this.latitude, this.longitude);

      const currentIndex = this.findIslandIndex(this.currentIslandDetails);
      this.ds.updateFilterIslandAfterEdit(currentIndex, updatedIsland); // pass in updated Island and island index to a function that will replace the old island details with the updated details

      this.response = "Island Updated successfully";
    } catch (err) {
      this.response = "Island Updated FAILED";
    }
  }

  findIslandIndex(island) {
    return this.ds.filterIslands.findIndex(x => x._id === island._id);
  }

}
