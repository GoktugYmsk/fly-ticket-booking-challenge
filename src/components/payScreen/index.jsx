import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Toast from 'react-bootstrap/Toast';
import Button from '@mui/material/Button';
import Footer from '../footer';
import Header from "../header";
import PayScreenTop from './payscreenTop';
import { setPassengerInfo, setPnrCode, setReturnDate } from '../configure';

import './index.scss';

function PayScreen() {
  const [popup, setPopup] = useState(false)
  const [cardName, setCardName] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [expiryMonth, setExpiryMonth] = useState('');
  const [popupActive, setPopupActive] = useState(false)

  const pnrCode = useSelector((state) => state.passCheck.pnrCode);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (cardNumber.length === 16 && expiryMonth !== '' && expiryYear !== '' && cardName === 'Fly Pinsoft') {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [cardNumber, expiryMonth, expiryYear, cardName]);

  const handleMainPage = () => {
    dispatch(setReturnDate(''))
    dispatch(setPassengerInfo(refreshPassenger));
    setPopupActive(false)
    navigate('/')
  }

  const handleSummaryClick = () => {
    navigate('/shopping-summary')
  }

  return (
    <>
      <div className={`payScreen__container ${popupActive ? 'payScreen__container-opacity' : 'payScreen__container'}`} >
        <div className="payScreen__container-navbar" >
          <Header />
        </div>
        <PayScreenTop isFlipped={isFlipped} setCardName={setCardName}
          setExpiryMonth={setExpiryMonth}
          setExpiryYear={setExpiryYear}
          setCardNumber={setCardNumber}
          setPopupActive={setPopupActive}
          setPopup={setPopup}
          expiryMonth={expiryMonth}
          expiryYear={expiryYear}
          cardNumber={cardNumber}
          cardName={cardName}
        />
      </div>
      {popup && (
        <div className="toast-container">
          <Toast onClose={() => setPopup(false)} show={popup} >
            <Toast.Body className='popup-content' >
              <div className="popup-content__box">
                <p>Your Purchase Was Successful!</p>
                {pnrCode.map((item, key) => (
                  <div className='popup-content__box-pnr' key={key}>
                    <p>Last Name: {passSurname[key]}</p>
                    <p>PNR NO: {item}</p>
                  </div>
                ))}
                <div className="popup-content-button">
                  <Button className='popup-content-button__main' onClick={handleMainPage}>Go Back To Homepage</Button>
                  <Button className='popup-content-button__summary' onClick={handleSummaryClick}>Show My Flight Informations</Button>
                </div>
              </div>
            </Toast.Body>
          </Toast>
        </div>
      )}
      <div className={`footerContainer ${popupActive ? 'footer-opacity' : ''} `} >
        <Footer />
      </div>
    </>
  );
}

export default PayScreen;
