import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPassName, setPassengerInfo, setReturnDate } from "../../configure";
import Header from "../../header";
import "./index.scss";

function ShoppingSummary() {
  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const passName = useSelector((state) => state.passCheck.passName);

  const seat = useSelector((state) => state.seatReserve.seat);

  console.log('seat', seat)

  const refreshPassenger = useSelector(
    (state) => state.refreshPass.refreshPassenger
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(passName);

  const totalPassenger = sessionStorage.getItem("totalPassenger");
  const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger;


  const handleMainPage = () => {
    dispatch(setPassengerInfo(refreshPassenger));
    dispatch(setReturnDate(''))
    navigate("/");
  };

  return (

    <div className="shoppingSummary-container">
      <Header>
        {/* Header içeriği burada */}
      </Header>
      <div className="shoppingSummary__container-navbar">

        <div className="shoppingSummary__container-navbar-alt">
          <h3>Flight Information Summary</h3>
        </div>
      </div>
      <div className="shoppingSummary-container-box">
        <div className="shoppingSummary-container-box__list">
          <div className="shoppingSummary-container-box__list-top">
            <p>{flightTicket.airline}</p>
            <p>{flightTicket.flightNo}</p>
            <p>{flightTicket.depTime}</p>
            <p>{flightTicket.arrTime}</p>
            <p> Total: {totalPassenger} Passengers </p>
          </div>

          <div className="shoppingSummary-container-box__list-bottom">
            <div className="shoppingSummary-container-box__list-name">
              <div className="name">
                {passName.map((name, index) => (
                  <div className="name-flex">
                    <p className="passenger-name">First Name:</p>
                    <p key={index}> {name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="shoppingSummary-container-box__list-surName">
              <div className="surname">
                {passSurname.map((surname, index) => (
                  <div className="surname-flex">
                    <p className="passenger-name">Last Name:</p>
                    <p key={index}> {surname}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="passenger-seat" >
              <p>Seat No:</p>
              <div className="passenger-seat__info" >
                <p> Row {seat.selectedSeat.row}</p>
                <p> Colum {seat.selectedSeat.seatNumber}</p>
              </div>
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
        <h5 onClick={handleMainPage}>Go Back To The Homepage</h5>
      </div>
    </div>
  );
}

export default ShoppingSummary;
