// import MapMarker from "./map-marker";
// import MapLock from "./map-lock";

declare let naver: {
  maps: any;
};

class MapLoader {
  static _map: any;
  static get map(): any {
    return this._map;
  }

  static _infoWindow: any;
  static get infoWindow(): any {
    return this._infoWindow;
  }

  static onLoadWebsite(): void {
    if (!navigator.geolocation) {
      throw new Error("No geolocation info allowed!");
    }
    navigator.geolocation.getCurrentPosition(MapLoader._load, MapLoader._error);
  }

  // retrieve current position information from the Web API
  static _load(pos: GeolocationPosition): void {
    console.log(pos);
    const { latitude: lat, longitude: lng } = pos?.coords;
    const mapOptions = {
      center: { lat, lng },
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    MapLoader._map = new naver.maps.Map(
      document.querySelector(".map"),
      mapOptions
    );

    MapLoader._infoWindow = new naver.maps.InfoWindow();
    MapLoader._infoWindow.setContent(
      `<div style="padding:20px;"><p>latitude: ${lat} <br /> latitude: ${lng}</p></div>`
    );
    MapLoader._infoWindow.open(MapLoader._map, { lat, lng });

    // // init map marker
    // const marker = new MapMarker();
    // marker.init(map);

    // // init map drag
    // const drag = new MapDrag();
    // drag.init(map);
  }

  static _error() {
    const mapOptions = {
      center: { lat: 37.5666805, lng: 126.9784147 },
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(document.querySelector(".map"), mapOptions);
    const center = map.getCenter();
    const infoWindow = new naver.maps.InfoWindow();
    infoWindow.setContent(
      `<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>
        latitude: ${center.lat()}, <br />longitude: ${center.lng()}</div>`
    );
    infoWindow.open(MapLoader._map, center);
  }
}

export default MapLoader;
