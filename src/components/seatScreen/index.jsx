import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeat } from '../configure';
import './index.scss';

function SeatScreen() {
    const rightFlap = 'https://web.flypgs.com/img/wing.svg?a3a604d6d5194901185d1db932b59498';
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [reservedSeats, setReservedSeats] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSeatClick = (row, seatNumber) => {
        dispatch(setSeat(''));
        const seat = { row, seatNumber };
        setSelectedSeat(seat);
    };

    const handleReservation = () => {
        if (selectedSeat) {
            const updatedReservedSeats = [...reservedSeats, selectedSeat];
            localStorage.setItem('seat', JSON.stringify(updatedReservedSeats));

            setSelectedSeat(null);
            setReservedSeats(updatedReservedSeats);
            dispatch(setSeat({ selectedSeat }));
            navigate('/pay-screen')
        }
    };

    useEffect(() => {
        const storedReservedSeats = JSON.parse(localStorage.getItem('seat')) || [];
        setReservedSeats(storedReservedSeats);
        dispatch(setSeat(storedReservedSeats));
    }, [dispatch]);


    function renderSeatsSecond() {
        const rows = [];
        for (let j = 1; j <= 33; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = reservedSeats.some(seat => seat.row === j && seat.seatNumber === i);
                const isSelected = selectedSeat && selectedSeat.row === j && selectedSeat.seatNumber === i;
                rowSeats.push(
                    <React.Fragment key={i}>
                        <div
                            className={`seat ${isReserved ? 'reserved' : ''}${isSelected ? 'selected' : ''}`}
                            key={`seat-${j}-${i}`}
                            onClick={() => handleSeatClick(j, i)}
                        >
                            {i}
                        </div>
                        {i === 3 && <div className='seat-gap' key={`gap-${j}-${i}`} />}
                    </React.Fragment>
                );
            }
            rows.push(<div className='seat-row' key={j}>{rowSeats}</div>);
        }
        return rows;
    }

    return (
        <>
            <div className='chairScreen-container'>
                <div className='chairScreen-container-content'>
                    <div className='flapleft'>
                        <img src={rightFlap} alt='flapleft' />
                    </div>
                    <div className='chairScreen-container__box'>
                        <div className='chairScreen-container__box-passengerSide-first'>
                            <div className='chairScreen-container__box-passengerSide-second'>
                                <div className='second-seat'>{renderSeatsSecond()}</div>
                            </div>
                        </div>
                    </div>
                    <div className='flapright'>
                        <img src={rightFlap} alt='flapright' />
                    </div>
                </div>
            </div>
            {selectedSeat && (
                <div className='seat-popup'>
                    <h2>Seat Info:</h2>
                    <p>Row: {selectedSeat.row}</p>
                    <p>SeatNumber: {selectedSeat.seatNumber}</p>
                    <button onClick={handleReservation}>Devam Et</button>
                </div>
            )}
        </>
    );
}

export default SeatScreen;
