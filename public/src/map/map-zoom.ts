// export class MapZoom {
//   private _zoomLevelElement = document.getElementById("zoom-level");
//   private _zoomInBtn = document.getElementById("zoom-in");
//   private _zoomOutBtn = document.getElementById("zoom-out");

//   _initZoomLevel = 6;
//   _map;

//   constructor(initZoomLevel) {
//     this._initZoomLevel = initZoomLevel;
//   }

//   init(map) {
//     this._map = map;

//     // 1. bind the callbacks
//     this._zoomInBtn.addEventListener("click", this._zoomIn.bind(this));
//     this._zoomOutBtn.addEventListener("click", this._zoomOut.bind(this));

//     // 2.
//     this._displayZoomLevel();
//   }

//   _zoomIn() {
//     const level = this._map.getLevel();
//     this._map.setLevel(level - 1);
//     this._displayZoomLevel();
//   }

//   _zoomOut() {
//     const level = this._map.getLevel();
//     this._map.setLevel(level + 1);
//     this._displayZoomLevel();
//   }

//   _displayZoomLevel() {
//     this._zoomLevelElement.innerHTML = `${this._map.getLevel()}`;
//   }
// }
