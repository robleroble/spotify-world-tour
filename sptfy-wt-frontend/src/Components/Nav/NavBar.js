import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { BsGlobe } from "react-icons/bs";

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
          <a href={user.profileUrl} className="nav-link nav-profile">
            <img
              className="navbar-profile-img"
              src={user.photos[0].value}
              alt="spotify profile"
            />
            {user.displayName}
          </a>
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
          <p onClick={spotifyLogin} className="nav-link">
            Login
          </p>
        </li>
      </>
    );
  }

  return (
    <nav className="nav">
      <Link to="/" className="nav-link nav-logo">
        <div className="logo-container">
          <BsGlobe className="globe-icon" />
          Spotify World Tour
        </div>
      </Link>
      <ul className="nav-items">{user ? loggedInNav() : loggedOutNav()}</ul>
    </nav>
  );
}

export default NavBar;
