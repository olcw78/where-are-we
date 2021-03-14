// import { CallbackChain } from "../util/callback-chain";
class Signup {
  _closeSignupPopupEl: HTMLDivElement = document.querySelector(
    ".signup-popup-close"
  )! as HTMLDivElement;

  _signupPopupEl: HTMLDivElement = document.querySelector(
    ".signup-popup-bg"
  )! as HTMLDivElement;

  _openSignupBtnEl: HTMLButtonElement = document.querySelector(
    ".btn--signup"
  )! as HTMLButtonElement;

  _cancelBtnEl: HTMLButtonElement = document.getElementById(
    "signup-cancel"
  )! as HTMLButtonElement;

  // _onSignupSucceed = new CallbackChain();
  // get onSignupSucceed() {
  //   return this._onSignupSucceed;
  // }

  constructor() {
    // signup close button
    this._closeSignupPopupEl.addEventListener("click", this.hide.bind(this));

    this._cancelBtnEl.addEventListener("click", this.hide.bind(this));

    // when you touch other places
    // this.signupPopupEl.addEventListener(
    //   "click",
    //   this.closeSignupPopup.bind(this)
    // );

    // signup open button
    this._openSignupBtnEl.addEventListener("click", this.show.bind(this));
  }

  show(): void {
    this._signupPopupEl.classList.add("active");
    // TODO: When the user signup, then the user happen to want to automatically login!
  }

  hide(): void {
    this._signupPopupEl.classList.remove("active");
  }
}

export default Signup;
