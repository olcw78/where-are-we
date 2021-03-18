import axios from "axios";
import { baseURL } from "../../util/config";
import SignupPopup from "../../signup/SignupPopup";
import TyUserSignupData from "../logout/TyUserSignupData";

class Signup {
  /**
   *
   */
  private signupPopup: SignupPopup;
  get popup(): SignupPopup {
    return this.signupPopup;
  }
  /**
   *
   */
  private signupIDEl: HTMLInputElement;
  /**
   *
   */
  private signupPasswordEl: HTMLInputElement;
  /**
   *
   */
  private signupPasswordConfirmEl: HTMLInputElement;
  /**
   *
   */
  private signupUserNameEl: HTMLInputElement;
  /**
   *
   */
  private signupEmailEl: HTMLInputElement;
  /**
   *
   */
  private signupPhoneNumEl: HTMLInputElement;

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

    const data = {};
    
    const signUpReq = await axios.post(`${baseURL}/signup`, data);
  }

  isPasswordConfirmSame(password: string): boolean {
    return 
  }
}

export default Signup;
