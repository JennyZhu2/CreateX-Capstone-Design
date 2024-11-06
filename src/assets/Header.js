import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LikeALocal</Link>
      </div>
      <nav className="nav-links">
        <Link to="/tours">Tours</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
}

export default Header;
