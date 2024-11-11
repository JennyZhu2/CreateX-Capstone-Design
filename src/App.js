// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./assets/HomePage";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/Signup";
import Map from "./pages/Map/map";
import Dashboard from "./pages/UserDashboard/UserDashboard";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more routes as needed */}
        <Route path="/map" element={<Map />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;