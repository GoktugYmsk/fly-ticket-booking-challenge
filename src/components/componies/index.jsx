import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import passengerInformation from "../../assets/passenger";
import flightPorts from "../../assets/flightPorts";
import { setFlightTicket } from "../configure";
import { setPassengerInfo } from "../configure";
import "./index.scss";
import { useNavigate } from "react-router-dom";

function FlyCompanies() {
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");
  const [formattedReturnDate, setFormattedReturnDate] = useState("");

  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const flightPortArrive = useSelector(
    (state) => state.passFlightPortArrive.flightPortArrive
  );
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const selectedDate = useSelector(
    (state) => state.optionDateDepp.selectedDate
  );
  const returnDate = useSelector((state) => state.optionDateArr.returnDate);
  const refreshPassenger = useSelector(
    (state) => state.refreshPass.refreshPassenger
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLeavePort = flightPorts.ports.find(
    (item) => item.code === flightPort
  );
  const isArrivePort = flightPorts.ports.find(
    (item) => item.code === flightPortArrive
  );

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

  const selectedDateTimestamp =
    selectedDate instanceof Date ? selectedDate.getTime() : null;

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
    navigate("/sales-screen");
  };

  const handleMainPage = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav_logo">Some Booking Inc.</div>
        <ul className="nav_links">
          <li className="link" onClick={handleMainPage}>
            <a href="#">Home</a>
          </li>
          <li className="link">
            <a href="#">Book</a>
          </li>
          <li className="link">
            <a href="#">Blog</a>
          </li>
          <li className="link">
            <a href="#">Contact Us</a>
          </li>
        </ul>
      </nav>
      <div className="flyCompanies-container">
        <div className="flyCompanies-container__box-info">
          <div className="flyCompanies-container__box-info-top">
            <p
              className="flyCompanies-container__box-info-top-p"
              onClick={handleMainPageClick}
            >
              Search Again
            </p>
            <div className="flyCompanies-container__box-info-city">
              <h3>{leavePortExplanation}</h3>
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
            <p>{passengerInfo.adults} Adult </p>
            {passengerInfo.children > 0 && (
              <p> {`  - ${passengerInfo.children}  Child `}</p>
            )}
            {passengerInfo.babies > 0 && (
              <p> {` - ${passengerInfo.babies}  Infant`} </p>
            )}
          </div>
        </div>
        <div className="flyCompanies-container-content">
          {filteredPorts.length > 0 ? (
            filteredPorts.map((item, key) => {
              const depTime = new Date(`1970-01-01T${item.depTime}`);
              const arrTime = new Date(`1970-01-01T${item.arrTime}`);
              const flightDuration = new Date(arrTime - depTime);

              return (
                <div
                  className="flyCompanies-container-content-container"
                  key={key}
                >
                  <div
                    onClick={() => handleTicketClick(item)}
                    className="flyCompanies-container__box"
                  >
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
      </div>
    </div>
  );
}

export default FlyCompanies;
