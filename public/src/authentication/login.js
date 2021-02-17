export class Login {
  _loginBtnEl = document.getElementById("login");
  _loginLayoutPositionEl = document.getElementById("login-form-pos");
  _openSignupBtnEl = document.querySelector(".btn--signup");
  _checkAutoLoginEl = document.getElementById("check-auto-login");

  _loginBtn;
  _logoutBtnEl;

  _onLogin;
  _onLogout;

  _isAutoLoginChecked = false;

  constructor(onLogin, onLogout) {
    // set checkbox from saved status
    this._isAutoLoginChecked =
      localStorage.getItem("isAutoLoginChecked") === "yes" ? true : false;
    this._checkAutoLoginEl.checked = this._isAutoLoginChecked;

    this._bind();
    this._onLogin = onLogin;
    this._onLogout = onLogout;
  }

  _bind() {
    this._loginBtnEl.addEventListener("click", e => this._logIn(e));
    // check auto login checkbox and set to local storage
    this._checkAutoLoginEl.addEventListener("change", e =>
      this._isCheckedAutoLogin(e)
    );
  }

  _isCheckedAutoLogin(e) {
    e.preventDefault();
    
    this._isAutoLoginChecked = this._checkAutoLoginEl.checked;
    localStorage.setItem(
      "isAutoLoginChecked",
      this._checkAutoLoginEl.checked ? "yes" : "no"
    );
    e.stopPropagation();
  }

  autoLogin() {
    if (!this._isAutoLoginChecked) {
      return;
    }

    let secret;
    const cookies = document.cookie;
    cookies
      .trim()
      .split(";")
      .forEach(cookie => {
        const splitted = cookie.split("=");
        if (splitted[0].trim() === "jwt") {
          secret = splitted[1].trim();
        }
      });

    if (secret !== undefined) {
      this._logIn();
    }
  }

  _logIn(e) {
    console.log(e);
    e.preventDefault();

    let userName;
    document.cookie
      .trim()
      .split(";")
      .forEach(cookie => {
        const splitted = cookie.split("=");
        if (splitted[0].trim() === "name") {
          userName = splitted[1].trim();
        }
      });

    const template = `<p>안녕하세요 ${userName}님!</p>
      <button class="btn btn--primary">정보</button>
      <button class="btn btn--logout">로그아웃</button>
    `;

    const node = document.createElement("div");
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
    this._logoutBtnEl ??= document.querySelector(".btn--logout");
    this._logoutBtnEl.addEventListener("click", e => this._logOut(e));

    this._onLogin();

    // this._loginBtnEl.submit();
    this._toggleSignupBtn(false);
    e.stopPropagation();
  }

  _logOut(e) {
    e.preventDefault();

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

    const node = document.createElement("form");
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
    this._checkAutoLoginEl.checked = this._isAutoLoginChecked;

    this._onLogout();
    this._toggleSignupBtn(true);
    e.stopPropagation();
  }

  _toggleSignupBtn(isOn) {
    if (isOn) {
      this._openSignupBtnEl.classList.add("active");
    } else {
      this._openSignupBtnEl.classList.remove("active");
    }
  }
}
