class MainTitle {
  _mainTitleEl = document.querySelector(".main-title");
  _toggleBtnEl = document.querySelector(".main-title-toggle");

  constructor() {
    console.log(this._toggleBtnEl);
    this._toggleBtnEl.addEventListener(
      "click",
      this._onToggleMainTitle.bind(this)
    );
  }

  _onToggleMainTitle() {
    this._mainTitleEl.classList.toggle("hidden");
  }
}

export default MainTitle;
