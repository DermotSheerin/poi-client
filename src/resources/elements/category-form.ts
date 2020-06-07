import {bindable, inject} from 'aurelia-framework';
import {Island, RegionCategory} from '../../services/island-types';
import { IslandService } from '../../services/island-service';

@inject(IslandService)
export class CategoryForm {
  @bindable
  regionCategories: RegionCategory[];
  @bindable
  filterIslands: Island[];

  // store region selected by the user on the form in selectedRegionCategory
  selectedRegionCategory: RegionCategory = null;


  constructor(private ds: IslandService) {
    console.log(`here in Category-Form Constructor`)
  }

  async categoryFilter() { // pass the selected region to the categoryFilter in IslandService class to retrieve the islands belonging to this region
    let categoryFilter = await this.ds.localFilter(this.selectedRegionCategory);
  }


}
