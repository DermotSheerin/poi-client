import { inject } from 'aurelia-framework';
import { IslandService } from '../../services/island-service';
import { bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import {TotalIslandUpdate} from '../../services/messages';

@inject(IslandService, EventAggregator)
export class IslandTotal {
  @bindable // NOT SURE WE NEED TO BIND HERE AS WE ARE SETTING THE ISLANDTOTAL USING THE SUBSCRIBE BELOW???
  islandTotal = 0;

  constructor(private ds: IslandService, private ea: EventAggregator) {
    //this.islandTotal = ds.islandTotal; DONT THINK THIS NEEDS TO BE SET SEEING AS WE ARE BOUND TO THE TOTAL IN ISLAND VIEW ABOVE????
    this.ea.subscribe(TotalIslandUpdate, msg => {
      this.islandTotal = msg.islandTotal;
      console.log(`here in Island-Total Constructor`)
    });
  }

}
