export class SignupPopup {
  closeSignupPopupElement = document.querySelector(".signup-popup-close");
  signupPopup = document.querySelector(".signup-popup-bg");
  constructor() {
    this.closeSignupPopupElement.addEventListener(
      "click",
      this._closeSignupPopup.bind(this)
    );
  }

  openSignupPopup() {
    signupPopup.style.visibility = "visible";
  }

  _closeSignupPopup() {
    signupPopup.style.visibility = "hidden";
  }
}
