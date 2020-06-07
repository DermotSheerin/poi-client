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
    }
    else this.prompt = "Delete Island Failed"
  }

}
