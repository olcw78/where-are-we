class Curtain {
  static toggleCurtain(positionClassname: string, isConnected: boolean): void {
    const pos: HTMLElement = document.querySelector(
      `.${positionClassname}`
    )! as HTMLElement;

    isConnected
      ? pos.classList.remove("curtain")
      : pos.classList.add("curtain");
  }
}

export default Curtain;
