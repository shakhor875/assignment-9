import React , {useContext} from 'react';
import {Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {UserContext} from '../../../App'
import './Navbar.css'


const NavBar = () => {
    const [loggedInUser, setLoggedInUser, ] = useContext(UserContext);
    const {id, img ,name} = loggedInUser;
    return (
        <Navbar bg="light" expand="lg">
            <div className="container">
            <Navbar.Brand as={Link} to ="/" className="title">Shakhor's Travel Agency</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link  as={Link} to ="/home">Home</Nav.Link>
                    <Nav.Link  as={Link} to ={`/Destination/${id}`}>Destination</Nav.Link>
                    <Nav.Link  as={Link} to ="/Blog">Blog</Nav.Link>
                    <Nav.Link  as={Link} to ="/Contact">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default NavBar;