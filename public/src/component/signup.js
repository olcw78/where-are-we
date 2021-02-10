export class Signup {
  closeSignupPopupEl = document.querySelector(".signup-popup-close");
  signupPopupEl = document.querySelector(".signup-popup-bg");
  openSignupBtnEl = document.querySelector(".btn--signup");
  cancleBtnEl = document.getElementById("signup-cancel");
  signupEl = document.getElementById("signup");

  constructor() {
    this._bind();
  }

  _bind() {
    // signup close button
    this.closeSignupPopupEl.addEventListener(
      "click",
      this.closeSignupPopup.bind(this)
    );

    this.cancleBtnEl.addEventListener(
      "click",
      this.closeSignupPopup.bind(this)
    );

    // when you touch other places
    // this.signupPopupEl.addEventListener(
    //   "click",
    //   this.closeSignupPopup.bind(this)
    // );

    // signup open button
    this.openSignupBtnEl.addEventListener(
      "click",
      this.openSignupPopup.bind(this)
    );
  }

  openSignupPopup() {
    this.signupPopupEl?.classList.add("active");
  }

  closeSignupPopup() {
    this.signupPopupEl?.classList.remove("active");
  }
}
