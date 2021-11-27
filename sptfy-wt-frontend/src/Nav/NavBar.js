import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavLink, Nav, NavItem } from "reactstrap";
import UserContext from "../UserContext";

import "./NavBar.css";

function NavBar() {
  const spotifyLogin = () => {
    window.open("http://localhost:3000/auth/spotify", "_self");
  };
  const { user } = useContext(UserContext);

  function loggedInNav() {
    return (
      <>
        <NavItem>
          <NavLink className="navbar-text">
            <Link to="profile">Profile</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbar-text">Logout</NavLink>
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
      <NavbarBrand className="ms-4 navbar-text">Spotify World Tour</NavbarBrand>
      <Nav>{user ? loggedInNav() : loggedOutNav()}</Nav>
    </Navbar>
  );
}

export default NavBar;
