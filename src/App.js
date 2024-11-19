// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./assets/HomePage";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import Login from "./pages/Login/login";
import MapPage from "./pages/Map/map"; // Update this import
import Dashboard from "./pages/UserDashboard/UserDashboard";
import Post from "./pages/PostingPage/PostingPage";
import Tours from "./pages/Tours/Tours"
import TourView from "./pages/TourView/TourView"

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          {/* Update the map route to include a parameter */}
          <Route path="/map/:tourId" element={<MapPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/view/:tourId" element={<TourView />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
