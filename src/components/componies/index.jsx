import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header";
import DepartTicket from "./depart";
import ReturnTicket from "./return";

import { setFlightTicket, setPassengerInfo, setFlightTicketReturn, setReturnDate } from "../configure";

import "./index.scss";

function FlyCompanies() {
  const [departSelect, setDepartSelect] = useState(false)
  const [returnSelect, setReturnSelect] = useState(false)
  const [formattedReturnDate, setFormattedReturnDate] = useState("");
  const [formattedSelectedDate, setFormattedSelectedDate] = useState("");

  const returnDate = useSelector((state) => state.optionDateArr.returnDate);
  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const flightPortData = useSelector((state) => state.portsData.flightPortData);
  const selectedDate = useSelector((state) => state.optionDateDepp.selectedDate);
  const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);
  const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedDateTimestamp = selectedDate instanceof Date ? selectedDate.getTime() : null;
  const selectedDateTimestampArrive = returnDate instanceof Date ? returnDate.getTime() : null;

  const isLeavePort = flightPortData?.data.find((item) => item.code === flightPort);
  const isArrivePort = flightPortData?.data.find((item) => item.code === flightPortArrive);

  const leavePortExplanation = isLeavePort ? isLeavePort.explanation : "";
  const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : "";

  const formatTime = (time) => {
    const hours = time.getUTCHours();
    const minutes = time.getUTCMinutes();
    return `${hours}h ${minutes}m`;
  };

  useEffect(() => {
    const selectedDateFormatted = selectedDate instanceof Date ? selectedDate.toDateString() : "";
    const returnDateFormatted = returnDate instanceof Date ? returnDate.toDateString() : "";
    setFormattedSelectedDate(selectedDateFormatted);
    setFormattedReturnDate(returnDateFormatted);

  }, [selectedDate, returnDate]);

  const handleMainPageClick = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    dispatch(setReturnDate(''))
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
              <h3 className="first-h3">{leavePortExplanation}</h3>
              <i class="fas fa-chevron-right"></i>
              <h3 className="second-h3">{arrivePortExplanation}</h3>
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
        <DepartTicket handleTicketClick={handleTicketClick} formatTime={formatTime} departSelect={departSelect} />
        {formattedReturnDate && (
          <ReturnTicket formattedReturnDate={formattedReturnDate} handleTicketClickReturn={handleTicketClickReturn} returnSelect={returnSelect} formatTime={formatTime} />
        )}
      </div>
    </div>
  )
}

export default FlyCompanies;
