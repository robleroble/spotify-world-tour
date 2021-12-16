import React, { useContext } from "react";
import "./SpotifyToolbar.css";
import BrowseContext from "../../Context/BrowseContext";
import SpotifyCategories from "../SpotifyCategories/SpotifyCategories";

function SpotifyToolbar() {
  const { spotifyToolbarCategory, setSpotifyToolbarCategory, country } =
    useContext(BrowseContext);

  function clickToChangeCategory(e) {
    let btnHTML = e.target.innerHTML;
    if (
      spotifyToolbarCategory === btnHTML ||
      ("Playlists by Genre" === btnHTML && country.code === null)
    ) {
      // do nothing
      return;
    } else {
      setSpotifyToolbarCategory(btnHTML);
      return;
    }
  }

  return (
    <div className="SpotifyToolbar-container">
      <div onClick={clickToChangeCategory} className="SpotifyToolbar">
        <button
          className={
            spotifyToolbarCategory === "New Releases"
              ? "SpotifyToolbar-btn btn-left SpotifyToolbar-selected-btn"
              : "SpotifyToolbar-btn btn-left"
          }
        >
          New Releases
        </button>
        <button
          className={
            spotifyToolbarCategory === "Playlists by Genre"
              ? "SpotifyToolbar-btn btn-middle SpotifyToolbar-selected-btn"
              : "SpotifyToolbar-btn btn-middle"
          }
        >
          Playlists by Genre
        </button>
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
      {spotifyToolbarCategory === "Playlists by Genre" && <SpotifyCategories />}
    </div>
  );
}

export default SpotifyToolbar;
