import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './mission.css';

function Mission() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourId, missionStep } = useParams();

  // Mission details passed via navigation state
  const mission = location.state?.mission;
  console.log(mission);

  if (!mission) {
    return <div>Mission details not found</div>;
  }

  const formattedDescription = mission.description.split('\n\n').map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));
  
  return (
    <div className="mission-container">
      <button onClick={() => navigate(-1)} className="back-button">&lt;</button>
      <div className="mission-header">
      <img 
      src={`/data/hunts/${mission.image}`} 
      alt={`${mission.location} Visual`} 
      className="mission-image" 
      />
        <div className="mission-title-wrapper">
          <h1 className="mission-title">{mission.location}</h1>
          <p className="mission-funfact"><strong>{mission.address}</strong></p>
        </div>
      </div>
      
      <div className="mission-description">{formattedDescription}</div>
      
      {mission.video && (
        <div className="mission-video">
          <h3>Watch this video:</h3>
          <video controls>
            <source src={mission.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      <div className="mission-hint">
        <h3>Fun Fact:</h3>
        <p>{mission.funFact}</p>
      </div>
    </div>
  );
}

export default Mission;
