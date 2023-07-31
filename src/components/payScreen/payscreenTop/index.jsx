import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';

import { setPnrCode } from '../../configure';

function PayScreenTop({ isFlipped,
    setCardName,
    setExpiryMonth,
    setExpiryYear,
    setCardNumber,
    setPopupActive,
    setPopup,
    expiryMonth,
    expiryYear,
    cardNumber,
    cardName,

}) {
    const [cvv, setCVV] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isAgreementChecked, setIsAgreementChecked] = useState(false);
    const [maskedCardNumber, setMaskedCardNumber] = useState('################');

    const flightTicket = useSelector((state) => state.passTicket.flightTicket);

    const dispatch = useDispatch()

    const totalPassenger = sessionStorage.getItem('totalPassenger')

    const totalPrice = flightTicket.passengerPrices[0].basePrice * totalPassenger

    const handleExpiryMonthChange = (e) => {
        setExpiryMonth(e.target.value);
    };

    const handleExpiryYearChange = (e) => {
        setExpiryYear(e.target.value);
    };

    const handleCardName = (e) => {
        setCardName(e.target.value);
    };

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
        return pnr;
    };

    const handleAgreementChange = () => {
        setIsAgreementChecked(!isAgreementChecked);
    };

    const handleApprovalClick = () => {
        if (cvv === '001' && isAgreementChecked) {
            setPopupActive(true);
            setPopup(true);
            const pnrCodes = [];
            for (let passengerIndex = 1; passengerIndex <= totalPassenger; passengerIndex++) {
                const pnrCode = generatePnrNumber();
                pnrCodes.push(pnrCode);
            }

            dispatch(setPnrCode(pnrCodes));
        }
        else if (cvv != '001') {
            alert('cvv kodunu kontrol ediniz')
        }
        else if (!isAgreementChecked) {
            alert('Pinsoft işlem kurallarınız kabul ediniz !')
        }
    };

    return (
        <div className="payScreen-container-list">
            <div className="payScreen-container-box">
                <div className="payScreen-container-cardForm">
                    <div className={`payScreen-card ${isFlipped ? 'flipped' : ''}`}>
                        <div className="payScreen-card__front">
                            <p className="payScreen-card__front-number">{formatCardNumber(maskedCardNumber)}</p>
                            <div className='payScreen-card__front-top' >
                                <p className='payScreen-card__front-top__number' >{cardName}</p>
                                <div className='payScreen-card__front-bottom' >
                                    <label >Expiration Date:</label>
                                    <p>{expiryMonth}/{expiryYear}</p>
                                </div>
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
                            <input type="text" value={formatCardNumber(cardNumber)} onChange={handleCardNumberChange} placeholder="Card Number" maxLength="19" />
                            <input type="text" value={cardName} onChange={handleCardName} placeholder="Name On The Card" />
                            <div className='payScreen-container-cardForm-frontContent-mounth' >
                                <select value={expiryMonth} onChange={handleExpiryMonthChange}>
                                    <option>Month</option>
                                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                                        <option value={month.toString().padStart(2, '0')} key={month}>
                                            {month.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>
                                <select value={expiryYear} onChange={handleExpiryYearChange}>
                                    <option >Year</option>
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
                        <h3>Payment Plan</h3>
                        <div className='payScreen-container-box__installment-inputGroup'>
                            <div>
                                <input className='input-radio'
                                    type='radio'
                                    checked={selectedOption === 'option1'}
                                    onChange={() => setSelectedOption('option1')}
                                />
                                <p>One Time</p>
                            </div>
                            <div>
                                <input className='input-radio'
                                    type='radio'
                                    checked={selectedOption === 'option2'}
                                    onChange={() => setSelectedOption('option2')}
                                />
                                <p>3 Months</p>
                            </div>
                            <div>
                                <input className='input-radio'
                                    type='radio'
                                    checked={selectedOption === 'option3'}
                                    onChange={() => setSelectedOption('option3')}
                                />
                                <p>6 Months</p>
                            </div>
                            <div>
                                <input className='input-radio'
                                    type='radio'
                                    checked={selectedOption === 'option4'}
                                    onChange={() => setSelectedOption('option4')}
                                />
                                <p>9 Months</p>
                            </div>
                        </div>
                    </div>
                    <div className='payScreen-container-cardForm-check' >
                        <div className='payScreen-container-cardForm-check-control'>
                            <input
                                className='payScreen-container-cardForm-checkBox'
                                type='checkbox'
                                checked={isAgreementChecked}
                                onChange={handleAgreementChange}
                            />
                        </div>
                        <p>I have read and agree to the terms and conditions.</p>
                    </div>
                    <div className='payScreen-container__paySide' >
                        <h3 className='payScreen-container-h3' >Total Due {totalPrice} $</h3>
                        <Button className='approvalButton' onClick={handleApprovalClick} variant='secondary'>Finish & Pay Now</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PayScreenTop
