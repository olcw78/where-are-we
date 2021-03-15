class SideBar {
  private sideBarCurtainEl: HTMLElement;

  constructor() {
    this.sideBarCurtainEl = document.querySelector(".side-bar")! as HTMLElement;
  }

  // _populateBoilerPlate(): void {}

  show() {
    const template = `
      <li>
        <i class="fas fa-plus-square"></i>사람을 추가하세요!
      </li>`;

    const node: HTMLUListElement = document.createElement(
      "ul"
    )! as HTMLUListElement;

    node.setAttribute("class", "add-new-person");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.sideBarCurtainEl.innerHTML = "";
    this.sideBarCurtainEl.insertBefore(node, this.sideBarCurtainEl.firstChild);

    this.toggleSidebar(true);
  }

  hide() {
    const template = `로그인 해주세요! <i class="fas fa-plug"></i>`;

    const node = document.createElement("div");
    node.setAttribute("class", "side-bar curtain");
    node.innerHTML = "";
    node.insertAdjacentHTML("beforeend", template);

    this.sideBarCurtainEl.innerHTML = "";
    this.sideBarCurtainEl.insertBefore(node, this.sideBarCurtainEl.firstChild);

    this.toggleSidebar(false);
  }

  private toggleSidebar(isOn: boolean): void {
    if (isOn) {
      this.sideBarCurtainEl.classList.remove("curtain");
    } else {
      this.sideBarCurtainEl.classList.remove("curtain");
    }
  }
}

export default SideBar;
