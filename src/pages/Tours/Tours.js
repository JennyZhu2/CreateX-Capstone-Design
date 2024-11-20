import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"
import TourCard from '../../assets/TourCard';
import './Tours.css';

function Tours() {
  const [searchTerm, setSearchTerm] = useState("");
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

  const searchedTours = tours.filter((tour) =>
    tour.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTourClick = (huntId) => {

    navigate(`/view/${huntId}`);

  };

  return (
    <div className="home-page">
      <h1>Available Tours</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search tours by name"
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="tour-grid">
        {searchedTours.length > 0 ? (
          searchedTours.map((tour) => (
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
          <p>No tours matching this search</p>
        )}
      </div>
    </div>
  );
}

export default Tours;