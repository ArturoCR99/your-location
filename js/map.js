//Map Style
const style = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap Contributors",
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm", // This must match the source key above
    },
  ],
};

//Get Map
var map = new maplibregl.Map({
  container: "map",
  style: style,
  center: [-100.21599384628087, 25.67425366590146],
  zoom: 12,
});

export default map;
