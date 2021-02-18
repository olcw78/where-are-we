import { Curtain } from "./util/curtain";
import { Login } from "./authentication/login";
import { Signup } from "./authentication/signup";
import { Footer } from "./footer/footer";
import { SideBar } from "./side-bar/side-bar";

export class UI {
  static init() {
    // add html templates - footer
    Footer.init();

    // add login features
    const login = new Login();

    login.onLogin.add(() => {
      Curtain.toggleCurtain("map", true);
      Curtain.toggleCurtain("side-bar", true);
    });

    login.onLogout.add(() => {
      Curtain.toggleCurtain("map", false);
      Curtain.toggleCurtain("side-bar", false);
    });

    login.autoLogin();

    // add signup features
    const signup = new Signup();

    //
    const sideBar = new SideBar();
  }
}
