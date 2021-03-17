import "regenerator-runtime";
import "./hot-reload";

// feature import
import MapLoader from "./map/MapLoader";

import Curtain from "./util/curtain";
import Footer from "./footer/Footer";
import MainTitle from "./mainTitle/MainTitle";
import SideBar from "./side-bar/side-bar";

import Auth from "./authentication/Auth";

window.addEventListener("load", MapLoader.onLoadWebsite);

// add html templates - footer
Footer.init();

// main title toggler
const mainTitle = new MainTitle();
// side bar
const sideBar = new SideBar();

// add auth(login/logout/signup) features
const auth = new Auth();

auth.registerOnLogin(() => {
  Curtain.toggleCurtain("map", true);
  Curtain.toggleCurtain("side-bar", true);
});
auth.registerOnLogout(() => {
  Curtain.toggleCurtain("map", false);
  Curtain.toggleCurtain("side-bar", false);
});

// sidebar initialization
auth.registerOnLogin(() => sideBar.show());
auth.registerOnLogout(() => sideBar.hide());
