import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const LoginPopup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
    
    const handleMainPage = () =>{
        navigate('/')
    }


    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';


    return (
        <>
            <div className="login__container-navbar" >
                <nav >
                    <img onClick={handleMainPage} src={logo} />
                </nav>
            </div>

            <div className="login__container ">
                <form className="login__container-form" onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="email">E-mail</label>
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
                    {error && <div>{error}</div>}
                    <div className="button-container d-flex justify-content-center">
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </div>
                    <br />
                    <div>
                        <p>Don't have an account? <span onClick={handleSignup} className="signup-button" >Sign Up</span></p>
                    </div>
                </form>
            </div>
        </>

    );
};

export default LoginPopup;



