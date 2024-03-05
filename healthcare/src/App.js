import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import SymptomsInput from "./pages/SymptomsInput/SymptomsInput";
import Prediction from "./pages/Prediction/Prediction";
import FindDoctor from "./pages/FindDoctor/FindDoctor";
import Appointments from './pages/Appointments';
function App() {
  const [loggedUserId, setLoggedUserId] = useState('');
  return (
    <div className="App-main">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setLoggedUserId={setLoggedUserId}/>} />
          <Route path="/home" element={<Dashboard loggedUserId={loggedUserId}/>} />
          <Route path="/SymptomsInput" element={<SymptomsInput />} />
          <Route path="/Prediction" element={<Prediction />} />
          <Route path="/FindDoctor" element={<FindDoctor loggedUserId={loggedUserId}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
