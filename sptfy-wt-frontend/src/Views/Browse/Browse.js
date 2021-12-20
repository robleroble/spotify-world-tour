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
  const {
    music,
    setMusic,
    spotifyToolbarCategory,
    country,
    setCategories,
    category,
  } = useContext(BrowseContext);

  useEffect(() => {
    getMusic(country.code, user);
  }, [country, spotifyToolbarCategory, category]);

  useEffect(() => {
    // load categories
    getCategories(country.code);
  }, [country]);

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
    } else if (spotifyToolbarCategory === "Playlists by Genre") {
      spotifyMusic = await SWTApi.getPlaylistsByCategory(
        token,
        country,
        category
      );
      type = "playlist";
      console.log(spotifyMusic);
    }
    setMusic({ type, spotifyMusic });
  }

  async function getCategories(country) {
    let token;
    if (user === null) {
      token = ccToken;
    } else {
      token = accessToken;
    }
    let categories;
    if (country === null) {
      console.log("no country");
      categories = await SWTApi.getCategories(token, country);
    } else {
      console.log("yes country");
      categories = await SWTApi.getCategories(token, country);
    }
    setCategories(categories.categories.categories.items);
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
        </div>
        <hr className="musicInfo-hr" />
        <MusicInfo />
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
