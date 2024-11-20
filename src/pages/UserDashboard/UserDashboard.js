// src/pages/UserDashboard/UserDashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../assets/Footer';
import TourCard from '../../assets/TourCard';
import './UserDashboard.css';

function UserDashboard() {
  const navigate = useNavigate();

  const userData = {
    profilePicture: 'https://via.placeholder.com/150',
    name: 'John Doe',
    username: 'johndoe123',
    email: 'johndoe@example.com',
    purchasedTours: [
      { ID: 'hunt001', name: 'Midtown Scavenger', imageUrl: 'images/midtown.jpg', shortDescription: 'Explore the hidden gems of Midtown with this exciting scavenger hunt!' },
      { ID: 'hunt002', name: 'Piedmont Park Explorer', imageUrl: 'images/park.jpg', shortDescription: 'Discover the best spots in Piedmont Park with this exciting scavenger hunt!' },
      { ID: 'hunt003', name: 'Inman Park Adventure', imageUrl: 'images/inman_park.jpg', shortDescription: 'Explore the charm and history of Inman Park with this engaging scavenger hunt!' },
    ],
    favoriteTours: [
      { ID: 'hunt003', name: 'Inman Park Adventure', imageUrl: 'images/inman_park.jpg', shortDescription: 'Explore the charm and history of Inman Park with this engaging scavenger hunt!' },
      { ID: 'hunt004', name: 'Downtown Atlanta Discovery', imageUrl: 'images/park.jpg', shortDescription: 'Discover the heart of Atlanta with this exciting downtown scavenger hunt!' },
    ],
  };


  const handlePostHunt = () => {
    navigate('/post');
  };

  const handleTourClick = (tourID) => {
    navigate(`/view_withhunt/${tourID}`);
  };

  return (
    <div>

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
              {userData.purchasedTours.map((tour) => (
                <TourCard
                  key={tour.ID}
                  tour={tour}
                  onClick={() => handleTourClick(tour.ID)}
                />
              ))}
            </div>
          </div>

          <div className="user-tours">
            <h3>Favorite Tours</h3>
            <div className="tours-list">
              {userData.favoriteTours.map((tour) => (
                <TourCard
                  key={tour.ID}
                  tour={tour}
                  onClick={() => handleTourClick(tour.ID)}
                />
              ))}
            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;
