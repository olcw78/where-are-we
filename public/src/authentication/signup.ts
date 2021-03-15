class Signup {
  /**  */
  private closeSignupPopupEl: HTMLDivElement;
  /**  */
  private signupPopupEl: HTMLDivElement;
  /**  */
  private openSignupBtnEl: HTMLButtonElement;
  /**  */
  private cancelBtnEl: HTMLButtonElement;

  // _onSignupSucceed = new CallbackChain();
  // get onSignupSucceed() {
  //   return this._onSignupSucceed;
  // }

  constructor() {
    // dom op
    this.closeSignupPopupEl = document.querySelector(
      ".signup-popup-close"
    )! as HTMLDivElement;

    this.signupPopupEl = document.querySelector(
      ".signup-popup-bg"
    )! as HTMLDivElement;

    this.openSignupBtnEl = document.querySelector(
      ".btn--signup"
    )! as HTMLButtonElement;

    this.cancelBtnEl = document.getElementById(
      "signup-cancel"
    )! as HTMLButtonElement;

    // signup close button
    this.closeSignupPopupEl.addEventListener("click", this.hide.bind(this));

    this.cancelBtnEl.addEventListener("click", this.hide.bind(this));

    // when you touch other places
    // this.signupPopupEl.addEventListener(
    //   "click",
    //   this.closeSignupPopup.bind(this)
    // );

    // signup open button
    this.openSignupBtnEl.addEventListener("click", this.show.bind(this));
  }

  private show(): void {
    this.signupPopupEl.classList.add("active");
    // TODO: When the user signup, then the user happen to want to automatically login!
  }

  private hide(): void {
    this.signupPopupEl.classList.remove("active");
  }
}

export default Signup;
