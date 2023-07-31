import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Input } from '@mui/material';
import Button from '@mui/material/Button';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import { setPassengerInfo } from '../../../../configure';

import './index.scss';

function PassengerPopup({ setPopup, setTicketAmount }) {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);

  const dispatch = useDispatch()

  const handleCloseClick = () => {
    setPopup(false);
  };

  useEffect(() => {
    const userTicketAmount = {
      adults: adultCount,
      children: childCount,
      babies: babyCount
    };
    console.log(userTicketAmount);
    dispatch(setPassengerInfo(userTicketAmount))
    setTicketAmount(userTicketAmount);
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

  const handleAdultChange = (e) => {
    const value = e.target.value;
    if (value >= 1) {
      setAdultCount(value);
    } else {
      setAdultCount(1);
    }
  }

  const handleChildChange = (e) => {
    setChildCount(e.target.value)
  }

  const handleBabyChange = (e) => {
    setBabyCount(e.target.value)
  }

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.passengerpopup-container')) {
      setPopup(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="passengerpopup-container">
      <div className="passengerpopup-container__adult">
        <p className="passengerpopup-container-p">Adult</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleAdultDecrement}
        />
        <Input type="number" min="1" value={adultCount} onChange={handleAdultChange} />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleAdultIncrement}
        />
      </div>
      <div className="passengerpopup-container__child">
        <p className="passengerpopup-container-p">Child (2-12 Years)</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleChildDecrement}
        />
        <Input type="number" min="0" value={childCount} onChange={handleChildChange} />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleChildIncrement}
        />
      </div>
      <div className="passengerpopup-container__baby">
        <p className="passengerpopup-container-p">Infant (0-2 Years)</p>
        <AiOutlineMinusCircle
          className="passengerpopup-container__minus-icon"
          onClick={handleBabyDecrement}
        />
        <Input type="number" min="0" value={babyCount} onChange={handleBabyChange} />
        <AiOutlinePlusCircle
          className="passengerpopup-container__plus-icon"
          onClick={handleBabyIncrement}
        />
      </div>
      <Button onClick={handleCloseClick}>Apply</Button>
    </div>
  );
}

export default PassengerPopup;
