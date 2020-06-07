import { autoinject, bindable } from 'aurelia-framework';
import {Island, User} from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@autoinject
export class UserIslands {

  @bindable
  islands: Island[];
  currentUser;


  constructor(private ds: IslandService) {
  }

  async activate(params) {
    console.log(params);
    await this.ds.retrieveUserPOIDetails(params.id); // using userId passed in from user-list custom element, retrieve all users islands and store in island service for retrieval below
    this.islands = this.ds.islands;

    const response = await this.ds.findUser(params.id);
    this.currentUser = await response.content;
    console.log(`here is current user in user-islands ${this.currentUser}`);
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
