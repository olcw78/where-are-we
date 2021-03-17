import { EAuthStatus } from "./EAuthStatus";
import LogIn from "./login/LogIn";
import AutoLogin from "./login/AutoLogin";
import LogOut from "./logout/LogOut";

class Auth {
  /**
   * Current Authentication Status whether you are logged in or out.
   */
  private authStatus: EAuthStatus;
  get currentAuthStatus(): EAuthStatus {
    return this.authStatus;
  }
  /** Login module */
  private logIn: LogIn;
  /** AutoLogin module */
  private autoLogin: AutoLogin;
  /** Logout module */
  private logOut: LogOut;
  /**
   * Login elements position for after login or logout.
   */
  private authUIPositionEl: HTMLDivElement;
  /**
   * Signup button when
   */
  private openSignupBtnEl: HTMLButtonElement;

  constructor() {
    // initial auth status is logged out
    this.authStatus = EAuthStatus.LOGGED_OUT;

    // init modules
    this.logIn = new LogIn(this.update);
    this.autoLogin = new AutoLogin(this.logIn.login);
    this.logOut = new LogOut(this.update);

    // bind dom
    this.authUIPositionEl = document.getElementById(
      "login-form-pos"
    )! as HTMLDivElement;

    this.openSignupBtnEl = document.querySelector(
      ".btn--signup"
    )! as HTMLButtonElement;

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
   * @param authStatus
   * @param newAuthUIEl
   */
  private update(authStatus: EAuthStatus, newAuthUIEl: HTMLElement): void {
    // 1. update auth status.
    this.authStatus = authStatus;

    switch (authStatus) {
      case EAuthStatus.LOGGED_IN:
        this.updateAuthUIHTML(newAuthUIEl as HTMLDivElement);
        // hide the signup button on;
        this.toggleSignupBtn(false);
        break;

      case EAuthStatus.LOGGED_OUT:
        this.updateAuthUIHTML(newAuthUIEl as HTMLFormElement);
        // show the signup button
        this.toggleSignupBtn(true);
        break;
    }
  }

  private updateAuthUIHTML(newAuthUIEl: HTMLElement): void {
    this.authUIPositionEl.innerHTML = "";
    this.authUIPositionEl.insertBefore(
      newAuthUIEl as HTMLDivElement,
      this.authUIPositionEl.firstChild
    );
  }

  /**
   * Toggle the visibility of the Signup button so you don't need to
   * register again when you login and logout
   * @param {*} isOn
   */
  private toggleSignupBtn(isOn: boolean): void {
    if (isOn) {
      this.openSignupBtnEl.classList.add("active");
    } else {
      this.openSignupBtnEl.classList.remove("active");
    }
  }
}

export default Auth;
