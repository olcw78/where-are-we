import { async } from "regenerator-runtime";

import { initZoomLevel } from "../util/config";

import { MapZoom } from "./map-zoom";
import { MapMarker } from "./map-marker";
import { MapDrag } from "./map-drag";

export class MapLoader {
  static _init() {
    if (!navigator.geolocation) return;

    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        pos => resolve(pos),
        err => reject(err)
      )
    );
  }

  // create a kakao map instance
  // retrieve current position information from the Web API
  static async load() {
    const pos = await this._init();
    const { latitude: lat, longitude: lng } = pos.coords;
    const mapContainer = document.querySelector(".map");

    const map = await new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(lat, lng),
      level: initZoomLevel,
    });

    // init zoom
    const zoom = new MapZoom(initZoomLevel);
    zoom.init(map);

    // init map marker
    const marker = new MapMarker();
    marker.init(map);

    // init map drag
    const drag = new MapDrag();
    drag.init(map);
  }
}
