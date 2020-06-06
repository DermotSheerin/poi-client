import {autoinject, bindable, inject} from 'aurelia-framework';
import { ImageStore } from '../../services/image-store';
import { IslandService } from '../../services/island-service';

@autoinject // =====> very useful, ask about this !!!!!!!!!!!
export class Card {
  @bindable
  currentIslandDetails;
  prompt = "";


  constructor(private imageStore: ImageStore, private ds: IslandService) {
  }

  async deleteImage(imageId) {
    const islandID = this.currentIslandDetails._id;
    const response = await this.imageStore.deleteImage(imageId, this.currentIslandDetails._id);
    if (response.isSuccess) {
      this.currentIslandDetails = response.content;
      // const islandIndex = this.findIslandIndex(response.content._id);
      // this.ds.updateFilterIslandAfterEdit(islandIndex, response.content); // pass in updated Island and island index to a function that will replace the old island details with the updated details
    }
    else this.prompt = "Delete Island Failed"
  }

  // findIslandIndex(island) {
  //   return this.ds.filterIslands.findIndex(x => x._id === island._id);
  // }

}
