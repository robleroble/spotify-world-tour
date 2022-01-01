import React, { useContext, useState } from "react";
import "./SpotifyToolbar.css";
import BrowseContext from "../../Context/BrowseContext";
import SpotifyCategories from "../SpotifyCategories/SpotifyCategories";
import SelectCountryError from "../SelectCountryError/SelectCountryError";
function SpotifyToolbar() {
  const {
    spotifyToolbarCategory,
    setSpotifyToolbarCategory,
    country,
    showCountrySelectedError,
    setShowCountrySelectedError,
    category,
    setCategory,
  } = useContext(BrowseContext);

  function clickToChangeCategory(e) {
    let btnHTML = e.target.innerHTML;
    if (
      spotifyToolbarCategory === btnHTML ||
      ("Playlists by Genre" === btnHTML && country.code === null)
    ) {
      setShowCountrySelectedError(true);
      return;
    } else if (
      btnHTML === "Playlists by Genre" &&
      category === null &&
      country.code !== null
    ) {
      console.log("hello");
      setCategory("toplists");
      setSpotifyToolbarCategory(btnHTML);
    } else {
      setSpotifyToolbarCategory(btnHTML);

      return;
    }
  }

  return (
    <div className="SpotifyToolbar-container">
      <div onClick={clickToChangeCategory} className="SpotifyToolbar">
        <div className="btn-container">
          <button
            className={
              spotifyToolbarCategory === "New Releases"
                ? "SpotifyToolbar-btn btn-left SpotifyToolbar-selected-btn"
                : "SpotifyToolbar-btn btn-left"
            }
          >
            New Releases
          </button>
        </div>
        <div className="btn-container">
          <button
            className={
              spotifyToolbarCategory === "Playlists by Genre"
                ? "SpotifyToolbar-btn btn-middle SpotifyToolbar-selected-btn"
                : "SpotifyToolbar-btn btn-middle"
            }
          >
            Playlists by Genre
          </button>
        </div>
        <div className="btn-container">
          <button
            className={
              spotifyToolbarCategory === "Featured Playlists"
                ? "SpotifyToolbar-btn btn-right SpotifyToolbar-selected-btn"
                : "SpotifyToolbar-btn btn-right"
            }
          >
            Featured Playlists
          </button>
        </div>
      </div>
      {spotifyToolbarCategory === "Playlists by Genre" && <SpotifyCategories />}
      {showCountrySelectedError && <SelectCountryError />}
    </div>
  );
}

export default SpotifyToolbar;
