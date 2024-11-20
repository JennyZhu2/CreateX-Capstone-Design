// import React from 'react';
// import { Link } from 'react-router-dom';
// import './TourCard.css';

// function TourCard({ tour, onClick }) {
//   return (
//     <div style={{width: '100%', height: '100%'}} className="tour-card" onClick={onClick}>
//       <img src={'./data/hunts/' + tour.imageUrl} alt={tour.name} className="tour-image" />
//       <div className="tour-info">
//         <h3>{tour.name}</h3>
//         <p>{tour.shortDescription}</p>
//         <Link to={`/view/${tour.ID}`}>
//           <button className="details-button">View Details</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default TourCard;
import React from 'react';
import { Link } from 'react-router-dom';
import './TourCard.css';

function TourCard({ tour, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }} className="tour-card" onClick={handleClick}>
      <img src={'./data/hunts/' + tour.imageUrl} alt={tour.name} className="tour-image" />
      <div className="tour-info">
        <h3>{tour.name}</h3>
        <p>{tour.shortDescription}</p>
        {!onClick && (
          <Link to={`/view/${tour.ID}`}>
            <button className="details-button">View Details</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default TourCard;
