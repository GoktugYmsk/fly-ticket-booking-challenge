import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import './index.scss';

function PayScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [maskedCardNumber, setMaskedCardNumber] = useState('################');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cardName, setCardName] = useState('');
  const [cvv, setCVV] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  const flightTicket = useSelector((state) => state.passTicket.flightTicket);

  const totalPassenger = sessionStorage.getItem('totalPassenger')

  const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger

  useEffect(() => {
    if (cardNumber.length === 16 && expiryMonth !== '' && expiryYear !== '' && cardName === 'Göktuğ Yumuşak') {
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

  const handleApprovalClick = () => {
    if (cvv === '001') {
      alert('Ödeme Başarıyla Tamamlandı')
    }
  }


  return (
    <div className="payScreen-container">
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
          <div>
            <input type="text" value={formatCardNumber(cardNumber)} onChange={handleCardNumberChange} maxLength="19" />
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
            <input type="text" value={cardName} onChange={handleCardName} placeholder="Kart Üzerindeki İsim" />
          </div>
        ) : (
          <div className='payScreen-container-cvvSide' >
            <input type="text" placeholder="cvv" value={cvv} onChange={(e) => setCVV(e.target.value)} maxLength="3" />
            <Button className='approvalButton' onClick={handleApprovalClick} variant='secondary'>Onaylıyor musunuz ?</Button>
          </div>
        )}
        <h3 className='payScreen-container-h3' >Toplam {totalPrice} $</h3>
      </div>
      <div className='payScreen-container-total' >

      </div>
    </div>
  );
}

export default PayScreen;
