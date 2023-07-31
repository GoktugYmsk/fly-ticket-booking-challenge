import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CalendarRigth from '../calendarRight';
import CalenderLeft from '../calendarLeft';

import Button from 'react-bootstrap/Button';
import { FaExchangeAlt } from 'react-icons/fa';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import { setSelectedDate, setReturnDate, setPnrCode, setPassName, setPassSurname, setFlightTicketReturn } from '../../../../configure';

function SearchContentAlt({ setSelectedExplanation,
    setSelectedExplanationArrive,
    setOpenPorts,
    selectedExplanation,
    setPopup,
    selectedExplanationArrive,
    openPorts,
    setOpenPortsWhere,
    openPortsWhere,
    selectedExplanationRight,
    ticketAmount,
    isRoundTrip,
}) {
    const [isCalendarOpen, setIsCalendarOpen] = useState(true);

    const returnDate = useSelector((state) => state.optionDateArr.returnDate);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCalendarClick = () => {
        setIsCalendarOpen(true);
    };

    const handleDateChange = (date) => {
        dispatch(setSelectedDate(date._d))
    };

    const handleDateChangeArrive = (date) => {
        dispatch(setReturnDate(date._d))
    };

    const handleOpenPopup = () => {
        setPopup(true);
    };
    const handleExchangeClick = () => {
        const changePort = selectedExplanation;
        setSelectedExplanation(selectedExplanationArrive);
        setSelectedExplanationArrive(changePort);
    };


    const handlePortOpenClick = () => {
        setOpenPorts(!openPorts);
    };

    const handlePortOpenClickRight = () => {
        setOpenPortsWhere(!openPortsWhere);
        setOpenPorts(false);
    };

    const getMonthName = (month) => {
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        return monthNames[month - 1];
    };

    const totalPassenger = ticketAmount.adults + ticketAmount.children + ticketAmount.babies;

    const renderPassengerAmount = () => {
        const childCount = ticketAmount.children;
        const babyCount = ticketAmount.babies;

        if (childCount > 0) {
            return (
                <>
                    {childCount > 0 && `${childCount}...`}
                    {babyCount > 0 && ``}
                </>
            );
        } else if (babyCount > 0) {
            return (
                <>
                    {babyCount > 0 && `${babyCount}...`}
                </>
            );
        } else {
            return (
                <>
                    ... Çocuk
                    ... Bebek
                </>
            );
        }
    };

    const navigateToCompanies = () => {
        if (selectedExplanation && selectedExplanationRight) {
            dispatch(setPnrCode(''))
            dispatch(setPassName(''))
            dispatch(setPassSurname(''))
            sessionStorage.setItem('totalPassenger', totalPassenger);
            navigate('/fly-companies');
            if (!returnDate) {
                dispatch(setFlightTicketReturn(''))
            }
        }
        else {
            alert('Please pick "from" and "to" destionations.');
        }
    };

    const getNextDay = () => {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const nextDay = currentDate.getDate();
        const nextMonth = currentDate.getMonth() + 1;
        const nextYear = currentDate.getFullYear();

        return `${nextDay} ${getMonthName(nextMonth)} ${nextYear}`;
    };

    return (
        <div className='searchItem-one__container__content'>
            <div className='searchItem-one__container-place'>
                <div onClick={handlePortOpenClick} className='searchItem-one__container-place__ports-one'>
                    <input placeholder="From" value={selectedExplanation} onChange={(e) => setSelectedExplanation(e.target.value)} />
                    <hr />
                </div>
                <FaExchangeAlt className='exchangeIcon' onClick={handleExchangeClick} />
                <div onClick={handlePortOpenClickRight} className='searchItem-one__container-place__ports-one'>
                    <input placeholder="To" value={selectedExplanationArrive} onChange={(e) => setSelectedExplanationArrive(e.target.value)} />
                    <hr />
                </div>
            </div>
            <div className='searchItem-one__container__chose-travelDate'>
                <div className='travel-date' onClick={handleCalendarClick}>
                    <p>Depart</p>
                    <p className='SearchItem-one__container-travelDate'>
                        {isCalendarOpen &&
                            <CalenderLeft handleDateChange={handleDateChange} getNextDay={getNextDay} />
                        }
                    </p>
                </div>
                <div className='searchItem-one__container-return'>
                    <p className='searchItem-one__container-return-p'>
                        {isRoundTrip ? 'Return' : ''}
                        {isRoundTrip &&
                            <CalendarRigth handleDateChangeArrive={handleDateChangeArrive} getNextDay={getNextDay} />
                        }
                    </p>
                </div>
            </div>
            <div className='searchItem-one__container-passenger-amount'>
                <p>Passengers</p>
                {ticketAmount.adults > 0 && (
                    <h2 onClick={handleOpenPopup}>{`${ticketAmount.adults} Adult`}</h2>
                )}
                {(ticketAmount.children > 0 || ticketAmount.babies > 0) && (
                    <h2 onClick={handleOpenPopup}>{renderPassengerAmount()}</h2>
                )}
            </div>
            <Button className='searchItem-one__search-button' onClick={navigateToCompanies} variant='secondary'>
                <PiMagnifyingGlassBold />
            </Button>
        </div>
    )
}

export default SearchContentAlt
