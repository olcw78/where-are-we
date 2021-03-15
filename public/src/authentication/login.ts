import CallbackChain from "../util/callback-chain";

class Login {
  /**
   *
   */
  private loginBtnEl: HTMLInputElement;
  /**
   *
   */
  private loginLayoutPositionEl: HTMLDivElement;
  /** */
  private openSignupBtnEl: HTMLButtonElement;
  /** */
  private checkAutoLoginEl: HTMLInputElement;
  /** */
  private logoutBtnEl: HTMLButtonElement | undefined;
  /** */
  private isAutoLoginChecked: boolean = false;
  /** */
  private onLogin: CallbackChain;
  /** */
  private onLogout: CallbackChain;

  /**
   *
   * @param fn
   */
  registerOnLogin(fn: Function): void {
    this.onLogin.register(fn);
  }
  /**
   *
   * @param fn
   */
  registerOnLogout(fn: Function): void {
    this.onLogout.register(fn);
  }

  constructor() {
    // dom op
    this.loginBtnEl = document.getElementById("login")! as HTMLInputElement;

    this.loginLayoutPositionEl = document.getElementById(
      "login-form-pos"
    )! as HTMLDivElement;

    this.openSignupBtnEl = document.querySelector(
      ".btn--signup"
    )! as HTMLButtonElement;

    this.checkAutoLoginEl = document.getElementById(
      "check-auto-login"
    )! as HTMLInputElement;

    this.onLogin = new CallbackChain();
    this.onLogout = new CallbackChain();

    // retrieve checkbox from saved status
    this.isAutoLoginChecked =
      localStorage.getItem("isAutoLoginChecked") === "yes";
    // update the current state of auto login
    this.checkAutoLoginEl.checked = this.isAutoLoginChecked;

    // bind the login button
    this.loginBtnEl.addEventListener("click", this.logIn.bind(this));

    // bind the check auto login checkbox and set to local storage
    this.checkAutoLoginEl.addEventListener("change", this.checkAutoLoginAndSet.bind(this));

    // auto login!
    this.autoLogin();
  }

  /**
   *
   */
  private checkAutoLoginAndSet(): void {
    // update whether isAutoLoginChecked form the checkbox
    this.isAutoLoginChecked = this.checkAutoLoginEl.checked;

    // also for the localStorage -> no need to make secure
    localStorage.setItem(
      "isAutoLoginChecked",
      this.checkAutoLoginEl.checked ? "yes" : "no"
    );
  }

  /**
   *
   * @returns
   */
  private autoLogin(): void {
    // Can't go further without isAutoLoginChecked
    if (!this.isAutoLoginChecked) {
      return;
    }

    // check the jwt exists only
    // TODO: need to add the actual authentication with jwt
    let secret: string = "";
    const cookieStr: string = document.cookie;
    cookieStr
      .trim()
      .split(";")
      .forEach((cookie: string) => {
        const splitted: string[] = cookie.split("=");
        if (splitted[0]?.trim() === "jwt") {
          secret = splitted[1]?.trim() ?? "";
        }
      });

    // login when you find the secret
    if (secret === "") {
      this.logIn();
    }
  }

  /**
   *
   */
  private logIn(): void {
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

    // changed form after login
    const template = `<p>안녕하세요 ${userName}님!</p>
      <button class="btn btn--primary">정보</button>
      <button class="btn btn--logout">로그아웃</button>
    `;

    const node: HTMLDivElement = document.createElement("div");

    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.loginLayoutPositionEl.innerHTML = "";
    this.loginLayoutPositionEl.insertBefore(
      node,
      this.loginLayoutPositionEl.firstChild
    );

    // register again the logout button
    // TODO: need to implement the about page
    this.logoutBtnEl ??= document.querySelector(
      ".btn--logout"
    )! as HTMLButtonElement;
    this.logoutBtnEl.addEventListener("click", this.logOut.bind(this));

    // invoke the onLogin() callback
    this.onLogin.invoke();

    // this._loginBtnEl.submit();

    // hide the signup button on;
    this.toggleSignupBtn(false);
  }

  private logOut(): void {
    // changed form after logout
    const template = `
          <label
            >자동 로그인<input type="checkbox" id="check-auto-login"
          /></label>
          <label for="id">아이디</label>
            <input
              type="text"
              name="id"
              id="input-id"
              placeholder="아이디 입력해듀데요..."
              autofocus
            />

            <label for="pw">비밀번호</label>
            <input
              type="password"
              name="pw"
              id="input-pw"
              placeholder="비밀번호 입력해듀데요..."
            />

            <button type="submit" name="login" class="btn btn--primary">
              로그인
            </button>`;

    const node: HTMLFormElement = document.createElement("form");
    node.setAttribute("action", "/login");
    node.setAttribute("method", "POST");
    node.setAttribute("id", "login");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.loginLayoutPositionEl.innerHTML = "";
    this.loginLayoutPositionEl.insertBefore(
      node,
      this.loginLayoutPositionEl.firstChild
    );

    // update whether the auto login is checked or not
    this.checkAutoLoginEl.checked = this.isAutoLoginChecked;

    // invoke the onLogout() callback
    this.onLogout.invoke();

    // show the signup button
    this.toggleSignupBtn(true);
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

export default Login;
