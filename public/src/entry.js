// feature import
import { UI } from "./ui";
import { MapLoader } from "./kakao-map/map-loader";

// init map
MapLoader.load().then(() => {
  UI.init();
});
