import React, { useEffect, useState } from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FaBell } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import './index.scss';

function Header() {
    const [planePosition, setPlanePosition] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            const windowWidth = window.innerWidth;
            const maxPlanePosition = windowWidth - 100; // Uçağın maksimum konumu (sayfa genişliğine bağlı olarak ayarlayabilirsiniz)
            const scrollY = window.scrollY;
            const newPosition = (scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * maxPlanePosition;

            setPlanePosition(newPosition);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const newDate = new Date();
    const day = newDate.getDate();
    const month = newDate.getMonth();
    const year = newDate.getFullYear();

    const date = day + '.' + month + '.' + year;
    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    const handleLogin = () => {
        navigate('/login')
    };

    return (
        <div className='header-container' >
            <div className="header-top-navbar">
                <FaBell className="header-top-navbar__icon" />
                {date}
                <p>18 Yaş Altı Misafirlerin Suudi Arabistan'a Seyahat Şartı Hakkında</p>
                <p>Daha Fazla →</p>
            </div>
           
            <Navbar expand="lg" className="bg-body-tertiary">
                <img className="header-logo" src={logo} alt="Logo" />
                <Container className="header-bootstrap-container">
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link onClick={handleLogin}>Giriş Yap</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="plane" style={{ transform: `translateX(${planePosition}px)` }}>
                <FaPlaneDeparture />
            </div>
        </div>
    );
}

export default Header;
