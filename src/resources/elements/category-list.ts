import {bindable, inject} from 'aurelia-framework';
import {Island} from '../../services/island-types';


export class CategoryList {
  @bindable
  filterIslands: Island[] = null;

}
