import React, { useContext } from "react";
import SpotifyWidget from "../SpotifyWidget/SpotifyWidget";
import "./MusicInfo.css";
import FollowIcon from "../FollowIcon/FollowIcon";
import UserContext from "../../Context/UserContext";
import BrowseContext from "../../Context/BrowseContext";

function MusicInfo() {
  let type;
  let BASE_API_TEXT;
  const { user } = useContext(UserContext);
  const { music } = useContext(BrowseContext);

  if (music.type === "album") {
    type = "album";
    BASE_API_TEXT = `music.spotifyMusic.items[0]`;
  } else if (music.type === "playlist") {
    type = "playlist";
    BASE_API_TEXT = `music.spotifyMusic.playlists.playlists.items[0]`;
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
                {user ? <FollowIcon /> : <></>}
              </div>
              <h3>{music.spotifyMusic.items[0].name}</h3>
            </div>

            <div>
              <p>Artist</p>
              <h3>{music.spotifyMusic.items[0].artists[0].name}</h3>
            </div>
          </div>
          <div className="musicInfo-img-container">
            <img
              className="musicInfo-img"
              src={music.spotifyMusic.items[0].images[1].url}
              alt="album cover art"
            />
          </div>
        </div>
        <hr />
        <SpotifyWidget id={music.spotifyMusic.items[0].id} type="album" />
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
                {user ? <FollowIcon /> : <></>}
              </div>
              <h3>{music.spotifyMusic.playlists.playlists.items[0].name}</h3>
            </div>

            <div>
              <p>Description</p>
              <h3>
                {music.spotifyMusic.playlists.playlists.items[0].description}
              </h3>
            </div>
          </div>

          <div className="musicInfo-img-container">
            <img
              className="musicInfo-img"
              src={
                music.spotifyMusic.playlists.playlists.items[0].images[0].url
              }
              alt="album cover art"
            />
          </div>
        </div>
        <hr />
        <SpotifyWidget
          id={music.spotifyMusic.playlists.playlists.items[0].id}
          type="playlist"
        />
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
