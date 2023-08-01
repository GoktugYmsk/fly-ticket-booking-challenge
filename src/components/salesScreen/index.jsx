import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from "../header";
import MyImage from './arrow.png';
import RenderPassengerDetails from './renderPassengerDetails';

import './index.scss';

function SalesScreen() {
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);

    const totalPassenger = sessionStorage.getItem('totalPassenger');

    const navigate = useNavigate();

    const imagePath = MyImage;

    const handlePayScreenClick = () => {
        navigate('/seat-screen');
    };

    const totalPrice = flightTicket.passengerPrices[0].basePrice * totalPassenger;


    return (
        <>
            <Header />
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
                <RenderPassengerDetails />
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