// import { CallbackChain } from "../util/callback-chain";
class SideBar {
  _sideBarCurtainEl: HTMLElement = document.querySelector(
    ".side-bar"
  )! as HTMLElement;

  constructor() {
    this._init();
  }

  _init(): void {}

  _populateBoilerPlate(): void {}

  show() {
    const template: string = `
      <li>
        <i class="fas fa-plus-square"></i>사람을 추가하세요!
      </li>`;

    const node: HTMLUListElement = document.createElement(
      "ul"
    )! as HTMLUListElement;
    node.setAttribute("class", "add-new-person");
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
    const template = `로그인 해주세요! <i class="fas fa-plug"></i>`;

    const node = document.createElement("div");
    node.setAttribute("class", "side-bar curtain");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this._sideBarCurtainEl.innerHTML = "";
    this._sideBarCurtainEl.insertBefore(
      node,
      this._sideBarCurtainEl.firstChild
    );

    this._toggleSidebar(false);
  }

  _toggleSidebar(isOn: boolean): void {
    if (isOn) {
      this._sideBarCurtainEl.classList.remove("curtain");
    } else {
      this._sideBarCurtainEl.classList.remove("curtain");
    }
  }
}

export default SideBar;
