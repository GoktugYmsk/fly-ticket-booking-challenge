import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import './index.scss'

function Expedition() {

    const navigate = useNavigate()

    const totalPassenger = sessionStorage.getItem('totalPassenger')

    const handleMainPage = () => {
        navigate('/')
    }

    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    return (
        <div className='expedition-container' >
            <p>Toplam Yolcu sayısı = {totalPassenger} </p>
            <div className="expedition-navbar" >
                <nav >
                    <img onClick={handleMainPage} src={logo} />
                </nav>
            </div>
            <div className='expedition-container__content' >
                <div className='expedition-container-superEco-box'>
                    <h3>Super Eco</h3>
                    <p>1 Parça Kabin bagajı</p>
                    <button>3000Tl</button>
                </div>
                <div className='expedition-container-eco-box' >eco
                    <h3>Eco</h3>
                    <p>1 Parça Kabin bagajı</p>
                    <p>20kg bagaj</p>
                    <button>3000Tl</button>
                </div>
                <div className='expedition-container-opportunity-box' >opportunity
                    <h3>Opportunity</h3>
                    <p>1 Parça Kabin bagajı</p>
                    <p>20kg bagaj</p>
                    <p>Standart Koltuk Seçimi</p>
                    <p>Sandviç ikramı</p>
                    <p>Film,Dizi,Müzik,Oyun</p>
                    <button>3000Tl</button>
                </div>
                <div className='expedition-container-comfortFlex-box' >comfortFlex
                    <h3>ComfortFlex</h3>
                    <p>1 Parça Kabin bagajı</p>
                    <p>Diledeğiniz Koltuk Seçimi</p>
                    <p>Sandviç ikramı</p>
                    <p>Cezasız iade/Değişiklik hakkı</p>
                    <p>Film,Dizi,Müzik,Oyun</p>
                    <button>3000Tl</button>
                </div>
            </div>
        </div>
    )
}

export default Expedition
