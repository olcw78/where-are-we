import { async } from "regenerator-runtime";

export class KakaoMapDrag {
  _isAdjustable = true;
  _map;
  _lockIcon;

  init(map) {
    this._map = map;
    this._lockIcon = document.querySelector(".drag-pos");
    //  bind class 'this' to utilise it inside the callback
    this._lockIcon.addEventListener("click", this._toggleDraggable.bind(this));
  }

  _toggleDraggable() {
    // inverse the state of _isAdjustable.
    this._isAdjustable = !this._isAdjustable;

    //
    if (this._lockIcon.classList.contains("fa-lock-open")) {
      this._lockIcon.classList.remove("fa-lock-open");
      this._lockIcon.classList.add("fa-lock");
    } else {
      this._lockIcon.classList.add("fa-lock-open");
      this._lockIcon.classList.remove("fa-lock");
    }
    this._map.setDraggable(this._isAdjustable);
    // this._map.setZoomable(this._isAdjustable);
  }
}
