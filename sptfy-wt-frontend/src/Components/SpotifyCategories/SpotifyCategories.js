import React, { useContext } from "react";
import BrowseContext from "../../Context/BrowseContext";
import "./SpotifyCategories.css";

function SpotifyCategories() {
  const { categories } = useContext(BrowseContext);
  return (
    <div className="SpotifyCategories">
      <button>&#8592;</button>
      <h4>SpotifyCategories</h4>
      <button>&#8594;</button>
    </div>
  );
}

export default SpotifyCategories;
