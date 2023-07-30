import React from 'react';
import { useNavigate } from 'react-router-dom';
import MyImage from './arrow.png';
import { useDispatch, useSelector } from 'react-redux';

import { setPassName, setPassSurname, setPassengerInfo } from '../configure';

import Header from "../header";
import './index.scss';

function SalesScreen() {
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const passName = useSelector((state) => state.passCheck.passName);
    const passSurname = useSelector((state) => state.passCheck.passSurname);
    const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);

    const totalPassenger = sessionStorage.getItem('totalPassenger');

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const imagePath = MyImage;

    const handleNameChange = (e, passengerIndex) => {
        const newName = e.target.value;
        const currentPassNames = [...passName];
        currentPassNames[passengerIndex - 1] = newName;
        dispatch(setPassName(currentPassNames));
    };

    const handleSurnameChange = (e, passengerIndex) => {
        const newSurname = e.target.value;
        const currentPassSurnames = [...passSurname];
        currentPassSurnames[passengerIndex - 1] = newSurname;
        dispatch(setPassSurname(currentPassSurnames));
    }

    const handlePayScreenClick = () => {
        navigate('/seat-screen');
    };

    const totalPrice = flightTicket.passengerPrices[0].basePrice * totalPassenger;

    const renderPassengerDetails = () => {
        const passengerDetails = [];
        const passengerCounts = [passengerInfo.adults, passengerInfo.children, passengerInfo.babies];

        for (let i = 0; i < passengerCounts.length; i++) {
            for (let j = 1; j <= passengerCounts[i]; j++) {
                const passengerIndex = passengerCounts.slice(0, i).reduce((acc, count) => acc + count, 0) + j;
                let passengerType = '';
                switch (i) {
                    case 0:
                        passengerType = 'Adult';
                        break;
                    case 1:
                        passengerType = 'Child';
                        break;
                    case 2:
                        passengerType = 'Infant';
                        break;
                    default:
                        break;
                }

                passengerDetails.push(
                    <div key={passengerIndex} className='flight-contanier-box'>
                        <div className='passenger-leftInfo'>
                            <h4>{`${j}. ${passengerType}`}</h4>
                        </div>
                        <div className="flight-box-name">
                            <div className="no"><input placeholder="First Name" onChange={(e) => handleNameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div className="flight-box-surname">
                            <div className="no"><input placeholder="Last Name" onChange={(e) => handleSurnameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div className="flight-box-id">
                            <div className="time"><input placeholder="ID Number" type="text" /></div>
                        </div>
                        <div className="flight-box-birth">
                            <div className="arrive-title">Birth Date:</div>
                            <div className="arrive"><input placeholder="Gidiş tarihini seçiniz." type="date" name="birth-date" /></div>
                        </div>
                    </div>
                );
            }
        }
        return passengerDetails;
    };

    const handleMainPage = () => {
        dispatch(setPassengerInfo(refreshPassenger));
        navigate('/');
    };

    return (
        <>
            <Header>
                {/* Header içeriği burada */}
            </Header>
            <div className="flyCompanies-container-content-container">
                <div className="info-h3">
                </div>
                <div className="flyCompanies-container__box">
                    <div className="flyCompanies-container__box-airline partner">
                        <div className="info-value">{flightTicket.airline}</div>
                    </div>
                    <div className="flyCompanies-container__box-flightNo partner">
                        <div className="info-value">{flightTicket.flightNo}</div>
                    </div>
                    <div className="arrowIcon partner">
                        <img className="arrowIcon" src={imagePath} alt="Ok İkonu" />
                    </div>
                    <div className="flyCompanies-container__box-depTime partner">
                        <div className="info-value">{flightTicket.arrTime}</div>
                    </div>
                    <div className="flyCompanies-container__box-flightDuration partner">
                        <div className="info-label">Passenger Number : </div>
                        <div className="info-value"> &nbsp;{totalPassenger}</div>
                    </div>
                    <div className="flyCompanies-container__box-amount">
                        <div className="info-value">${totalPrice}</div>
                    </div>
                    <div className="flyCompanies-container__box-arrTime partner">
                        <div className="info-value">{flightTicket.depTime}</div>
                    </div>
                </div>
            </div>



            <div className='salesScreen-container-content__box__invoice'>
                <h3>Passenger Information</h3>

                <div className='flight-passenger-container'>

                    {renderPassengerDetails()}
                </div>


                <h3>Contact Information</h3>
                <div className="flight-larger-container-contact">

                    <div className="flight-box-no">
                        <input placeholder="Phone Number" type="text" id="phone-number" name="phone-number" required />
                    </div>
                    <div className="flight-box-mail">
                        <input placeholder="Email" type="email" id="email" name="email" required />
                    </div>
                </div>

                <h3>Billing Information</h3>
                <div className="flight-larger-container-bill">

                    <div className="flight-box-name">
                        <input placeholder="Name" type="text" id="billing-name" name="billing-name" required />
                    </div>
                    <div className="flight-box-surname">
                        <input placeholder="Last Name" type="text" id="billing-last-name" name="billing-last-name" required />
                    </div>
                    <div className="flight-box-id">
                        <input placeholder="ID Number" type="text" id="billing-id-number" name="billing-id-number" required />
                    </div>
                </div>
                <div className="insurance">
                    <label for="insurance-label">
                        <input type="checkbox" id="insurance" name="insurance" />
                        <span>Yes, I want flight ticket insurance</span>
                    </label>
                </div>
                <div className="section_container" onClick={handlePayScreenClick}>
                    <button type="submit" class="btn">Choose Seat</button>
                </div>
            </div>
        </>
    );
}

export default SalesScreen;