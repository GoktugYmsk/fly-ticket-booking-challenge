import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import PayScreen from './components/payScreen';
import Login from './components/content/login';
import Expedition from './components/expedition';
import SeatScreen from './components/seatScreen';
import FlyCompanies from './components/componies';
import SignUp from './components/content/register';
import SalesScreen from './components/salesScreen';
import CustomComponent from './components/CustomComponent';
import SearchContent from './components/content/searchContent';
import ShoppingSummary from './components/content/shoppingSummary';

import { setCompanyInfo, setCompanyInfoReturn, setFlightPortData } from './components/configure';
import './App.css'

function App() {
  const dispatch = useDispatch()

  const apiUrl = '/api/airports/getall';
  const apiUrlCompany = '/api/flights/getdepartureflights '
  const apiUrlCompanyReturn = '/api/flights/getreturnflights '

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        dispatch(setFlightPortData(response.data))
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(apiUrlCompany)
      .then(response => {
        dispatch(setCompanyInfo(response.data))
      })
      .catch(error => {
        console.error('Hata:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(apiUrlCompanyReturn)
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
