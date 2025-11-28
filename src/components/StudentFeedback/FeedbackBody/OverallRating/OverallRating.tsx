// OverallRating.tsx
import React from "react";
import "./OverallRating.css";

interface OverallRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const OverallRating: React.FC<OverallRatingProps> = ({
  rating,
  onRatingChange,
}) => {
  const handleStarClick = (starIndex: number) => {
    onRatingChange(starIndex + 1);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const isFilled = i < rating;
      stars.push(
        <span
          key={i}
          className={`material-symbols-outlined ${
            isFilled ? "star-filled" : ""
          }`}
          onClick={() => handleStarClick(i)}
          style={{ cursor: "pointer" }}
        >
          {isFilled ? "star" : "star"}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="overall-rating-section">
      <h2 className="section-label">Overall Rating</h2>
      <div className="star-rating">{renderStars()}</div>
      <p className="rating-hint">
        {rating > 0
          ? `You rated: ${rating} star${rating > 1 ? "s" : ""}`
          : "Click to rate"}
      </p>
    </div>
  );
};

export default OverallRating;
