import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, } from 'react-router-dom';
import { setPassName, setPassengerInfo } from '../../configure';

import './index.scss';

function ShoppingSummary() {
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const passSurname = useSelector((state) => state.passCheck.passSurname);
    const passName = useSelector((state) => state.passCheck.passName);
    const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);

    const navigate = useNavigate();
    const dispatch = useDispatch()


    console.log(passName);

    const totalPassenger = sessionStorage.getItem('totalPassenger');
    const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger;

    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

    const handleMainPage = () => {
        dispatch(setPassengerInfo(refreshPassenger))
        navigate('/');
    };

    return (
        <div className='shoppingSummary-container'>
            <div className='shoppingSummary__container-navbar'>
                <nav>
                    <img onClick={handleMainPage} src={logo} />
                </nav>
                <div className='shoppingSummary__container-navbar-alt'>
                    <h3>Özet</h3>
                </div>
            </div>
            <div className='shoppingSummary-container-box'>
                <h4 onClick={handleMainPage}>Anasayfaya Dön</h4>
                <div className='shoppingSummary-container-box__list'>
                    <div className='shoppingSummary-container-box__list-top'>
                        <p>{flightTicket.airline}</p>
                        <p>{flightTicket.flightNo}</p>
                        <p>{flightTicket.depTime}</p>
                        <p>{flightTicket.arrTime}</p>
                        <p> Toplam: {totalPassenger} Yolcu </p>
                    </div>

                    <div className='shoppingSummary-container-box__list-bottom'>
                        <div className='shoppingSummary-container-box__list-name' >
                            <div className='name' >
                                {passName.map((name, index) => (
                                    <div className='name-flex' >
                                        <p>Adı:</p>
                                        <p key={index}> {name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='shoppingSummary-container-box__list-surName' >
                            <div className='surname'  >
                                {passSurname.map((surname, index) => (
                                    <div className='surname-flex' >
                                        <p>Soyadı:</p>
                                        <p key={index}> {surname}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                    <div className='shoppingSummary-container-box__list-passenger' >
                        <p>{totalPrice} $</p>
                        <div className='shoppingSummary-container-box__list-passengerInfo' >
                            <p>{passengerInfo.adults} Yetişkin </p>
                            {passengerInfo.children > 0 && (
                                <p> {`  - ${passengerInfo.children}  Çocuk `}</p>
                            )}
                            {passengerInfo.babies > 0 && (
                                <p> {` - ${passengerInfo.babies}  Bebek`} </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingSummary;
