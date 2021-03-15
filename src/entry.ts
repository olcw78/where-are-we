import "regenerator-runtime";
import "./hot-reload";

// feature import
import MapLoader from "./map/map-loader";
import Curtain from "./util/curtain";
import Login from "./authentication/login";
import Signup from "./authentication/signup";
import Footer from "./footer/footer";
import SideBar from "./side-bar/side-bar";
import MainTitle from "./main-title/main-title";

window.addEventListener("load", MapLoader.onLoadWebsite);

// add html templates - footer
Footer.init();

// main title toggler
const title = new MainTitle();

// add login features
const login = new Login();

login.registerOnLogin(() => {
  Curtain.toggleCurtain("map", true);
  Curtain.toggleCurtain("side-bar", true);
});

login.registerOnLogout(() => {
  Curtain.toggleCurtain("map", false);
  Curtain.toggleCurtain("side-bar", false);
});

// add signup features
// TODO: no more operations with Signup, except for showing/hiding signup screen
const signup = new Signup();

// sidebar initialization
const sideBar = new SideBar();
login.registerOnLogin(() => {
  sideBar.show();
});
login.registerOnLogout(() => {
  sideBar.hide();
});
