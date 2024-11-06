import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2024 LikeALocal. All rights reserved.</p>
      <div className="footer-links">
        <a href="/about">About Us</a>
        <a href="/contact">Contact</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
}

export default Footer;
