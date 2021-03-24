import Curtain from "../util/curtain";
import naver from "./NaverMap";
import InfoWindowWrapper from "./InfoWindowWrapper";

class MapLoader {
  // Props
  private readonly initZoom: number;
  private readonly curtain: Curtain;

  private mapEl: HTMLDivElement;

  // Instances
  private map: any;
  getMap(): any {
    return this.map;
  }

  private infoWndWrapper: InfoWindowWrapper | undefined;
  getInfWndWrapper(): InfoWindowWrapper | undefined {
    return this.infoWndWrapper;
  }

  constructor() {
    this.initZoom = 15;
    this.curtain = new Curtain();
    this.mapEl = <HTMLDivElement>document.querySelector(".map")!;
  }
  /**
   *
   */
  onLoadWebsite(): void {
    if (!navigator.geolocation) {
      throw new Error("No geolocation info allowed!");
    }

    // init fields
    this.infoWndWrapper = new InfoWindowWrapper();

    navigator.geolocation.getCurrentPosition(this.onLoad, this.onError);
  }

  /**
   * retrieve current position information from the Web API
   * @param pos
   */
  private onLoad(pos: GeolocationPosition): void {
    const { latitude: lat, longitude: lng } = pos?.coords;
    const mapOptions = {
      center: { lat, lng },
      zoom: this.initZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    this.map = new naver.maps.Map(this.mapEl, mapOptions);

    this.infoWndWrapper?.load(this.map, lat, lng);
  }

  /**
   *
   */
  private onError(): void {
    const mapOptions = {
      center: { lat: 37.5666805, lng: 126.9784147 }, // 서울 시청 by default
      zoom: this.initZoom,
      zoomControl: true,
      zoomControlOptions: {
        position: naver?.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(document.querySelector(".map"), mapOptions);

    this.infoWndWrapper?.loadOnErr(this.map);
  }

  show(): void {
    this.mapEl.style.width = "100%";
    if (!this.map) {
      this.onLoadWebsite();
    }
    this.setMapInteractions(true);
  }

  hide(): void {
    this.mapEl.style.width = "0%";
    this.setMapInteractions(false);
  }

  setMapInteractions(isOn: boolean): void {
    if (!this.map) {
      return;
    }

    if (isOn) {
      this.map.setOptions({
        draggable: true,
        pinchZoom: true,
        scrollWheel: true,
        keyboardShortcuts: true,
        disableDoubleTapZoom: false,
        disableDoubleClickZoom: false,
      });
    } else {
      this.map.setOptions({
        draggable: false,
        pinchZoom: false,
        scrollWheel: false,
        keyboardShortcuts: false,
        disableDoubleTapZoom: true,
        disableDoubleClickZoom: true,
        disableTwoFingerTapZoom: true,
      });
    }
  }
}

export default MapLoader;
