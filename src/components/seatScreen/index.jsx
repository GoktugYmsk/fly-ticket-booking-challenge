import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../header';
import Depart from './depart';
import Return from './return';
import Footer from '../footer';
import './index.scss';

function SeatScreen() {
    const [activeDepart, setActiveDepart] = useState(true)
    const [activeReturn, setActiveReturn] = useState(false)
    const [formattedSelectedDate, setFormattedSelectedDate] = useState("");
    const [formattedReturnDate, setFormattedReturnDate] = useState("");

    const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
    const returnDate = useSelector((state) => state.optionDateArr.returnDate);
    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);
    const flightTicket = useSelector((state) => state.passTicket.flightTicket);
    const flightTicketReturn = useSelector((state) => state.passTicket.flightTicketReturn);

    const flightPortData = useSelector((state) => state.portsData.flightPortData);

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

    return (
        <>
            <Header className='header'>
            </Header><div className='chairScreen-container-content'>
                <div className='upper_div'>
                    <h2>Choose Your Seat</h2>
                    {
                        activeDepart &&
                        <div>
                            {formattedSelectedDate}
                            <div>
                                <p>{leavePortExplanation}</p>
                                <p>{arrivePortExplanation}</p>
                            </div>
                            <div>
                                <p className="list-top-a">{flightTicket.airline}</p>
                                <p className="list-top-b">{flightTicket.flightNo}</p>
                                <p className="list-top-c">{flightTicket.depTime}</p>
                                <p className="list-top-d">{flightTicket.arrTime}</p>
                            </div>
                        </div>
                    }
                    {
                        activeReturn &&
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
                    }
                </div>
                <div class="line_horizontal"></div>
                {
                    activeDepart &&
                    <Depart setActiveDepart={setActiveDepart} setActiveReturn={setActiveReturn} />
                }
                {
                    activeReturn &&
                    <Return />
                }
            </div>

            <Footer className='footer' />
        </>
    );
}

export default SeatScreen;