import { inject, bindable } from 'aurelia-framework';
import { IslandService } from '../../services/island-service';
import {User} from '../../services/island-types';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from '../../services/messages';

@inject(IslandService, EventAggregator)
export class IslandTotal {
  @bindable
  islandTotal = 0;
  @bindable
  userDetails: User;

  constructor(private ds: IslandService, private ea: EventAggregator) {
    this.ea.subscribe(TotalIslandUpdate, msg => {
      this.islandTotal = msg.islandTotal;
    });
  }

}
