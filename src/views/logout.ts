import { inject } from 'aurelia-framework';
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Logout {
  constructor(private ds: IslandService) {}

  attached() {
    this.ds.logout();
  }
}
