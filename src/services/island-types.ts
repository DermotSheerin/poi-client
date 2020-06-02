export interface RegionCategory {
  region: string;
  _id: string; // When I was adding an island and referencing regionCategory._id it complained that Property '_id' did not exist for type 'RegionCategory'
}

// these interfaces mean if u are creating for example an array of island or regionCategory then these fields must be present.
// If u save without including one of the types it expect below u will get a compile error.
// its ok to store other fields that are not listed here for island / regionCategory eg 'country'. The below field types
// are what it expects as a minimum.

export interface Island {
  regionCategory: RegionCategory;
  // region: RegionCategory
  user: User;
  name: string;
  description: string;
  latitude: number;
  longitude: number; // NOTE when creating an island, the userId is added at the backend so no need for _id field here
  _id: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userRole: string;
  _id : string;
}
