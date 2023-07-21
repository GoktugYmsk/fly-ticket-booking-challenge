import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import Button from '@mui/material/Button';
import { setPnrCode } from '../configure';
import './index.scss';

function PayScreen() {
  const [cvv, setCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [popup, setPopup] = useState(false)
  const [popupActive, setPopupActive] = useState(false)
  const [expiryMonth, setExpiryMonth] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [pnrNumber, setPnrNumber] = useState('');
  const [maskedCardNumber, setMaskedCardNumber] = useState('################');

  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const pnrCode = useSelector((state) => state.passCheck.pnrCode);
  const passSurname = useSelector((state) => state.passCheck.passSurname);

  console.log('denemePnr', pnrCode)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const totalPassenger = sessionStorage.getItem('totalPassenger')

  const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger

  useEffect(() => {
    if (cardNumber.length === 16 && expiryMonth !== '' && expiryYear !== '' && cardName === 'Fly Pinsoft') {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }, [cardNumber, expiryMonth, expiryYear, cardName]);

  console.log(cardName)

  const handleCardNumberChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\s/g, '');
    if (!isNaN(numericValue)) {
      const maskedNumber = maskCardNumber(numericValue);
      setCardNumber(numericValue);
      setMaskedCardNumber(maskedNumber);
    }
  };

  const maskCardNumber = (value) => {
    const visibleDigits = value.slice(0, 4);
    const maskedDigits = value.slice(4).replace(/[0-9]/g, '*');
    const remainingHashes = '################'.slice(value.length);
    return visibleDigits + maskedDigits + remainingHashes;
  };

  const handleExpiryMonthChange = (e) => {
    setExpiryMonth(e.target.value);
  };

  const handleExpiryYearChange = (e) => {
    setExpiryYear(e.target.value);
  };

  const handleCardName = (e) => {
    setCardName(e.target.value);
  };

  const formatCardNumber = (number) => {
    const formattedNumber = number.replace(/\s/g, '').match(/.{1,4}/g);
    return formattedNumber ? formattedNumber.join(' ') : '';
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year <= 2040; year++) {
      years.push(year.toString());
    }
    return years;
  };

  const generatePnrNumber = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pnr = '';
    for (let i = 0; i < 6; i++) {
      pnr += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return pnr; // Oluşturulan pnrCode'u döndürün
  };


  const handleApprovalClick = () => {
    if (cvv === '001') {
      setPopupActive(true);
      setPopup(true);

      // Her yolcu için pnrCode oluştur ve Redux deposuna kaydet
      const pnrCodes = [];
      for (let passengerIndex = 1; passengerIndex <= totalPassenger; passengerIndex++) {
        const pnrCode = generatePnrNumber();
        pnrCodes.push(pnrCode);
      }

      dispatch(setPnrCode(pnrCodes)); // Tüm pnrCode'ları Redux deposuna kaydet
    }
  };



  const handleMainPage = () => {
    setPopupActive(false)
    navigate('/')
  }

  const handleSummaryClick = () => {
    navigate('/shopping-summary')
  }


  const logo =
    'https://uploads-ssl.webflow.com/605c9d764f1ef938a009ac98/61e01bfbdd8632a72962edc2_Pinsoft_Yatay_Logo_mavi-for%20animation.svg';

  return (
    <>
      <div className={`payScreen__container ${popupActive ? 'payScreen__container-opacity' : 'payScreen__container'}`} >
        <div className="payScreen__container-navbar" >
          <nav >
            <img onClick={handleMainPage} src={logo} />
          </nav>
          <div className='payScreen__container-navbar-alt' >
            <h3>Ödeme Bilgileri</h3>
          </div>
        </div>

        <div className="payScreen-container-list">
          <div className="payScreen-container-box">
            <div className="payScreen-container-cardForm">
              <div className={`payScreen-card ${isFlipped ? 'flipped' : ''}`}>
                <div className="payScreen-card__front">
                  <div>
                    <label>Kart Numarası:</label>
                    <p className="payScreen-card__front-number">{formatCardNumber(maskedCardNumber)}</p>
                  </div>

                  <p>{cardName}</p>
                  <div>
                    <label>Son Kullanma Tarihi:</label>
                    <p>{expiryMonth}/{expiryYear}</p>
                  </div>
                </div>
                <div className="payScreen-card__back">
                  <div>
                    <div className="payScreen-card__back__bant" ></div>
                    <input className="payScreen-card__back-input" type="text" placeholder="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} maxLength="3" />
                  </div>
                </div>
              </div>
              {!isFlipped ? (
                <div className='payScreen-container-cardForm-frontContent' >
                  <input type="text" value={formatCardNumber(cardNumber)} onChange={handleCardNumberChange} placeholder="Kart Numarası" maxLength="19" />
                  <input type="text" value={cardName} onChange={handleCardName} placeholder="Kart Üzerindeki İsim" />
                  <div>
                    <select value={expiryMonth} onChange={handleExpiryMonthChange}>
                      <option value="">Ay</option>
                      {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                        <option value={month.toString().padStart(2, '0')} key={month}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    <select value={expiryYear} onChange={handleExpiryYearChange}>
                      <option value="">Yıl</option>
                      {generateYears().map((year) => (
                        <option value={year} key={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <div className='payScreen-container-cvvSide' >
                  <input type="text" placeholder="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} maxLength="3" />
                </div>
              )}
              <div className='payScreen-container-box__installment' >
                <h3>Taksit Seçenekleri</h3>
                <div className='payScreen-container-box__installment-inputGroup'>
                  <div>
                    <input
                      type='radio'
                      checked={selectedOption === 'option1'}
                      onChange={() => setSelectedOption('option1')}
                    />
                    <p>Tek çekim</p>
                  </div>
                  <div>
                    <input
                      type='radio'
                      checked={selectedOption === 'option2'}
                      onChange={() => setSelectedOption('option2')}
                    />
                    <p>3 Ay</p>
                  </div>
                  <div>
                    <input
                      type='radio'
                      checked={selectedOption === 'option3'}
                      onChange={() => setSelectedOption('option3')}
                    />
                    <p>6 Ay</p>
                  </div>
                  <div>
                    <input
                      type='radio'
                      checked={selectedOption === 'option4'}
                      onChange={() => setSelectedOption('option4')}
                    />
                    <p>9 Ay</p>
                  </div>
                </div>
              </div>
              <div className='payScreen-container-cardForm-check' >
                <input type='checkbox' />
                <p>Pinsoft işlem kurallarını okudum ve Kabul ediyorum</p>
              </div>
              <div className='payScreen-container__paySide' >
                <h3 className='payScreen-container-h3' >Toplam ödenecek tutar {totalPrice} $</h3>
                <Button className='approvalButton' onClick={handleApprovalClick} variant='secondary'>Ödemeyi Tamamla</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popup && (
        <div className="toast-container">
          <Toast onClose={() => setPopup(false)} show={popup} >
            <Toast.Body>
              <div className="popup-content">
                <p>Satın alma işlemini başarıyla tamamladınız!</p>
                {pnrCode.map((item, key) => (
                  <p key={key}>
                    Soy isim: {passSurname[key]}, PNR NO: {item}
                  </p>
                ))}
                <div className="popup-content-button">
                  <button onClick={handleMainPage}>Anasayfaya Dön</button>
                  <button onClick={handleSummaryClick}>uçuş Bilgilerimi Görüntüle</button>
                </div>
              </div>

            </Toast.Body>
          </Toast>
        </div>
      )}
    </>
  );
}

export default PayScreen;
