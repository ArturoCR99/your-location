//Get Map
var map = new maplibregl.Map({
  container: "map",
  style:
    "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
  center: [-100.21599384628087, 25.67425366590146],
  zoom: 12,
});

export default map;
