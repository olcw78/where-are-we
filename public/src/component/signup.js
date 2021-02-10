export class Signup {
  closeSignupPopupElement = document.querySelector(".signup-popup-close");
  signupPopup = document.querySelector(".signup-popup-bg");
  signupBtn = document.querySelector(".btn--sub");

  constructor() {
    this.closeSignupPopupElement.addEventListener(
      "click",
      this.closeSignupPopup.bind(this)
    );

    this.signupBtn.addEventListener("click", this.openSignupPopup.bind(this));
  }

  openSignupPopup() {
    this.signupPopup?.classList.add("active");
  }

  closeSignupPopup() {
    this.signupPopup?.classList.remove("active");
  }
}
