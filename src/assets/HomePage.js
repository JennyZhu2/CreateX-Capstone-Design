import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TourCard from './TourCard';
import './HomePage.css';

function HomePage() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the index.json file to get the list of tours
    fetch('./data/hunts/index.json')
      .then((response) => response.json())
      .then((tourSummaries) => {
        // Fetch each individual tour JSON file
        Promise.all(
          tourSummaries.map((tourSummary) =>
            fetch('./data/' + tourSummary.jsonFile)
              .then((response) => response.json())
              .catch((error) => {
                console.error(`Failed to fetch ${tourSummary.jsonFile}:`, error);
                return null; // Return null for failed fetches
              })
          )
        ).then((tourDetails) => {
          // Filter out any nulls from failed fetches
          const validTours = tourDetails.filter((tour) => tour !== null);
          setTours(validTours);
        });
      })
      .catch((error) => {
        console.error('Failed to fetch index.json:', error);
      });
  }, []);

  const handleTourClick = (huntId) => {
    navigate(`/map/${huntId}`);
  };

  return (
    <div className="home-page">
      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tours by city or zip code"
          className="search-bar"
        />
      </div>

      <h1>Available Tours</h1>

      {/* Tour Grid */}
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

export default HomePage;