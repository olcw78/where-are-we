import naver from "./NaverMap";

class InfoWindowWrapper {
  private infoWnd: any;
  getInfoWnd(): any {
    return this.infoWnd;
  }

  constructor() {
    this.infoWnd = new naver.maps.InfoWindow();
  }

  /**
   *
   * @param map
   * @param lat
   * @param lng
   */
  load(map: any, lat: number, lng: number): void {
    this.infoWnd.setContent(
      `<div style="padding:20px;"><p>latitude: ${lat} <br /> latitude: ${lng}</p></div>`
    );
    this.infoWnd.open(map, { lat, lng });
  }

  /**
   *
   * @param map
   */
  loadOnErr(map: any): void {
    const infoWindow = new naver.maps.InfoWindow();
    const center = map.getCenter();
    infoWindow.setContent(
      `<div style="padding:20px;"><h5 style="margin-bottom:5px;color:#f00;">Geolocation failed!</h5>
        latitude: ${center.lat()}, <br />longitude: ${center.lng()}</div>`
    );
    infoWindow.open(map, center);
  }
}

export default InfoWindowWrapper;
