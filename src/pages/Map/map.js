import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function MapPage() {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const [huntData, setHuntData] = useState(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { tourId } = useParams();

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

  // Initialize map
  useEffect(() => {
    if (!isScriptLoaded || !huntData || !googleMapRef.current) return;

    const initMap = () => {
      if (!mapRef.current) {
        mapRef.current = new window.google.maps.Map(googleMapRef.current, {
          center: huntData.coordinates,
          zoom: 15,
        });

        // Add markers and circles
        huntData.missions.forEach(mission => {
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

          marker.addListener("click", () => {
            const modal = document.getElementById("custom-alert");
            const title = document.getElementById("modal-title");
            const text = document.getElementById("modal-text");
            const closeButton = document.querySelector(".close-btn");

            title.textContent = `Mission: ${mission.title}`;
            text.textContent = `${mission.shortDescription}\n\nHint: ${mission.hint}`;
            modal.classList.remove("hidden");

            const closeModal = () => {
              modal.classList.add("hidden");
              // Clean up listeners
              closeButton.removeEventListener("click", closeModal);
              window.removeEventListener("click", outsideClickHandler);
            };

            const outsideClickHandler = (e) => {
              if (e.target === modal) {
                closeModal();
              }
            };

            closeButton.addEventListener("click", closeModal);
            window.addEventListener("click", outsideClickHandler);
          });
        });
      }
    };

    initMap();
  }, [isScriptLoaded, huntData]);

  const panToMission = (mission) => {
    if (mapRef.current) {
      mapRef.current.panTo(mission.coordinates);
      mapRef.current.setZoom(15);
    }
  };

  if (!huntData) {
    return <p>Loading scavenger hunt data...</p>;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "250px",
          backgroundColor: "#f4f4f4",
          padding: "15px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
          overflowY: "auto"
        }}
      >
        <h3>Tasks</h3>
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
            <h4
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => panToMission(mission)}
            >
              <Link to={`/post`}>{mission.title}</Link>
            </h4>
            <p>{mission.shortDescription}</p>
          </div>
        ))}
      </div>

      <div 
        ref={googleMapRef}
        style={{ 
          flexGrow: 1,
          height: "100%"
        }}
      />
    </div>
  );
}

export default MapPage;