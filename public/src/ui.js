import { Curtain } from "./util/curtain";
import { Login } from "./authentication/login";
import { Signup } from "./authentication/signup";
import { Footer } from "./footer/footer";

export class UI {
  static init() {
    // add html templates - footer
    Footer.init();

    // curtain
    Curtain.toggleCurtain("map", "map--curtain", false);
    Curtain.toggleCurtain("side-bar", "side-bar--curtain", false);

    // add login features
    const login = new Login();

    // add signup features
    const signup = new Signup();
  }
}
