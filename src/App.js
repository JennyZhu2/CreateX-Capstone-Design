// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./assets/HomePage";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/Signup";
import MapPage from "./pages/Map/map"; // Update this import
import Dashboard from "./pages/UserDashboard/UserDashboard";
import Post from "./pages/PostingPage/PostingPage";

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Update the map route to include a parameter */}
        <Route path="/map/:tourId" element={<MapPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post" element={<Post />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
