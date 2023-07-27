import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import flightPorts from "../../assets/flightPorts";
import passengerInformation from "../../assets/passenger";

import { setFlightTicket, setPassengerInfo, setFlightTicketReturn } from "../configure";
import Header from "../header";
import "./index.scss";

function FlyCompanies() {
  const [formattedReturnDate, setFormattedReturnDate] = useState("");
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");

  const [departSelect, setDepartSelect] = useState(false)
  const [returnSelect, setReturnSelect] = useState(false)

  const returnDate = useSelector((state) => state.optionDateArr.returnDate);
  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const flightTicketReturn = useSelector((state) => state.passTicket.flightTicketReturn);
  const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);
  const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedDateTimestamp = selectedDate instanceof Date ? selectedDate.getTime() : null;
  const selectedDateTimestampArrive = returnDate instanceof Date ? returnDate.getTime() : null;

  const isLeavePort = flightPorts.ports.find((item) => item.code === flightPort);
  const isArrivePort = flightPorts.ports.find((item) => item.code === flightPortArrive);

  const leavePortExplanation = isLeavePort ? isLeavePort.explanation : "";
  const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : "";

  const filteredPorts = passengerInformation.departureLegs.filter((item) => {
    return item.depPort === flightPort && item.arrPort === flightPortArrive;
  });

  const formatTime = (time) => {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const selectedDateFormatted =
      selectedDate instanceof Date ? selectedDate.toDateString() : "";
    setFormattedSelectedDate(selectedDateFormatted);

    const returnDateFormatted =
      returnDate instanceof Date ? returnDate.toDateString() : "";
    setFormattedReturnDate(returnDateFormatted);
  }, [selectedDate, returnDate]);

  const handleMainPageClick = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    navigate("/");
  };

  const handleTicketClick = (item) => {
    dispatch(setFlightTicket({ ...item, selectedDate: selectedDateTimestamp }));
    setDepartSelect(true)

  };

  const handleTicketClickReturn = (item) => {
    dispatch(setFlightTicketReturn({ ...item, returnDate: selectedDateTimestampArrive }));
    setReturnSelect(true)
  }

  const handleMainPage = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    navigate("/");
  };

  const filteredReturnFlights = passengerInformation.returnLegs.filter((item) => {
    return item.depPort === flightPortArrive && item.arrPort === flightPort;
  });

  useEffect(() => {
    if (returnDate) {
      if (departSelect && returnSelect) {
        navigate("/sales-screen");
      }
    }
    else if (departSelect) {
      navigate('/sales-screen')
    }

  }, [departSelect, returnSelect])

  return (
    <div>
      <Header />
      <div className="flyCompanies-container">
        <div className="flyCompanies-container__box-info">
          <div className="flyCompanies-container__box-info-top">
            <div class="flyCompanies-container__box-info-top-div">
              <p className="flyCompanies-container__box-info-top-p" onClick={handleMainPageClick}>Search Again</p>
            </div>
            <div className="flyCompanies-container__box-info-city">
              <h3>{leavePortExplanation}</h3>
              <i class="fas fa-chevron-right"></i>
              <h3>{arrivePortExplanation}</h3>
            </div>
            <div className="flyCompanies-container__box-info__date">
              <div className="flyCompanies-container__box-info__date-depp">
                <p>Depart</p>
                {formattedSelectedDate}
              </div>
              {formattedReturnDate && (
                <div className="flyCompanies-container__box-info__date-return">
                  <p>Return</p>
                  {formattedReturnDate}
                </div>
              )}
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

        <h2>Depart Flights</h2>
        <div className="flyCompanies-container-content">
          {filteredPorts.length > 0 ? (
            filteredPorts.map((item, key) => {
              const depTime = new Date(`1970-01-01T${item.depTime}`);
              const arrTime = new Date(`1970-01-01T${item.arrTime}`);
              const flightDuration = new Date(arrTime - depTime);

              return (
                <div className={`flyCompanies-container-content-container ${departSelect ? 'departSelected' : ''}`} key={key}>
                  <div onClick={() => handleTicketClick(item)} className="flyCompanies-container__box">
                    <div className="flyCompanies-container__box-airline">
                      <h4>Airline</h4>
                      <p>{item.airline}</p>
                    </div>
                    <div className="flyCompanies-container__box-flightNo">
                      <h4>Tail No</h4>
                      <p>{item.flightNo}</p>
                    </div>
                    <div className="flyCompanies-container__box-depTime">
                      <h4>Depart</h4>
                      <p>{item.depTime}</p>
                    </div>
                    <div className="flyCompanies-container__box-flightDuration">
                      <h4>Duration</h4>
                      <p>{formatTime(flightDuration)}</p>
                    </div>
                    <div className="flyCompanies-container__box-arrTime">
                      <h4>Arrive</h4>
                      <p>{item.arrTime}</p>
                    </div>
                    <div className="flyCompanies-container__box-amount">
                      <h4>Price(per)</h4>
                      <p>{item.priceDetail.salesPrice.amount} $</p>
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


        <div style={{ marginBottom: "30px" }}></div>

        {returnDate &&
          <div>

            <h2>Return Flights</h2>
            {filteredReturnFlights.length > 0 ? (
              <div className="flyCompanies-container-content">
                <div className="flyCompanies-container__return-flights">
                  {filteredReturnFlights.map((item, key) => {
                    const depTime = new Date(`1970-01-01T${item.depTime}`);
                    const arrTime = new Date(`1970-01-01T${item.arrTime}`);
                    const flightDuration = new Date(arrTime - depTime);

                    return (
                      <div className={`flyCompanies-container-content-container ${returnSelect ? 'returnSelected' : ''} `} key={key}>
                        <div onClick={() => handleTicketClickReturn(item)} className="flyCompanies-container__box">
                          <div className="flyCompanies-container__box-airline">
                            <h4>Airline</h4>
                            <p>{item.airline}</p>
                          </div>
                          <div className="flyCompanies-container__box-flightNo">
                            <h4>Tail No</h4>
                            <p>{item.flightNo}</p>
                          </div>
                          <div className="flyCompanies-container__box-depTime">
                            <h4>Depart</h4>
                            <p>{item.depTime}</p>
                          </div>
                          <div className="flyCompanies-container__box-flightDuration">
                            <h4>Duration</h4>
                            <p>{formatTime(flightDuration)}</p>
                          </div>
                          <div className="flyCompanies-container__box-arrTime">
                            <h4>Arrive</h4>
                            <p>{item.arrTime}</p>
                          </div>
                          <div className="flyCompanies-container__box-amount">
                            <h4>Price(per)</h4>
                            <p>{item.priceDetail.salesPrice.amount} $</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flyCompanies-container-content">
                <div className="flyCompanies-container__return-flights">
                  <h2>No Return Flights</h2>
                </div>
              </div>
            )}

          </div>
        }
      </div>
    </div>
  );
}

export default FlyCompanies;

