import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { navBar, navBrand, nav } from './style';
import { navbarBrand, navs } from '../../config/config';
import { isLoggedIn, setLoggedOut } from '../../utils/auth';
import HttpService from '../../services/httpService';

function NavBar(props) {
  const logout = () => {
    HttpService.get('logout', '', true).then((response) => {
      if (response.status === 204) {
        setLoggedOut();
        props.setLoggedIn(false);
        window.location.reload();
      }
    });
  };

  let loggedInStatus = props.loggedIn;
  if (isLoggedIn()) {
    loggedInStatus = true;
  }
  return (
    <Navbar style={navBar} variant="dark" expand="lg" fixed="top">
      <Navbar.Brand style={navBrand} href="/">{navbarBrand}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={nav} className="mr-auto">
          <LinkContainer to="/" key={uuidv4()}>
            <Nav.Link className="ml-2">Home</Nav.Link>
          </LinkContainer>
          {navs.map((navs) => loggedInStatus === navs.loggedIn && (
            <LinkContainer to={navs.page} key={uuidv4()}>
              <Nav.Link className="ml-2">{navs.nav}</Nav.Link>
            </LinkContainer>
          ))}
          {
            loggedInStatus && (
              <LinkContainer to="" key={uuidv4()} onClick={() => { logout(); }}>
                <Nav.Link className="ml-2">Logout</Nav.Link>
              </LinkContainer>
            )
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
export default NavBar;
