// src/pages/UserDashboard/UserDashboard.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import TourCard from "../../assets/TourCard";
import "./UserDashboard.css";

function UserDashboard() {
  const [userData, setData] = useState([]); // User data with purchased and created IDs
  const [purchasedTours, setPurchasedTours] = useState([]); // Data for purchased tours
  const [createdTours, setCreatedTours] = useState([]); // Data for created tours
  const userId = localStorage.getItem("userId");

  // Fetch the user data (purchased and created IDs)
  useEffect(() => {
    fetch(`./data/${userId}.json`)
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Store the user data, which contains purchased and created tour IDs
      })
      .catch((error) => {
        console.error('Failed to fetch user001.json:', error);
      });
  }, []); // Empty dependency array ensures this runs only once after the initial render

  useEffect(() => {
    if (userData && userData.purchased && userData.created) {
      fetch('./data/hunts/index.json')
        .then((response) => response.json())
        .then((tours) => {
          const purchased = tours.filter((tour) =>
            userData.purchased.includes(tour.huntId)
          );
          const created = tours.filter((tour) =>
            userData.created.includes(tour.huntId)
          );

          setPurchasedTours(purchased);
          setCreatedTours(created);
        })
        .catch((error) => {
          console.error('Failed to fetch index.json:', error);
        });
    }
  }, [userData]);

  // Navigate to the Posting Page
  const handlePostHunt = () => {
    navigate("/post");
  };

  const handleTourClick = (huntId) => {
    navigate(`/view/${huntId}`);
  }

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>User Dashboard</h1>
          <button className="post-hunt-button" onClick={handlePostHunt}>
            Post Hunt
          </button>
        </div>

        <div className="user-profile">
          <div className="profile-picture">
            <img src={userData.profilePicture} alt="Profile" />
          </div>
          <div className="user-info">
            <h2>{userData.name}</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>

          <div className="user-tours">
            <h3>Purchased Tours</h3>
            <div className="tours-list">
              {purchasedTours.length > 0 ? (
                purchasedTours.map((tour) => (
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
                <p>No Purchased Tours</p>
              )}
            </div>
          </div>

          <div className="user-tours">
            <h3>Created Tours</h3>
            <div className="tours-list">
              {createdTours.length > 0 ? (
                createdTours.map((tour) => (
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
                <p>No Created Tours</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;