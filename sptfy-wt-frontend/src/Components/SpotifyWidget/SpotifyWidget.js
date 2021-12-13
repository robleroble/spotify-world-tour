import React from "react";

const SpotifyWidget = ({ type, id }) => {
  //   const uriText = uri.split(":")[1];
  const widgetUri = "https://open.spotify.com/embed/" + type + "/" + id;
  console.log(widgetUri);

  return (
    <div>
      <iframe
        src={widgetUri}
        width="100%"
        height="500px"
        allow="encrypted-media"
        title="spotify widget"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
