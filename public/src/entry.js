// core import
import { async } from "regenerator-runtime";

// feature import
import { initZoomLevel } from "./util/cfg";
import { Footer } from "./footer/footer";

import { KakaoMap } from "./kakao-map/kakao-map.js";
import { KakaoMapZoom } from "./kakao-map/kakao-map-zoom.js";
import { KakaoMapMarker } from "./kakao-map/kakao-map-marker.js";
import { KakaoMapDrag } from "./kakao-map/kakao-map-drag.js";
import { Curtain } from "./util/curtain";

// import { SidebarCurtain } from "./side-bar/side-bar-curtain";
//
// IIFE async
//
(async function () {
  // add html templates
  Footer.init();

  Curtain.toggleCurtain("map", "map--curtain", true);
  Curtain.toggleCurtain("side-bar", "side-bar--curtain", false);

  // init map
  const map = await KakaoMap.load(initZoomLevel);

  // init zoom
  const zoom = new KakaoMapZoom(initZoomLevel);
  zoom.init(map);

  // init map marker
  const marker = new KakaoMapMarker();
  marker.init(map);

  // init map drag
  const drag = new KakaoMapDrag();
  drag.init(map);
})();
