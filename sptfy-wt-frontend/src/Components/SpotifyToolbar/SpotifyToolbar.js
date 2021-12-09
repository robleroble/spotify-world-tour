import React from "react";
import "./SpotifyToolbar.css";

function SpotifyToolbar() {
  return (
    <div className="SpotifyToolbar">
      <button className="SpotifyToolbar-btn btn-left">New Releases</button>
      <button className="SpotifyToolbar-btn btn-middle">
        Playlists by Genre
      </button>
      <button className="SpotifyToolbar-btn btn-right">
        Featured Playlists
      </button>
    </div>
  );
}

export default SpotifyToolbar;
