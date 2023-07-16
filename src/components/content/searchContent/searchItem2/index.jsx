import React from 'react'
import Button from 'react-bootstrap/Button';

import './index.scss'

function SearchItem2() {
  return (
    <div className='searchItem-two__container' >
      <div className='searchItem-two__container-info' >
        <h5>Online Check-In Yap</h5>
        <p>Havaalanında sıra bekleme, zaman kazan.</p>
      </div>
      <form className='searchItem-two__container-form' >
        <div className='searchItem-two__container-inputBox'>
          <input type="text" placeholder='Yolcunun Soyadı' />
          <input type="text" placeholder='Telefon Numarası' />
        </div>
        <Button type="submit" variant='secondary'>Devam</Button>
      </form>
    </div>
  )
}

export default SearchItem2
