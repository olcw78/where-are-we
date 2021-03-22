class SignupPopup {
  /** Closing Signup Button. */
  // private closeSignupPopupEl: HTMLDivElement;

  /** Signup Popup. */
  private readonly signupPopupEl: HTMLDivElement;
  /** Open Signup Button */
  private readonly openSignupBtnEl: HTMLButtonElement;
  /**  */
  private readonly cancelBtnEl: HTMLButtonElement;
  private readonly submitSignupBtnEl: HTMLButtonElement;

  getSubmitSignupBtnEl(): HTMLButtonElement {
    return this.submitSignupBtnEl;
  }

  // _onSignupSucceed = new CallbackChain();
  // get onSignupSucceed() {
  //   return this._onSignupSucceed;
  // }

  constructor() {
    // bind dom
    // this.closeSignupPopupEl = document.querySelector(
    //   ".signup-popup-close"
    // )! as HTMLDivElement;

    this.signupPopupEl = document.querySelector(
      ".signup-popup-bg"
    )! as HTMLDivElement;

    this.openSignupBtnEl = document.querySelector(
      ".signup-btn"
    )! as HTMLButtonElement;

    this.cancelBtnEl = document.querySelector(
      ".signup-cancel"
    )! as HTMLButtonElement;

    this.submitSignupBtnEl = document.querySelector(
      ".signup-submit"
    )! as HTMLButtonElement;

    // // signup close button
    // this.closeSignupPopupEl.addEventListener(
    //   "click",
    //   this.toggleSignupBtn.bind(this, false)
    // );

    this.cancelBtnEl.addEventListener(
      "click",
      this.toggleSignupBtn.bind(this, false)
    );

    // when you touch other places
    // this.signupPopupEl.addEventListener(
    //   "click",
    //   this.closeSignupPopup.bind(this)
    // );

    // signup open button
    this.openSignupBtnEl.addEventListener(
      "click",
      this.toggleSignupBtn.bind(this, true)
    );
  }

  /**
   * register again when you login and logout
   * @param {*} isOn
   */
  toggleSignupBtn(isOn: boolean): void {
    if (isOn) {
      this.openSignupBtnEl.classList.add("active");
      this.signupPopupEl.classList.add("active");
    } else {
      this.openSignupBtnEl.classList.remove("active");
      this.signupPopupEl.classList.remove("active");
    }
  }
}

export default SignupPopup;
