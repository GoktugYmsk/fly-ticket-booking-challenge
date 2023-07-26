import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './index.scss';

const reservedSeats = [
    { row: 1, seatNumber: 3 },
    { row: 2, seatNumber: 2 },
];

function ChairScreen() {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const rigthFlap = 'https://web.flypgs.com/img/wing.svg?a3a604d6d5194901185d1db932b59498';

    const handleSeatClick = (row, seatNumber) => {
        setSelectedSeat({ row, seatNumber });
    };

    useEffect(() => {
        console.log('selectedSeatInfo:', selectedSeat);
    }, [selectedSeat]);

    const isSeatReserved = (row, seatNumber) => {
        return reservedSeats.some((seat) => seat.row === row && seat.seatNumber === seatNumber);
    };

    function renderSeatsSecond() {
        const rows = [];
        for (let j = 1; j <= 33; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const isSelected = selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved;
                const seatStyle = {
                    backgroundColor: isReserved ? 'red' : isSelected ? 'red' : 'green',
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div className='seat' key={`seat-${j}-${i}`} onClick={() => handleSeatClick(j, i)} style={seatStyle}>
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
        <div className='chairScreen-container'>
            <div className='chairScreen-container-content'>
                <div className='flapleft'>
                    <img src={rigthFlap} alt='flapleft' />
                </div>
                <div className='chairScreen-container__box'>
                    <div className='chairScreen-container__box-passengerSide-first'>
                        <div className='chairScreen-container__box-passengerSide-second'>
                            <div className='second-seat'>{renderSeatsSecond()}</div>
                        </div>
                    </div>
                </div>
                <div className='flapright'>
                    <img src={rigthFlap} alt='flapright' />
                </div>
            </div>
        </div>
    );
}

export default ChairScreen;
