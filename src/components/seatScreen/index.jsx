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

    useEffect(() => {
        const returnDateFormatted = returnDate instanceof Date ? returnDate.toDateString() : "";
        const selectedDateFormatted = selectedDate instanceof Date ? selectedDate.toDateString() : "";
        setFormattedSelectedDate(selectedDateFormatted);
        setFormattedReturnDate(returnDateFormatted);
    }, [selectedDate, returnDate]);

    return (
        <>
            <Header className='header'>
            </Header><div className='chairScreen-container-content'>
                <div className='info_box' >
                    {
                        activeDepart &&
                        <Depart setActiveDepart={setActiveDepart} setActiveReturn={setActiveReturn} />
                    }
                    <div className='info_box' >
                        {
                            activeReturn &&
                            <Return />
                        }
                    </div>
                </div>
            </div>
            <Footer className='footer' />
        </>
    );
}

export default SeatScreen;