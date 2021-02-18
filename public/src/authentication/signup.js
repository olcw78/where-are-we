import {CallbackChain } from '../util/callback-chain';

export class Signup {
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
    this._closeSignupPopupEl.addEventListener(
      "click",
      this.closeSignupPopup.bind(this)
    );

    this._cancelBtnEl.addEventListener(
      "click",
      this.closeSignupPopup.bind(this)
    );

    // when you touch other places
    // this.signupPopupEl.addEventListener(
    //   "click",
    //   this.closeSignupPopup.bind(this)
    // );

    // signup open button
    this._openSignupBtnEl.addEventListener(
      "click",
      this.openSignupPopup.bind(this)
    );
  }

  openSignupPopup() {
    this._signupPopupEl.classList.add("active");
  }

  closeSignupPopup() {
    this._signupPopupEl.classList.remove("active");
  }
}
