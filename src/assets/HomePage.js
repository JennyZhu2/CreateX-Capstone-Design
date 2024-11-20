import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import TourCard from './TourCard';
import HeroSection from "./HeroSection";
import './HomePage.css';

function HomePage() {
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the index.json file to get the list of tours
    fetch('./data/hunts/index.json')
      .then((response) => response.json())
      .then((tours) => {
        const featuredTours = tours.filter((tour) => tour.featured);
        setTours(featuredTours);
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
      <HeroSection/>
      <h1>Featured Tours</h1>
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
      <Link to="/tours">
        <button className="cta-button">Search Tours</button>
      </Link>
    </div>
  );
}

export default HomePage;