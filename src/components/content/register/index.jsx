import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './index.scss';

function SignUp() {
    const [number, setNumber] = useState();
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Kayıt işlemi: ', firstName, lastName, number, email, password);

        setFirstName('');
        setLastName('');
        setNumber('');
        setEmail('');
        setPassword('');
    };

    const handleLogin = () => {
        navigate('/login')
    }

    const handleMainPage = () => {
        navigate('/')
    }

    return (
        <>
            <nav class="header-navbar">
                <div onClick={handleMainPage} class="nav_logo">Fly Pinsoft</div>
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
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account ?<span className='signup-container__login' onClick={handleLogin}>Login</span></p>
            </div>
        </>
    );
}

export default SignUp;
