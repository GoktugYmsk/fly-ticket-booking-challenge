import React from 'react'
import { useSelector } from 'react-redux';

import MyImage from '../arrow.png';

function DepartTicket({ departSelect, formatTime, handleTicketClick }) {

    const imagePath = MyImage;
    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);
    const companyInfo = useSelector((state) => state.portsData.companyInfo);


    const filteredPorts = companyInfo.data.filter((item) => {
        return item.depPort === flightPort && item.arrPort === flightPortArrive;
    });

    return (
        <div className="flyCompanies-container-content">
            {filteredPorts.length > 0 ? (
                filteredPorts.map((item, key) => {
                    const depTime = new Date(`1970-01-01T${item.depTime}`);
                    const arrTime = new Date(`1970-01-01T${item.arrTime}`);
                    const flightDuration = new Date(arrTime - depTime);
                    return (
                        <div className={`flyCompanies-container-content-container ${departSelect ? 'selected' : ''}`} key={key}>
                            <div onClick={() => handleTicketClick(item)} className="flyCompanies-container__box">
                                <div className="flyCompanies-container__box-airline partner">
                                    <h4>Airline</h4>
                                    <p>{item.airline}</p>
                                </div>
                                <div className="flyCompanies-container__box-flightNo partner">
                                    <h4>Tail No</h4>
                                    <p>{item.flightNo}</p>
                                </div>
                                <div className="arrowIcon partner">
                                    <img className="arrowIcon" src={imagePath} alt="Ok İkonu" />
                                </div>
                                <div className="flyCompanies-container__box-depTime partner">
                                    <h4>Depart</h4>
                                    <p>{item.depTime}</p>
                                </div>
                                <div className="flyCompanies-container__box-flightDuration partner">
                                    <h4>Duration</h4>
                                    <p>{formatTime(flightDuration)}</p>
                                </div>
                                <div className="flyCompanies-container__box-arrTime partner">
                                    <h4>Arrive</h4>
                                    <p>{item.arrTime}</p>
                                </div>
                                <div className="flyCompanies-container__box-amount partner">
                                    <h4>Price(per)</h4>
                                    <p>{item.passengerPrices[0].salesPrice} $</p>

                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className="flyCompanies-container__box-notFound">
                    <h2>Flight Not Found</h2>
                </div>
            )}
        </div>
    )
}

export default DepartTicket
