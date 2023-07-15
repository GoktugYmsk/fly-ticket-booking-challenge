import React from 'react'

function PassengerPopup({setPopup}) {

    const handleCloseClick = () =>{
        setPopup(false)
    }

  return (
    <div>
      <p>Yetişkin</p>
      <p>Çocuk(2-12 Yaş)</p>
      <p>Bebek(0-2) Yaş</p>
      <button onClick={handleCloseClick} >Tamam</button>
    </div>
  )
}

export default PassengerPopup
