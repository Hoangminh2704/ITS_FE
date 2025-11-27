// CriteriaSection.tsx
import React from "react";
import CriteriaItem from "./CriteriaItem";
import "./CriteriaSection.css";
const CriteriaSection: React.FC = () => {
  return (
    <div className="criteria-section">
      <CriteriaItem
        id="content-quality"
        label="Content Quality"
        defaultValue={25}
        filledStars={2}
      />
      <CriteriaItem
        id="instructor-guidance"
        label="Instructor Guidance"
        defaultValue={25}
        filledStars={2}
      />
      <CriteriaItem
        id="practical-application"
        label="Practical Application"
        defaultValue={25}
        filledStars={1}
      />
    </div>
  );
};

export default CriteriaSection;
