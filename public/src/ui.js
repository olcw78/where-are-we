import { Curtain } from "./util/curtain";
import { Signup } from "./component/signup";
import { Footer } from "./footer/footer";

export class UI {  
  static init() {
    // add html templates
    Footer.init();

    // curtain
    Curtain.toggleCurtain("map", "map--curtain", false);
    Curtain.toggleCurtain("side-bar", "side-bar--curtain", false);

    // add signup features
    const signup = new Signup();
  }
}