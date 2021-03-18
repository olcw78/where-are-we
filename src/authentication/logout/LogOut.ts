import CallbackChain from "../../util/callback-chain";
import { EAuthStatus } from "../EAuthStatus";
import TyUpdateAuthUI from "../TyAuthUIUpdater";

/**
 * LogOut module which controls the state of being logged in.
 */
class LogOut {
  /**
   * Logout btn.
   */
  private logoutBtnEl: HTMLButtonElement;
  /**
   * Introduction paragraph after logged in.
   */
  private introductionParagraphEl: HTMLParagraphElement;
  /**
   * Triggered callback chain on logout.
   */
  onLogout: CallbackChain;
  /**
   * Auth UI Updator.
   */
  private authUIUpdater: TyUpdateAuthUI;

  constructor(authUIUpdater: TyUpdateAuthUI) {
    // instantiate
    this.authUIUpdater = authUIUpdater;
    this.onLogout = new CallbackChain();

    // bind dom
    this.logoutBtnEl = document.querySelector(
      ".logout-btn"
    )! as HTMLButtonElement;

    this.introductionParagraphEl = document.querySelector(
      ".introduction"
    )! as HTMLParagraphElement;

    // bind the logout button
    this.logoutBtnEl.addEventListener("click", this.logOut.bind(this));
  }

  private logOut(): void {
    this.authUIUpdater(EAuthStatus.LOGGED_OUT);
    // invoke the onLogout() callback
    this.onLogout.invoke();
  }

  updateIntroductionParagraph(content: string): void {
    const template = `<p class="introduction--username">${content.trim()} !</p>`;
    const introductionNode = document.createElement("p");
    introductionNode.innerHTML = "안녕하세요";
    introductionNode.setAttribute("class", "introduction");
    introductionNode.insertAdjacentHTML("beforeend", template);
    this.introductionParagraphEl.innerHTML = "";
    this.introductionParagraphEl.insertBefore(
      introductionNode,
      this.introductionParagraphEl.firstChild
    );
    // this.introductionParagraphEl.textContent = `안녕하세요 ${content.trim()} 님`;
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
