export interface Island {
  //region:string;
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

// export interface Region {
//   region: string;
// }

// Put REGION in its own class??
