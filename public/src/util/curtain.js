export class Curtain {
  static toggleCurtain(positionClassname, isConnected) {
    if (typeof isConnected !== "boolean") {
      console.error("isConnected must be boolean");
    }

    if (typeof positionClassname !== "string") {
      console.error("position must be string");
    }

    const pos = document.querySelector(`.${positionClassname}`);
    if (isConnected) {
      pos.classList.remove("curtain");
    } else {
      pos.classList.add("curtain");
    }
  }
}
