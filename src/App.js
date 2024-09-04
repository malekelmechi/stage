// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import AdminDashboard from "./components/AdminDashboard";
import HomePage from "./components/HomePage";
import TimeConstraints from './components/TimeConstraints';
import RoomConstraints from './components/RoomConstraints';
import ScheduleManager from './components/ScheduleManager'; 
import RoomManager from "./components/RoomManager";

function App() {
  return (
    <Routes>
      <Route path="" element={ <HomePage/>} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} /> 
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/timeconstraints" element={<TimeConstraints />} />
      <Route path="/roomconstraints" element={<RoomConstraints />} />
      <Route path="/schedule" element={<ScheduleManager />} /> 
      <Route path="/roommanager" element={<RoomManager />} />
    </Routes>
  );
}

export default App;
