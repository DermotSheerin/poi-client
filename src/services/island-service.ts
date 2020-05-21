import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {Island, User } from "./island-types";
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class IslandService {
  islands: Island[] = [];
  users: Map<string, User> = new Map();
  regions = ['North East', 'East Coast', 'South Coast', 'Mid West'];
  islandTotal = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
    this.getUsers();
    // this.getCandidates();
  }

  // need to change this to send to backend
  async addIsland(region: string, name: string, description: string, latitude: number, longitude: number) {
    const island = {
      region: region,
      name: name,
      description: description,
      latitude: latitude,
      longitude: longitude,
    };
    this.islands.push(island);
    this.islandTotal = this.islandTotal + 1; // increment the island count by 1
    this.ea.publish(new TotalIslandUpdate(this.islandTotal));
    console.log('Total Islands so far ' + this.islandTotal);
  }

  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    const users = await response.content;
    users.forEach(user => {
      this.users.set(user.email, user);
    });
  }

  // signup(firstName: string, lastName: string, email: string, password: string) {
  //   this.changeRouter(PLATFORM.moduleName('app'));
  //   return false;
  // }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
   // const newUser = await response.content;
    if(response) {
      this.changeRouter(PLATFORM.moduleName('app'));
    } else {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = this.users.get(email);
    if (user && (user.password === password)) {
      this.changeRouter(PLATFORM.moduleName('app'));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.changeRouter(PLATFORM.moduleName('start'))
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }


}
