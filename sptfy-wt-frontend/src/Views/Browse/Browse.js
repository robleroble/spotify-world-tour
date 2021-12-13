import React, { useContext, useEffect } from "react";
import Map from "../../Components/Map/Map";
import MusicInfo from "../../Components/MusicInfo/MusicInfo";
import SpotifyToolbar from "../../Components/SpotifyToolbar/SpotifyToolbar";
import "./Browse.css";
import SWTApi from "../../API/SWTApi";
import UserContext from "../../Context/UserContext";
import BrowseContext from "../../Context/BrowseContext";

function Browse() {
  const { accessToken, ccToken, user } = useContext(UserContext);
  const { music, setMusic, spotifyToolbarCategory, country } =
    useContext(BrowseContext);

  useEffect(() => {
    getMusic(country.code, user);
  }, [country, spotifyToolbarCategory]);

  async function getMusic(country, user) {
    let token;
    if (user === null) {
      token = ccToken;
    } else {
      token = accessToken;
    }
    let spotifyMusic;
    let type;
    if (spotifyToolbarCategory === "New Releases") {
      spotifyMusic = await SWTApi.getAlbum(token, country);
      type = "album";
    } else if (spotifyToolbarCategory === "Featured Playlists") {
      spotifyMusic = await SWTApi.getFeaturedPlaylist(token, country);
      type = "playlist";
    }
    setMusic({ type, spotifyMusic });
  }

  // When a country is not selected, sidebar has helpful info
  function musicHelp() {
    return (
      <div className="musicHelp-container">
        <h3 className="musicHelp-text">
          Navigate around the map and click a country to start listening!
        </h3>
      </div>
    );
  }

  // When country is selected, spotify widget and music info displayed
  function musicInfo() {
    return (
      <div className="musicInfo">
        <div className="countryInfo">
          <h1 className="countryTitle">{country.name}</h1>
          <button className="shuffle-btn">Shuffle {music.type}s!</button>
        </div>
        <hr className="musicInfo-hr" />
        <MusicInfo music={music} />
      </div>
    );
  }

  return (
    <div className="Browse">
      <div className="mapContainer">
        <SpotifyToolbar />
        <Map />
      </div>
      <div className="musicContainer">{music ? musicInfo() : musicHelp()}</div>
    </div>
  );
}

export default Browse;
