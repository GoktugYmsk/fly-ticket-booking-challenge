import React, { useEffect, useState } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import './index.scss';

function PassengerPopup({ setPopup, setTicketAmount }) {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);

  const handleCloseClick = () => {
    setPopup(false);
  };

  useEffect(() => {
    const UserTicketAmount = {
      adults: adultCount,
      children: childCount,
      babies: babyCount
    };
    console.log(UserTicketAmount);
    setTicketAmount(UserTicketAmount);
  }, [adultCount, childCount, babyCount, setTicketAmount]);

  const handleAdultIncrement = () => {
    setAdultCount(adultCount + 1);
  };

  const handleAdultDecrement = () => {
    if (adultCount > 1) {
      setAdultCount(adultCount - 1);
    }
  };

  const handleChildIncrement = () => {
    setChildCount(childCount + 1);
  };

  const handleChildDecrement = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  const handleBabyIncrement = () => {
    setBabyCount(babyCount + 1);
  };

  const handleBabyDecrement = () => {
    if (babyCount > 0) {
      setBabyCount(babyCount - 1);
    }
  };

  const handleAdultChange = (e) =>{
    const value = e.target.value;
    if (value >= 1) {
      setAdultCount(value);
    } else {
      setAdultCount(1);
    }
  }

  const handleChildChange = (e) =>{
    setChildCount(e.target.value)
  }
  
  const handleBabyChange = (e) =>{
    setBabyCount(e.target.value)
  }

  return (
    <div className="passengerpopup-container">
      <div className="passengerpopup-container__adult">
        <p className="passengerpopup-container-p">Yetişkin</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleAdultDecrement}
        />
        <input type="number" min="1" value={adultCount} onChange={handleAdultChange} />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleAdultIncrement}
        />
      </div>
      <div className="passengerpopup-container__child">
        <p className="passengerpopup-container-p">Çocuk (2-12 Yaş)</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleChildDecrement}
        />
        <input type="number" min="0" value={childCount} onChange={handleChildChange}  />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleChildIncrement}
        />
      </div>
      <div className="passengerpopup-container__baby">
        <p className="passengerpopup-container-p">Bebek (0-2 Yaş)</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleBabyDecrement}
        />
        <input type="number" min="0" value={babyCount} onChange={handleBabyChange} />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleBabyIncrement}
        />
      </div>
      <button onClick={handleCloseClick}>Tamam</button>
    </div>
  );
}

export default PassengerPopup;
