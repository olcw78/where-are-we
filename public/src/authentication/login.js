export class Login {
  _loginBtnEl = document.getElementById("login");
  _loginLayoutPositionEl = document.getElementById("auth");
  _logoutBtnEl;

  _onLogin;
  _onLogout;

  constructor(onLogin, onLogout) {
    this._bind();
    this._onLogin = onLogin;
    this._onLogout = onLogout;
  }

  _bind() {
    this._loginBtnEl.addEventListener("submit", this._logIn.bind(this));
  }

  autoLogin() {
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
    // e.preventDefault();

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
    this._logoutBtnEl.addEventListener("click", this._logOut.bind(this));
    this._onLogin();
  }

  _logOut(e) {
    e.preventDefault();
    const template = `<label for="id">아이디</label>
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
    const signupBtn = `<button class="btn btn--signup">가입</button>`;

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
    node.insertAdjacentHTML("afterend", signupBtn);
    this._onLogout();
  }
}
