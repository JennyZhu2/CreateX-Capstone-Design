// src/components/TourCard.js
import React from "react";
import { Link } from "react-router-dom";
import "./TourCard.css"; // Create this CSS file for styling

function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <img src={tour.imageUrl} alt={tour.name} />
      <div className="tour-info">
        <h3>{tour.name}</h3>
        <p>{tour.location}</p>
        <p>${tour.cost.toFixed(2)}</p>
        <Link to={`/tours/${tour.ID}`}>
          <button className="details-button">View Details</button>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;
