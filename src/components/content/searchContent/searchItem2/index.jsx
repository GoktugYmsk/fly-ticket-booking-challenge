import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';


import './index.scss';

function SearchItem2() {
  const [pnr, setPnr] = useState('');
  const [info, setInfo] = useState(false)
  const [surname, setSurname] = useState('');

  const seat = useSelector((state) => state.seatReserve.seat);
  const pnrCode = useSelector((state) => state.passCheck.pnrCode);
  const passName = useSelector((state) => state.passCheck.passName);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
  const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);
  const flightPortData = useSelector((state) => state.optionDateArr.flightPortData);

  const isLeavePort = flightPortData.data.find((item) => item.code === flightPort);
  const isArrivePort = flightPortData.data.find((item) => item.code === flightPortArrive);

  const leavePortExplanation = isLeavePort ? isLeavePort.explanation : '';
  const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : '';

  console.log('passunasoc', passSurname, pnrCode);
  console.log('pnrCode', pnrCode)

  console.log('SEAT-2', seat[0])

  console.log('passNameSearch', passName)

  const selectedDateFormatted = selectedDate instanceof Date ? selectedDate.toDateString() : '';

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

    const isIndexMatched = passSurname.length === pnrCode.length &&
      passSurname.findIndex((item, index) => item === surname && pnrCode[index] === pnr) !== -1;

    if (isSurnameMatched && isPnrMatched && isIndexMatched) {
      setInfo(true)
    } else if (!isSurnameMatched) {
      alert('Soyadı bilginizi kontrol ediniz');
    } else if (!isPnrMatched) {
      alert('PNR kodunuzu kontrol ediniz');
    } else if (!isIndexMatched) {
      alert('Soyadı ve PNR kodunuzu kontrol ediniz');
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
        {info && (
          < div className='searchItem-two__container__ports' >
            <div className='searchItem-two__container__ports-info' >
              <p>{leavePortExplanation}</p><i class="fas fa-chevron-right"></i><p>{arrivePortExplanation}</p>
            </div>
            <div className='passenger-seat'>
              {passName?.map((name, passIndex) => {
                if (passSurname[passIndex] === surname && pnrCode[passIndex] === pnr) {
                  return (
                    <div className='passenger-seat-div1' key={passIndex}>
                      {seat.map((seat, key) => (
                        <div className='passenger-seat-div2' key={key} >
                          <p className='passenger-seat-div2-p'>{name} {surname}</p>
                          <p>{seat[passIndex].row}/{seat[passIndex].seatNumber}</p>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className='passenger-date'>
              <p>{selectedDateFormatted}</p>
            </div>
            
          </div>
        )}
      </form >
    </div >
  );
}

export default SearchItem2;
