/**
 * Control the main title area.
 */
class MainTitle {
  /**
   * Main title Area that being toggled.
   */
  private mainTitleEl: HTMLHeadingElement;
  /**
   * Triggering toggling the main title area.
   */
  private toggleBtnEl: HTMLDivElement;
  /**
   * Visual UI for whether being toggled or not.
   */
  private arrowEl: HTMLSpanElement;
  /**
   * The status flag whether being toggled or not.
   */
  private isToggled: boolean = false;

  constructor() {
    // bind dom
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
   * Triggered on clicking the button to toggle the main title.
   */
  private onToggleMainTitle(): void {
    // 1. update the main title area.
    this.mainTitleEl.classList.toggle("hidden");

    // 2. update the arrow icon.
    if (this.isToggled) {
      this.arrowEl.classList.remove("fa-arrow-down");
      this.arrowEl.classList.add("fa-arrow-up");
    } else {
      this.arrowEl.classList.add("fa-arrow-down");
      this.arrowEl.classList.remove("fa-arrow-up");
    }

    // 3. update the toggled status
    this.isToggled = !this.isToggled;
  }
}

export default MainTitle;
