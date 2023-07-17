import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import passengerInformation from '../../assets/passenger';
import './index.scss';

function FlyCompanies() {
    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

    const filteredDepartureLegs = passengerInformation.departureLegs.filter((item) => {
        return item.depPort === flightPort && item.arrPort === flightPortArrive;
    });

    const formatTime = (time) => {
        const hours = time.getUTCHours();
        const minutes = time.getUTCMinutes();
        return `${hours} saat ${minutes} dakika`;
    };

    return (
        <div className='flyCompanies-container'>
            <div className='flyCompanies-container-content'>
                {filteredDepartureLegs.length > 0 ? (
                    filteredDepartureLegs.map((item, key) => {
                        const depTime = new Date(`1970-01-01T${item.depTime}`);
                        const arrTime = new Date(`1970-01-01T${item.arrTime}`);
                        const flightDuration = new Date(arrTime - depTime);

                        return (
                            <div className='flyCompanies-container-content-container' key={key}>
                                <div className='flyCompanies-container__box'>
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
        </div>
    );
}

export default FlyCompanies;
