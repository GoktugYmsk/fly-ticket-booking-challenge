import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

import './index.scss'

function SearchItem2() {
  const [surname, setSurname] = useState('')
  const [pnr, setPnr] = useState('')

  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const pnrCode = useSelector((state) => state.passCheck.pnrCode);

  const handleSurnameChange = (e) => {
    setSurname(e.target.value)
  }

  const handlePnrChange = (e) => {
    setPnr(e.target.value)
  }

  const handleControlClick = () => {
    if (surname === passSurname && pnr === pnrCode) {
      alert('Yolcu bilgileri bulundu')
    }
    else if (surname != passSurname) {
      alert('Soyadı bilginizi kontrol ediniz')
    }
    else if (pnr != pnrCode) {
      alert('Pnr kodunuzu kontrol ediniz')
    }
  }


  return (
    <div className='searchItem-two__container' >
      <div className='searchItem-two__container-info' >
        <h5>Online Check-In Yap</h5>
        <p>Havaalanında sıra bekleme, zaman kazan.</p>
      </div>
      <form className='searchItem-two__container-form' >
        <div className='searchItem-two__container-inputBox'>
          <input onChange={handleSurnameChange} type="text" placeholder='Yolcunun Soyadı' />
          <input onChange={handlePnrChange} type="text" placeholder='Rezervasyon Kodu (PNR)' />
        </div>
        <Button onClick={handleControlClick} type="submit" variant='secondary'>Devam</Button>
      </form>
    </div>
  )
}

export default SearchItem2
