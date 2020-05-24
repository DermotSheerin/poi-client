import { bindable } from 'aurelia-framework';
import {Island} from '../../services/island-types';

export class IslandList {
  @bindable
  islands: Island[];
}
