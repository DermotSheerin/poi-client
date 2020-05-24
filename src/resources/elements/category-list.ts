import {bindable, inject} from 'aurelia-framework';
import { RegionCategory } from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class CategoryList {
  @bindable
  regionCategories: RegionCategory[];
  selectedRegionCategory: RegionCategory = null;

  constructor(private ds: IslandService) {
    console.log(`here in RegionCategoryList ${this.regionCategories}`);
  }

  addRegionCategory() { //
    this.ds.addRegionCategory();
  }

}
