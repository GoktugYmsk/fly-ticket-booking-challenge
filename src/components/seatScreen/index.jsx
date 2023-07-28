import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../header';
import { setSeat } from '../configure';
import Footer from '../footer';
import './index.scss';

function SeatScreen() {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [popup, setPopup] = useState(false);
    const [seatArr, setSeatArr] = useState([]);
    const [deneme, setDeneme] = useState([])

    const passName = useSelector((state) => state.passCheck.passName);
    const passSurname = useSelector((state) => state.passCheck.passSurname);

    const seat = useSelector((state) => state.seatReserve.seat);

    console.log('SEATCONTROL', seat);

    const totalPassenger = sessionStorage.getItem('totalPassenger');

    // useEffect(() => {
    //     const seatLocale = JSON.parse(localStorage.getItem('seat')) || [];
    //     setReservedSeats(seatLocale);
    // }, [seat]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSeatClick = (row, seatNumber) => {
        const isReserved = reservedSeats.some(seatInfo => seatInfo.row === row && seatInfo.seatNumber === seatNumber);
        if (!isReserved) {
            dispatch(setSeat(''));
            const seatTotal = { row, seatNumber };
            setSelectedSeat(seatTotal);
            setSeatArr([...seatArr, seatTotal]);
            setDeneme([...deneme, seatTotal]);

        }
    };

    const handleReservation = () => {
        if (selectedSeat) {
            const updatedReservedSeats = [...reservedSeats, ...seatArr];
            localStorage.setItem('seat', JSON.stringify(updatedReservedSeats));
            setSelectedSeat(null);
            dispatch(setSeat([seatArr]));
            setPopup(false);
            navigate('/pay-screen');
        }
    };


    useEffect(() => {
        const seatLocale = JSON.parse(localStorage.getItem('seat')) || [];
        setReservedSeats(seatLocale);
        console.log('reservedSeats', reservedSeats);
    }, [popup]);



    const handleKeyPress = (e) => {
        if (e.key === 'Escape') {
            setSeatArr([]);
            setDeneme('')
            setPopup(false);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        if (deneme.length === parseInt(totalPassenger)) {
            setPopup(true);
        } else {
            setPopup(false);
        }
    }, [deneme.length, totalPassenger]);

    function renderSeatsSecond() {
        const rows = [];
        for (let j = 1; j <= 23; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = reservedSeats.some(seat => seat.row === j && seat.seatNumber === i);
                const isSelected = seatArr.some(seat => seat.row === j && seat.seatNumber === i);
                const seatStyle = {
                    backgroundColor: isReserved ? 'rgb(44, 56, 85)' : isSelected ? 'rgb(83, 106, 160)' : 'rgb(240, 105, 60)',
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div
                            className='seat'
                            key={`seat-${j}-${i}`}
                            onClick={() => handleSeatClick(j, i)}
                            style={seatStyle}
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
            <Header className='header'>
            </Header><div className='chairScreen-container-content'>
                {popup && (
                    <div className='seat-popup__bottom'>
                        <p>koltuk seçimini onaylıyor musunuz ?</p>
                        <button onClick={handleReservation}>Devam Et</button>
                    </div>
                )}
                <div className='upper_div'>
                    <h2>Choose Your Seat</h2>
                    <button >Skip</button>
                </div>
                <div class="line_horizontal"></div>
                <div className='middle_div'>
                    <div className='chairScreen-container__box'>
                        <div className='chairScreen-container__box-passengerSide-first'>
                            <div className='chairScreen-container__box-passengerSide-second'>
                                <div className='second-seat'>{renderSeatsSecond()}</div>
                            </div>
                        </div>
                    </div>
                    <img className='plane_top_view' src="https://www.delta.com/content/dam/delta-www/responsive/airports-aircraft/Boeing/LOPA/757-200-75d-seat-map-static-mobile.png" alt="plane" />
                    <div className='legend'><div className='legend_item'><div className='legend_box_taken'></div><span>Taken</span></div>
                        <div className='legend_item'><div className='legend_box_selected'></div><span>Selected</span></div>
                        <div className='legend_item'><div className='legend_box_empty'></div><span>Empty</span></div>
                    </div>
                    <div className='info_box_group'>
                        <div className='info_box'>
                            <h2>First Class</h2>
                            <div className='info_box-list' >
                                <div className='info_box-list-name' >
                                    <p>First Name:</p>
                                    {passName?.map((name, index) => {
                                        if (passSurname[index]) {
                                            return (
                                                <div key={index}>
                                                    <p className='searchItem-two__container__ports-info__firstp'>{name}</p>
                                                </div>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                                <div className='info_box-list-surname' >
                                    <p>First Surname:</p>
                                    {passSurname?.map((name, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='searchItem-two__container__ports-info__firstp'>{name}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='info_box-passengerSeat'>
                                    {deneme && (
                                        <div className='info_box-passengerSeat-box' >
                                            <div className='info_box-passengerSeat-box__header' >
                                                <p>Row</p>
                                                <p>Column</p>
                                            </div>
                                            {deneme.map((item, key) => (
                                                <div className='info_box-passengerSeat-box__list' key={key}>
                                                    <p>{item?.row}</p>
                                                    <p>  {item?.seatNumber}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>

                        </div>
                        <div className='info_box'><h2>Bussiness Class</h2><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non minima distinctio facere doloremque nesciunt dicta temporibus sed officiis. Eius libero illo alias doloribus soluta, officiis animi ipsum ea repellat non?</p></div>
                        <div className='info_box'><h2>Economy Class</h2><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nisi eligendi culpa deleniti pariatur ducimus tempore expedita corporis libero, aut repellendus repudiandae iusto facilis omnis. Doloremque facilis pariatur aliquid in.</p></div>
                    </div>
                </div>
                <div className='lower_div'>
                    <button >Go To The Payment</button>
                </div>
            </div>

            <Footer className='footer' />
        </>
    );
}

export default SeatScreen;