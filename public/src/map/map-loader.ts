// import MapMarker from "./map-marker";
// import MapLock from "./map-lock";

declare let naver: any;

class MapLoader {
  static _init(): Promise<unknown> | undefined {
    if (!navigator.geolocation) {
      return undefined;
    }

    return new Promise((resolve: Function, reject: Function) =>
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (err) => reject(err)
      )
    );
  }

  // create a kakao map instance
  // retrieve current position information from the Web API
  static async load(): Promise<void> {
    const pos: any = await this._init();
    // console.log(pos);
    const { latitude: lat, longitude: lng } = pos?.coords;
    // console.log(lat, lng);

    const mapOptions = {
      // center: new naver.maps.LatLng(lat, lng),
      center: { lat, lng },
      zoom: 15,
      // size: new naver.maps.Size(2048, 1024),
      // size: { width: 2048, height: 1024 },
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(document.querySelector(".map"), mapOptions);

    // // init map marker
    // const marker = new MapMarker();
    // marker.init(map);

    // // init map drag
    // const drag = new MapDrag();
    // drag.init(map);
  }
}

export default MapLoader;
