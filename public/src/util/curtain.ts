class Curtain {
  static toggleCurtain(positionClassname: string, isConnected: boolean): void {
    const pos: HTMLElement = document.querySelector(
      `.${positionClassname}`
    )! as HTMLElement;
    
    if (isConnected) {
      pos?.classList.remove("curtain");
    } else {
      pos?.classList.add("curtain");
    }
  }
}

export default Curtain;
