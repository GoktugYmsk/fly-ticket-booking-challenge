import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Nav from 'react-bootstrap/Nav';
import { FaPlaneDeparture } from 'react-icons/fa';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Login from '../content/loginPopup';

import { setReturnDate } from '../configure';
import './index.scss';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [planePosition, setPlanePosition] = useState(0);

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleMainPage = () => {
    dispatch(setReturnDate(''))
    navigate('/')
  }

  return (
    <>
      <div className="header-container">
        <nav class="header-navbar">
          <div onClick={handleMainPage} class="nav_logo">
            <img className='nav_logo_main' src="./img/logo.png" alt="logo" />
            Fly Pinsoft
          </div>
          <ul class="nav_links">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <Nav.Link onClick={handleLogin}>Login</Nav.Link>
          </ul>
        </nav>
        <div className="plane" style={{ transform: `translateX(${planePosition}px)` }}>
          <FaPlaneDeparture className='plane-icon' />
        </div>
      </div>
      {isLogin && <Login setIsLogin={setIsLogin} />}
    </>
  );
}

export default Header;
