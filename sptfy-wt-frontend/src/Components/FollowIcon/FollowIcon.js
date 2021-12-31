import React, { useContext, useEffect } from "react";
import "./FollowIcon.css";
import UserContext from "../../Context/UserContext";
import BrowseContext from "../../Context/BrowseContext";
import SWTApi from "../../API/SWTApi";

function FollowIcon() {
  const { music } = useContext(BrowseContext);
  const { user, accessToken } = useContext(UserContext);

  useEffect(() => {
    checkIfFollowed();
  }, []);

  // check musicIdx music.musicIdx

  async function checkIfFollowed() {
    let followed;
    if (music.type === "playlist") {
      followed = await SWTApi.checkIfPlaylistFollowed(
        accessToken,
        music.spotifyMusic.playlists.playlists.items[music.musicIdx].id,
        user.id
      );
      console.log(followed);
    } else if (music.type === "album") {
      console.log("album");
    }
  }

  return <p className="followIcon">Follow!</p>;
}

export default FollowIcon;
