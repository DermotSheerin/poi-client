import {bindable, inject} from 'aurelia-framework';
import { Island } from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class IslandForm {
  region: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  @bindable
  islands: Island[];
  @bindable
  regions: string[];

  // selectedRegion = '';

  constructor(private ds: IslandService) {}

  addIsland() { // using ds to access methods in IslandService class and pass details entered in island-form to the islands array
    this.ds.addIsland(this.region, this.name, this.description, this.latitude, this.longitude);
  }

}
