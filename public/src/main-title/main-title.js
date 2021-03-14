class MainTitle {
  _mainTitleEl = document.querySelector(".main-title");
  _toggleBtnEl = document.querySelector(".main-title-toggle");
  _arrowEl = document.querySelector(".main-title-toggle").querySelector(".fas");
  _isToggled = false;

  constructor() {    
    this._toggleBtnEl.addEventListener(
      "click",
      this._onToggleMainTitle.bind(this)
    );
  }

  _onToggleMainTitle() {
    this._mainTitleEl.classList.toggle("hidden");
    if (this._isToggled) {
      this._isToggled = false;
      this._arrowEl.classList.remove("fa-arrow-down");
      this._arrowEl.classList.add("fa-arrow-up");
    } else {
      this._isToggled = true;
      this._arrowEl.classList.add("fa-arrow-down");
      this._arrowEl.classList.remove("fa-arrow-up");
    }
  }
}

export default MainTitle;
