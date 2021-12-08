import React from "react";
import "./SpotifyToolbar.css";

function SpotifyToolbar() {
  return (
    <div className="SpotifyToolbar">
      <button className="SpotifyToolbar-btn btn-left">New Releases</button>
      <button className="SpotifyToolbar-btn btn-middle">Music Genre</button>
      <button className="SpotifyToolbar-btn btn-right">button 3</button>
    </div>
  );
}

export default SpotifyToolbar;
