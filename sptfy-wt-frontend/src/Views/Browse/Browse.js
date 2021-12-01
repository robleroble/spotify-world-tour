import React, { useState, useContext } from "react";
import Map from "../../Components/Map/Map";
import MusicInfo from "../../Components/MusicInfo/MusicInfo";
import "./Browse.css";
import SWTApi from "../../API/SWTApi";
import UserContext from "../../Context/UserContext";

function Browse() {
  const [music, setMusic] = useState(null);
  const [country, setCountry] = useState(null);
  const { accessToken } = useContext(UserContext);

  // logic - when country (in state) changes, call for new music
  async function getMusic(country, accessToken) {
    let music = await SWTApi.getAlbum(accessToken, country);
    setMusic(music);
    console.log(music);
  }

  async function selectCountry(countryCode) {
    if (countryCode !== country) {
      await getMusic(countryCode, accessToken);
      setCountry(countryCode);
    }
  }

  return (
    <div className="Browse">
      <div className="mapContainer">
        <Map selectCountry={selectCountry} />
      </div>
      <div className="musicContainer">
        <MusicInfo music={music} />
        <h1>Music container</h1>
        <p>widget, artist info, country name, etc</p>
      </div>
    </div>
  );
}

export default Browse;
