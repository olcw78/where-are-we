/**
 * Control Curtain component by it is whther logged in or out.
 */
class Curtain {
  /**
   * registered curtain cache.
   */
  curtainPositionElArr: HTMLElement[];

  constructor() {
    this.curtainPositionElArr = [];
  }
  /**
   * 
   * @param newCurtainElClassName 
   */
  registerCurtains(...newCurtainElClassName: string[]) {
    this.curtainPositionElArr.push(
      document.querySelector(`.${newCurtainElClassName}`)! as HTMLElement
    );
  }

  /**
   * toggle curtain.
   * @param curtainElClassName a class name of the target curtain.
   * @param isConnected is logged in or out?
   */
  setCurtainVisibility(
    curtainElClassName: string,
    isConnected: boolean
  ): void {
    isConnected
      ? this.curtainPositionElArr[curtainElClassName].classList.remove(
          "curtain"
        )
      : this.curtainPositionElArr[curtainElClassName].classList.add(
          "curtain"
        );
  }
}

export default Curtain;
