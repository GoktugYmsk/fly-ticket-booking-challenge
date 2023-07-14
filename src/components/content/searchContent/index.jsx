import React, { useState } from 'react';
import { FaPlaneDeparture, FaMapMarkerAlt, FaPlane, FaHotel } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

import './index.scss';

function SearchContent() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className='SearchContent-container'>
      <div className='SearchContent-container__menu'>
        <div className='SearchContent-container__menu-Item'>
          <NavLink
            to="/search/searchTicket"
            className={`SearchContent-container__menu-Item__one ${selectedItem === 'one' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('one')}
          >
            <FaPlaneDeparture className='SearchContent-container__icon' />
            <p>Ucuz Uçak Bileti Ara</p>
          </NavLink>
          <NavLink
            to="/search/Online-Check-In"
            className={`SearchContent-container__menu-Item__two ${selectedItem === 'two' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('two')}
          >
            <FaMapMarkerAlt className='SearchContent-container__icon' />
            <p>Online Check-In</p>
          </NavLink>
          <NavLink
            to="/search/Management-Flight"
            className={`SearchContent-container__menu-Item__three ${selectedItem === 'three' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('three')}
          >
            <FaPlane className='SearchContent-container__icon' />
            <p>Uçuşunu Yönet</p>
          </NavLink>
          <NavLink
            to="/search/Vehicel-rent-accomodation"
            className={`SearchContent-container__menu-Item__four ${selectedItem === 'four' ? 'SearchContent-container-item__active' : ''}`}
            onClick={() => handleItemClick('four')}
          >
            <FaHotel className='SearchContent-container__icon' />
            <p>Araç Kiralama / Konaklama</p>
          </NavLink>

        </div>

      <article>
        <Outlet />
      </article>
      </div>
    </div>
  );
}

export default SearchContent;
