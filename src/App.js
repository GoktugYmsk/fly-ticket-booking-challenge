import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomComponent from './components/CustomComponent';
import Login from './components/content/login';
import SearchContent from './components/content/searchContent';
import SearchItem1 from './components/content/searchContent/searchItem1';
import SearchItem2 from './components/content/searchContent/searchItem2';
import SearchItem3 from './components/content/searchContent/searchItem3';
import SearchItem4 from './components/content/searchContent/searchItem4';
import PayScreen from './components/payScreen';
import './App.css';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<CustomComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchContent />}>
            <Route path="/search/searchTicket" element={<SearchItem1 />} />
            <Route path="/search/Online-Check-In" element={<SearchItem2 />} />
            <Route path="/search/Management-Flight" element={<SearchItem3 />} />
            <Route path="/search/Vehicel-rent-accomodation" element={<SearchItem4 />} />
          </Route>
          <Route path="/pay-screen" element={<PayScreen/>} />
        </Routes>

    </div>
  );
}

export default App;
