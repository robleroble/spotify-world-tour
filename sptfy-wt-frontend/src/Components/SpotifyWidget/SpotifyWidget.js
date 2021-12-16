import React from "react";
import "./SpotifyWidget.css";

const SpotifyWidget = ({ type, id }) => {
  const widgetUri = "https://open.spotify.com/embed/" + type + "/" + id;

  return (
    <div className="spotifyWidget-container">
      <iframe
        className="spotifyWidget"
        src={widgetUri}
        width="100%"
        allow="encrypted-media"
        title="spotify widget"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
