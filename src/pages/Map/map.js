import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MapPage() {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const [huntData, setHuntData] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [completedMissions, setCompletedMissions] = useState([]);
  const [locationWatcher, setLocationWatcher] = useState(null);
  const { tourId } = useParams();
  let infoWindow
  
  const handleCompleteTask = (index) => {
    if (!completedMissions.includes(index)) {
      setCompletedMissions((prev) => [...prev, index]);
    }
  };

  // Load hunt data
  useEffect(() => {
    if (!tourId) return;
    axios
      .get(`/data/hunts/${tourId}.json`)
      .then(response => {
        setHuntData(response.data);
      })
      .catch(error => {
        console.error("Error loading scavenger hunt data:", error);
      });
  }, [tourId]);

  // Load Google Maps Script
  useEffect(() => {
    // Check if script is already loaded
    if (window.google?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBnBuUdTjkuJ60xB5HeoS5uivE-ejRg4kg&libraries=places,geometry`;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", () => {
          setIsScriptLoaded(true);
        });

        document.head.appendChild(script);
      }
    };

    loadGoogleMapsScript();
  }, []);

  
  useEffect(() => {
    if (!isScriptLoaded || !huntData || !googleMapRef.current) return;

    const initMap = () => {
      if (!mapRef.current) {
        // initialize map
        mapRef.current = new window.google.maps.Map(googleMapRef.current, {
          center: huntData.coordinates,
          zoom: 16,
        });

        
        // Initialize stops
        huntData.missions.forEach(mission => {
          // Add markers and circles
          const marker = new window.google.maps.Marker({
            position: mission.coordinates,
            map: mapRef.current,
            title: mission.title,
          });

          const circle = new window.google.maps.Circle({
            map: mapRef.current,
            center: mission.coordinates,
            radius: 150,
            fillColor: "#FF0000",
            fillOpacity: 0.3,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          });

          // InfoWindow content for each marker
          const contentString = `
          <div style="max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0; color: #333;">Task ${mission.title}</h3>
            <p style="margin: 5px 0; font-size: 14px; color: #555;">
              <strong>Hint:</strong> ${mission.hint}
            </p>
          </div>
          `;

          const infoWindow = new window.google.maps.InfoWindow({
            content: contentString,
          });

          // Add click event to open the InfoWindow
          marker.addListener("click", () => {
            infoWindow.open(mapRef.current, marker);
          });
        });

        

        // Add a marker to represent the user's location
        const userMarker = new google.maps.Marker({
          map: mapRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#4285F4", // Blue color similar to Google Maps
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          },
          title: "Your Location",
        });

        // Watch user's location
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
  
            console.log("Current position:", pos);
  
            // Update marker and map position
            userMarker.setPosition(pos);
            mapRef.current.setCenter(pos);
          },
          (error) => {
            console.error("Error watching position:", error);
            handleLocationError(true, mapRef.current.getCenter());
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0,
          }
        );

        // Store watcher to clean up later
        setLocationWatcher(watchId);

        // Add Pan to Current Location Button
        const locationButton = document.createElement("button");
        locationButton.textContent = "Pan to Current Location";
        locationButton.classList.add("custom-map-control-button");
        
        // Ensure the map's controls are available
        if (mapRef.current.controls) {
          mapRef.current.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
        }

        // Pan map to user's location when the button is clicked
        locationButton.addEventListener("click", () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              mapRef.current.panTo(pos);
            });
          } else {
            handleLocationError(false, mapRef.current.getCenter());
          }
        });
      }
    };
    
    const handleLocationError = (browserHasGeolocation, pos) => {
      const errorMessage = browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.";
      console.error(errorMessage);
  
      const infoWindow = new google.maps.InfoWindow({
        content: errorMessage,
        position: pos,
      });
  
      infoWindow.open(mapRef.current);
    };

    initMap();

    // Cleanup on component unmount
    return () => {
      if (locationWatcher) {
        navigator.geolocation.clearWatch(locationWatcher);
      }
    };
  }, [isScriptLoaded, huntData, googleMapRef]);

  const panToMission = (mission) => {
    if (mapRef.current) {
      mapRef.current.panTo(mission.coordinates);
      mapRef.current.setZoom(17);
    }
  };

  if (!huntData) {
    return <p>Loading scavenger hunt data...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "15px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        {/* Task Progress Tracker */}
        <h3>
          Progress: {completedMissions.length} / {huntData.missions.length}
        </h3>
  
        {/* Missions List */}
        {huntData.missions.map((mission, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              backgroundColor: "#fff",
            }}
          >
            {/* Mission Title */}
            <h4
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => panToMission(mission)}
            >
            <strong>Task {mission.step}: </strong>
              <Link to={`/post`}>{mission.title}</Link>
            </h4>
            {/* Mission Short Description */}
            <p>{mission.shortDescription}</p>
  
            {/* Task Completion */}
            {completedMissions.includes(index) ? (
              <p style={{ color: "green", fontWeight: "bold" }}>Task Completed!</p>
            ) : (
              <button
                onClick={() => handleCompleteTask(index)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#4CAF50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Mark as Complete
              </button>
            )}
          </div>
        ))}
      </div>
  
      {/* Map Container */}
      <div
        ref={googleMapRef}
        style={{
          flexGrow: 1,
          height: "100%",
        }}
      />
    </div>
  );
}  

export default MapPage;