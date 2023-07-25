import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./index.scss";

const LoginPopup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const handleLogin = () => {
        if (email === 'mock@gmail.com' && password === '123456') {
            alert('seyahete devem et')
        }
    };

    const handleUserChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = () => {
        navigate('/Signup')
    }

    const handleMainPage = () => {
        navigate('/')
    }

    return (
        <>
            <nav class="header-navbar">
                <div onClick={handleMainPage} class="nav_logo">Fly Pinsoft</div>
                <ul class="nav_links">
                    <Nav.Link onClick={handleMainPage}>Home</Nav.Link>
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
            <div className="login__container ">
                <h2>Login</h2>
                <form className="login__container-form" onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" value={email} onChange={handleUserChange} required />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <div className="button-container d-flex justify-content-center">
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </div>
                    <p>Don't have an account ? <span onClick={handleSignup} className="signup-button" >Sign Up</span></p>
                </form>
            </div>
        </>
    );
};

export default LoginPopup;



