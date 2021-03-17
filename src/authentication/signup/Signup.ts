import SignupPopup from "../../signup/SignupPopup";

class Signup {
  private signupPopup: SignupPopup;
  get popup(): SignupPopup {
    return this.signupPopup;
  }

  constructor() {
    this.signupPopup = new SignupPopup();
  }

  async signUp(): Promise<void> {}
}

export default Signup;
