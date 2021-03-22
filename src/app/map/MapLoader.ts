import naver from "./NaverMap";
import InfoWindowWrapper from "./InfoWindowWrapper";

class MapLoader {
  // Props
  private static readonly initZoom: number = 15;

  // Instnaces
  private static map: any;
  static getMap(): any {
    return MapLoader.map;
  }

  private static infoWndWrapper: InfoWindowWrapper;
  static getInfWndWrapper(): InfoWindowWrapper {
    return MapLoader.infoWndWrapper;
  }

  /**
   *
   */
  static onLoadWebsite(): void {
    if (!navigator.geolocation) {
      throw new Error("No geolocation info allowed!");
    }

    // init static fields
    MapLoader.infoWndWrapper = new InfoWindowWrapper();

    navigator.geolocation.getCurrentPosition(
      MapLoader.onLoad,
      MapLoader.onError
    );
  }

  /**
   * retrieve current position information from the Web API
   * @param pos
   */
  private static onLoad(pos: GeolocationPosition): void {
    const { latitude: lat, longitude: lng } = pos?.coords;
    const mapOptions = {
      center: { lat, lng },
      zoom: MapLoader.initZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    MapLoader.map = new naver.maps.Map(
      document.querySelector(".map"),
      mapOptions
    );

    MapLoader.infoWndWrapper.load(MapLoader.map, lat, lng);
  }

  /**
   *
   */
  private static onError(): void {
    const mapOptions = {
      center: { lat: 37.5666805, lng: 126.9784147 }, // 서울 시청 by default
      zoom: MapLoader.initZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(document.querySelector(".map"), mapOptions);

    MapLoader.infoWndWrapper.loadOnErr(MapLoader.map);
  }
}

export default MapLoader;
