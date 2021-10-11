// Spotify green #1DB954
// Black #191414

const worldviewFilter =
  // [
  //     "any",
  //     ["==", "all", ["get", "worldview"]],
  //     ["in", "US", ["get", "worldview"]]
  // ];

  // This creates blank green map with no disputed area issues
  [
    "all",
    ["==", ["get", "disputed"], "false"],
    ["match", ["get", "worldview"], ["all", "US"], true, false],
  ];

const clearMapLayer = {
  id: "country-boundaries",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
    worldview: "USA",
  },
  filter: worldviewFilter,
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-outline-color": "#168d40",
    "fill-color": "#ffffff",
    "fill-opacity": 0,
  },
};

const selectedCountryLayer = {
  id: "selected-country",
  source: {
    type: "vector",
    url: "mapbox://mapbox.country-boundaries-v1",
  },
  filter: worldviewFilter,
  "source-layer": "country_boundaries",
  type: "fill",
  paint: {
    "fill-outline-color": "#168d40",
    "fill-color": "#1DB954",
    "fill-opacity": 0.3,
  },
  layout: {
    visibility: "none",
  },
};

export { clearMapLayer, selectedCountryLayer, worldviewFilter };
