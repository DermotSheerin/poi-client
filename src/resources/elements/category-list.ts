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

  // pass in island to be deleted from delegate call in the view. Update filterIslands and Islands array by removing the index where the island was stored
  async deleteIsland(island) {
    const indexFilter = this.findFilterIslandIndex(island);
    const indexIsland = this.findIslandsIndex(island);

    const response = await this.ds.deleteIsland(island._id); // delete island with this ID

    if (response.success) {
      this.ds.removeIndexIsland(indexIsland); // remove island from local islands array
      this.ds.removeIslandFilterIslands(indexFilter); // remove island from local filterIslands array
    }
  }

  // return the index of the island from the filterIslands array
   findFilterIslandIndex(island) {
    return this.ds.filterIslands.findIndex(x => x._id === island._id);
  }

  findIslandsIndex(island) {
    return this.ds.islands.findIndex(x => x._id === island._id);
  }

}
