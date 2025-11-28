// CriteriaItem.tsx
import React from "react";
import "./CriteriaItem.css";

interface CriteriaItemProps {
  id: string;
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const CriteriaItem: React.FC<CriteriaItemProps> = ({
  id,
  label,
  value,
  onValueChange,
}) => {
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    onValueChange(newValue);
  };

  const calculateFilledStars = (value: number): number => {
    // Convert percentage (0-100) to stars (0-5)
    return Math.round((value / 100) * 5);
  };

  const renderStars = (filledStars: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClass = i < filledStars ? "star-filled" : "";
      stars.push(
        <span key={i} className={`material-symbols-outlined ${starClass}`}>
          star
        </span>
      );
    }
    return stars;
  };

  const filledStars = calculateFilledStars(value);

  return (
    <div className="criteria-item">
      <label className="criteria-label" htmlFor={id}>
        {label}
      </label>
      <div className="criteria-control">
        <input
          className="criteria-slider"
          id={id}
          max="100"
          min="0"
          type="range"
          value={value}
          onChange={handleSliderChange}
        />
        <div className="criteria-stars">
          {renderStars(filledStars)}
          <span
            className="criteria-value"
            style={{ marginLeft: "8px", fontSize: "12px", color: "#6b7280" }}
          >
            {value}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CriteriaItem;
