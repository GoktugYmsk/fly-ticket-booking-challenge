import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPassName, setPassSurname, setPassengerInfo } from '../configure';
import './index.scss';

function SalesScreen() {
    const [name, setName] = useState([]);
    const [surname, setSurname] = useState([]);
    const [adultCount, setAdultCount] = useState(1);
    const [childCount, setChildCount] = useState(0);
    const [babyCount, setBabyCount] = useState(0);
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const passName = useSelector((state) => state.passCheck.passName);

    const totalPassenger = sessionStorage.getItem('totalPassenger');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log('flightTicket', flightTicket);

    const handlePayScreenClick = () => {
        const combinedNames = passName.concat(name);
        dispatch(setPassName(combinedNames));
        dispatch(setPassSurname([...surname]));
        navigate('/pay-screen');
    };

    const handleSurnameChange = (e) => {
        const updateName = [...e.target.value, name]
        setSurname(updateName);
    };

    const handleNameChange = (e) => {
        const updateSurname = [...e.target.value, surname]
        setName(updateSurname);
    };

    const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger;

    console.log('totalPrice', totalPrice);

    const renderPassengerDetails = () => {
        const passengerDetails = [];
        const passengerCounts = [passengerInfo.adults, passengerInfo.children, passengerInfo.babies];

        console.log('passengerCounts', passengerCounts)

        for (let i = 0; i < passengerCounts.length; i++) {
            for (let j = 1; j <= passengerCounts[i]; j++) {
                let passengerType = '';
                switch (i) {
                    case 0:
                        passengerType = 'Yetişkin';
                        break;
                    case 1:
                        passengerType = 'Çocuk';
                        break;
                    case 2:
                        passengerType = 'Bebek';
                        break;
                    default:
                        break;
                }

                passengerDetails.push(
                    <div key={j} className='salesScreen-container-content__box__passDetail'>
                        <div className='passenger-leftInfo'>
                            <h3>{`${j}. ${passengerType}`}</h3>
                            <input type='radio' />
                            <input type='radio' />
                        </div>
                        <div className='passenger-rightInfo'>
                            <input onChange={handleNameChange} placeholder='İsim ' />
                            <input onChange={handleSurnameChange} placeholder='Soyisim' />
                            <input placeholder='Doğum Tarihi' />
                            <input placeholder='TC Kimlik no' />
                            <div className='passenger-rightInfo-detail'>
                                <input type='radio' />
                                <p>TC vatandaşı değilim</p>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return passengerDetails;
    };

    const userTicketAmount = {
        adults: adultCount,
        children: childCount,
        babies: babyCount
    };

    const handleMainPage = () => {
        dispatch(setPassengerInfo(userTicketAmount))
        navigate('/')
    }


    const logo =
        'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';


    return (
        <>
            <div className="sales__container-navbar" >
                <nav >
                    <img onClick={handleMainPage} src={logo} />
                </nav>
                <div className='sales__container-navbar-alt' >
                    <h3>Ödeme Bilgileri</h3>
                </div>
            </div>
            <div className='salesScreen-container'>
                <div className='salesScreen-container-content'>
                    <div className='salesScreen-container-content__box'>
                        <p>{flightTicket.airline}</p>
                        <p>{flightTicket.flightNo}</p>
                        <p>{flightTicket.depTime}</p>
                        <p>{flightTicket.arrTime}</p>
                    </div>
                    <div className='salesScreen-container-content__box__price'>
                        <p>Yolcu sayısı</p>
                        <p>Fiyat</p>
                        <p>Vergi/Harç</p>
                        <p>Hizmet Bedeli</p>
                        <p>Toplam</p>
                    </div>
                    {totalPrice} $
                    <div>{totalPassenger}</div>
                    {renderPassengerDetails()}
                    <div className='salesScreen-container-content__box__contact'>
                        <div className='salesScreen-container-content__box__contact-top'>
                            <h3>İletişim Bilgileri</h3>
                            <div className='salesScreen-container-content__box-contact-mail-phone'>
                                <input placeholder='E-posta' />
                                <input placeholder='Cep telefonu' />
                            </div>
                        </div>
                        <div className='salesScreen-container-content__box-campains'>
                            <input type='radio' />
                            <p>Fırsat ve kampanyalardan haberdar olmak istiyorum</p>
                        </div>
                    </div>
                    <div className='salesScreen-container-content__box__invoice'>
                        <h4>Fatura Bilgileri</h4>
                        <div className='salesScreen-container-content__box__invoice-input'>
                            <input type='radio' />
                            <p>Şahıs</p>
                            <input type='radio' />
                            <p>Şirket</p>
                            <input type='radio' />
                            <p>Şahıs Şirketi</p>
                        </div>
                        <div className='salesScreen-container-content__box__invoice-passengerInfo'>
                            <input placeholder='İsim' />
                            <input placeholder='Soyisim' />
                            <input placeholder='TC Kimlik No' />
                            <input type='radio' />
                            <p>Tc vatandaşı değilim</p>
                        </div>
                        <h3>Fatura bilgilerinin doğruluğunu kontrol ediniz</h3>
                    </div>
                    <div className='salesScreen-container-content__box__insurance'>
                        <h4>Uçak Bileti Sigortası</h4>
                        <div className='salesScreen-container-content__box__insurance-content'>
                            <div className='salesScreen-container-content__box__insurance-content__left'>
                                <input type='radio' />
                                <p>Sigorta yaptırmak istiyorum</p>
                            </div>
                            <p>({totalPassenger} Kişi) Toplam Fiyat: {totalPrice}</p>
                        </div>
                        <p>Detaylara Göz at</p>
                    </div>
                </div>
                <h4 className='payScreen-h4' onClick={handlePayScreenClick}>
                    Ödeme ekranına geç
                </h4>
            </div>
        </>
    );
}

export default SalesScreen;
