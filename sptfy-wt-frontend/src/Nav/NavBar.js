import React from "react";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";

import "./NavBar.css";

function NavBar() {
  return (
    <Navbar className="d-flex justify-content-between mw-100">
      <NavbarBrand className="ms-4 navbar-text">Spotify World Tour</NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink href="#" className="navbar-text">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
}

export default NavBar;
