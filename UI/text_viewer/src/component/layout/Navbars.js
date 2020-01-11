import React from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';


const Navbars = () => {
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Image Text Viewer</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
      <Nav.Link href="/login"><Icon name='user circle'/>Login</Nav.Link>
      <Nav.Link href="/createAccount"><Icon name='signup'/>SingUp</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};


export default Navbars;
