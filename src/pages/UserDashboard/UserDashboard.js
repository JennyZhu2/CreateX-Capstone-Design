// src/pages/UserDashboard/UserDashboard.js
import React, { useState, useEffect } from "react";
import Footer from '../../assets/Footer';
import { useNavigate, Link } from "react-router-dom";
import TourCard from "../../assets/TourCard";
import "./UserDashboard.css";


function UserDashboard() {
  const [purchasedTours, setPurchasedTours] = useState([]);
  const [favoriteTours, setFavoriteTours] = useState([]);
  const [createdTours, setCreatedTours] = useState([]);
  const [userData, setUserData] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();


  // const userData = {
  //   profilePicture: 'https://via.placeholder.com/150',
  //   name: 'John Doe',
  //   username: 'johndoe123',
  //   email: 'johndoe@example.com',
  //   purchasedTours: [
  //     { ID: 'hunt001', name: 'Midtown Scavenger', imageUrl: 'images/midtown.jpg', shortDescription: 'Explore the hidden gems of Midtown with this exciting scavenger hunt!' },
  //     { ID: 'hunt002', name: 'Piedmont Park Explorer', imageUrl: 'images/park.jpg', shortDescription: 'Discover the best spots in Piedmont Park with this exciting scavenger hunt!' },
  //     { ID: 'hunt003', name: 'Inman Park Adventure', imageUrl: 'images/inman_park.jpg', shortDescription: 'Explore the charm and history of Inman Park with this engaging scavenger hunt!' },
  //   ],
  //   favoriteTours: [
  //     { ID: 'hunt003', name: 'Inman Park Adventure', imageUrl: 'images/inman_park.jpg', shortDescription: 'Explore the charm and history of Inman Park with this engaging scavenger hunt!' },
  //     { ID: 'hunt004', name: 'Downtown Atlanta Discovery', imageUrl: 'images/park.jpg', shortDescription: 'Discover the heart of Atlanta with this exciting downtown scavenger hunt!' },
  //   ],
  // };

  // Fetch the user data
  useEffect(() => {
    fetch(`./data/${userId}.json`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error(`Failed to fetch ${userId}.json:`, error);
      });
  }, []);
  // Fetch the tour data from index
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
          const favorited = tours.filter((tour) =>
            userData.favorited.includes(tour.huntId)
          );
          setFavoriteTours(favorited);
          setPurchasedTours(purchased);
          setCreatedTours(created);
        })
        .catch((error) => {
          console.error('Failed to fetch index.json:', error);
        });
    }
  }, [userData]);



  const handlePostHunt = () => {
    navigate('/post');
  };

  const handleTourClick = (tourID) => {
    navigate(`/view/${tourID}`);
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
            <h2>Welcome,  {userData.name}!</h2>
            <p>Email: {userData.email}</p>
          </div>

          <div className="user-tours">
            <h3>Purchased Tours</h3>
            <div className="tours-list">

              {/* {userData.purchasedTours.map((tour) => (
                <TourCard
                  key={tour.ID}
                  tour={tour}
                  onClick={() => handleTourClick(tour.ID)}
                />
              ))} */}

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

            <h3>Favorite Tours</h3>
            <div className="tours-list">
            {favoriteTours.length > 0 ? (
                favoriteTours.map((tour) => (
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
                <p>No Favorited Tours</p>
              )}
              {/* {userData.favoriteTours.map((tour) => (
                <TourCard
                  key={tour.ID}
                  tour={tour}
                  onClick={() => handleTourClick(tour.ID)}
                />
              ))} */}
            </div>
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
        
      
  );
}

export default UserDashboard;
