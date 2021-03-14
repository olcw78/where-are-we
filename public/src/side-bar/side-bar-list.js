export class SideBarList {
  _addNewUserBtnEl = document.querySelector(".add-new-person");
  _sideBarContainerEl = document.querySelector(".side-bar");

  constructor() {
    this._addNewUserBtnEl.addEventListener("click", e => this.addNewUser(e));
  }

  addNewUser(e) {
    e.preventDefault();
    
    const template = ``;


    e.stopPropagation();
  }
}
