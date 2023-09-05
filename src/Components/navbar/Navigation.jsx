import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component } from 'react';
import { NavLinks } from "../../data/Nav-links.js"
import { nanoid } from 'nanoid';

class Navigation extends Component {
    render() {
        return (
            <Navbar expand="lg" className="bg-success">
                <Container>
                    <Navbar.Brand href="#home">Horror Books</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {NavLinks.map((link) => (
                                <Nav.Link key={nanoid()}
                                    href={link.url}>
                                    {link.label}
                                 </Nav.Link>
                            ))}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}
export default Navigation;
