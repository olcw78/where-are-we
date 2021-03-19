import axios from "axios";
import { baseURL } from "../../util/config";
import SignupPopup from "../../signup/SignupPopup";
import TyUserSignupData from "../logout/TyUserSignupData";
import FormChecker from "../../util/Form-checker";

class Signup {
  /**
   * Signup popup holder
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
    this.signupEmailEl.addEventListener("change", (e: any): void => {
      console.log(e.target.value);
    });

    this.signupPhoneNumEl = document.querySelector(
      ".signup-phonenum"
    )! as HTMLInputElement;

    this.signupPopup.getSubmitSignupBtnEl.addEventListener(
      "click",
      this.signUp.bind(this)
    );
  }

  async signUp(): Promise<void> {
    // TODO: need to checkout if the html input pattern doesn't work for the
    // legacy browsers, in that case, what should I do for a plan B.

    // 1. Check Form
    // if (!FormChecker.isValidID(this.signupIDEl.value)) {
    //   // check ID
    //   console.log(`Invalid ID! ${this.signupIDEl.value}`);
    // }

    // if (!FormChecker.isValidUserName(this.signupUserNameEl.value)) {
    //   // check userName
    //   console.log(`Invalid user name! ${this.signupUserNameEl.value}`);
    // }

    // if (!FormChecker.isValidEmail(this.signupEmailEl.value)) {
    //   // check email
    //   console.log(`Invalid email! ${this.signupEmailEl.value}`);
    // }

    // if (!FormChecker.isValidPhoneNumber(this.signupPhoneNumEl.value)) {
    //   // check phone number
    //   console.log(`Invalid phone number! ${this.signupPhoneNumEl.value}`);
    // }

    // // check passwordConfirm is same as password
    // if (
    //   this.isPasswordConfirmSame(
    //     this.signupPasswordEl.value,
    //     this.signupPasswordConfirmEl.value
    //   )
    // ) {
    //   // check password double times
    // }
    // if (!FormChecker.isValidPassword(this.signupPasswordEl.value)) {
    //   // check password
    //   console.log(`Invalid password! ${this.signupPasswordEl.value}`);
    // }

    const data: TyUserSignupData = {
      email: this.signupEmailEl.value!.trim(),
      id: this.signupIDEl.value!.trim(),
      username: this.signupUserNameEl.value!.trim(),
      password: this.signupPasswordEl.value!.trim(),
      phonenum: this.signupPhoneNumEl.value!.trim(),
    };

    await axios.post(`${baseURL}/signup`, data);
  }

  isPasswordConfirmSame(
    password: string | null,
    passwordConfirm: string | null
  ): boolean {
    return true;
  }
}

export default Signup;
