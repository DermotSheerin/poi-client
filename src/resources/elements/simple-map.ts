import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { LeafletMap } from '../../services/leaflet-map';
import { TotalIslandUpdate } from '../../services/messages';
import { Island } from '../../services/island-types';

@inject(EventAggregator)
export class SimpleMap {
  mapId = 'simple-map';
  mapHeight = 300;
  map: LeafletMap;

  constructor(private ea: EventAggregator) {
    this.ea.subscribe(TotalIslandUpdate, (msg) => {
      this.renderIsland(msg.island);
    });
  }

  renderIsland(island: Island) {
    if (this.map) {
      const islandStr = `${island.name}`;
      this.map.addMarker(island.location, islandStr);
      this.map.moveTo(12, island.location);
    }
  }

  attached() {
    const mapConfig = {
      location: { lat: 53.2734, lng: -7.7783203 },
      zoom: 8,
      minZoom: 7,
    };
    this.map = new LeafletMap(this.mapId, mapConfig, 'Terrain');
    this.map.showZoomControl();
  }
}
