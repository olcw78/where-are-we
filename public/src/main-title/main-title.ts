class MainTitle {
  _mainTitleEl: HTMLHeadElement = document.querySelector(
    ".main-title"
  )! as HTMLHeadElement;

  _toggleBtnEl: HTMLDivElement = document.querySelector(
    ".main-title-toggle"
  )! as HTMLHeadingElement;

  _arrowEl: HTMLDivElement = document
    .querySelector(".main-title-toggle")
    ?.querySelector(".fas")! as HTMLDivElement;

  _isToggled: boolean = false;

  constructor() {
    this._toggleBtnEl.addEventListener(
      "click",
      this._onToggleMainTitle.bind(this)
    );
  }

  _onToggleMainTitle(): void {
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
