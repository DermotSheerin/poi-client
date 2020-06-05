import * as environment from '../../config/environment.json';
import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';
import {Image} from "./island-types";

@autoinject
export class ImageStore {
  images: Image[] = [];

  cloudinaryClient = new HttpClient();

  // getAllImages(): Image[] {
  //   return this.images;
  // }

  async uploadImage(imageFile) {
    this.cloudinaryClient.configure(http => {
      http.withBaseUrl(`https://api.cloudinary.com/v1_1/${environment.cloudinary.name}`);
    });

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', `${environment.cloudinary.preset}`);

    try {
      const response = await this.cloudinaryClient.post('/image/upload', formData);

      this.images.push({ url: response.content.url, id: response.content.asset_id });
    } catch (err) {
      console.log(err);
    }
  }

  deleteImage(id) {}
}
