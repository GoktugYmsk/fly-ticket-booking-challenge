import React, { useState } from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import './index.scss';

function SearchItem1() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date._d);
  };

  return (
    <div className='SearchItem-one__container'>
      <div>
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
      <div className='travel-date' onClick={handleCalendarClick}>
        <p>Travel Date</p>
        {isCalendarOpen && (
          <div className='calendar'>
            <DateTime
              value={selectedDate}
              onChange={handleDateChange}
              dateFormat='DD/MM/YYYY'
              timeFormat={false}
              inputProps={{ placeholder: 'Select a date' }}
              closeOnSelect
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchItem1;
