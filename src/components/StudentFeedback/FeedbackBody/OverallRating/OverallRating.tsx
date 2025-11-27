// OverallRating.tsx
import React from "react";
import "./OverallRating.css";
const OverallRating: React.FC = () => {
  return (
    <div className="overall-rating-section">
      <h2 className="section-label">Overall Rating</h2>
      <div className="star-rating">
        <span className="material-symbols-outlined">star</span>
        <span className="material-symbols-outlined">star</span>
        <span className="material-symbols-outlined">star</span>
        <span className="material-symbols-outlined">star</span>
        <span className="material-symbols-outlined">star</span>
      </div>
      <p className="rating-hint">Click to rate</p>
    </div>
  );
};

export default OverallRating;
