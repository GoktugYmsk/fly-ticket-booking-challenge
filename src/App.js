import React from 'react';
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

function App() {

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
