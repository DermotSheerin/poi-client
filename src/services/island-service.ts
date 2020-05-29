import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {Island, RegionCategory } from "./island-types";
import {HttpClient, HttpResponseMessage} from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class IslandService {
  islands: Island[] = [];
  regionCategories: RegionCategory[] = [];
  filterIslands: Island[] = [];
  islandTotal = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
      console.log(`here in Island-Service Constructor`);
    });
    this.getRegionCategories(); // this function call was initially inside the retrieveUserPOIDetails function triggered during login however the regionCategories array was not consistently showing
    // when the user logged in successfully. Placing the function call here meant the array was populated prior to user login. This is fine as I am not implementing custom regions per user.
  }

  async getRegionCategories() { // retrieve a lean region/categories from the backend and store in local regionCategories array
    const response = await this.httpClient.get('/api/regions/listRegions');
    this.regionCategories = response.content;
  }

  async categoryFilter(category: RegionCategory) { // pass the category selected by the search filter to the backend and retrieve the islands associate with this category
    this.filterIslands.splice(0,this.filterIslands.length); // clear the filterIslands array before each filter request
    const response = await this.httpClient.get('/api/islands/regionCategories/' + category.region);
    const categoryFilter = await response.content;
    categoryFilter.forEach(island =>
      this.filterIslands.push(island)); // go through the returned list of islands and add to the filterIslands array that is bound to the category-list custom element
  }

  // NOTE --> getRegions will retrieve lean region objects. When passing a region to backend as part of addIsland I only pass the region ID

  async addRegionCategory() {
    // const response = await this.httpClient.get('/api/regionCategories');
    // this.regionCategories = await response.content;
    // console.log(`here in islandService ${this.regionCategories}`);
  }

  async addIsland(regionCategory: RegionCategory, name: string, description: string, latitude: number, longitude: number) {
    try {
      const island = {
        regionCategory: regionCategory._id, // regionCategory contains the lean details of each Region, here I pass back just the ID for the island to the backend
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
      };
      const response = await this.httpClient.post('/api/islands/addIsland', island);
      const newIsland = await response.content;
      if (response.isSuccess) {
        this.islands.push(newIsland);
        this.islandTotal = this.islandTotal + 1; // increment the island count by 1
        this.ea.publish(new TotalIslandUpdate(this.islandTotal));
        return "Island added successfully"
      } else return 'Error adding an Island'
    } catch (err) {
      return 'Error adding an Island';
    }
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
      console.log('test');
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
          this.httpClient.configure((configuration) => { // retrieve and remember the token if we have authenticated successfully..... and including this header in all subsequent requests.
          configuration.withHeader('Authorization', 'bearer ' + status.token);
          console.log('did u get test');
        });

        // when a user successfully logs in we can store the token in LocalStorage
        localStorage.islandStorage = JSON.stringify(response.content);

        // retrieve the userId that is passed back by authenticate function at backend during login
        const userId = response.content.user;

        // on successful user login, call the retrieveUserPOIDetails function to retrieve the Islands created by the user
        this.retrieveUserPOIDetails(userId);

        // on login, clear the filterIslands array
        this.filterIslands.splice(0,this.filterIslands.length);

        this.changeRouter(PLATFORM.moduleName('app'));
        success = status.success;
      }
    } catch (e) {
      success = false;
    }
    return success;
  }

  // during login this function is called to retrieve the region and island details for the user
  async retrieveUserPOIDetails(userId) {
    //await this.getRegionCategories(); // call getRegionCategories function to retrieve the list of regions and store in regionCategories array
    let response = await this.httpClient.get('/api/islands/getUserIslands/' + userId);
    this.islands =  await response.content; // store list of user islands in islands array
}

  // clear the token on logout
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
