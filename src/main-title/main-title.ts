class MainTitle {
  /**
   *
   */
  private mainTitleEl: HTMLHeadingElement;
  /**
   *
   */
  private toggleBtnEl: HTMLDivElement;

  private arrowEl: HTMLSpanElement;

  private isToggled: boolean = false;

  constructor() {
    this.mainTitleEl = document.querySelector(
      ".main-title"
    )! as HTMLHeadingElement;

    this.toggleBtnEl = document.querySelector(
      ".main-title-toggle"
    )! as HTMLHeadingElement;

    this.arrowEl = document
      .querySelector(".main-title-toggle")
      ?.querySelector(".fas")! as HTMLSpanElement;

    this.toggleBtnEl.addEventListener(
      "click",
      this.onToggleMainTitle.bind(this)
    );
  }

  /**
   *
   */
  private onToggleMainTitle(): void {
    this.mainTitleEl.classList.toggle("hidden");

    if (this.isToggled) {
      this.arrowEl.classList.remove("fa-arrow-down");
      this.arrowEl.classList.add("fa-arrow-up");
    } else {
      this.arrowEl.classList.add("fa-arrow-down");
      this.arrowEl.classList.remove("fa-arrow-up");
    }

    this.isToggled = !this.isToggled;
  }
}

export default MainTitle;
