import React from "react";
import SpotifyWidget from "../SpotifyWidget/SpotifyWidget";
import "./MusicInfo.css";

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
        <div className="musicInfo">
          <div className="musicInfo-info">
            <div className="musicInfo-album-artist">
              <div>
                <p>Album</p>
                <h3>{music.items[0].name}</h3>
              </div>
              <div>
                <p>Artist</p>
                <h3>{music.items[0].artists[0].name}</h3>
              </div>
            </div>

            <div className="musicInfo-img-container">
              <img
                className="musicInfo-img"
                src={music.items[0].images[1].url}
                alt="album cover art"
              />
            </div>
          </div>
          <SpotifyWidget id={music.items[0].id} />
        </div>
      </>
    );
  }

  return <div>{music === null ? nullMusic() : yesMusic()}</div>;
}

export default MusicInfo;
