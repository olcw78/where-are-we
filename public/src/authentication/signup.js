// import { CallbackChain } from "../util/callback-chain";
class Signup {
  _closeSignupPopupEl = document.querySelector(".signup-popup-close");
  _signupPopupEl = document.querySelector(".signup-popup-bg");
  _openSignupBtnEl = document.querySelector(".btn--signup");
  _cancelBtnEl = document.getElementById("signup-cancel");

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

  show() {
    this._signupPopupEl.classList.add("active");
    // TODO: When the user signup, then the user happen to want to automatically login!
  }

  hide() {
    this._signupPopupEl.classList.remove("active");
  }
}

export default Signup;
