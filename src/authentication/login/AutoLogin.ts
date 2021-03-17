import { EAuthStatus } from "../EAuthStatus";

class AutoLogin {
  /** */
  private autoLoginCheckBoxEl: HTMLInputElement;
  /**
   * Auth UI updater.
   */
  private loginCallback: () => Promise<void>;

  constructor(loginCallback: () => Promise<void>) {
    this.autoLoginCheckBoxEl = document.getElementById(
      "check-auto-login"
    )! as HTMLInputElement;
    // retrieve and update checkbox from saved status of the auto login
    this.autoLoginCheckBoxEl.checked =
      localStorage.getItem("isAutoLoginChecked") === "yes";

    // bind the check auto login checkbox and set to local storage
    this.autoLoginCheckBoxEl.addEventListener(
      "change",
      this.commitAutoLogin.bind(this)
    );
    this.loginCallback = loginCallback;
  }
  /**
   *
   */
  private commitAutoLogin(): void {
    // also for the localStorage -> no need to make secure
    localStorage.setItem(
      "isAutoLoginChecked",
      this.autoLoginCheckBoxEl.checked ? "yes" : "no"
    );
  }
  /**
   *
   */
  updateAutoLogin(): void {
    // update whether the auto login is checked or not
    this.autoLoginCheckBoxEl.checked = !this.autoLoginCheckBoxEl.checked;
  }

  /**
   *
   * @returns void
   */
  async autoLogin(): Promise<void> {
    // Can't go further without isAutoLoginChecked
    if (!this.autoLoginCheckBoxEl.checked) {
      return;
    }

    // check the jwt exists only
    // TODO: need to add the actual authentication with jwt
    let secret = "";
    const cookieStr: string = document.cookie;
    cookieStr
      .trim()
      .split(";")
      .forEach((cookie: string) => {
        const splitted: string[] = cookie.split("=");
        if (splitted[0]?.trim() === "jwt") {
          secret = splitted[1]?.trim() ?? "";
        }
      });

    // login when you find the secret
    if (secret !== "") {
      await this.loginCallback();
    }
  }
}

export default AutoLogin;
