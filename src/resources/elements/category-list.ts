import {bindable, inject} from 'aurelia-framework';
import {Island} from '../../services/island-types';
import {IslandService} from "../../services/island-service";

@inject(IslandService)
export class CategoryList {
  @bindable
  filterIslands: Island[] = null;
  response = "";

  constructor(private ds: IslandService) {
    console.log(`here in Category-List Constructor`);
  }

  // pass in island to be deleted from delegate call in the view. Update filterIslands array by removing the index where the island was stored
  async deleteIsland(island) {
    const index = this.findIslandIndex(island);
    console.log(`Island index ID before delete ${index}`);

    const response = await this.ds.deleteIsland(island._id); // delete island with this ID

    if (response.success) {
      //this.ds.refreshFilterIslands(island.region); // ---> works refreshing the category list
      this.ds.removeIslandFilterIslands(index); // attempting to remove via slice of array
    }
  }

   findIslandIndex(island) {
    return this.ds.filterIslands.findIndex(x => x._id === island._id);
  }

}
