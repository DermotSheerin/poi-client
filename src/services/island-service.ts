import { inject } from 'aurelia-framework';
import {Island } from "./island-types";
import { HttpClient } from 'aurelia-http-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from "./messages";

@inject(HttpClient, EventAggregator)
export class IslandService {
  islands: Island[] = [];
  regions = ['North East', 'East Coast', 'South Coast', 'Mid West'];
  islandTotal = 0;

  constructor(private httpClient: HttpClient, private ea: EventAggregator) {
    httpClient.configure(http => {
      http.withBaseUrl('http://localhost:8080');
    });
    // this.getCandidates();
  }

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

}
