import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import PayScreen from './components/payScreen';
import Login from './components/content/login';
import Expedition from './components/expedition';
import FlyCompanies from './components/componies';
import SignUp from './components/content/register';
import SalesScreen from './components/salesScreen';
import CustomComponent from './components/CustomComponent';
import SearchContent from './components/content/searchContent';
import ShoppingSummary from './components/content/shoppingSummary';
import SeatScreen from './components/seatScreen';

import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCompanyInfo, setCompanyInfoReturn, setFlightPortData } from './components/configure';

function App() {

  const apiUrl = process.env.FLIGHTONE_URL;
  const apiUrlCompany = process.env.FLIGHTONE_URL
  const apiUrlCompanyReturn = process.env.FLIGHTONE_URL
  const flightPortData = useSelector((state) => state.portsData.flightPortData);
  const companyInfo = useSelector((state) => state.portsData.companyInfo);

  console.log('FLİGTHPORTSDATA', flightPortData)
  console.log('companyInfo', companyInfo)

  const dispatch = useDispatch()

  // axios.get(apiUrl)
  //   .then(response => {
  //     dispatch(setFlightPortData(response.data))
  //     console.log(response.data);
  //   })
  //   .catch(error => {

  //     console.error(error);
  //   });

  useEffect(() => {
    axios.get(`${apiUrl}/airports/getall`)
      .then(response => {
        dispatch(setFlightPortData(response.data))
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);




  useEffect(() => {
    axios.get(`${apiUrlCompany}/flights/getdepartureflights`)

      .then(response => {
        dispatch(setCompanyInfo(response.data))
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${apiUrlCompanyReturn}/flights/getreturnflights`)
      .then(response => {
        dispatch(setCompanyInfoReturn(response.data))
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CustomComponent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/expedition' element={<Expedition />} />
        <Route path="/search" element={<SearchContent />} />
        <Route path="/pay-screen" element={<PayScreen />} />
        <Route path="/fly-companies" element={<FlyCompanies />} />
        <Route path="/sales-screen" element={<SalesScreen />} />
        <Route path="/shopping-summary" element={<ShoppingSummary />} />
        <Route path="/seat-screen" element={<SeatScreen />} />
      </Routes>
    </div>
  );
}

export default App;
