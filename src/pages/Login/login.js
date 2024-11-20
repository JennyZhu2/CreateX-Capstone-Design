import React, { useState } from "react";
import "./login.css"; // Optional: Include this if you want to style the component

function Login() {
  // State to manage form data and form type
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation
    if (isLogin) {
      if (!formData.username || !formData.password) {
        setError("Please enter both username and password.");
        return;
      }
      // Process login (e.g., API call)
      fetch(`/data/userData.json`)
      .then(response =>  response.json())
        .then(function (userData) {
        const user = userData.find(u => u.username == formData.username && u.password == formData.password);
        if (user) {
          setError("Login successful");
          console.log("Logging in:", formData);
          localStorage.setItem("userId", user.userId);
          window.location.href = "Dashboard";
          return;
        } else {
          setError("Invalid username or password.");
          return;
        }
      })
      .catch((error) => {
        console.error('Failed to fetch index.json:', error);
      });
    } else {
      if (!formData.username || !formData.email || !formData.password) {
        setError("Please complete all fields.");
        return;
      }
      // Process signup (e.g., API call)
      console.log("Creating account:", formData);
    }
    setError(""); // Clear error on successful submission
  };

  // Toggle between Login and Signup form
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: "", email: "", password: "" });
    setError("");
  };

  return (
    <div className="auth-page">
      <h2>{isLogin ? "Login" : "Create Account"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p onClick={toggleForm} className="toggle-form-link">
        {isLogin
          ? "Don't have an account? Create one"
          : "Already have an account? Log in"}
      </p>
    </div>
  );
}

export default Login;
