import axios from "axios";
import { baseURL } from "../../util/config";
import SignupPopup from "../../signup/SignupPopup";
import TyUserSignupData from "../logout/TyUserSignupData";
import FormChecker from "../../util/Form-checker";

class Signup {
  /**
   *
   */
  private readonly signupPopup: SignupPopup;
  get popup(): SignupPopup {
    return this.signupPopup;
  }
  /**
   *
   */
  private readonly signupIDEl: HTMLInputElement;
  /**
   *
   */
  private readonly signupPasswordEl: HTMLInputElement;
  /**
   *
   */
  private readonly signupPasswordConfirmEl: HTMLInputElement;
  /**
   *
   */
  private readonly signupUserNameEl: HTMLInputElement;
  /**
   *
   */
  private readonly signupEmailEl: HTMLInputElement;
  /**
   *
   */
  private readonly signupPhoneNumEl: HTMLInputElement;

  constructor() {
    // instantiate
    this.signupPopup = new SignupPopup();

    // bind dom
    this.signupIDEl = document.querySelector(".signup-id")! as HTMLInputElement;

    this.signupPasswordEl = document.querySelector(
      ".signup-password"
    )! as HTMLInputElement;

    this.signupPasswordConfirmEl = document.querySelector(
      ".signup-passwordConfirm"
    )! as HTMLInputElement;

    this.signupUserNameEl = document.querySelector(
      ".signup-username"
    )! as HTMLInputElement;

    this.signupEmailEl = document.querySelector(
      ".signup-email"
    )! as HTMLInputElement;

    this.signupPhoneNumEl = document.querySelector(
      ".signup-phonenum"
    )! as HTMLInputElement;
  }

  async signUp(): Promise<void> {
    // 1. Check Form
    if (!FormChecker.isValidID(this.signupIDEl.textContent)) {
      // check ID
    }

    if (!FormChecker.isValidUserName(this.signupUserNameEl.textContent)) {
      // check userName
    }

    if (!FormChecker.isValidEmail(this.signupEmailEl.textContent)) {
      // check email
    }

    if (!FormChecker.isValidPhoneNumber(this.signupPhoneNumEl.textContent)) {
      // check phone number
    }

    // check passwordConfirm is same as password
    if (!FormChecker.isValidPassword(this.signupPasswordEl.textContent)) {
      // check password
    }

    const data = {};

    const signUpReq = await axios.post(`${baseURL}/signup`, data);
  }

  isPasswordConfirmSame(password: string): boolean {
    return true;
  }
}

export default Signup;
