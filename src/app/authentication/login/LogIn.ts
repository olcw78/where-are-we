import axios from "axios";

import { BASE_URL } from "../../util/Config";
import CallbackChain from "../../util/Callback-chain";
import { EAuthStatus } from "../EAuthStatus";
import TyUpdateAuthUI from "../TyAuthUIUpdater";
import TyUserLoginData from "./TyUserLoginData";

class Login {
  /**
   * Login button that trigger the login process.
   */
  private loginBtnEl: HTMLInputElement;
  /**
   *
   */
  private loginIDorEmailEl: HTMLInputElement;
  /**
   *
   */
  private loginPasswordEl: HTMLInputElement;
  /**
   * Triggered on Login
   */
  onLogin: CallbackChain;
  /**
   * Auth UI updater.
   */
  private authUIUpdater: TyUpdateAuthUI;

  constructor(authUIUpdater: TyUpdateAuthUI) {
    // instantiate
    this.authUIUpdater = authUIUpdater;
    this.onLogin = new CallbackChain();

    // bind dom
    this.loginBtnEl = <HTMLInputElement>document.querySelector(".login-btn")!;

    this.loginIDorEmailEl = <HTMLInputElement>(
      document.querySelector(".login-id")!
    );

    this.loginPasswordEl = <HTMLInputElement>(
      document.querySelector(".login-password")!
    );

    // bind the login button
    this.loginBtnEl.addEventListener("click", this.performLogin.bind(this));
  }

  /**
   * perform login.
   */
  async performLogin(): Promise<void> {
    const idOrEmail: string = this.loginIDorEmailEl.value ?? "";
    // early return
    if (idOrEmail === "") {
      return;
    }

    // fill up the login info
    const regex: RegExp = /[a-zA-Z0-9.-]+@[a-zA-Z0-9]+.[com|net|ch|kr|gg|.]+/;
    const isEmail: boolean = regex.test(idOrEmail);
    const pw: string = this.loginPasswordEl.value;

    type TyLoginInfo = {
      id?: string;
      string?: string;
      pw: string;
    };

    const loginInfo: TyLoginInfo = Object.assign(
      { pw },
      isEmail ? { email: idOrEmail } : { id: idOrEmail } // push id or Email after check by regex.
    );

    // 1. request login
    const res = await axios.post(`${BASE_URL}/login`, loginInfo);
    // const { token } = res.data;
    const data = Object.assign(
      {},
      { ...res.data.data.user }
    ) as TyUserLoginData;
    console.log(data);

    this.authUIUpdater(EAuthStatus.LOGGED_IN, data);
    // invoke the onLogin() callback
    this.onLogin.invoke();
  }
}

export default Login;

// async login(): Promise<void> {
// 1. request login
// const login = await axios.post(`${baseURL}/login`, {
//   /** data */
// });
// load username from the cookie
// let userName: string = "";
// document.cookie
//   .trim()
//   .split(";")
//   .forEach((cookie: string) => {
//     const splitted: string[] = cookie.split("=");
//     if (splitted[0]?.trim() === "name") {
//       userName = splitted[1]?.trim() ?? "";
//     }
//   });
// 2. update the login UI
// changed form after login
// const template = `
//       <p>안녕하세요 ${userName}님!</p>
//       <button class="btn btn--primary">정보</button>
//       <button type="button" class="btn btn--logout">로그아웃</button>
//     `;
// const node: HTMLDivElement = document.createElement("div");
// node.innerHTML = "";
// node.insertAdjacentHTML("beforeend", template);
// this.authUIUpdater(EAuthStatus.LOGGED_IN, node);
// invoke the onLogin() callback
// this.onLogin.invoke();
//}
//
// toggleLogInBtn(isOn: boolean): void {
//   if (isOn) {
//     this.loginBtnEl.classList.add("active");
//   } else {
//     this.loginBtnEl.classList.remove("active");
//   }
// }
// load username from the cookie
// let userName: string = "";
// document.cookie
//   .trim()
//   .split(";")
//   .forEach((cookie: string) => {
//     const splitted: string[] = cookie.split("=");
//     if (splitted[0]?.trim() === "name") {
//       userName = splitted[1]?.trim() ?? "";
//     }
//   });
