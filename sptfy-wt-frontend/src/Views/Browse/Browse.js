import React from "react";
import Map from "../../Components/Map/Map";
import "./Browse.css";

function Browse() {
  return (
    <div className="Browse">
      <div className="mapContainer">
        <Map />
        {/* <h1>map container</h1> */}
      </div>
      <div className="musicContainer">
        <h1>Music container</h1>
        <p>widget, artist info, country name, etc</p>
      </div>
    </div>
  );
}

export default Browse;
