// src/pages/UserDashboard/UserDashboard.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../../assets/Footer";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  // Mock user data (hardcoded)
  const userData = {
    profilePicture: "https://via.placeholder.com/150",
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    purchasedTours: [
      { id: "1", name: "Historic City Tour" },
      { id: "2", name: "Sunset Beach Tour" },
    ],
    favoriteTours: [
      { id: "3", name: "Downtown Exploration", link: "/map" },
      { id: "4", name: "Cultural Food Tour" },
    ],
    downloadedTours: [
      { id: "5", name: "Nature Walk" },
      { id: "6", name: "Mountain Adventure" },
    ],
  };

  // Navigate to the Posting Page
  const handlePostHunt = () => {
    navigate("/post-hunt");
  };

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>User Dashboard</h1>
          <button className="post-hunt-button" onClick={handlePostHunt}>
            Post Hunt
          </button>
        </div>

        {/* User Info */}
        <div className="user-profile">
          <div className="profile-picture">
            <img src={userData.profilePicture} alt="Profile" />
          </div>
          <div className="user-info">
            <h2>{userData.name}</h2>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
          </div>

          {/* Horizontally Scrollable Lists */}
          <div className="user-tours">
            <h3>Purchased Tours</h3>
            <div className="tours-list">
              {userData.purchasedTours.map((tour) => (
                <div key={tour.id} className="tour-card">
                  <h4>{tour.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="user-tours">
            <h3>Favorite Tours</h3>
            <div className="tours-list">
              {userData.favoriteTours.map((tour) => (
                <Link to={tour.link} key={tour.id} className="tour-card">
                  <h4>{tour.name}</h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="user-tours">
            <h3>Downloaded Tours</h3>
            <div className="tours-list">
              {userData.downloadedTours.map((tour) => (
                <div key={tour.id} className="tour-card">
                  <h4>{tour.name}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserDashboard;