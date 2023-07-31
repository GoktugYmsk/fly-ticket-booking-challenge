import React from 'react'
import { useSelector } from 'react-redux';

import MyImage from '../arrow.png';

function ReturnTicket({ formattedReturnDate, handleTicketClickReturn, returnSelect, formatTime }) {

    const flightPort = useSelector((state) => state.passFlightPort.flightPort);
    const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
    const flightPortData = useSelector((state) => state.portsData.flightPortData);
    const companyInfoReturn = useSelector((state) => state.portsData.companyInfoReturn);
    const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

    const filteredReturnFlights = companyInfoReturn.data.filter((item) => {
        return item.depPort === flightPortArrive && item.arrPort === flightPort;
    });

    const isLeavePort = flightPortData.data.find((item) => item.code === flightPort);
    const isArrivePort = flightPortData.data.find((item) => item.code === flightPortArrive);

    const leavePortExplanation = isLeavePort ? isLeavePort.explanation : "";
    const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : "";

    const imagePath = MyImage;

    return (
        <>
            {formattedReturnDate &&

                <div className="flyCompanies-container__box-info">
                    <div className="flyCompanies-container__box-info-top">
                        <div className="flyCompanies-container__box-info-city">
                            <h3 className="first-h3">{arrivePortExplanation}</h3>
                            <i class="fas fa-chevron-right"></i>
                            <h3 className="second-h3">{leavePortExplanation}</h3>
                        </div>
                        <div className="flyCompanies-container__box-info__date">

                            <div className="flyCompanies-container__box-info__date-return">
                                <p>Return</p>
                                {formattedReturnDate}
                            </div>
                        </div>
                    </div>
                    <div className="flyCompanies-container__box-info-bottom">
                        <span>{passengerInfo.adults} Adult </span>
                        {passengerInfo.children > 0 && (
                            <span> {`  - ${passengerInfo.children}  Child `}</span>
                        )}
                        {passengerInfo.babies > 0 && (
                            <span> {` - ${passengerInfo.babies}  Infant`} </span>
                        )}
                    </div>
                </div>
            }
            {
                formattedReturnDate &&
                <div className="flyCompanies-container-content">
                    {filteredReturnFlights.length > 0 ? (
                        filteredReturnFlights.map((item, key) => {
                            const depTime = new Date(`1970-01-01T${item.depTime}`);
                            const arrTime = new Date(`1970-01-01T${item.arrTime}`);
                            const flightDuration = new Date(arrTime - depTime);

                            return (
                                <div className={`flyCompanies-container-content-container ${returnSelect ? 'selected' : ''} `} key={key}>
                                    <div onClick={() => handleTicketClickReturn(item)} className="flyCompanies-container__box">
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
                                            <p>{item.passengerPrices[0]?.basePrice} $</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="flyCompanies-container-content">
                            <div className="flyCompanies-container__return-flights">
                                <h2>No Return Flights</h2>
                            </div>
                        </div>
                    )}
                </div>
            }
        </>
    )
}

export default ReturnTicket
