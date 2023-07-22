import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import './index.scss';

function SearchItem2() {
  const [surname, setSurname] = useState('');
  const [pnr, setPnr] = useState('');

  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const pnrCode = useSelector((state) => state.passCheck.pnrCode);

  console.log('passunasoc', passSurname);

  const handleSurnameChange = (e) => {
    setSurname(e.target.value);
  };

  const handlePnrChange = (e) => {
    setPnr(e.target.value);
  };

  const handleControlClick = () => {
    const passSurnameFilter = passSurname.map((item) => item);
    const pnrCodeFilter = pnrCode.map((item) => item);

    const isSurnameMatched = passSurnameFilter.includes(surname);
    const isPnrMatched = pnrCodeFilter.includes(pnr);

    if (isSurnameMatched && isPnrMatched) {
      alert('Yolcu bilgileri bulundu');
    } else if (!isSurnameMatched) {
      alert('Soyadı bilginizi kontrol ediniz');
    } else if (!isPnrMatched) {
      alert('PNR kodunuzu kontrol ediniz');
    }
  };

  return (
    <div className='searchItem-two__container'>
      <form className='searchItem-two__container-form'>
        <div className='searchItem-two__container-inputBox'>
          <input onChange={handleSurnameChange} type="text" placeholder='Last Name' />
          <input onChange={handlePnrChange} type="text" placeholder='PNR Code' />
        </div>
        <Button className='searchItem-two__container-button' onClick={handleControlClick} type="button" variant='secondary'>Continue</Button>
      </form>
    </div>
  );
}

export default SearchItem2;
