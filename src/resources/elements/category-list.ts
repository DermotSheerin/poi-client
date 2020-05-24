import {bindable, inject} from 'aurelia-framework';
import { RegionCategory } from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class CategoryList {
  @bindable
  regionCategories: RegionCategory[];
  selectedRegionCategory: RegionCategory = null;
  //filterSelection: RegionCategory = null;
  filterIslands = [];

  constructor(private ds: IslandService) {
    console.log(`here in RegionCategoryList ${this.selectedRegionCategory}`);
  }

  addRegionCategory() { //
    this.ds.addRegionCategory();
  }

  async categoryFilter() {
    const categoryFilter = await this.ds.categoryFilter(this.selectedRegionCategory);
    //console.log(`last selRegCat ---> ${categoryFilter}`)
    categoryFilter.forEach(island => this.filterIslands.push(island));
   // this.filterIslands.push(categoryFilter);
  }

  // categoryFilter() { //
  //   const categoryFilter =  this.ds.categoryFilter(this.selectedRegionCategory);
  //   this.filterIslands.push(categoryFilter);
  // }

}
