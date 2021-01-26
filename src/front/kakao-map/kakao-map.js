export class KakaoMap {
  static _init() {
    if (!navigator.geolocation) return;

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve(pos),
        (err) => reject(err)
      );
    });
  }

  // create a kakao map instance
  // retrieve current position information from the Web API
  static async load(initialZoomLevel = 4) {
    const pos = await this._init();
    const { latitude: lat, longitude: lng } = pos.coords;
    const mapContainer = document.querySelector('.map');

    return new kakao.maps.Map(mapContainer, {
      center: new kakao.maps.LatLng(lat, lng),
      level: initialZoomLevel
    });
  }
}