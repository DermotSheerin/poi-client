import { autoinject, bindable } from 'aurelia-framework';
import { IslandService } from '../../services/island-service';

@autoinject
export class UserList {
  @bindable
  users;

  constructor(private ds: IslandService) {
  }

  async deleteUser(userId) {
    const response = await this.ds.deleteUser(userId);
  }


}
