import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import "../static/Login.css";

function Ribbon(){
    function logout(){
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('committee');
        localStorage.removeItem('userID')
    }
    return(
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/onlyAuthorizedAllowedHere/home">IPC Website</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/onlyAuthorizedAllowedHere/home">Home</Nav.Link>
                        
                    </Nav>
                    <div style={{color: 'white', marginRight: '20px'}}>Logged in as {localStorage.getItem("username")}</div>
                    <Link to='/' className="whiteText" onClick={logout}>Logout</Link>
                </Container>
            </Navbar>
        </>
    )
}

export default Ribbon;