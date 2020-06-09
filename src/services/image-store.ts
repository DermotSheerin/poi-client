import { HttpClient } from 'aurelia-http-client';
import { autoinject } from 'aurelia-framework';


@autoinject
export class ImageStore {
  cloudinaryClient = new HttpClient();
  backendClient = new HttpClient();

  async uploadImage(imageFile, island) {
    this.cloudinaryClient.configure(http => {
      http.withBaseUrl(`https://api.cloudinary.com/v1_1/dsheerincloud`);
    });

    this.backendClient.configure(http => {
      http.withBaseUrl('https://ds-poi-nodejs.herokuapp.com/')
    });


    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', `ia6ew6aq`);

    try {
      const response = await this.cloudinaryClient.post('/image/upload', formData);
      const islandResponse = await this.backendClient.post('/api/islands/addImage',
        {islandId: island._id,
        image: response.content});
      return await islandResponse.content;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteImage(imageId, islandId) {
    console.log(imageId + islandId);
    const deleteImage = await this.backendClient.put('/api/islands/deleteImage', {imageId, islandId});
    console.log(`here in delete image in IMAGE_STORE ${deleteImage}`);
    return deleteImage;
  }
}
