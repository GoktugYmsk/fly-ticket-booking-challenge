import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import flightPorts from '../../assets/flightPorts';
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

    const isLeavePort = flightPorts.ports.find((item) => item.code === flightPort);
    const isArrivePort = flightPorts.ports.find((item) => item.code === flightPortArrive);

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
                
            <div className='info_box' >
                    {
                       
                    }

                    {
                        
                       
                    }
                
                {
                    activeDepart &&
                    <Depart setActiveDepart={setActiveDepart} setActiveReturn={setActiveReturn} />
                }
                {
                    activeReturn &&
                    <Return />
                }
                </div>
            </div>

            <Footer className='footer' />
        </>
    );
}

export default SeatScreen;