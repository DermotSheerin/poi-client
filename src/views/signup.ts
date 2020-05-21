import { inject } from 'aurelia-framework';
import { IslandService } from '../services/island-service';
import { HttpClient } from 'aurelia-http-client';

@inject(IslandService, HttpClient)
export class Signup {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  prompt = '';

  constructor(private ds: IslandService) {}

  signup(e) {
    console.log(`Trying to sign up ${this.email}`);
    const success = this.ds.signup(this.firstName, this.lastName, this.email, this.password);
    if (!success) {
      this.prompt = 'Oops! Try again...';
    }
  }
}
