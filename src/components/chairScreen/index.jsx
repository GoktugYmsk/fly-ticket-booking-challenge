import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

import './index.scss';

const reservedSeats = [
    { row: 1, seatNumber: 3 },
    { row: 2, seatNumber: 2 },
    // Add other reserved seats here...
];


function generateSeatNumber(row, seatNumber) {
    // Assuming there are 6 seats in each row
    const totalSeatsInRow = 6;
    // Calculate a unique number for each seat based on its row and seat number
    const seatIndex = (row - 1) * totalSeatsInRow + seatNumber;
    return seatIndex;
}


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
    function renderSeatsFirst() {
        const seats = [];
        for (let i = 1; i <= 6; i++) {
            const isReserved = isSeatReserved(1, i);
            const seatStyle = {
                backgroundColor: selectedSeat?.row === 1 && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
            };

            seats.push(
                <div className='seat' key={i} onClick={() => handleSeatClick(1, i)} style={seatStyle}>
                    {i}
                </div>
            );
        }
        return seats;
    }

    function renderSeatsSecond() {
        const rows = [];
        for (let j = 1; j <= 6; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const seatStyle = {
                    backgroundColor: selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
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

    function renderSeatsThird() {
        const rows = [];
        for (let j = 1; j <= 10; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const seatStyle = {
                    backgroundColor: selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div className='seat' key={`seat-${j}-${i}`} onClick={() => handleSeatClick(j, i)} style={seatStyle}>
                            {i}
                        </div>
                        {i === 3 && <div className='seat-gap-third' key={`gap-${j}-${i}`} />}
                    </React.Fragment>
                );
            }
            rows.push(<div className='seat-row' key={j}>{rowSeats}</div>);
        }
        return rows;
    }

    function renderSeatsFourth() {
        const seats = [];
        for (let i = 1; i <= 6; i++) {
            const isReserved = isSeatReserved(1, i);
            const seatStyle = {
                backgroundColor: selectedSeat?.row === 1 && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
            };

            seats.push(
                <div className='seat' key={i} onClick={() => handleSeatClick(1, i)} style={seatStyle}>
                    {i}
                </div>
            );
        }
        return seats;
    }

    function renderSeatsFifth() {
        const seats = [];
        for (let i = 1; i <= 6; i++) {
            const isReserved = isSeatReserved(1, i);
            const seatStyle = {
                backgroundColor: selectedSeat?.row === 1 && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
            };

            seats.push(
                <div className='seat' key={i} onClick={() => handleSeatClick(1, i)} style={seatStyle}>
                    {i}
                </div>
            );
        }
        return seats;
    }

    function renderSeatsSixth() {
        const rows = [];
        for (let j = 1; j <= 9; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const seatStyle = {
                    backgroundColor: selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div className='seat' key={`seat-${j}-${i}`} onClick={() => handleSeatClick(j, i)} style={seatStyle}>
                            {i}
                        </div>
                        {i === 3 && <div className='seat-gap-sixth' key={`gap-${j}-${i}`} />}
                    </React.Fragment>
                );
            }
            rows.push(<div className='seat-row' key={j}>{rowSeats}</div>);
        }
        return rows;
    }

    function renderSeatsSeventh() {
        const seats = [];
        for (let i = 1; i <= 6; i++) {
            const isReserved = isSeatReserved(1, i);
            const seatStyle = {
                backgroundColor: selectedSeat?.row === 1 && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
            };

            seats.push(
                <div className='seat' key={i} onClick={() => handleSeatClick(1, i)} style={seatStyle}>
                    {i}
                </div>
            );
        }
        return seats;
    }

    function renderSeatsEighth() {
        const rows = [];
        for (let j = 1; j <= 11; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const seatStyle = {
                    backgroundColor: selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved ? 'red' : ''
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div className='seat' key={`seat-${j}-${i}`} onClick={() => handleSeatClick(j, i)} style={seatStyle}>
                            {i}
                        </div>
                        {i === 3 && <div className='seat-gap-eighth' key={`gap-${j}-${i}`} />}
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
                        <h3>Ön Sıra XL 753.00 TL</h3>
                        <p>Ekstra Diz Mesafesi</p>
                        <p>Erken İniş İmkanı</p>
                        <p>Servis Başlangıç Noktası</p>
                        <div className='first-seat'>{renderSeatsFirst()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-second'>
                        <h3>Ön Sıra XL 753.00 TL</h3>
                        <div className='second-seat'>{renderSeatsSecond()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-third'>
                        <h3>Ön Sıra Keyfi 482.00 TL</h3>
                        <div className='third-seat'>{renderSeatsThird()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-fourth'>
                        <h3>Ekstra Diz Mesafesi 723.00 TL</h3>
                        <p>Sizin için daha çok alan</p>
                        <p>Çıkış</p>
                        <div className='fourth-seat'>{renderSeatsFourth()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-fifth'>
                        <p>Çıkış</p>

                        <div className='fifth-seat'>{renderSeatsFifth()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-sixth'>
                        <h3>Standart 422.00 TL</h3>
                        <p>Cam Kenarı, Koridor, Orta Koltuk</p>
                        <div className='sixth-seat'>{renderSeatsSixth()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-seventh'>
                        <h3>Ekstra Diz Mesafesi 723.00 TL</h3>
                        <p>Çıkış</p>
                        <div className='seventh-seat'>{renderSeatsSeventh()}</div>
                    </div>
                    <div className='chairScreen-container__box-passengerSide-eighth'>
                        <h3>Standart 422.00 TL</h3>
                        <p>Cam Kenarı, Koridor, Orta Koltuk</p>
                        <div className='eighth-seat'>{renderSeatsEighth()}</div>
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
