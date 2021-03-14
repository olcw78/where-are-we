import { CallbackChain } from "../util/callback-chain";

class Login {
  _loginBtnEl: HTMLInputElement = document.getElementById(
    "login"
  )! as HTMLInputElement;

  _loginLayoutPositionEl: HTMLDivElement = document.getElementById(
    "login-form-pos"
  )! as HTMLDivElement;

  _openSignupBtnEl: HTMLButtonElement = document.querySelector(
    ".btn--signup"
  )! as HTMLButtonElement;

  _checkAutoLoginEl: HTMLInputElement = document.getElementById(
    "check-auto-login"
  )! as HTMLInputElement;

  // _loginBtn;
  _logoutBtnEl: HTMLButtonElement | undefined;

  _isAutoLoginChecked: boolean = false;

  _onLogin: CallbackChain = new CallbackChain();

  get onLogin(): CallbackChain {
    return this._onLogin;
  }

  _onLogout: CallbackChain = new CallbackChain();

  get onLogout(): CallbackChain {
    return this._onLogout;
  }

  constructor() {
    this._init();
  }

  _init(): void {
    // 1. init op
    // retrieve checkbox from saved status
    this._isAutoLoginChecked =
      localStorage.getItem("isAutoLoginChecked") === "yes";
    // update the current state of auto login
    this._checkAutoLoginEl.checked = this._isAutoLoginChecked;

    // 2. bind
    // bind the login button
    this._loginBtnEl.addEventListener("click", this._logIn.bind(this));

    // bind the check auto login checkbox and set to local storage
    this._checkAutoLoginEl.addEventListener(
      "change",
      this._isCheckedAutoLogin.bind(this)
    );
  }

  _isCheckedAutoLogin(): void {
    // update whether isAutoLoginChecked form the checkbox
    this._isAutoLoginChecked = this._checkAutoLoginEl.checked;

    // also for the localStorage -> no need to make secure
    localStorage.setItem(
      "isAutoLoginChecked",
      this._checkAutoLoginEl.checked ? "yes" : "no"
    );
  }

  autoLogin(): void {
    // Can't go further without isAutoLoginChecked
    if (!this._isAutoLoginChecked) {
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
      this._logIn();
    }
  }

  _logIn(): void {
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
    const template: string = `<p>안녕하세요 ${userName}님!</p>
      <button class="btn btn--primary">정보</button>
      <button class="btn btn--logout">로그아웃</button>
    `;

    const node: HTMLDivElement = document.createElement("div");
    // const node = document.createElement("form");
    // node.setAttribute("action", "/me");
    // node.setAttribute("method", "POST");
    // node.setAttribute("id", "login");

    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this._loginLayoutPositionEl.innerHTML = "";
    this._loginLayoutPositionEl.insertBefore(
      node,
      this._loginLayoutPositionEl.firstChild
    );

    // register again the logout button
    // TODO: need to implement the about page
    this._logoutBtnEl ??= document.querySelector(
      ".btn--logout"
    )! as HTMLButtonElement;
    this._logoutBtnEl.addEventListener("click", this._logOut.bind(this));

    // invoke the onLogin() callback
    this._onLogin.invoke();

    // this._loginBtnEl.submit();

    // hide the signup button on;
    this._toggleSignupBtn(false);
  }

  _logOut(): void {
    // changed form after logout
    const template: string = `
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

    this._loginLayoutPositionEl.innerHTML = "";
    this._loginLayoutPositionEl.insertBefore(
      node,
      this._loginLayoutPositionEl.firstChild
    );

    // update whether the auto login is checked or not
    this._checkAutoLoginEl.checked = this._isAutoLoginChecked;

    // invoke the onLogout() callback
    this._onLogout.invoke();

    // show the signup button
    this._toggleSignupBtn(true);
  }

  /**
   * Toggle the visibility of the Signup button so you don't need to
   * register again when you login and logout
   * @param {*} isOn
   */
  _toggleSignupBtn(isOn: boolean): void {
    if (isOn) {
      this._openSignupBtnEl.classList.add("active");
    } else {
      this._openSignupBtnEl.classList.remove("active");
    }
  }
}

export default Login;
