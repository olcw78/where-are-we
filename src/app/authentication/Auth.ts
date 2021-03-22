import { EAuthStatus } from "./EAuthStatus";
import LogIn from "./login/LogIn";
import AutoLogin from "./login/AutoLogin";
import LogOut from "./logout/LogOut";
import Signup from "./signup/Signup";
import About from "./about/About";
import TyUpdateAuthUI from "./TyAuthUIUpdater";
import TyUserLoginData from "./login/TyUserLoginData";

class Auth {
  /**
   * Current Authentication Status whether you are logged in or out.
   */
  private authStatus: EAuthStatus;
  currentAuthStatus(): EAuthStatus {
    return this.authStatus;
  }
  /** Login module */
  private logIn: LogIn;
  /** AutoLogin module */
  private autoLogin: AutoLogin;
  /** Logout module */
  private logOut: LogOut;
  /** SignUp module */
  private signUp: Signup;
  /** About module */
  private about: About;
  /**
   *
   */
  private loginFormEl: HTMLFormElement;
  /**
   *
   */
  private logoutFormEl: HTMLFormElement;

  constructor() {
    // initial auth status is logged out
    this.authStatus = EAuthStatus.LOGGED_OUT;

    // init modules
    this.logIn = new LogIn(this.update.bind(this));
    this.autoLogin = new AutoLogin(this.logIn.login);
    this.logOut = new LogOut(this.update.bind(this));
    this.signUp = new Signup();
    this.about = new About();

    this.loginFormEl = document.querySelector(
      ".login-form"
    )! as HTMLFormElement;

    this.logoutFormEl = document.querySelector(
      ".logout-form"
    )! as HTMLFormElement;

    // init logic
    this.autoLogin.autoLogin();
  }

  /**
   * register the callback function for login.
   * @param fn callback function when the user is logged in.
   */
  registerOnLogin(fn: Function): void {
    this.logIn.onLogin?.register(fn);
  }
  /**
   * register the callback function for logout.
   * @param fn callback function when the user is logged out.
   */
  registerOnLogout(fn: Function): void {
    this.logOut.onLogout?.register(fn);
  }
  /**
   * invoke the login callback chain.
   */
  invokeOnLogin(): void {
    this.logIn.onLogin?.invoke();
  }
  /**
   * invoke the logout callback chain.
   */
  invokeOnLogout(): void {
    this.logOut.onLogout?.invoke();
  }
  /**
   *
   * @param status select where to update.
   * @param newAuthUIEl new updated Element that is going to be used.
   */
  private update(status: EAuthStatus, loginResult?: TyUserLoginData): void {
    // private update(status: EAuthStatus, updateAuthEl: HTMLElement): void {
    // 1. update auth status.
    this.authStatus = status;

    this.toggleLoginAndLogoutForm();
    switch (status) {
      case EAuthStatus.LOGGED_IN:
        // update the ui with the login result.
        console.log(loginResult!);
        const { username: userName } = loginResult!;

        // 1. to the updated login ui
        this.logOut.updateIntroductionParagraph(userName);
        // 2. to the about page
        break;

      case EAuthStatus.LOGGED_OUT:
        //
        break;
    }
  }

  private toggleLoginAndLogoutForm(): void {
    this.loginFormEl.classList.toggle("active");
    this.logoutFormEl.classList.toggle("active");
  }
}

export default Auth;

//  Login elements position for after login or logout.
// private authUIPositionEl: HTMLDivElement;
// bind dom
// this.authUIPositionEl = document.getElementById(
//   "login-form-pos"
// )! as HTMLDivElement;
// private update(status: EAuthStatus, updateAuthEl: HTMLElement): void {
//   // 1. update auth status.
//   this.authStatus = status;
//   switch (status) {
//     case EAuthStatus.LOGGED_IN:
//       // this.updateAuthUIHTML(updateAuthEl as HTMLDivElement);
//       // hide the signup button on;
//       // this.signUp.popup.toggleSignupBtn(false);
//       // this.logOut.toggleLogOutBtn(true);
//       break;
//     case EAuthStatus.LOGGED_OUT:
//       // this.updateAuthUIHTML(updateAuthEl as HTMLFormElement);
//       // show the signup button
//       // this.signUp.popup.toggleSignupBtn(true);
//       // this.logOut.toggleLogOutBtn(false);
//       break;
//   }
// }
//
// private updateAuthUIHTML<T extends HTMLElement>(updateAuthEl: T): void {
//   this.authUIPositionEl.innerHTML = "";
//   this.authUIPositionEl.insertBefore(
//     updateAuthEl,
//     this.authUIPositionEl.firstChild
//
