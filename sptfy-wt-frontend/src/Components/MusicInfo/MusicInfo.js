import React from "react";
import SpotifyWidget from "../SpotifyWidget/SpotifyWidget";

function MusicInfo({ music }) {
  console.log("Music info");
  console.log(music);

  function nullMusic() {
    return (
      <>
        <div>
          <h1>No music loaded</h1>
        </div>
      </>
    );
  }

  function yesMusic() {
    return (
      <>
        <div>
          <h1>Album name: {music.items[0].name}</h1>
          <SpotifyWidget id={music.items[0].id} />
        </div>
      </>
    );
  }

  return <div>{music === null ? nullMusic() : yesMusic()}</div>;
}

export default MusicInfo;
