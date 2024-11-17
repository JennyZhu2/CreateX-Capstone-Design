// src/components/TourCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./TourCard.css";

function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <img src={tour.imageUrl} alt={tour.title} />
      <div className="tour-info">
        <h3>{tour.title}</h3>
        <p>{tour.description}</p>
        <Link to={`/map/${tour.huntId}`}>
          <button className="details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
