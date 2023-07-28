import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPassName, setPassengerInfo, setReturnDate } from "../../configure";
import Header from "../../header";
import "./index.scss";
import MyImage from './arrow.png';

function ShoppingSummary() {
  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const passName = useSelector((state) => state.passCheck.passName);
  const refreshPassenger = useSelector((state) => state.refreshPass.refreshPassenger);
  const flightTicketReturn = useSelector((state) => state.passTicket.flightTicketReturn);

  const seat = useSelector((state) => state.seatReserve.seat);

  console.log('flightTicketReturn', flightTicketReturn)

  console.log('seatDeneme', seat)


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imagePath = MyImage;

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
      </Header>
      <div className="shoppingSummary__container-navbar">

        <div className="shoppingSummary__container-navbar-alt">
          <h3>Flight Information Summary</h3>
        </div>
      </div>
      <div className="shoppingSummary-container-box">
        <div className="shoppingSummary-container-box__list">
          <div className="shoppingSummary-container-box__list-top">
            <p className="list-top-a">{flightTicket.airline}</p>
            <p className="list-top-b">{flightTicket.flightNo}</p>
            <p className="list-top-c">{flightTicket.depTime}</p>
            <p className="list-top-d">{flightTicket.arrTime}</p>
            <p className="list-top-e">{totalPassenger} Passengers </p>
            <img className="list-top-x" src={imagePath} alt="Ok İkonu" />
          </div>
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
              <p>Seat No:</p>
              <div className="passenger-seat__info">
                <div className='passenger-seat__info__header'>
                  <p>Row</p>
                  <p>Column</p>
                </div>
                <div>
                  {seat.map((itemArray, index) => (
                    <div key={index}>
                      {itemArray.map((item, innerIndex) => (
                        <div key={`${index}-${innerIndex}`}>
                          <p>Row: {item.row}</p>
                          <p>Column: {item.seatNumber}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
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
      {/******************* Return ********************************/}
      <div className="returnTicket-info">
        {flightTicketReturn &&
          <div className="shoppingSummary-container-box__list-bottom">
            <p className="list-top-a">{flightTicketReturn.airline}</p>
            <p className="list-top-b">{flightTicketReturn.flightNo}</p>
            <p className="list-top-c">{flightTicketReturn.depTime}</p>
            <p className="list-top-d">{flightTicketReturn.arrTime}</p>
            <p className="list-top-e">{totalPassenger} Passengers </p>
            <img className="list-top-x" src={imagePath} alt="Ok İkonu" />
          </div>
        }
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
          <div className="passenger-seat" >
            <p>Seat No:</p>
            <div className="passenger-seat__info" >
              {/* <p> Row {seat.selectedSeat.row}</p>
              <p> Colum {seat.selectedSeat.seatNumber}</p> */}
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
    </div>
  );
}

export default ShoppingSummary;
