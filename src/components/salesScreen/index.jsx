import React from 'react';
import { useNavigate } from 'react-router-dom';
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

    const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger;

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
                    <div key={passengerIndex} className='flight-contanier' style={{ display: 'flex' }}>
                        <div className='passenger-leftInfo'>
                            <h4>{`${j}. ${passengerType}`}</h4>
                        </div>
                        <div class="flight-box" style={{ flex: 1 }}>
                            <div class="no-title">First Name:</div>
                            <div class="no"><input onChange={(e) => handleNameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div class="flight-box" style={{ flex: 1 }}>
                            <div class="no-title">Last Name:</div>
                            <div class="no"><input onChange={(e) => handleSurnameChange(e, passengerIndex)} required /></div>
                        </div>
                        <div class="flight-box" style={{ flex: 1 }}>
                            <div class="time-title">ID Number:</div>
                            <div class="time"><input type="text" /></div>
                        </div>
                        <div class="flight-box" style={{ flex: 1 }}>
                            <div class="arrive-title">Birth Date:</div>
                            <div class="arrive"><input type="date" name="birth-date" /></div>
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
            <div className="container">
                <div className="section-header">
                    <h3>Flight Information</h3>
                </div>
                <div className="flight-info-container" style={{ display: 'flex' }}>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Airline:</div>
                        <div className="info-value">{flightTicket.airline}</div>
                    </div>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Flight Number:</div>
                        <div className="info-value">{flightTicket.flightNo}</div>
                    </div>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Departure Time:</div>
                        <div className="info-value">{flightTicket.depTime}</div>
                    </div>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Arrival Time:</div>
                        <div className="info-value">{flightTicket.arrTime}</div>
                    </div>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Passenger Number:</div>
                        <div className="info-value">{totalPassenger}</div>
                    </div>
                    <div className="flight-info" style={{ flex: 1 }}>
                        <div className="info-label">Price:</div>
                        <div className="info-value">{totalPrice}</div>
                    </div>
                </div>
            </div>

            
            
            <div className='salesScreen-container-content__box__invoice'>
                <div className='flight-container'>
                    <h3>Passenger Information</h3>
                    {renderPassengerDetails()}
                </div>
                
                <div className="flight-container larger-container" style={{ display: 'flex' }}>
                    <h3>Contact Information</h3>
                    <div classNamess="flight-box" style={{ flex: 1 }}>
                        <div className="airline-title">Phone Number:</div>
                        <div className="airline"><input type="text" id="phone-number" name="phone-number" required /></div>
                    </div>
                    <div className="flight-box" style={{ flex: 1 }}>
                        <div className="no-title">Email:</div>
                        <div className="no"><input type="email" id="email" name="email" required /></div>
                    </div>
                </div>
                
                <div className="flight-container larger-container" style={{ display: 'flex' }}>
                    <h2>Billing Information</h2>
                    <div className="flight-box" style={{ flex: 1 }}>
                        <div className="airline-title">Name:</div>
                        <div className="airline"><input type="text" id="billing-name" name="billing-name" required /></div>
                    </div>
                    <div className="flight-box" style={{ flex: 1 }}>
                        <div className="no-title">Last Name:</div>
                        <div className="no"><input type="text" id="billing-last-name" name="billing-last-name" required /></div>
                    </div>
                    <div className="flight-box" style={{ flex: 1 }}>
                        <div className="depart-title">ID Number:</div>
                        <div className="depart"><input type="text" id="billing-id-number" name="billing-id-number" required /></div>
                    </div>
                </div>
                <div className="insurance">
                    <label for="insurance-label">
                        <input type="checkbox" id="insurance" name="insurance" />
                        <span>Yes, I want flight ticket insurance</span>
                    </label>
                </div>
                <div className="section_container" onClick={handlePayScreenClick}>
                    <button type="submit" class="btn">Payment</button>
                </div>
            </div>
        </>
    );
}

export default SalesScreen;
