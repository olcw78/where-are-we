import { CallbackChain } from "../util/callback-chain";
export class SideBar {
  _sideBarCurtainEl = document.querySelector(".side-bar");

  show() {
    const template = `
      <p>Logined!</p>
    `;

    const node = document.createElement("div");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this._sideBarCurtainEl.innerHTML = "";
    this._sideBarCurtainEl.insertBefore(
      node,
      this._sideBarCurtainEl.firstChild
    );

    this._toggleSidebar(true);
  }

  hide() {
    const template = `Need to login! <i class="fas fa-plug"></i>`;

    const node = document.createElement("div");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this._sideBarCurtainEl.innerHTML = "";
    this._sideBarCurtainEl.insertBefore(
      node,
      this._sideBarCurtainEl.firstChild
    );

    this._toggleSidebar(false);
  }

  _toggleSidebar(isOn) {
    if (isOn) {
      this._sideBarCurtainEl.classList.remove("curtain");
    } else {
      this._sideBarCurtainEl.classList.remove("curtain");
    }
  }
}
