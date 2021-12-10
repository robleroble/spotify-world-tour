import React, { useRef, useState, useEffect, useContext } from "react";

import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { clearMapLayer, selectedCountryLayer } from "./MapStyles.js";
import "./Map.css";
import UserContext from "../../Context/UserContext";

mapboxgl.accessToken =
  "pk.eyJ1IjoibnNhbmRlIiwiYSI6ImNrdWFudnphMTBpbmkybm8zOXUzYXlsZnMifQ.7d4a8ZfjVEARvZRA-spWNg";

function Map({ selectCountry }) {
  const [lng, setLng] = useState(-34.5034);
  const [lat, setLat] = useState(16.0569);
  const [zoom, setZoom] = useState(2.27);

  const mapContainer = useRef("");
  const map = useRef(null);
  const { accessToken } = useContext(UserContext);

  /** Map Initialization on component mount */
  // adds clear layer to map
  // updates lat, long, zoom when user moves
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [lng, lat],
      zoom: zoom,
    });
    // adds clear map layer
    map.current.on("load", function () {
      // add a clear layer with country boundaries
      map.current.addLayer(clearMapLayer, "country-label");
      //
      map.current.addLayer(selectedCountryLayer, "country-label");
    });

    // highlights clicked on countries
    map.current.on("click", "country-boundaries", function (e) {
      console.log(e.features[0].properties.iso_3166_1);

      map.current.setLayoutProperty(
        "selected-country",
        "visibility",
        "visible"
      );
      let country = e.features[0].properties.iso_3166_1;
      selectCountry(country);

      map.current.setFilter("selected-country", ["==", "iso_3166_1", country]);

      // map centers on click event
      map.current.flyTo({
        center: e.lngLat,
        speed: 0.7,
      });
    });

    // changes cursor when hovering over layer
    map.current.on("mouseenter", "country-boundaries", (e) => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    // updates state (lat, long, zoom) as user scrolls around
    map.current.on("move", function () {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    // this comment removes error message in browser
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mapContainer} className="map-container"></div>;
}

export default Map;
