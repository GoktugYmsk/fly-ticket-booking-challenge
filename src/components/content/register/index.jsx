import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

function SignUp() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [number, setNumber] = useState()

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

    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    return (
        <>
            <div className="signup__container-navbar" >
                <nav >
                    <img onClick={handleMainPage} src={logo} />
                </nav>
            </div>

            <div className="signup-container">
                <h2>Kayıt Ol</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Ad</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Soyad</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Telefon</label>
                        <input type="number" value={number} onChange={(e) => setNumber(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>E-posta</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Şifre</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Kayıt Ol</button>
                </form>
                <p>Zaten üye misin ?</p>
                <button className='signup-container__login' onClick={handleLogin}>Giriş yap</button>
            </div>
        </>
    );
}

export default SignUp;
