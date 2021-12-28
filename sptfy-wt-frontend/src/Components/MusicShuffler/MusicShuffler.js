import React, { useContext } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";
import "../MusicShuffler/MusicShuffler.css";
import BrowseContext from "../../Context/BrowseContext";

function MusicShuffler() {
  const { music, setMusic } = useContext(BrowseContext);

  function incrementMusicIdx() {
    let newIdx;
    if (music.musicIdx === music.length - 1) {
      newIdx = 0;
    } else {
      newIdx = music.musicIdx + 1;
    }
    setMusic({ ...music, musicIdx: newIdx });
  }

  function decrementMusicIdx() {
    let newIdx;
    if (music.musicIdx === 0) {
      newIdx = music.length - 1;
    } else {
      newIdx = music.musicIdx - 1;
    }
    setMusic({ ...music, musicIdx: newIdx });
  }

  return (
    <div className="musicShuffler">
      <IoMdArrowDropleftCircle size={30} onClick={decrementMusicIdx} />
      <h5>Find more music</h5>
      <IoMdArrowDroprightCircle size={30} onClick={incrementMusicIdx} />
    </div>
  );
}

export default MusicShuffler;
