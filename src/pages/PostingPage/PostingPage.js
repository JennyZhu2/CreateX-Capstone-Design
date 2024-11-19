// src/pages/PostingPage/PostingPage.js
import React from "react";
import Footer from "../../assets/Footer";
import "./PostingPage.css";

function PostingPage() {
  return (
    <>
      <div className="posting-container">
        <h1>Post a Scavenger Hunt</h1>
        <form>
          <div className="form-group">
            <label>Hunt Name:</label>
            <input type="text" placeholder="Enter hunt name" />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea placeholder="Enter description" />
          </div>
          <div className="form-group">
            <label>Upload Photo:</label>
            <input type="file" multiple />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <input type="text" placeholder="Enter location" />
          </div>
          <button type="submit">Post Scavenger Hunt</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PostingPage;