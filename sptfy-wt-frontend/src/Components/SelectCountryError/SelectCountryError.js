import React, { useContext } from "react";
import { AiOutlineClose, AiOutlineCloseSquare } from "react-icons/ai";
import "./SelectCountryError.css";
import BrowseContext from "../../Context/BrowseContext";

function SelectCountryError() {
  const { setShowCountrySelectedError } = useContext(BrowseContext);
  function clickToCloseErrorBox() {
    setShowCountrySelectedError(false);
  }
  return (
    <div className="SelectCountryError">
      <div className="SelectCountryError-container">
        <p className="SelectCountryError-text">
          You need to select a country before selecting the playlists by genre
          category!
        </p>
        <div className="SelectCountryError-closeicon">
          <AiOutlineCloseSquare onClick={clickToCloseErrorBox} />
        </div>
      </div>
    </div>
  );
}

export default SelectCountryError;
