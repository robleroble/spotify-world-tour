import React, { useContext } from "react";
import SpotifyWidget from "../SpotifyWidget/SpotifyWidget";
import "./MusicInfo.css";
import BrowseContext from "../../Context/BrowseContext";
import MusicShuffler from "../MusicShuffler/MusicShuffler";

function MusicInfo() {
  let type;
  const { music } = useContext(BrowseContext);

  if (music.type === "album") {
    type = "album";
  } else if (music.type === "playlist") {
    type = "playlist";
  }

  // if music type is an album (vs a playlist)
  function albumInfo() {
    return (
      <>
        <div className="musicInfo-info">
          <div className="musicInfo-album-artist">
            <div>
              <div className="musicInfo-name">
                <p>Album</p>
              </div>
              <h3>{music.spotifyMusic.items[`${music.musicIdx}`].name}</h3>
            </div>

            <div>
              <p>Artist</p>
              <h3>
                {music.spotifyMusic.items[`${music.musicIdx}`].artists[0].name}
              </h3>
            </div>
          </div>
          <div className="musicInfo-img-container">
            <img
              className="musicInfo-img"
              src={music.spotifyMusic.items[`${music.musicIdx}`].images[1].url}
              alt="album cover art"
            />
          </div>
        </div>

        <hr />
        <SpotifyWidget
          id={music.spotifyMusic.items[`${music.musicIdx}`].id}
          type="album"
        />
        <hr />
        <MusicShuffler />
      </>
    );
  }

  // Need logic to check if we get an empty list of playlists...
  function playlistInfo() {
    return (
      <>
        <div className="musicInfo-info">
          <div className="musicInfo-album-artist">
            <div>
              <div className="musicInfo-name">
                <p>Playlist</p>
              </div>
              <h3>
                {
                  music.spotifyMusic.playlists.playlists.items[
                    `${music.musicIdx}`
                  ].name
                }
              </h3>
            </div>

            <div>
              <p>Description</p>
              <h5>
                {
                  music.spotifyMusic.playlists.playlists.items[
                    `${music.musicIdx}`
                  ].description
                }
              </h5>
            </div>
          </div>

          <div className="musicInfo-img-container">
            <img
              className="musicInfo-img"
              src={
                music.spotifyMusic.playlists.playlists.items[
                  `${music.musicIdx}`
                ].images[0].url
              }
              alt="album cover art"
            />
          </div>
        </div>

        <hr />
        <SpotifyWidget
          id={
            music.spotifyMusic.playlists.playlists.items[`${music.musicIdx}`].id
          }
          type="playlist"
        />
        <hr />
        <MusicShuffler />
      </>
    );
  }
  return (
    <div className="musicInfo">
      {type === "album" ? albumInfo() : playlistInfo()}
    </div>
  );
}

export default MusicInfo;
