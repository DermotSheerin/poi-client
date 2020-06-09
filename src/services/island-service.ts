import { inject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import {Island, RegionCategory, User, Location, Image} from "./island-types";
import {HttpClient} from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from "./messages";

@inject(HttpClient, EventAggregator, Aurelia, Router)
export class IslandService {
  islands: Island[] = [];
  regionCategories: RegionCategory[] = [];
  filterIslands: Island[] = [];
  islandTotal = 0;
  userDetails: User;
  users: User[] = [];

  constructor(private httpClient: HttpClient, private ea: EventAggregator, private au: Aurelia, private router: Router) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:3000');
      console.log(`here in Island-Service Constructor users - ${this.users}`);
    });
    this.getRegionCategories(); // this function call was initially inside the retrieveUserPOIDetails function triggered during login however the regionCategories array was not consistently showing
    // when the user logged in successfully. Placing the function call here meant the array was populated prior to user login. This is fine as I am not implementing custom regions per user.
  }

  async getRegionCategories() { // retrieve a lean region/categories from the backend and store in local regionCategories array
    const response = await this.httpClient.get('/api/regions/listRegions');
    this.regionCategories = response.content;
  }


  async localFilter(category: RegionCategory) { // pass the category selected by the search filter to the backend and retrieve the islands associate with this category
    this.filterIslands.splice(0,this.filterIslands.length); // clear the filterIslands array before each filter request

    if (category.region != "All Regions") { // go through the islands array and push any islands that are in the region requested into the filterIslands array to be displayed
      for (let i = 0; i < this.islands.length; i++) {
        console.log(this.islands[i].region.region);
        if (this.islands[i].region.region === category.region) {
          this.filterIslands.push(this.islands[i]);
        }
      }
    }
      else { // else add all islands to the filterArray to be displayed
        this.islands.forEach(island => {
              this.filterIslands.push(island);
            });
      }
    }

  async addIsland(region: RegionCategory, name: string, description: string, location: Location) {
    try {
      const island = {
        region: region, // regionCategory contains the lean details of each Region, here I pass back just the ID for the island to the backend
        name: name,
        description: description,
        location: location
      };
      console.log(island);
      const response = await this.httpClient.post('/api/islands/addIsland', island);
      const newIsland = await this.httpClient.get('/api/islands/showIslandDetails/' + response.content._id); // retrieve entire island object

      let images: Image[];

      const updatedIsland = {
        _id: response.content._id,
        user: response.content.user,
        region: region, // regionCategory contains the lean details of each Region, here I pass back just the ID for the island to the backend
        name: name,
        description: description,
        location: location,
        image: images
      };

      if (response.isSuccess) {
        this.islands.push(newIsland.content.islandDetails);
        this.islandTotal = this.islandTotal + 1; // increment the island count by 1
        this.ea.publish(new TotalIslandUpdate(this.islandTotal, updatedIsland));
        return "Island added successfully"
      } else return 'Error adding an Island'
    } catch (err) {
      return 'Error adding an Island';
    }
  }

  async editIsland(islandId: string, region: RegionCategory, name: string, description: string, latitude: number, longitude: number) {
    try {
      const updateIsland = {
        islandId: islandId,
        region: region, // regionCategory contains the lean details of each Region, here I pass back just the ID for the island to the backend
        name: name,
        description: description,
        latitude: latitude,
        longitude: longitude,
      };
      const response = await this.httpClient.put('/api/islands/editIslandDetails', updateIsland);

      // retrieve the user that is passed back by authenticate function at backend and store as local variable
      this.userDetails = response.content.user;

      // call the retrieveUserPOIDetails function to retrieve the latest Island details for the user and push into the islands array
      this.retrieveUserPOIDetails(this.userDetails._id);

      return response.content;
    } catch (err) {
      return 'Error Updating Island';
    }
  }

  async deleteIsland(islandId: string) {
    try {
      const response = await this.httpClient.delete('/api/islands/deleteIsland/' + islandId);
      return response.content;
    } catch (err) {
      return 'Error Deleting Island'
    }
  }

  async signup(firstName: string, lastName: string, email: string, password: string) {
    try {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      const response = await this.httpClient.post('/api/users', user);
      const newUser = await response.content;
      if(newUser) {
        this.changeRouter(PLATFORM.moduleName('start'));
      } else {
        return false;
      }
    } catch (err) {
      return err
    }
  }

  async login(email: string, password: string) {
    let success = false;
    try {
      const response = await this.httpClient.post('/api/users/authenticate', { email: email, password: password });
      const status = await response.content;
      if (status.success) {
          this.httpClient.configure((configuration) => { // retrieve and remember the token if we have authenticated successfully..... and including this header in all subsequent requests.
          configuration.withHeader('Authorization', 'bearer ' + status.token);
        });

        // when a user successfully logs in we can store the token in LocalStorage
        localStorage.islandStorage = JSON.stringify(response.content);

        // retrieve the user that is passed back by authenticate function at backend during login and store as local variable
        this.userDetails = response.content.user;

        if (this.userDetails.userRole != "admin") {
          // on successful user login, call the retrieveUserPOIDetails function to retrieve the Islands created by the user
          this.retrieveUserPOIDetails(this.userDetails._id);

          // on login, clear the filterIslands array
          this.clearFilterIslands()

          this.changeRouter(PLATFORM.moduleName('app'));
          success = status.success;
        }
        else {
          const getUsers = await this.getUsers(); // if admin user trigger the function to retrieve all users and store in local array
          // console.log(`here is all users ${getUsers}`);
          this.changeRouter(PLATFORM.moduleName('appAdmin'));
          success = status.success;
        }
      }
    } catch (e) {
      success = false;
    }
    return success;
  }

  // admin page retrieve all users
  async getUsers() {
    const response = await this.httpClient.get('/api/users');
    this.users = response.content;
  }

  async findUser(userId) {
    const response = await this.httpClient.get('/api/users/' + userId);
    return response;
  }

  async deleteUser(userId) {
    try {
      const response = await this.httpClient.delete('/api/users/' + userId);
      await this.getUsers();
      if (response.isSuccess) {
        return {response: response, users: this.users}
      }
    } catch (err) {
      return err.message
    }
  }

  // function to clear filter islands array on Island page load/reload
  clearFilterIslands() {
    this.filterIslands.splice(0,this.filterIslands.length);
  }

  // function to replace an updated island element in the array
  updateFilterIslandAfterEdit(islandIndex, island){
    this.filterIslands.splice(islandIndex,1, island);
  }

  // function to remove island from filterIsland array after an island is deleted
  removeIslandFilterIslands(islandIndex) {
    this.filterIslands.splice(islandIndex, 1);
  }

  // function to remove island from islands array after an island is deleted
  removeIndexIsland(islandIndex) {
    this.islands.splice(islandIndex, 1);
  }

  // during login this function is called to retrieve the island details for the user
  async retrieveUserPOIDetails(userId) {
    console.log(userId);
    let response = await this.httpClient.get('/api/islands/getUserIslands/' + userId);
    this.islands =  await response.content; // store list of user islands in islands array
  }

  // retrieve the island details to View/Edit when selected in category list
  async retrieveIslandToUpdate(islandId) {
    let response = await this.httpClient.get('/api/islands/showIslandDetails/' + islandId);
    return response.content;
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
