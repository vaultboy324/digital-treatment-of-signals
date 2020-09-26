import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';


function MainNavbar (params){
  return (
    <Container fluid>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="collapse-button" />
        <Navbar.Collapse id="collapse-button">
          <Nav className="mr-auto">
            <Nav.Link href="/negative">Негатив</Nav.Link>
            <Nav.Link href='/gamma_correction'>Гамма-Коррекция</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  )
}

export default MainNavbar;
