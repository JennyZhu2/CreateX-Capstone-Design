import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import TourCard from '../../assets/TourCard';
import './TourView.css';

function TourView() {
  const { tourId } = useParams();
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/hunts/index.json')
      .then((response) => response.json())
      .then((tourSummaries) => {
        const tourSummary = tourSummaries.find((summary) => summary.huntId === tourId);

        if (tourSummary) {
          fetch('/data/' + tourSummary.jsonFile)
            .then((response) => response.json())
            .then((tourDetails) => {
              setTours([tourDetails]);
            })
            .catch((error) => {
              console.error(`Failed to fetch ${tourSummary.jsonFile}:`, error);
            });
        } else {
          console.error(`No tour found with id: ${tourId}`);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch index.json:', error);
      });
  }, []);

  const handleStartHunt = (huntId) => {
    navigate(`/map/${huntId}`);
  }; 

  return (
    <div className="home-page">
      <button onClick={() => navigate(-1)} className="back-button">&lt;</button>
      <div className="tour-grid">
        {tours.map((tour) => (
          <div>
            <h1>{tour.title}</h1>
            <h2>{tour.shortDescription}</h2>
            <img src={'../data/hunts/' + tour.image} alt={tour.name} className="tour-image" />
            <h3>{tour.fullDescription}</h3>
            <h2>Here are the stops you'll visit along this tour</h2>
            {tour.missions.map((mission) => (
              <h3>{mission.title}</h3>
            ))
            }
            <btn onClick={() => handleStartHunt()}>Purchase</btn>
          </div>
          ))
        }
      </div>
    </div>
  );
}

export default TourView;