import React, { useState, useContext } from "react";
import Map from "../../Components/Map/Map";
import MusicInfo from "../../Components/MusicInfo/MusicInfo";
import SpotifyToolbar from "../../Components/SpotifyToolbar/SpotifyToolbar";
import "./Browse.css";
import SWTApi from "../../API/SWTApi";
import UserContext from "../../Context/UserContext";

function Browse() {
  const [music, setMusic] = useState(null);
  const [country, setCountry] = useState(null);
  const { accessToken, ccToken, user } = useContext(UserContext);

  // logic - when country (in state) changes, call for new music
  async function getMusic(country, accessToken) {
    let music = await SWTApi.getAlbum(accessToken, country);
    setMusic(music);
    console.log(music);
  }

  async function selectCountry(countryCode) {
    let token;
    if (user === null) {
      token = ccToken;
    } else {
      token = accessToken;
    }
    if (countryCode !== country) {
      await getMusic(countryCode, token);
      setCountry(countryCode);
    }
  }

  function musicHelp() {
    return (
      <div className="musicHelp-container">
        <h3 className="musicHelp-text">
          Navigate around the map and click a country to start listening!
        </h3>
      </div>
    );
  }

  function musicInfo() {
    return (
      <div className="musicInfo">
        <div className="countryInfo">
          <h2>COUNTRY</h2>
          <button>Get more music!</button>
        </div>
        <MusicInfo music={music} />
      </div>
    );
  }

  return (
    <div className="Browse">
      <div className="mapContainer">
        <SpotifyToolbar />
        <Map selectCountry={selectCountry} />
      </div>
      <div className="musicContainer">{music ? musicInfo() : musicHelp()}</div>
    </div>
  );
}

export default Browse;
