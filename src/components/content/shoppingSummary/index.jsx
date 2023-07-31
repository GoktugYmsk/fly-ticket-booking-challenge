import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../../header";
import Footer from "../../footer";

import MyImage from './arrow.png';

import { setPassengerInfo, setReturnDate } from "../../configure";

import "./index.scss";

function ShoppingSummary() {
  const seat = useSelector((state) => state.seatReserve.seat);
  const passName = useSelector((state) => state.passCheck.passName);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const seatReturn = useSelector((state) => state.seatReserve.seatReturn);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const flightPort = useSelector((state) => state.passFlightPort.flightPort);
  const flightPortData = useSelector((state) => state.portsData.flightPortData);
  const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);
  const flightTicketReturn = useSelector((state) => state.passTicket.flightTicketReturn);
  const flightPortArrive = useSelector((state) => state.passFlightPortArrive.flightPortArrive);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLeavePort = flightPortData?.data.find((item) => item.code === flightPort);
  const isArrivePort = flightPortData?.data.find((item) => item.code === flightPortArrive);

  const leavePortExplanation = isLeavePort ? isLeavePort.explanation : "";
  const arrivePortExplanation = isArrivePort ? isArrivePort.explanation : "";

  const totalPassenger = sessionStorage.getItem("totalPassenger");
  const totalPrice = flightTicket.passengerPrices[0].basePrice * totalPassenger;

  const handleMainPage = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    dispatch(setReturnDate(''))
    navigate("/");
  };

  const imagePath = MyImage;
  return (

    <div className="shoppingSummary-container">
      <Header />
      <div className="shoppingSummary__container-navbar">
        <div className="shoppingSummary__container-navbar-alt">
          <h3>Flight Information Summary</h3>
        </div>
      </div>
      <div className="shoppingSummary-container-box">
        <div className="shoppingSummary-container-box__list">
          <h3 className="shoppingSummary-container-box__list-text"><i class="fas fa-chevron-right"></i> Depart <i class="fas fa-chevron-left"></i></h3>
          <div className="shoppingSummary-container-box__list-top">
            <p className="list-top-a">{flightTicket.airline}</p>
            <p className="list-top-b">{flightTicket.flightNo}</p>
            <p className="list-top-c">{flightTicket.depTime}</p>
            <p className="list-top-d">{flightTicket.arrTime}</p>
            <p className="list-top-f">{leavePortExplanation}</p>
            <p className="list-top-g">{arrivePortExplanation}</p>
            <img className="list-top-x" src={imagePath} alt="Ok İkonu" />
          </div>
          <h5 className="shoppingSummary-container-box__list-text"> {totalPassenger} Passengers </h5>
          <div className="shoppingSummary-container-box__list-bottom">
            <div className="shoppingSummary-container-box__list-name">
              <div className="name">
                {passName.map((name, index) => (
                  <div className="name-flex">
                    <p className="passenger-name">First Name:</p>
                    <p key={index}> &nbsp;{name}&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="shoppingSummary-container-box__list-surName">
              <div className="surname">
                {passSurname.map((surname, index) => (
                  <div className="surname-flex">
                    <p className="passenger-name">Last Name:</p>
                    <p key={index}> &nbsp;{surname}&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="passenger-seat">
              {seat.map((itemArray, index) => (
                <div className="passenger-seat__info" key={index}>
                  {itemArray.map((item, innerIndex) => (
                    <div className="passenger-seat__info-seatNo" key={`${index}-${innerIndex}`}>
                      <p className="passenger-seat__info-seatNo-p"><span className="passenger-seat__info-seatNo-p-span">Seat No: </span><b>{item.row}/{item.seatNumber}</b></p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="shoppingSummary-container-box__list-passenger">
            <p>{totalPrice} $</p>
            <div className="shoppingSummary-container-box__list-passengerInfo">
              <p>{passengerInfo.adults} Adult </p>
              {passengerInfo.children > 0 && (
                <p> {`  - ${passengerInfo.children}  Child `}</p>
              )}
              {passengerInfo.babies > 0 && (
                <p> {` - ${passengerInfo.babies}  Infant`} </p>
              )}
            </div>
          </div>
        </div>
        {/******************* Return ********************************/}
        {flightTicketReturn &&
          <>
            <div className="shoppingSummary-container-box__list">
              <h3 className="shoppingSummary-container-box__list-text"><i class="fas fa-chevron-right"></i> Return <i class="fas fa-chevron-left"></i></h3>
              <div className="shoppingSummary-container-box__list-top">
                <p className="list-top-a">{flightTicketReturn.airline}</p>
                <p className="list-top-b">{flightTicketReturn.flightNo}</p>
                <p className="list-top-c">{flightTicketReturn.depTime}</p>
                <p className="list-top-d">{flightTicketReturn.arrTime}</p>
                <p className="list-top-f">{arrivePortExplanation}</p>
                <p className="list-top-g">{leavePortExplanation}</p>
                <img className="list-top-x" src={imagePath} alt="Ok İkonu" />
              </div>
              <h5 className="shoppingSummary-container-box__list-text"> {totalPassenger} Passengers </h5>
              <div className="shoppingSummary-container-box__list-bottom">
                <div className="shoppingSummary-container-box__list-name">
                  <div className="name">
                    {passName.map((name, index) => (
                      <div className="name-flex">
                        <p className="passenger-name">First Name:</p>
                        <p key={index}> &nbsp;{name}&nbsp;</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shoppingSummary-container-box__list-surName">
                  <div className="surname">
                    {passSurname.map((surname, index) => (
                      <div className="surname-flex">
                        <p className="passenger-name">Last Name:</p>
                        <p key={index}> &nbsp;{surname}&nbsp;</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="passenger-seat">
                  {seatReturn.map((itemArray, index) => (
                    <div className="passenger-seat__info" key={index}>
                      {itemArray.map((item, innerIndex) => (
                        <div className="passenger-seat__info-seatNo" key={`${index}-${innerIndex}`}>
                          <p className="passenger-seat__info-seatNo-p">Seat No: <b>{item.row}/{item.seatNumber}</b></p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="shoppingSummary-container-box__list-passenger">
                <p>{totalPrice} $</p>
                <div className="shoppingSummary-container-box__list-passengerInfo">
                  <p>{passengerInfo.adults} Adult </p>
                  {passengerInfo.children > 0 && (
                    <p> {`  - ${passengerInfo.children}  Child `}</p>
                  )}
                  {passengerInfo.babies > 0 && (
                    <p> {` - ${passengerInfo.babies}  Infant`} </p>
                  )}
                </div>
              </div>
            </div>
          </>
        }
        <h5 onClick={handleMainPage}>Go Back To The Homepage</h5>
      </div>
      <Footer />
    </div>
  );
}

export default ShoppingSummary;