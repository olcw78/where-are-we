class About {
  private aboutBtnEl: HTMLButtonElement;

  constructor() {
    this.aboutBtnEl = document.querySelector(
      ".about-btn"
    )! as HTMLButtonElement;

    this.aboutBtnEl.addEventListener("click", () => {
      console.log("About button clicked!");
    });
  }
}

export default About;
