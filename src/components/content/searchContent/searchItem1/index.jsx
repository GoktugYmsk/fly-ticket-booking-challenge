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
    setIsCalendarOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date._d);
  };

  const renderCalendar = () => {
    const currentMonth = new Date().getMonth() + 1;
    const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;

    // İlgili düzenlemeler yapıldı
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
          inputProps={{ placeholder: 'Select a date' }}
          closeOnSelect
          viewMode='months'
          isValidDate={isValidDate} // isValidDate fonksiyonu kullanıldı
          renderMonth={(props, month, year) => (
            <td {...props}>
              {month === currentMonth || month === nextMonth ? (
                <div>{`${month}/${year}`}</div>
              ) : null}
            </td>
          )}
        />
      </div>
    );
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
        {isCalendarOpen && renderCalendar()}
      </div>
    </div>
  );
}

export default SearchItem1;
