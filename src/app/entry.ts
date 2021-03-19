// import "regenerator-runtime";
// import "./hot-reload";

// feature import
import MapLoader from "./map/MapLoader";
// import MapLock from "./map/MapLock";

import Curtain from "./util/curtain";
import Footer from "./footer/Footer";
import MainTitle from "./mainTitle/MainTitle";
import SideBar from "./side-bar/side-bar";

import Auth from "./authentication/Auth";

window.addEventListener("load", MapLoader.onLoadWebsite);

// add html templates - footer
Footer.init();

const curtain = new Curtain();
curtain.registerCurtains("map");
curtain.registerCurtains("side-bar");

// main title toggler
const mainTitle = new MainTitle();
// side bar
const sideBar = new SideBar();

// add auth(login/logout/signup) features
const auth = new Auth();

auth.registerOnLogin(() => {
  curtain.setCurtainVisibility("map", true);
  curtain.setCurtainVisibility("side-bar", true);
});

auth.registerOnLogout(() => {
  curtain.setCurtainVisibility("map", false);
  curtain.setCurtainVisibility("side-bar", false);
});

// sidebar initialization
auth.registerOnLogin(() => sideBar.show());
auth.registerOnLogout(() => sideBar.hide());
