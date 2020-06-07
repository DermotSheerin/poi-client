import { inject } from 'aurelia-framework';
import {Island, RegionCategory, User} from "../services/island-types";
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Users {
  users: User[];
  islands: Island[];



  constructor(private ds: IslandService) {  // The islands array is established as a reference to the islands array defined in the IslandService class.
    this.users = this.ds.users;
    this.islands = this.ds.islands;
  }

}
