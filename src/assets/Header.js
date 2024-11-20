import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./Header.css";


function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsSignedIn(true);
    }
  }, []);
 return (
   <header className="header">
     <div className="logo">
       <Link to="/">LikeALocal</Link>
     </div>
     <nav className="nav-links">
       <Link to="/tours">Tours</Link>
       {isSignedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/" onClick={() => logOut()}>Logout</Link>
        </>
       ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
       )}
     </nav>
   </header>
 );

 function logOut() {
  localStorage.removeItem("userId");
  setIsSignedIn(false);
 }
}

export default Header;