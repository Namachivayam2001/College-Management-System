import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Bell } from 'react-bootstrap-icons';
import Image from 'react-bootstrap/Image';
import './navBarComponent.css'

export default function NavBarComponents(){
    const expand ='md';
  return <>
    
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 fixed-top">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} className="custom-toggle" />
                <Navbar.Brand href="#" className='me-auto'>Logo</Navbar.Brand>
                
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Logo
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-center flex-grow-1 pe-3 mid-content">
                            <Nav.Link href="#action1">Dashboard</Nav.Link>
                            <Nav.Link href="#action2">Link</Nav.Link>
                            <NavDropdown
                                title="Login"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item href="#action3">Admin</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Teacher</NavDropdown.Item>                                
                                <NavDropdown.Item href="#action5">Student</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>                   
                    </Offcanvas.Body>
                </Navbar.Offcanvas>

                <Nav className='d-flex flex-row theird-container'>
                    <Nav.Link className='theird-container-inner-1'>
                        <Bell id='bell-icon'/>
                    </Nav.Link>
                    <Nav.Link className='theird-container-inner-2'>
                        <Image src="https://i0.wp.com/www.alphr.com/wp-content/uploads/2023/09/Background-1.png?resize=230,170&ssl=1" className='profile-img'/>
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    
  </>
}

