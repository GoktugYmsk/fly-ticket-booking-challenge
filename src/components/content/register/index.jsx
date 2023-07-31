import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../header';

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

    return (
        <>
            <Header />
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
