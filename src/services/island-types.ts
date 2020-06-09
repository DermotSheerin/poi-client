export interface RegionCategory {
  region: string;
  _id: string; // When I was adding an island and referencing regionCategory._id it complained that Property '_id' did not exist for type 'RegionCategory'
}

export interface Island {
  region: RegionCategory
  user: User;
  name: string;
  description: string;
  location: Location;
  image: Image[];
  _id: string;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: string;
  _id : string;
}

export interface Image {
  url: string;
  id: string;
}
