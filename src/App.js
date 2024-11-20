// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./assets/HomePage";
import Header from "./assets/Header";
import Footer from "./assets/Footer";
import Login from "./pages/Login/login";
import MapPage from "./pages/Map/map";
import Dashboard from "./pages/UserDashboard/UserDashboard";
import Post from "./pages/PostingPage/PostingPage";
import Tours from "./pages/Tours/Tours"
import TourView from "./pages/TourView/TourView"
import TourView_withhunt from "./pages/TourView_withhunt/TourView";
import Mission from "./pages/Map/mission";

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
          <Route path="/view_withhunt/:tourId" element={<TourView_withhunt />} />
          <Route path="/tour/:tourId/mission/:missionStep" element={<Mission />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
