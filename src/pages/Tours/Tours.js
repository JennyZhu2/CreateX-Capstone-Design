import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import TourCard from '../../assets/TourCard';
import './Tours.css';

function Tours() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the index.json file to get the list of tours
    fetch('./data/hunts/index.json')
      .then((response) => response.json())
      .then((tourSummaries) => {
        setTours(tourSummaries);
      })
      .catch((error) => {
        console.error('Failed to fetch index.json:', error);
      });
  }, []);

  const handleTourClick = (huntId) => {
    navigate(`/view/${huntId}`);
  };

  return (
    <div className="home-page">
      <h1>All Tours</h1>
      <div className="tour-grid">
        {tours.length > 0 ? (
          tours.map((tour) => (
            <TourCard
              key={tour.huntId}
              tour={{
                ID: tour.huntId,
                name: tour.title,
                shortDescription: tour.shortDescription,
                imageUrl: tour.image,
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

export default Tours;