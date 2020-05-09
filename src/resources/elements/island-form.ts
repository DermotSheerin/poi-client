import { bindable } from 'aurelia-framework';
import { Island } from '../../services/poi-types';
//import { Region } from '../../services/poi-types';

export class IslandForm {
  region: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  // @bindable
  // regions: Region[];
  @bindable
  islands: Island[];

  addIsland() {
    // const region= {
    //   region: this.region
    // };
    const island = {
      region: this.region,
      name: this.name,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
    };

    // this.regions.push(region);
    this.islands.push(island);
    console.log(island);
  }


}
