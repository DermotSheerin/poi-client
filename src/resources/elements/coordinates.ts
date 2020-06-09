import { bindable } from 'aurelia-framework';
import { Location } from '../../services/island-types';

export class Coordinates {
  @bindable location: Location;
}
