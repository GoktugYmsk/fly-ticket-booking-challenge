import React, { useEffect, useState } from 'react';
import { FaPlaneDeparture, FaMapMarkerAlt, FaPlane, FaHotel } from 'react-icons/fa';
import { setPassName, setPassSurname, setRefreshPassenger } from '../../configure';

import SearchItem1 from './searchItem1';
import SearchItem2 from './searchItem2';
import SearchItem3 from './searchItem3';
import SearchItem4 from './searchItem4';

import './index.scss';
import { useDispatch, useSelector } from 'react-redux';

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

  // useEffect(() => {
  //   dispatch(setPassName(''))
  //   dispatch(setPassSurname(''))
  // }, [])


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
            <p>Ucuz Uçak Bileti Ara</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__two ${selectedItem === 'two' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('two')}
          >
            <FaMapMarkerAlt className='SearchContent-container__icon' />
            <p>Online Check-In</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__three ${selectedItem === 'three' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('three')}
          >
            <FaPlane className='SearchContent-container__icon' />
            <p>Uçuşunu Yönet</p>
          </div>
          <div
            className={`SearchContent-container__menu-Item__four ${selectedItem === 'four' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('four')}
          >
            <FaHotel className='SearchContent-container__icon' />
            <p>Araç Kiralama / Konaklama</p>
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
