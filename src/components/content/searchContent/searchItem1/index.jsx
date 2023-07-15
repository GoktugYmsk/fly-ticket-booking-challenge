import React, { useState } from 'react';
import DateTime from 'react-datetime';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import PassengerPopup from './popup';
import 'react-datetime/css/react-datetime.css';

import './index.scss';

function SearchItem1() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [popup, setPopup] = useState(false)

  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date._d);
  };

  const renderCalendar = () => {
    const currentMonth = new Date().getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

    const isValidDate = (current) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

      return (
        current.toDate().getMonth() === currentMonth - 1 ||
        current.toDate().getMonth() === nextMonth - 1
      ) && current.toDate() >= currentDate;
    };

    return (
      <div className='calendar'>
        <DateTime
          value={selectedDate}
          onChange={handleDateChange}
          dateFormat='DD/MM/YYYY'
          timeFormat={false}
          closeOnSelect
          viewMode='months'
          isValidDate={isValidDate}
          renderMonth={(props, month, year) => (
            <div {...props}>
              {month === currentMonth || month === nextMonth ? (
                <div>{`${month}/${year}`}</div>
              ) : null}
            </div>
          )}
        />
      </div>
    );
  };

  const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day} ${getMonthName(month)} ${year}`;
  };

  const handleOpenPOpup = () => {
    setPopup(true)
  }

  const getNextDay = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const nextDay = currentDate.getDate();
    const nextMonth = currentDate.getMonth() + 1;
    const nextYear = currentDate.getFullYear();

    return `${nextDay} ${getMonthName(nextMonth)} ${nextYear}`;
  };

  const getMonthName = (month) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    return monthNames[month - 1];
  };

  return (
    <>
      <div className='searchItem-one__container'>
        <div className='searchItem-one__container-slider' >
          <label className={`switch ${isRoundTrip ? 'switch-right' : 'switch-left'}`}>
            <input
              type='checkbox'
              checked={isRoundTrip}
              onChange={handleSwitchChange}
            />
            <span className='switch-slider'></span>
          </label>
          <p>{isRoundTrip ? 'Gidiş-Dönüş' : 'Tek Yön'}</p>
        </div>
        <div className='searchItem-one__container__content' >
          <div className='searchItem-one__container-place' >
            <p>Nerden</p>
            <FaExchangeAlt />
            <p>Nereye</p>
          </div>
          <div className='travel-date' onClick={handleCalendarClick}>
            <p>Travel Date</p>
            <p className='SearchItem-one__container-travelDate'>
              {selectedDate ? getFormattedDate(selectedDate) : getNextDay()}
            </p>
            {isCalendarOpen && renderCalendar()}
          </div>
          <div>
            <FaCalendarAlt />
            <p>Tek Yön </p>
          </div>
          <div className='searchItem-one__container-passenger-amount' >
            <h3>Yolcu</h3>
            <p onClick={handleOpenPOpup} >1 Yetişkin</p>
          </div>
          <Button variant="secondary">Ucuz Uçuş Bileti Ara</Button>{' '}
        </div>
      </div>
      {popup &&
        <PassengerPopup setPopup={setPopup}/>
      } 
    </>
  );
}

export default SearchItem1;
