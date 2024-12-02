import React from 'react';
import './Review.css';

function Review({ review, onClick }) {

  return (
    <div className="review-card">
      <div className="review-info">
        <h3>{review.name}</h3>
        <p>{review.review}</p>
      </div>
    </div>
  );
}

export default Review;