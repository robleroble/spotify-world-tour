import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";

import "./NavBar.css";

function NavBar({ logout }) {
  const navigate = useNavigate();
  const spotifyLogin = () => {
    window.open("http://localhost:3000/auth/spotify", "_self");
  };
  const { user } = useContext(UserContext);

  function loggedInNav() {
    return (
      <>
        <li className="nav-item">
          <Link to="profile" className="nav-link nav-profile">
            <img
              className="navbar-profile-img"
              src={user.photos[0].value}
              alt="spotify profile"
            />
            {user.displayName}
          </Link>
        </li>
        <li className="nav-item">
          <a
            href="/#"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="nav-link"
          >
            Logout
          </a>
        </li>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <li className="nav-item">
          <a href="/#" onClick={spotifyLogin} className="nav-link">
            Login
          </a>
        </li>
      </>
    );
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-link nav-logo">
        Spotify World Tour
      </Link>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="browse" className="nav-link nav-profile">
            Explore Music
          </Link>
        </li>
        {user ? loggedInNav() : loggedOutNav()}
      </ul>
    </nav>
  );
}

export default NavBar;
