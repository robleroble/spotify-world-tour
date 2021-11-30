import React from "react";

const SpotifyWidget = ({ uri }) => {
  //   const uriText = uri.split(":")[1];
  const nextUriText = "https://open.spotify.com/embed/album/" + uri;
  console.log(nextUriText);

  return (
    <div>
      <iframe
        src="https://open.spotify.com/embed/album/6yTozUPMJplNbIMrm1mlBL"
        width="300"
        height="380"
        frameborder="0"
        allow="encrypted-media"
      ></iframe>{" "}
    </div>
  );
};

export default SpotifyWidget;
