import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'react-datetime/css/react-datetime.css';

import SearchContentAlt from './searchContentAlt';
import PassengerPopup from './popup';

import { setFlightPort, setFlightPortArrive, setSelectedDate } from '../../../configure';

import './index.scss';

function SearchItem1() {
  const [popup, setPopup] = useState(false);
  const [openPorts, setOpenPorts] = useState(false);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [renderedPorts, setRenderedPorts] = useState([]);
  const [openPortsWhere, setOpenPortsWhere] = useState(false);
  const [renderedPortsArr, setRenderedPortsArr] = useState([]);
  const [selectedExplanation, setSelectedExplanation] = useState('');
  const [selectedExplanationRight, setSelectedExplanationRight] = useState('');
  const [selectedExplanationArrive, setSelectedExplanationArrive] = useState('');
  const [ticketAmount, setTicketAmount] = useState({ adults: 1, children: 0, babies: 0 });

  const flightPortData = useSelector((state) => state.portsData.flightPortData);

  const dispatch = useDispatch();

  const handleSwitchChange = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  useEffect(() => {
    dispatch(setSelectedDate(new Date()));
  }, []);

  const handlePortClick = (explanationCode) => {
    const selectedPort = flightPortData?.data.find((port) => port.code === explanationCode);
    if (selectedPort) {
      setSelectedExplanation(selectedPort.explanation);
      dispatch(setFlightPort(selectedPort.code));
      setOpenPortsWhere(true);
      setOpenPorts(false);
    }
  };

  const handlePortClickRigth = (explanationCode) => {
    const selectedPortArrive = flightPortData?.data.find((port) => port.code === explanationCode);
    if (selectedPortArrive) {
      setSelectedExplanationArrive(selectedPortArrive.explanation)
      dispatch(setFlightPortArrive(selectedPortArrive.code));
      setSelectedExplanationRight(selectedPortArrive.explanation);
      setOpenPortsWhere(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest('.searchItem-one__container-port')) {
      setOpenPorts(false);
      setOpenPortsWhere(false);
    }
  };

  useEffect(() => {
    if (selectedExplanationRight) {
      setOpenPortsWhere(false);
      setOpenPorts(false);
    }
  }, [selectedExplanationRight]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const inputValue = selectedExplanation.toLowerCase();
    const filteredPorts = flightPortData?.data.filter((port) =>
      port.explanation.toLowerCase().includes(inputValue)
    );

    const updatedRenderedPorts = filteredPorts.map((port, key) => (
      <div key={key} onClick={() => handlePortClick(port.code)}>
        <p>{port.explanation}</p>
      </div>
    ));

    setRenderedPorts(updatedRenderedPorts);
  }, [selectedExplanation]);

  useEffect(() => {
    const inputValueArrive = selectedExplanationArrive.toLocaleLowerCase()
    const filteredPortsArrive = flightPortData?.data.filter((port) =>
      port.explanation.toLowerCase().includes(inputValueArrive));

    const updatePortsArr = filteredPortsArrive.map((port, key) => (
      <div key={key} onClick={() => handlePortClickRigth(port.code)}>
        <p>{port.explanation}</p>
      </div>
    ))
    setRenderedPortsArr(updatePortsArr)
  }, [selectedExplanationArrive])

  return (
    <>
      <div className='searchItem-one__container'>
        <div className='searchItem-one__container-slider'>
          <label className="switch">
            <input
              type='checkbox'
              checked={isRoundTrip}
              onChange={handleSwitchChange}
            />
            <span className='switch-slider'>
              <p>One-Way</p>
              <p>Round-Trip</p>
            </span>
          </label>
        </div>
        <SearchContentAlt setSelectedExplanation={setSelectedExplanation}
          setSelectedExplanationArrive={setSelectedExplanationArrive}
          setOpenPorts={setOpenPorts} selectedExplanation={selectedExplanation}
          selectedExplanationArrive={selectedExplanationArrive}
          openPorts={openPorts}
          setOpenPortsWhere={setOpenPortsWhere}
          setPopup={setPopup}
          openPortsWhere={openPortsWhere}
          selectedExplanationRight={selectedExplanationRight}
          ticketAmount={ticketAmount}
          isRoundTrip={isRoundTrip}
        />
      </div>
      {popup && <PassengerPopup setTicketAmount={setTicketAmount} setPopup={setPopup} />}
      <div className='searchItem-one__container-port'>
        {openPorts && (
          <div className='searchItem-one__container-place__ports'>
            {renderedPorts}
          </div>
        )}
        {openPortsWhere && (
          <div className='searchItem-one__container-place__ports-right'>
            {renderedPortsArr}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchItem1;
