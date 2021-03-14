export class MapLock {
  _isAdjustable = true;
  _map;
  _lockIconEl = document.querySelector(".drag-pos");

  init(map) {
    this._map = map;

    //  bind class 'this' to utilise it inside the callback
    this._lockIconEl.addEventListener("click", this._onToggleLock.bind(this));
  }

  _onToggleLock() {
    // inverse the state of _isAdjustable.
    this._isAdjustable = !this._isAdjustable;

    //
    if (this._lockIconEl.classList.contains("fa-lock-open")) {
      this._lockIconEl.classList.remove("fa-lock-open");
      this._lockIconEl.classList.add("fa-lock");
    } else {
      this._lockIconEl.classList.add("fa-lock-open");
      this._lockIconEl.classList.remove("fa-lock");
    }

    this._map.setDraggable(this._isAdjustable);
    // this._map.setZoomable(this._isAdjustable);
  }
}
