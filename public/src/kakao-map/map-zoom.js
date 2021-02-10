export class MapZoom {
  _zoomLevelElement;
  _zoomInBtn;
  _zoomOutBtn;

  _initZoomLevel = 6;
  _map;

  constructor(initZoomLevel) {
    this._initZoomLevel = initZoomLevel;
    this._zoomLevelElement = document.getElementById("zoom-level");
    this._zoomInBtn = document.getElementById("zoom-in");
    this._zoomOutBtn = document.getElementById("zoom-out");
  }

  init(map) {
    this._map = map;

    // 1. bind the callbacks
    this._zoomInBtn.addEventListener("click", this._zoomIn.bind(this));
    this._zoomOutBtn.addEventListener("click", this._zoomOut.bind(this));

    // 2.
    this._displayZoomLevel();
  }

  _zoomIn() {
    const level = this._map.getLevel();
    this._map.setLevel(level - 1);
    this._displayZoomLevel();
  }

  _zoomOut() {
    const level = this._map.getLevel();
    this._map.setLevel(level + 1);
    this._displayZoomLevel();
  }

  _displayZoomLevel() {
    this._zoomLevelElement.innerHTML = `${this._map.getLevel()}`;
  }
}
