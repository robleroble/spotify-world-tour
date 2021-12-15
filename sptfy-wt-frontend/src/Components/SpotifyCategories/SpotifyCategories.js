import React, { useContext, useState } from "react";
import BrowseContext from "../../Context/BrowseContext";
import "./SpotifyCategories.css";
import { chunks } from "chunk-array";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

function SpotifyCategories() {
  const [categoryChunk, setCategoryChunk] = useState(0);
  const { categories, setCategory } = useContext(BrowseContext);
  let chunkedCategories = chunks(categories, 10);
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

  function setPlaylistCategory(e) {
    setCategory(e.target.id);
  }
  return (
    <div className="SpotifyCategories">
      <button className="spotifyCategories-btn" onClick={backwardCategory}>
        <IoMdArrowDropleftCircle size={30} />
      </button>
      <div className="spotifyCategory-chunks">
        {chunkedCategories[categoryChunk].map((cat) => (
          <div onClick={setPlaylistCategory} className="catName" key={cat.id}>
            <p id={cat.id}>{cat.name}</p>
          </div>
        ))}
      </div>
      <button className="spotifyCategories-btn" onClick={forwardCategory}>
        <IoMdArrowDroprightCircle size={30} />
      </button>
    </div>
  );
}

export default SpotifyCategories;
