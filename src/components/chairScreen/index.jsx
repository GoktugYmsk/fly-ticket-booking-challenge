import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.scss';
import Header from "../header";
import Footer from "../footer";


const reservedSeats = [
    { row: 1, seatNumber: 3 },
    { row: 2, seatNumber: 2 },
];

function ChairScreen() {
    const [selectedSeat, setSelectedSeat] = useState(null);
    

    const navigate = useNavigate();

    const handlePayScreenClick = () => {
        navigate('/pay-screen');
    };


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
        for (let j = 1; j <= 23; j++) {
            const rowSeats = [];
            for (let i = 1; i <= 6; i++) {
                const isReserved = isSeatReserved(j, i);
                const isSelected = selectedSeat?.row === j && selectedSeat?.seatNumber === i && !isReserved;
                const seatStyle = {
                    backgroundColor: isReserved ? 'rgb(44, 56, 85)' : isSelected ? 'rgb(83, 106, 160)' : 'rgb(240, 105, 60)',
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


        <><Header className='header'>
        </Header><div className='chairScreen-container-content'>
            <div className='upper_div'>
                 <h2>Choose Your Seat</h2>
                 <button  onClick={handlePayScreenClick}>Skip</button>
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
                    <div className='info_box'><h2>First Class</h2><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi magni necessitatibus, sint quos commodi alias placeat dignissimos veritatis, architecto quod quia repellat neque inventore pariatur vel beatae magnam esse id.</p></div>
                    <div className='info_box'><h2>Bussiness Class</h2><p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non minima distinctio facere doloremque nesciunt dicta temporibus sed officiis. Eius libero illo alias doloribus soluta, officiis animi ipsum ea repellat non?</p></div>
                    <div className='info_box'><h2>Economy Class</h2><p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti nisi eligendi culpa deleniti pariatur ducimus tempore expedita corporis libero, aut repellendus repudiandae iusto facilis omnis. Doloremque facilis pariatur aliquid in.</p></div>
                </div>
                
            </div>
            <div className='lower_div'><button  onClick={handlePayScreenClick}>Go To The Payment</button></div>
                
        </div> <Footer className='footer'>
        </Footer></>
    );
}

export default ChairScreen;
