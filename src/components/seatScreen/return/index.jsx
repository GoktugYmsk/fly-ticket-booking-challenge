import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSeatReturn } from '../../configure';
import Header from '../../header';
import Footer from '../../footer';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';


function Return() {

    const [activeDepart, setActiveDepart] = useState(true)
    const [activeReturn, setActiveReturn] = useState(false)
    const [formattedSelectedDate, setFormattedSelectedDate] = useState("");
    const [formattedReturnDate, setFormattedReturnDate] = useState("");


    const flightPortData = useSelector((state) => state.portsData.flightPortData);
    const companyInfo = useSelector((state) => state.portsData.companyInfo);

    const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
    const returnDate = useSelector((state) => state.optionDateArr.returnDate);
    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const flightTicketReturn = useSelector((state) => state.passTicket.flightTicketReturn);

    const isLeavePort = flightPortData.data.find((item) => item.code === flightPort);
    const isArrivePort = flightPortData.data.find((item) => item.code === flightPortArrive);

    const leavePortExplanation = isLeavePort ? isLeavePort.explanation : "";
    const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : "";

    useEffect(() => {
        const selectedDateFormatted = selectedDate instanceof Date ? selectedDate.toDateString() : "";
        setFormattedSelectedDate(selectedDateFormatted);

        const returnDateFormatted = returnDate instanceof Date ? returnDate.toDateString() : "";
        setFormattedReturnDate(returnDateFormatted);

    }, [selectedDate, returnDate]);


    const [selectedSeat, setSelectedSeat] = useState(null);
    const [reservedSeats, setReservedSeats] = useState([]);
    const [popup, setPopup] = useState(false);
    const [seatArr, setSeatArr] = useState([]);
    const [deneme, setDeneme] = useState([])

    const passName = useSelector((state) => state.passCheck.passName);
    const passSurname = useSelector((state) => state.passCheck.passSurname);

    const seatReturn = useSelector((state) => state.seatReserve.seatReturn);

    console.log('SEATCONTROL', seatReturn);

    const totalPassenger = sessionStorage.getItem('totalPassenger');

    // useEffect(() => {
    //     const seatLocale = JSON.parse(localStorage.getItem('seatReturn')) || [];
    //     setReservedSeats(seatLocale);
    // }, [seat]);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const getAlphabeticSeatNumber = (numericSeatNumber) => {
        const alphabeticSeatNumber = String.fromCharCode(64 + numericSeatNumber);
        return alphabeticSeatNumber;
    };

    const handleSeatClick = (row, seatNumber) => {
        const isReserved = reservedSeats.some(seatInfo => seatInfo.row === row && seatInfo.seatNumber === seatNumber);
        if (!isReserved) {
            dispatch(setSeatReturn(''));
            const seatTotal = { row, seatNumber };
            setSelectedSeat(seatTotal);
            setSeatArr([...seatArr, seatTotal]);
            const alphabeticSeatNumber = getAlphabeticSeatNumber(seatNumber);
            const seatTotalSeat = { row, seatNumber: alphabeticSeatNumber };
            setDeneme([...deneme, seatTotalSeat]);

        }
    };


    const getAlphabeticRow = (numericRow) => {
        const alphabeticRow = String.fromCharCode(64 + numericRow);
        return alphabeticRow;
    };

    const handleReservation = () => {
        if (selectedSeat) {
            const updatedReservedSeats = [...reservedSeats, ...seatArr];
            localStorage.setItem('seatReturn', JSON.stringify(updatedReservedSeats));

            const seatArrWithAlphabeticRow = seatArr.map((seat) => ({
                row: seat.row,
                seatNumber: getAlphabeticRow(seat.seatNumber),
            }));

            setSelectedSeat(null);
            dispatch(setSeatReturn([seatArrWithAlphabeticRow]));
            setPopup(false);
            navigate('/pay-screen');
        }
    };


    useEffect(() => {
        const seatLocale = JSON.parse(localStorage.getItem('seatReturn')) || [];
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


    const handleCloseClick = () => {
        setSeatArr([]);
        setDeneme('')
        setPopup(false);
    }

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
                const isReserved = reservedSeats.some(
                    (seat) => seat.row === j && seat.seatNumber === i
                );
                const isSelected = seatArr.some(
                    (seat) => seat.row === j && seat.seatNumber === i
                );
                const seatStyle = {
                    backgroundColor: isReserved
                        ? 'rgb(44, 56, 85)'
                        : isSelected
                            ? 'rgb(83, 106, 160)'
                            : 'rgb(240, 105, 60)',
                    color: 'rgb(255, 255, 255, 0.4)',
                };

                rowSeats.push(
                    <React.Fragment key={i}>
                        <div
                            className={`seat ${isReserved ? 'isReserved' : ''}`}
                            key={`seat-${j}-${i}`}
                            onClick={() => handleSeatClick(j, i)}
                            style={seatStyle}
                        >

                            {isSelected ? <BsFillPersonFill color="white" /> : getAlphabeticRow(i)}
                        </div>
                        {i === 3 && <div className='row-number'>{j}</div>}
                    </React.Fragment>
                );
            }
            rows.push(
                <div className='seat-row' key={j}>
                    {rowSeats}
                </div>
            );
        }
        return rows;
    }
    return (
        <>

            {popup && (
                <div className='seat-popup__bottom'>
                    <p>Do you approve the seat selection ?</p>
                    <button onClick={handleReservation}>Yes</button>
                    <button onClick={handleCloseClick}>No</button>
                </div>
            )}
            <div className='upper_div'>
                <h1>Choose Your Seat</h1>
                <button >Skip</button>
            </div>

            <div className='middle_div'>
                <div className='chairScreen-container__box'>
                    <div className='chairScreen-container__box-passengerSide-first'>
                        <div className='chairScreen-container__box-passengerSide-second'>
                            <div className='second-seat'>{renderSeatsSecond()}</div>
                        </div>
                    </div>
                </div>
                <img className='plane_top_view' src="https://www.delta.com/content/dam/delta-www/responsive/airports-aircraft/Boeing/LOPA/757-200-75d-seat-map-static-mobile.png" alt="plane" />
                <div className='legend'><div className='legend_item'><div className='legend_box_reserved'></div><span>Reserved</span></div>
                    <div className='legend_item'><div className='legend_box_selected'></div><span>Selected</span></div>
                    <div className='legend_item'><div className='legend_box_empty'></div><span>Empty</span></div>
                </div>
                <div className='info_box_group'>
                    <div className='info_box'>



                        <h3>Passengers</h3>
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
                                <p>Last Name:</p>
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
                                            <p>Seat:</p>

                                        </div>
                                        {deneme.map((item, key) => (
                                            <div className='info_box-passengerSeat-box__list' key={key}>

                                                <p>  {item?.row}-{item?.seatNumber}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>

                    <div className='info_box'><h3>Flight Summary</h3><br />
                        <div>
                            {formattedReturnDate}
                            <div>
                                <p>{arrivePortExplanation}</p>
                                <p>{leavePortExplanation}</p>
                            </div>
                            <div>
                                <p className="list-top-a">{flightTicketReturn.airline}</p>
                                <p className="list-top-b">{flightTicketReturn.flightNo}</p>
                                <p className="list-top-c">{flightTicketReturn.depTime}</p>
                                <p className="list-top-d">{flightTicketReturn.arrTime}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Return;