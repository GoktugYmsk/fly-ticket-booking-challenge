import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FaPlaneDeparture, FaPlane, FaHotel, FaCheck } from 'react-icons/fa';

import SearchItem1 from './searchItem1';
import SearchItem2 from './searchItem2';
import SearchItem3 from './searchItem3';
import SearchItem4 from './searchItem4';

import { setRefreshPassenger } from '../../configure';
import './index.scss';

function SearchContent() {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [babyCount, setBabyCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState('one');

  const dispatch = useDispatch()

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  let content;
  if (selectedItem === 'one') {
    content = <SearchItem1 />;
  } else if (selectedItem === 'two') {
    content = <SearchItem2 />;
  } else if (selectedItem === 'three') {
    content = <SearchItem3 />;
  } else if (selectedItem === 'four') {
    content = <SearchItem4 />;
  }

  const userTicketAmount = {
    adults: adultCount,
    children: childCount,
    babies: babyCount
  };

  useEffect(() => {
    dispatch(setRefreshPassenger(userTicketAmount))
  }, [])

  return (
    <div className='SearchContent-container'>
      <div className='SearchContent-container__menu'>
        <div className='SearchContent-container__menu-Item'>
          <div
            className={`SearchContent-container__menu-Item__one ${selectedItem === 'one' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('one')}
          >
            <FaPlaneDeparture className='SearchContent-container__icon' />
            <p>Search For Flights</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__two ${selectedItem === 'two' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('two')}
          >
            <FaCheck className='SearchContent-container__icon' />
            <p>Online Check-In</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__three ${selectedItem === 'three' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('three')}
          >
            <FaPlane className='SearchContent-container__icon' />
            <p>Manage Your Flight</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__four ${selectedItem === 'four' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('four')}
          >
            <FaHotel className='SearchContent-container__icon' />
            <p>Car Rental / Hotels</p>
          </div>
        </div>
      </div>
      <article>
        {content}
      </article>
    </div>
  );
}

export default SearchContent;
