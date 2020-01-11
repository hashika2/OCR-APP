import React, { Fragment } from 'react';
import { Navbar,Nav } from 'react-bootstrap';
import {Icon} from 'semantic-ui-react';
import { connect } from 'react-redux';

const Navbars = ({ isAuthanticated}) => {

  const authLink = (
    <Fragment>
      <Nav.Link href="/"><Icon name='log out'/>Logout</Nav.Link>
    </Fragment>
  )

  const gestLink = (
    <Fragment>
      <Nav.Link href="/login"><Icon name='user circle'/>Login</Nav.Link>
      <Nav.Link href="/createAccount"><Icon name='signup'/>SingUp</Nav.Link>
    </Fragment>
  )
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/">Image Text Viewer</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="ml-auto">
  (<Fragment>{ isAuthanticated ? authLink : gestLink}</Fragment> )
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
};

const mapStateToProp = (state) =>({
  isAuthanticated: state.auth.isAuthanticated
})

export default connect(mapStateToProp)(Navbars);
