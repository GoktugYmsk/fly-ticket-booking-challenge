import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './index.scss'

function ShoppingSummary() {

    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const passSurname = useSelector((state) => state.passCheck.passSurname);
    const passName = useSelector((state) => state.passCheck.passName);

    const navigate = useNavigate()

    console.log('flightTicket', flightTicket)

    const totalPassenger = sessionStorage.getItem('totalPassenger')


    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    const handleMainPage = () => {
        navigate('/')
    }

    return (
        <div className='shoppingSummary-container' >
            <div className="shoppingSummary__container-navbar" >
                <nav >
                    <img onClick={handleMainPage} src={logo} />
                </nav>
                <div className='shoppingSummary__container-navbar-alt' >
                    <h3>Özet</h3>
                </div>
            </div>
            <div className='shoppingSummary-container-box' >
                <h4 onClick={handleMainPage} >Anasayafa Dön</h4>
                <div className='shoppingSummary-container-box__list' >
                    <div className='shoppingSummary-container-box__list-top' >
                        <p>{flightTicket.airline}</p>
                        <p>{flightTicket.flightNo}</p>
                        <p>{flightTicket.depTime}</p>
                        <p>{flightTicket.arrTime}</p>
                        <p> Toplam: {totalPassenger} Yolcu </p>
                    </div>

                    <div className='shoppingSummary-container-box__list-top' >
                        <p>Adı: {passName}</p>
                        <p>Soyadı: {passSurname}</p>
                        <p>{passengerInfo.adults} Yetişkin </p>
                        {passengerInfo.children > 0 &&
                            <p> {`  - ${passengerInfo.children}  Çocuk `}</p>
                        }
                        {passengerInfo.babies > 0 &&
                            <p> {` - ${passengerInfo.babies}  Bebek`} </p>

                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ShoppingSummary