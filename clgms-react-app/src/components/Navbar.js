import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function HeadNavbar() {
    const menuData = [
        {
            path: '/',
            name: "Home"
        },
        {
            path: '#',
            name: 'Link'
        }
    ]
    const dropdownMenuData = [
        {
            path: '#',
            name: 'Dropdown One'
        },
        {
            path: '#',
            name: 'Dropdown Two'
        },
        {
            path: '#',
            name: 'Dropdown Three'
        }
    ]
    return (
        <Navbar variant="dark" expand="lg" fixed="top" className="navbar">
        <Container>
            <Navbar.Brand href="#home" className='brand'>ClgMS</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"><div>hi</div></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {
                        menuData.map((item) => (
                            <Nav.Link to={item.path} key={item.name}>
                                <div className='list_item'>{item.name}</div>
                            </Nav.Link>
                        ))
                    }
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        {
                            dropdownMenuData.map((item) => (
                                <NavDropdown.Item href={item.path} key={item.name}>
                                    <div className='dropdown_list_items'>{item.name}</div>
                                </NavDropdown.Item>
                            ))
                        }
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default HeadNavbar;