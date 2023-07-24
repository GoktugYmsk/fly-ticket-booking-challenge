// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomComponent from './components/CustomComponent';
import SearchContent from './components/content/searchContent';
import PayScreen from './components/payScreen';
import SignUp from './components/content/register';
import Login from './components/content/login';
import Expedition from './components/expedition';
import FlyCompanies from './components/componies';
import SalesScreen from './components/salesScreen';
import ShoppingSummary from './components/content/shoppingSummary';
import './App.css'

const firebaseConfig = {
  apiKey: "AIzaSyDZKTi2vfFnzkNJlp7ezobTlpG5YJIOE78",
  authDomain: "fly-database-2cf87.firebaseapp.com",
  databaseURL: "https://fly-database-2cf87-default-rtdb.firebaseio.com",
  projectId: "fly-database-2cf87",
  storageBucket: "fly-database-2cf87.appspot.com",
  messagingSenderId: "774953044650",
  appId: "1:774953044650:web:a2927d8fd36b0c84d05ed3"
};

const app = initializeApp(firebaseConfig);

function App() {
  const database = getDatabase();

  const portsRef = ref(database, "ports");
  onValue(portsRef, (snapshot) => {
    const portsData = snapshot.val();
    console.log(portsData);
  });

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
      </Routes>
    </div>
  );
}

export default App;
