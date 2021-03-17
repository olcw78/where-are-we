import axios from "axios";

import { baseURL } from "../../util/config";
import CallbackChain from "../../util/callback-chain";
import { EAuthStatus } from "../EAuthStatus";
import TyUpdateAuthUI from "../TyAuthUIUpdater";

type TyLoginCallback = () => Promise<void>;

class LogIn {
  /**
   * Login button that trigger the login process.
   */
  private loginBtnEl: HTMLInputElement;
  /**
   * Triggered on Login
   */
  onLogin: CallbackChain;
  /**
   * Auth UI updater.
   */
  private authUIUpdater: TyUpdateAuthUI;

  constructor(authUIUpdater: TyUpdateAuthUI) {
    this.onLogin = new CallbackChain();

    // bind dom
    this.loginBtnEl = document.getElementById("login")! as HTMLInputElement;

    // bind the login button
    this.loginBtnEl.addEventListener("click", this.login.bind(this));
    this.authUIUpdater = authUIUpdater;
  }

  /**
   * perform login.
   */
  async login(): Promise<void> {
    // 1. request login
    const login = await axios.post(`${baseURL}/login`, {
      /** data */
    });

    // load username from the cookie
    let userName: string = "";
    document.cookie
      .trim()
      .split(";")
      .forEach((cookie: string) => {
        const splitted: string[] = cookie.split("=");
        if (splitted[0]?.trim() === "name") {
          userName = splitted[1]?.trim() ?? "";
        }
      });

    // 2. update the login UI
    // changed form after login
    const template = `<p>안녕하세요 ${userName}님!</p>
      <button class="btn btn--primary">정보</button>
      <button class="btn btn--logout">로그아웃</button>
    `;
    const node: HTMLDivElement = document.createElement("div");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.authUIUpdater(EAuthStatus.LOGGED_IN, node);
    // invoke the onLogin() callback
    this.onLogin.invoke();

    // this._loginBtnEl.submit();
  }
}

export default LogIn;
