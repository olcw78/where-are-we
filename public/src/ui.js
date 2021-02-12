import { Curtain } from "./util/curtain";
import { Login } from "./authentication/login";
import { Signup } from "./authentication/signup";
import { Footer } from "./footer/footer";

export class UI {
  static init() {
    // add html templates - footer
    Footer.init();

    // add login features
    const login = new Login(
      function onLogin() {
        Curtain.toggleCurtain("map", true);
        Curtain.toggleCurtain("side-bar", true);
      },
      function onLogout() {
        Curtain.toggleCurtain("map", false);
        Curtain.toggleCurtain("side-bar", false);
      }
    );

    login.autoLogin();

    // add signup features
    const signup = new Signup();
  }
}
