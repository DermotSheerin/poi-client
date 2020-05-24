import {bindable, inject} from 'aurelia-framework';
import {Island, RegionCategory} from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class IslandForm {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  @bindable
  islands: Island[];
  @bindable
  regionCategories: RegionCategory[];

  selectedRegionCategory: RegionCategory = null;

  constructor(private ds: IslandService) {}

  addIsland() { // using ds to access methods in IslandService class and access the addIsland method
    this.ds.addIsland(this.selectedRegionCategory, this.name, this.description, this.latitude, this.longitude);
  }

}
