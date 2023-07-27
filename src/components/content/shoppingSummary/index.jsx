import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPassName, setPassengerInfo } from "../../configure";
import Header from "../../header";
import "./index.scss";
import MyImage from './arrow.png';

function ShoppingSummary() {
  const flightTicket = useSelector((state) => state.passTicket.flightTicket);
  const passengerInfo = useSelector((state) => state.passInfo.passengerInfo);
  const passSurname = useSelector((state) => state.passCheck.passSurname);
  const passName = useSelector((state) => state.passCheck.passName);
  const refreshPassenger = useSelector(
    (state) => state.refreshPass.refreshPassenger
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imagePath = MyImage;

  console.log(passName);

  const totalPassenger = sessionStorage.getItem("totalPassenger");
  const totalPrice = flightTicket.priceDetail.basePrice.amount * totalPassenger;


  const handleMainPage = () => {
    dispatch(setPassengerInfo(refreshPassenger));
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
