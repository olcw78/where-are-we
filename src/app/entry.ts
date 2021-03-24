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

const map = new MapLoader();
// window.addEventListener("load", map.onLoadWebsite);

// add html templates - footer
Footer.init();

// main title toggler
const mainTitle = new MainTitle();
// side bar
const sideBar = new SideBar();

// add auth(login/logout/signup) features
const auth = new Auth();

auth.registerOnLogin(() => {
  map.show();
  sideBar.show();
});

auth.registerOnLogout(() => {
  map.hide();
  sideBar.hide();
});
