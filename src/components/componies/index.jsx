import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import passengerInformation from '../../assets/passenger';
import flightPorts from '../../assets/flightPorts';
import { setFlightTicket } from '../configure';
import './index.scss';
import { useNavigate } from 'react-router-dom';

function FlyCompanies() {
    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);
    const selectedDate = useSelector((state) => state.optionDate.selectedDate);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);

    const dispatch = useDispatch()

    const navigate = useNavigate()

    console.log('passengerInfo', passengerInfo)

    const isLeavePort = flightPorts.ports.find((item) => item.code === flightPort);
    const isArrivePort = flightPorts.ports.find((item) => item.code === flightPortArrive);

    const leavePortExplanation = isLeavePort ? isLeavePort.explanation : '';
    const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : '';

    const filteredPorts = passengerInformation.departureLegs.filter((item) => {
        return item.depPort === flightPort && item.arrPort === flightPortArrive;
    });

    const formatTime = (time) => {
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        return `${hours} saat ${minutes} dakika`;
    };

    const selectedDateTimestamp = selectedDate instanceof Date ? selectedDate.getTime() : null;


    const handleTicketClick = (ticket) => {
        dispatch(setFlightTicket({ ...ticket, selectedDate: selectedDateTimestamp }));
        navigate('/sales-screen')
    }

    return (
        <div className='flyCompanies-container'>
            <div className='flyCompanies-container__box-info'>
                <div className='flyCompanies-container__box-info-top'>
                    <div className='flyCompanies-container__box-info-city' >
                        <h3>{leavePortExplanation}</h3>
                        <h3>{arrivePortExplanation}</h3>
                    </div>
                    <div className='flyCompanies-container__box-info__date' >
                        <p>Gidiş</p>
                        {selectedDate.toDateString()}
                    </div>
                </div>
                <div className='flyCompanies-container__box-info-bottom' >
                    <p>{passengerInfo.adults} Yetişkin -</p>
                    <p>{passengerInfo.children} Çocuk -</p>
                    <p>{passengerInfo.babies} Bebek</p>
                </div>
            </div>
            <div className='flyCompanies-container-content'>
                {filteredPorts.length > 0 ? (
                    filteredPorts.map((item, key) => {
                        const depTime = new Date(`1970-01-01T${item.depTime}`);
                        const arrTime = new Date(`1970-01-01T${item.arrTime}`);
                        const flightDuration = new Date(arrTime - depTime);

                        return (
                            <div className='flyCompanies-container-content-container' key={key}>
                                <div onClick={() => handleTicketClick(item)} className='flyCompanies-container__box'>
                                    <div className='flyCompanies-container__box-airline'>
                                        <h4>Havayolu</h4>
                                        <p>{item.airline}</p>
                                    </div>
                                    <div className='flyCompanies-container__box-flightNo'>
                                        <h4>Kuyruk No</h4>
                                        <p>{item.flightNo}</p>
                                    </div>
                                    <div className='flyCompanies-container__box-depTime'>
                                        <h4>Kalkış</h4>
                                        <p>{item.depTime}</p>
                                    </div>
                                    <div className='flyCompanies-container__box-flightDuration'>
                                        <h4>Süre</h4>
                                        <p>{formatTime(flightDuration)}</p>
                                    </div>
                                    <div className='flyCompanies-container__box-arrTime'>
                                        <h4>Varış</h4>
                                        <p>{item.arrTime}</p>
                                    </div>
                                    <div className='flyCompanies-container__box-amount'>
                                        <h4>Fiyat(kişi)</h4>
                                        <p>{item.priceDetail.salesPrice.amount} $</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className='flyCompanies-container__box-notFound'>
                        <h2>Uçuş Bulunamadı</h2>
                    </div>
                )}
            </div>
        </div >
    );
}

export default FlyCompanies;
