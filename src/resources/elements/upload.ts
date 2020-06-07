import { autoinject, bindable } from 'aurelia-framework';
import { ImageStore } from '../../services/image-store';

@autoinject
export class Upload {
  selectedFiles: string[] = [];

  @bindable
  currentIslandDetails;

  constructor(private imageStore: ImageStore) {}

  async uploadImage() {
    const response = await this.imageStore.uploadImage(this.selectedFiles[0], this.currentIslandDetails);
    this.currentIslandDetails = response; // the island object is returned containing the updated imageURL array, this is then stored in the two-way bindable currentIslandDetails which
    // will be accessed by the cards view
  }

}
