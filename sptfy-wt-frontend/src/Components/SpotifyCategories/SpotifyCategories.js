import React, { useContext, useState } from "react";
import BrowseContext from "../../Context/BrowseContext";
import "./SpotifyCategories.css";
import { chunks } from "chunk-array";

function SpotifyCategories() {
  const [categoryChunk, setCategoryChunk] = useState(0);
  const { categories } = useContext(BrowseContext);
  let chunkedCategories = chunks(categories, 10);
  console.log(chunkedCategories);
  function forwardCategory() {
    if (categoryChunk === chunkedCategories.length - 1) {
      setCategoryChunk(0);
    } else {
      setCategoryChunk(categoryChunk + 1);
    }
  }

  function backwardCategory() {
    if (categoryChunk === 0) {
      setCategoryChunk(chunkedCategories.length - 1);
    } else {
      setCategoryChunk(categoryChunk - 1);
    }
  }
  return (
    <div className="SpotifyCategories">
      <button onClick={backwardCategory}>&#8592;</button>
      <div className="spotifyCategory-chunks">
        {chunkedCategories[categoryChunk].map((cat) => (
          <div className="catName" key={cat.id}>
            <p>{cat.name}</p>
          </div>
        ))}
      </div>
      <button onClick={forwardCategory}>&#8594;</button>
    </div>
  );
}

export default SpotifyCategories;
