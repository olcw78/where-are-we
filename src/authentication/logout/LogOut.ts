import CallbackChain from "../../util/callback-chain";
import { EAuthStatus } from "../EAuthStatus";
import TyUpdateAuthUI from "../TyAuthUIUpdater";

class LogOut {
  /** */
  private logoutBtnEl: HTMLButtonElement | undefined;

  /** */
  onLogout: CallbackChain;
  /** */
  private authUIUpdater: TyUpdateAuthUI;

  constructor(authUIUpdater: TyUpdateAuthUI) {
    this.logoutBtnEl ??= document.querySelector(
      ".btn--logout"
    )! as HTMLButtonElement;
    this.logoutBtnEl.addEventListener("click", this.logOut.bind(this));

    this.onLogout = new CallbackChain();
    this.authUIUpdater = authUIUpdater;
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
    this.authUIUpdater(EAuthStatus.LOGGED_OUT, node);

    // invoke the onLogout() callback
    this.onLogout.invoke();
  }
}

export default LogOut;
