import { inject } from 'aurelia-framework';
import { IslandService } from '../services/island-service';

@inject(IslandService)
export class Login {
  email = 'sheerin@gmail.com';
  password = '1234';
  prompt = '';

  constructor(private ds: IslandService) {}

  async login(e) {
    const success = await this.ds.login(this.email, this.password);
    if (!success) {
      this.prompt = "Oops! Try again...";
    }
  }

}
