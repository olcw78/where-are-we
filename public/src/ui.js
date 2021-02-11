import { Curtain } from "./util/curtain";
import { Login } from "./authentication/login";
import { Signup } from "./authentication/signup";
import { Footer } from "./footer/footer";

export class UI {
  static init() {
    // add html templates - footer
    Footer.init();

    // curtain

    // add login features
    const login = new Login(
      function onLogin() {
        Curtain.toggleCurtain("map", true);
        Curtain.toggleCurtain("side-bar", true);
        console.log("curtain off!");
      },
      function onLogout() {
        Curtain.toggleCurtain("map", false);
        Curtain.toggleCurtain("side-bar", false);
        console.log("curtain on!");
      }
    );

    login.autoLogin();

    // add signup features
    const signup = new Signup();
  }
}
