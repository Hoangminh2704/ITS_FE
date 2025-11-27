// CriteriaItem.tsx
import React from "react";
import "./CriteriaItem.css";
interface CriteriaItemProps {
  id: string;
  label: string;
  defaultValue: number;
  filledStars: number;
}

const CriteriaItem: React.FC<CriteriaItemProps> = ({
  id,
  label,
  defaultValue,
  filledStars,
}) => {
  const renderStars = () => {
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
          defaultValue={defaultValue}
        />
        <div className="criteria-stars">{renderStars()}</div>
      </div>
    </div>
  );
};

export default CriteriaItem;
