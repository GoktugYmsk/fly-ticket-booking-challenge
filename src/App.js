import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomComponent from './components/CustomComponent';
import SearchContent from './components/content/searchContent';
import PayScreen from './components/payScreen';
import SignUp from './components/content/register';
import Login from './components/content/login';
import Expedition from './components/expedition';
import './App.css';

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
      </Routes>
    </div >
  );
}

export default App;
