class About {
  /** */
  private readonly aboutBtnEl: HTMLButtonElement;

  constructor() {
    // bind dom
    this.aboutBtnEl = <HTMLButtonElement>document.querySelector(".about-btn")!;

    // this.aboutBtnEl.addEventListener("click", () => {
    //   console.log("About button clicked!");
    // });
  }
}

export default About;
