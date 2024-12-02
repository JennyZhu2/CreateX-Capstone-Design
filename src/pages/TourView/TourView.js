import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import TourCard from '../../assets/TourCard';
import Review from '../../assets/Review'; // Import the Review component
import './TourView.css';

function TourView() {
  const { tourId } = useParams();
  const [tours, setTours] = useState([]);
  const [owned, setOwned] = useState(false);
  const [username, setName] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [posting, setPosting] = useState(false);

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

  useEffect(() => {
    fetch(`/data/${userId}.json`)
      .then((response) => response.json())
      .then((data) => {
        const isOwned = data.purchased.includes(tourId) || data.created.includes(tourId);
        setOwned(isOwned);
        setName(data.name);
      })
      .catch((error) => {
        console.error(`Failed to fetch ${userId}.json:`, error);
      });
  }, []);

  const handleStartHunt = (tourId) => {
    navigate(`/map/${tourId}`);
  };

  const handlePurchase = async (tourId) => {
    try {
      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, tourId }),
      });

      const data = await response.json();
      if (response.ok) {
        setOwned(true); // Update UI to reflect the purchased tour
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error purchasing tour:", error);
      //alert("An error occurred while processing your purchase.");
    }
  };

  const handlePostReview = async (tourId) => {
    const reviewText = document.querySelector('.review-area').value;

    if (!reviewText) {
      alert('Please enter a review.');
      return;
    }

    const newReview = {
      rId: Date.now(),
      name: username,
      review: reviewText,
    };

    try {
      // Send the review to the backend to update the JSON file
      const response = await fetch(`/api/addReview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId,
          review: newReview,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Review submitted successfully!');
        // Optionally, you could update the state to reflect the new review without a full page reload
        setPosting(false);  // Hide the review input area
      } else {
        alert(data.message || 'Failed to post the review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while posting your review.');
    }
  };


  return (
    <div className="home-page">
      <button onClick={() => navigate(-1)} className="back-button">&lt;</button>
      <div className="tour-grid">
        {tours.map((tour) => (
          <div key={tour.id}>
            <h1>{tour.title}</h1>
            <h2>{tour.shortDescription}</h2>
            <img src={'../data/hunts/' + tour.image} alt={tour.name} className="img" />
            <h3>{tour.fullDescription}</h3>
            <h2>Here are the stops you'll visit along this tour</h2>
            {tour.missions.map((mission) => (
              <h3 key={mission.title}>{mission.title}</h3>
            ))}
            <h2>Reviews</h2>
            {/* Add the reviews container for side-by-side display */}
            <div className="reviews-container">
              {tour.reviews && tour.reviews.map((review) => (
                <Review key={review.rId} review={review} />
              ))}
            </div>
            {owned ? (
              <button className='cta-button' onClick={() => handleStartHunt(tourId)}>Start Tour</button>
            ) : (
              <button className='cta-button' onClick={() => handlePurchase(tourId)}>Purchase</button>
            )}
            {owned && !posting ? (
              <div>
                <button className='posting-button' onClick={() => setPosting(!posting)}>Post a Review</button>
              </div>
            ) : (
              <div>
                  <textarea className='review-area' placeholder="Enter your review"></textarea>
                  <button className='submit-review' onClick={() => handlePostReview(tourId)}>Submit Reivew</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TourView;
