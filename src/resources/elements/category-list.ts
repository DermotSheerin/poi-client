import {bindable, inject} from 'aurelia-framework';
import {Island} from '../../services/island-types';


export class CategoryList {
  @bindable
  filterIslands: Island[];

  // async categoryFilter() {
  //   this.filterIslands = []; // clear the filterIslands array before each filter request
  //   let categoryFilter = await this.ds.categoryFilter(this.selectedRegionCategory);
  //   categoryFilter.forEach(island => this.filterIslands.push(island));
  // }


}
