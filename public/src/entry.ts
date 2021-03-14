import "regenerator-runtime";
// feature import
import UI from "./ui";
import MapLoader from "./map/map-loader";

declare var module: {
  hot: {
    accept(path?: string, callback?: () => void): void;
  };
};

if (module.hot) {
  module.hot.accept();
}

// init map
MapLoader.load()?.then(() => {
  UI.init();
});
