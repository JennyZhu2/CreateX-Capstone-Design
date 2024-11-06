import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";

function HeroSection() {
  return (
    <div className="hero-container">
      <h1>Explore the World at Your Own Pace</h1>
      <p>Discover self-guided tours curated by locals.</p>
      <Link to="/tours">
        <button className="cta-button">Find Tours</button>
      </Link>
    </div>
  );
}

export default HeroSection;
