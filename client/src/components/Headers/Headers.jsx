import React, { memo } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useNavigate } from 'react-router-dom';

const Headers = ({ headerName }) => {
  console.log("i am from headers")
  const navigate=useNavigate()
  const goToHome=()=>{
    navigate("/")
  }
  return (
    <Navbar expand="lg" bg='dark' variant='dark' sticky='top'>
      <Container>
        <Navbar.Brand href="">{headerName}</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {headerName !== "Dashboard" && <Nav.Link onClick={goToHome}>Home</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  )
}

export default memo(Headers)
//memo caches the whole child component and render only when its props changes
//export default Headers
