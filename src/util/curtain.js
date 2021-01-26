export class Curtain {
  static toggleCurtain(positionClassname, curtainClassname, isConnected) {
    if (typeof isConnected !== 'boolean') {
      console.error("isConnected must be boolean");
    }

    if (typeof positionClassname !== 'string') {
      console.error("position must be string");
    }

    if (typeof curtainClassname !== 'string') {
      console.error("curtain must be string");
    }

    const curtainPosition = document.querySelector(positionClassname);

    if (isConnected) {
      curtainPosition.classList.add(positionClassname);
      curtainPosition.classList.remove(curtainClassname);
    } else {
      curtainPosition.classList.remove(positionClassname);
      curtainPosition.classList.add(curtainClassname);
    }
  }
}