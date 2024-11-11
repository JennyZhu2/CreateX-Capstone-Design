// // src/pages/MapPage.js
// import React, { useEffect } from "react";

// const stops = [
//   { name: "Stop 1", text: "Your destination is an art installation hidden between the offices of two banking giants. Hint: let our first president lead the way!", location: { lat: 40.718, lng: -74.012 }, radius: 200 },
//   { name: "Stop 2", text: "Your next destination is a coffee turned vinyl store. Hint: What rhymes with latte?", location: { lat: 40.721, lng: -74.007 }, radius: 100 },
//   { name: "Stop 3", text: "Spend the evening at your last destination: a historic bar in westside Soho. Hint: Why did the chicken cross the road? Cluck", location: { lat: 40.725, lng: -74.002 }, radius: 200 },
//   // Add more stops as needed
// ];

// function MapPage() {
//   useEffect(() => {
//     // Load the Google Maps API script dynamically
//     const script = document.createElement("script");
//     script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnBuUdTjkuJ60xB5HeoS5uivE-ejRg4kg&libraries=places,geometry";
//     script.async = true;
//     script.onload = () => {
//       // Initialize the map after the script is loaded
//       initMap();
//     };
//     document.body.appendChild(script);

//     // Function to initialize the map
//     function initMap() {
//       const map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 40.7128, lng: -74.0060 }, // Initial map center
//         zoom: 13,
//       });

//       // Add stops and discover neighborhoods for each stop
//       stops.forEach(stop => {
//         addStop(map, stop);
//         discoverNeighborhood(map, stop);
//       });
//     }

//     // Function to add markers and circles for each scavenger hunt stop
//     function addStop(map, stop) {
//       const marker = new google.maps.Marker({
//         position: stop.location,
//         map: map,
//         title: stop.name,
//       });

//       const circle = new google.maps.Circle({
//         map: map,
//         center: stop.location,
//         radius: stop.radius, // Radius in meters
//         fillColor: "#FF0000",
//         fillOpacity: 0.3,
//         strokeColor: "#FF0000",
//         strokeOpacity: 0.8,
//         strokeWeight: 2,
//       });  
 
//       marker.addListener("click", () => {
//         alert(`Start your scavenger hunt: Welcome to ${stop.name}!
        
//         ${stop.text}`);
//       });
//     }

//     // Optional: Function to discover nearby places of interest around each stop
//     function discoverNeighborhood(map, stop) {
//       const service = new google.maps.places.PlacesService(map);
//       const request = {
//         location: stop.location,
//         radius: stop.radius,
//         type: ["landmark"], // Adjust type (e.g., "park", "museum") as needed
//       };

//       service.nearbySearch(request, (results, status) => {
//         if (status === google.maps.places.PlacesServiceStatus.OK) {
//           results.forEach(place => {
//             new google.maps.Marker({
//               position: place.geometry.location,
//               map: map,
//               title: place.name,
//               icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
//             });
//           });
//         }
//       });
//     }
//   }, []);

//   return <div id="map" style={{ display: "flex", 
//     flexDirection: "column", 
//     height: "100vh", 
//     width: "100%" }}></div>;
// }

// export default MapPage;

import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const stops = [
  { name: "Stop 1", text: "Your destination is an art installation hidden between the offices of two banking giants. Hint: let our first president lead the way!", location: { lat: 40.718, lng: -74.012 }, radius: 200 },
  { name: "Stop 2", text: "Your next destination is a coffee turned vinyl store. Hint: What rhymes with latte?", location: { lat: 40.721, lng: -74.007 }, radius: 100 },
  { name: "Stop 3", text: "Spend the evening at your last destination: a historic bar in westside Soho. Hint: Why did the chicken cross the road? Cluck", location: { lat: 40.725, lng: -74.002 }, radius: 200 },
];

function MapPage() {
  let map; // Define the map variable to access it globally within the component

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBnBuUdTjkuJ60xB5HeoS5uivE-ejRg4kg&libraries=places,geometry";
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 13,
      });

      stops.forEach(stop => {
        addStop(map, stop);
        discoverNeighborhood(map, stop);
      });
    }

    function addStop(map, stop) {
      const marker = new google.maps.Marker({
        position: stop.location,
        map: map,
        title: stop.name,
      });

      const circle = new google.maps.Circle({
        map: map,
        center: stop.location,
        radius: stop.radius,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
      });

      marker.addListener("click", () => {
        alert(`Start your scavenger hunt: Welcome to ${stop.name}!
        
        ${stop.text}`);
      });
    }

    function discoverNeighborhood(map, stop) {
      const service = new google.maps.places.PlacesService(map);
      const request = {
        location: stop.location,
        radius: stop.radius,
        type: ["landmark"],
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(place => {
            new google.maps.Marker({
              position: place.geometry.location,
              map: map,
              title: place.name,
              icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
            });
          });
        }
      });
    }
  }, []);

  // Function to pan the map to a specific stop
  const panToStop = (stop) => {
    if (map) {
      map.panTo(stop.location);
      map.setZoom(15); // Adjust zoom level if needed
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left sidebar for tasks */}
      <div style={{
        width: "250px",
        backgroundColor: "#f4f4f4",
        padding: "15px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}>
        <h3>Tasks</h3>
        {stops.map((stop, index) => (
          <div key={index} style={{
            marginBottom: "15px",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "4px",
            backgroundColor: "#fff",
          }}>
            <h4 
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => panToStop(stop)}
            >
               <Link to={`/post`}>{stop.name}</Link>
            </h4>
            <p>{stop.text}</p>
          </div>
        ))}
      </div>

      {/* Map container */}
      <div id="map" style={{ flexGrow: 1, height: "100vh" }}></div>
    </div>
  );
}

export default MapPage;
