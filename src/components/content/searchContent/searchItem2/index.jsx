import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import flightPorts from '../../../../assets/flightPorts';

import './index.scss';

function SearchItem2() {
  const [pnr, setPnr] = useState('');
  const [info, setInfo] = useState(false)
  const [surname, setSurname] = useState('');

  // const passName = useSelector((state) => state.passCheck.passName);
  const pnrCode = useSelector((state) => state.passCheck.pnrCode);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
  const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

  const isLeavePort = flightPorts.ports.find((item) => item.code === flightPort);
  const isArrivePort = flightPorts.ports.find((item) => item.code === flightPortArrive);

  const leavePortExplanation = isLeavePort ? isLeavePort.explanation : '';
  const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : '';

  console.log('passunasoc', passSurname);

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

    if (isSurnameMatched && isPnrMatched) {
      setInfo(!info)
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
        {info &&
          <div className='searchItem-two__container__ports' >
            <h3>{leavePortExplanation}</h3>
            <h3>{arrivePortExplanation}</h3>
            {selectedDateFormatted}
          </div>

        }
        {/* {passName.map((name, index) => (
          <p key={index}>Adı: {name}</p>
        ))} */}
      </form>
    </div>
  );
}

export default SearchItem2;
