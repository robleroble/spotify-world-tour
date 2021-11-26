import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, NavLink, Nav, NavItem } from "reactstrap";

import "./NavBar.css";

function NavBar() {
  return (
    <Navbar className="d-flex justify-content-between mw-100">
      <NavbarBrand className="ms-4 navbar-text">Spotify World Tour</NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink className="navbar-text">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="navbar-text">
            <Link to="profile">Profile</Link>
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
