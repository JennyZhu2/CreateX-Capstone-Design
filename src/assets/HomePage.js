// src/assets/HomePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TourCard from './TourCard.js';
import './HomePage.css';

function HomePage() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of tours from the JSON file
    fetch('/data/hunts/hunts.json')
      .then((response) => response.json())
      .then((data) => {
        setTours(data);
      })
      .catch((error) => {
        console.error('Error fetching tours:', error);
      });
  }, []);

  const handleTourClick = (huntId) => {
    navigate(`/map/${huntId}`);
  };

  return (
    <div className="home-page">
      <h1>Available Tours</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a city or zip code"
          className="search-bar"
        />
      </div>

      <div className="tour-list">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <TourCard
              key={tour.huntId}
              tour={{
                ID: tour.huntId,
                name: tour.title,
                location: "Unknown Location", // You can update this if the data has a location field
                cost: 0, // You can update this if the data has a cost field
                imageUrl: `/data/hunts/${tour.image}`,
              }}
              onClick={() => handleTourClick(tour.huntId)}
            />
          ))
        ) : (
          <p>Loading tours...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;