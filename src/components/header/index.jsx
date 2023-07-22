import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaBell } from 'react-icons/fa';
import { FaPlaneDeparture } from 'react-icons/fa';
import Login from '../content/loginPopup';
import './index.scss';

function Header() {
  const [planePosition, setPlanePosition] = useState(0);
  const [inform, setInform] = useState(true)
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowWidth = window.innerWidth;
      const maxPlanePosition = windowWidth - 100;
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
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const year = newDate.getFullYear();
  const date = day + '.' + month + '.' + year;


  const logo =
    'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const handleLogin = () => {
    setIsLogin(true);
  };

  // const handleCloseInform = () => {
  //   setInform(false)
  // }

  return (
    <>
      <div className="header-container">
        
        <nav class="header-navbar">
      <div class="nav_logo">Some Booking Inc.</div>
      <ul class="nav_links">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link onClick={handleLogin}>Login</Nav.Link>
      </ul>
    </nav>
        <div className="plane" style={{ transform: `translateX(${planePosition}px)` }}>
          <FaPlaneDeparture />
        </div>
      </div>
      {isLogin && <Login />}
    </>
  );
}

export default Header;
