import React from 'react';
import { FaPlaneDeparture, FaMapMarkerAlt, FaPlane, FaHotel } from 'react-icons/fa';

import './index.scss';

function SearchContent() {
  return (
    <div className='SearchContent-container'>
      <div className='SearchContent-container__menu'>
        <div className='SearchContent-container__menu-Item' >
          <div className='SearchContent-container__menu-Item__one' >
            <FaPlaneDeparture className='SearchContent-container__icon'/>
            <p>Ucuz Uçak Bileti Ara</p>
          </div>
          <div className='SearchContent-container__menu-Item__two' >
            <FaMapMarkerAlt className='SearchContent-container__icon'/>
            <p>Online Check-In</p>
          </div>
          <div className='SearchContent-container__menu-Item__three' >
            <FaPlane className='SearchContent-container__icon'/>
            <p>Uçuşunu Yönet</p>
          </div>
          <div className='SearchContent-container__menu-Item__four' >
            <FaHotel className='SearchContent-container__icon'/>
            <p>Araç Kiralama / Konaklama</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchContent;
