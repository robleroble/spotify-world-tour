import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, NavLink, Nav, NavItem } from "reactstrap";
import UserContext from "../../Context/UserContext";

import "./NavBar.css";

function NavBar({ logout }) {
  const navigate = useNavigate();
  const spotifyLogin = () => {
    window.open("http://localhost:3000/auth/spotify", "_self");
  };
  const { user } = useContext(UserContext);
  console.log(user);

  function loggedInNav() {
    return (
      <>
        <NavItem>
          <NavLink className="navbar-text">
            <Link className="navbar-profile" to="profile">
              <img
                className="navbar-profile-img"
                src={user.photos[0].value}
                alt="profile picture"
              />
              <p>{user.displayName}</p>
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="navbar-text"
          >
            Logout
          </NavLink>
        </NavItem>
      </>
    );
  }

  function loggedOutNav() {
    return (
      <>
        <NavItem>
          <NavLink onClick={spotifyLogin} className="navbar-text">
            Login
          </NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <Navbar className="d-flex justify-content-between mw-100">
      <NavbarBrand className="ms-4 navbar-text">
        <Link to="browse">Spotify World Tour</Link>
      </NavbarBrand>
      <Nav>{user ? loggedInNav() : loggedOutNav()}</Nav>
    </Navbar>
  );
}

export default NavBar;
