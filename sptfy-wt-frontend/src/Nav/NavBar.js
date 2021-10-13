import React from "react";
import { Navbar, NavbarBrand, Nav, NavLink, NavItem } from "reactstrap";

import "./NavBar.css";

function NavBar() {
  return (
    <div>
      <Navbar>
        <NavbarBrand className="ms-4 navbar-brand">
          Spotify World Tour
        </NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink href="#">Login</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
