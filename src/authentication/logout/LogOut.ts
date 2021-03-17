import CallbackChain from "../../util/callback-chain";
import { EAuthStatus } from "../EAuthStatus";
import TyUpdateAuthUI from "../TyAuthUIUpdater";

class LogOut {
  /** */
  private logoutBtnEl: HTMLButtonElement;

  /** */
  onLogout: CallbackChain;
  /** */
  private authUIUpdater: TyUpdateAuthUI;

  constructor(authUIUpdater: TyUpdateAuthUI) {
    // instantiate
    this.authUIUpdater = authUIUpdater;
    this.onLogout = new CallbackChain();

    // bind dom
    this.logoutBtnEl = document.querySelector(
      ".logout-btn"
    )! as HTMLButtonElement;

    // bind the logout button
    this.logoutBtnEl.addEventListener("click", this.logOut.bind(this));
  }

  private logOut(): void {
    this.authUIUpdater(EAuthStatus.LOGGED_OUT);
    // invoke the onLogout() callback
    this.onLogout.invoke();
  }
}

export default LogOut;

// private logOut(): void {
// changed form after logout
// const template = `
//       <label
//           >자동 로그인<input type="checkbox" id="check-auto-login"
//       /></label>
//       <label>아이디(E-mail)</label>
//       <input
//         type="text"
//         placeholder="아이디(or E-mail) 입력해듀데요..."
//         id="login-id"
//         autofocus
//       />
//       <label>비밀번호</label>
//       <input
//         type="password"
//         placeholder="비밀번호 입력해듀데요..."
//         id="login-password"
//       />
//       <button
//         type="button"
//         class="btn btn--primary"
//         id="login-button"
//       >로그인</button>
//     `;
// const node: HTMLFormElement = document.createElement("form");
// node.setAttribute("id", "login-form-pos");
// node.innerHTML = "";
// node.insertAdjacentHTML("beforeend", template);
//   this.authUIUpdater(EAuthStatus.LOGGED_OUT);
//   // invoke the onLogout() callback
//   this.onLogout.invoke();
// }
// toggleLogOutBtn(isOn: boolean): void {
//   if (isOn) {
//     this.logoutBtnEl.classList.add('active');
//   } else {
//     this.logoutBtnEl.classList.remove('active');
//   }
// }
