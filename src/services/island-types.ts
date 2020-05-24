export interface RegionCategory {
  region: string;
 // _id : string; // figure out this, do i need it if retrieving regions from mongo or will it cause problems when creating a region???
}

export interface Island {
  regionCategory: RegionCategory;
  name: string,
  description: string,
  latitude: number,
  longitude: number,
  // _id : string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id : string;
}
