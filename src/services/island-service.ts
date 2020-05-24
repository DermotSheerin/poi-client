import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {Island, RegionCategory } from "./island-types";
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class IslandService {
  islands: Island[] = [];
  regionCategories: RegionCategory[] = [];
  islandTotal = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
    });
  }

  async getRegionCategories() {
    const response = await this.httpClient.get('/api/regionCategories');
    this.regionCategories = await response.content;
    console.log(`here in islandService ${this.regionCategories}`);
  }

  async categoryFilter(category: RegionCategory) {
    const response = await this.httpClient.get('/api/regionCategories/' + category.region);
    console.log(`here is category region in island-service ${category.region}`);
    const categoryFilter = await response.content;
    console.log(`here is category filter in island-service ${categoryFilter}`);
    return categoryFilter
    //console.log(`here in islandService ${this.regionCategories}`);
  }


  async addRegionCategory() {
    // const response = await this.httpClient.get('/api/regionCategories');
    // this.regionCategories = await response.content;
    // console.log(`here in islandService ${this.regionCategories}`);
  }

  // need to change this to send to backend
  async addIsland(regionCategory: RegionCategory, name: string, description: string, latitude: number, longitude: number) {
    const island = {
      regionCategory: regionCategory,
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

  // async getUsers() {
  //   const response = await this.httpClient.get('/api/users');
  //   const users = await response.content;
  //   users.forEach(user => {
  //     this.users.set(user.email, user);
  //   });
  // }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    const response = await this.httpClient.post('/api/users', user);
    const newUser = await response.content;
    if(newUser) {
      this.changeRouter(PLATFORM.moduleName('app'));
    } else {
      return false;
    }
  }

  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
        this.httpClient.configure((configuration) => { // retrieve and remember the token if we have authenticated successfully..... and the including this header in all subsequent requests.
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });

        // when a user successfully logs in we can store the token in LocalStorage
        localStorage.islandStorage = JSON.stringify(response.content);

        // on login retrieve the Regions from model on server side
        await this.getRegionCategories();

        this.changeRouter(PLATFORM.moduleName('app'));
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }

  // clear the token
  logout() {
    localStorage.islandStorage = null;
    this.httpClient.configure(configuration => {
      configuration.withHeader('Authorization', '');
    });
    this.changeRouter(PLATFORM.moduleName('start'));
  }

  // check for the presence of a token, and if found set it as a header (similar to the log in procedure):
  checkIsAuthenticated() {
    let authenticated = false;
    if (localStorage.islandStorage !== 'null') {
      authenticated = true;
      this.httpClient.configure(http => {
        const auth = JSON.parse(localStorage.islandStorage);
        http.withHeader('Authorization', 'bearer ' + auth.token);
      });
      this.changeRouter(PLATFORM.moduleName('app'));
    }
  }

  changeRouter(module:string) {
    this.router.navigate('/', { replace: true, trigger: false });
    this.router.reset();
    this.au.setRoot(PLATFORM.moduleName(module));
  }


}
