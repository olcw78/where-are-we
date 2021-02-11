export class Login {
  loginBtnEl = document.getElementById("login");
  loginLayoutPositionEl = document.getElementById("auth");
  logoutBtnEl;

  constructor() {
    this._bind();
  }

  _bind() {
    this.loginBtnEl.addEventListener("submit", this._logIn.bind(this));
  }

  _logIn(e) {
    e.preventDefault();
    let userName;
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
      const splitted = cookie.split("=");
      if (splitted[0] === "name") {
        userName = splitted[1];
      }
    });

    const template = `<p>안녕하세요 ${userName}님!</p>
      <button class="btn btn--primary">정보</button>
      <button class="btn btn--logout">로그아웃</button>
    `;

    const node = document.createElement("span");
    // const node = document.createElement("form");
    // node.setAttribute("action", "/me");
    // node.setAttribute("method", "POST");
    // node.setAttribute("id", "login");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.loginLayoutPositionEl.innerHTML = "";
    this.loginLayoutPositionEl.insertBefore(
      node,
      this.loginLayoutPositionEl.firstChild
    );
    this.logoutBtnEl ??= document.querySelector(".btn--logout");
    this.logoutBtnEl.addEventListener("click", this._logOut.bind(this));
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
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.loginLayoutPositionEl.innerHTML = "";
    this.loginLayoutPositionEl.insertBefore(
      node,
      this.loginLayoutPositionEl.firstChild
    );
    node.insertAdjacentHTML("afterend", signupBtn);
  }
}
