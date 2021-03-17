import "regenerator-runtime";
import "./hot-reload";

// feature import
import MapLoader from "./map/map-loader";
import Curtain from "./util/curtain";
import Footer from "./footer/footer";
import MainTitle from "./main-title/main-title";
import Auth from "./authentication/Auth";
// import Signup from "./authentication/signup/Signup";
import SideBar from "./side-bar/side-bar";

window.addEventListener("load", MapLoader.onLoadWebsite);

// add html templates - footer
Footer.init();

// main title toggler
const mainTitle = new MainTitle();

// add login features
const auth = new Auth();

auth.registerOnLogin(() => {
  Curtain.toggleCurtain("map", true);
  Curtain.toggleCurtain("side-bar", true);
});

auth.registerOnLogout(() => {
  Curtain.toggleCurtain("map", false);
  Curtain.toggleCurtain("side-bar", false);
});

// add signup features
// TODO: no more operations with Signup, except for showing/hiding signup screen
// const signup = new Signup();

// sidebar initialization
const sideBar = new SideBar();
auth.registerOnLogin(() => sideBar.show());
auth.registerOnLogout(() => sideBar.hide());
