import { bindable } from 'aurelia-framework';
import { Island } from '../../services/poi-types';

export class IslandList {
  @bindable
  islands: Island[];
}
