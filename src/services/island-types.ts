export interface RegionCategory {
  region: string;
  _id : string; // When I was adding an island and referencing regionCategory._id it complained that Property '_id' did not exist for type 'RegionCategory'
}

export interface Island {
  regionCategory: RegionCategory;
  name: string,
  description: string,
  latitude: number,
  longitude: number, // NOTE when creating an island, the userId is added at the backend so no need for _id field here
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  // _id : string;
}
