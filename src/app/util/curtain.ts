/**
 * Control Curtain component by it is whther logged in or out.
 */
class Curtain {
  /**
   * registered curtain cache.
   */
  private readonly curtainPositionElArr: Map<string, HTMLElement>;

  constructor() {
    this.curtainPositionElArr = new Map();
  }
  /**
   *
   * @param newCurtainElClassName
   */
  registerCurtains(...newCurtainElClassName: string[]): void {
    if (!newCurtainElClassName) {
      return;
    }

    newCurtainElClassName.forEach((curtain) => {
      this.curtainPositionElArr.set(
        curtain,
        document.querySelector(`.${curtain}`)! as HTMLElement
      );
    });
  }

  /**
   * toggle curtain.
   * @param curtainElClassName a class name of the target curtain.
   * @param isConnected is logged in or out?
   */
  setCurtainVisibility(curtainElClassName: string, isConnected: boolean): void {
    if (curtainElClassName === "") {
      return;
    }
    if (isConnected) {
      this.curtainPositionElArr
        .get(curtainElClassName)!
        .classList.remove("curtain");
    } else {
      this.curtainPositionElArr
        .get(curtainElClassName)!
        .classList.add("curtain");
    }
  }
}

export default Curtain;
