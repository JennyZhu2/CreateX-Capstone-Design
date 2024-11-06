// src/components/HomePage.js
import React, { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import TourCard from "./TourCard";
import "./HomePage.css"; // Create this CSS file for styling

function HomePage() {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    // Fetch tours from the backend API
    fetch("")
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch((error) => console.error("Error fetching tours:", error));
  }, []);

  return (
    <div className="home-page">
      <HeroSection />
      <div className="featured-tours">
        <h2>Featured Tours</h2>
        <div className="tours-container">
          {tours.map((tour) => (
            <TourCard key={tour.ID} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
