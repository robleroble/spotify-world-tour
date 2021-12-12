import React from "react";

const SpotifyWidget = ({ id }) => {
  //   const uriText = uri.split(":")[1];
  const widgetUri = "https://open.spotify.com/embed/album/" + id;
  // console.log(widgetUri);

  return (
    <div>
      <iframe
        src={widgetUri}
        width="300"
        height="380"
        frameborder="0"
        allow="encrypted-media"
        title="spotify widget"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
