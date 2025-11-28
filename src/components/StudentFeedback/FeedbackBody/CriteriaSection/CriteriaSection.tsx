// CriteriaSection.tsx
import React from "react";
import CriteriaItem from "./CriteriaItem";
import "./CriteriaSection.css";

interface CriteriaData {
  contentQuality: number;
  instructorGuidance: number;
  practicalApplication: number;
}

interface CriteriaSectionProps {
  criteriaData: CriteriaData;
  onCriteriaChange: (criteria: string, value: number) => void;
}

const CriteriaSection: React.FC<CriteriaSectionProps> = ({
  criteriaData,
  onCriteriaChange,
}) => {
  return (
    <div className="criteria-section">
      <CriteriaItem
        id="content-quality"
        label="Content Quality"
        value={criteriaData.contentQuality}
        onValueChange={(value) => onCriteriaChange("contentQuality", value)}
      />
      <CriteriaItem
        id="instructor-guidance"
        label="Instructor Guidance"
        value={criteriaData.instructorGuidance}
        onValueChange={(value) => onCriteriaChange("instructorGuidance", value)}
      />
      <CriteriaItem
        id="practical-application"
        label="Practical Application"
        value={criteriaData.practicalApplication}
        onValueChange={(value) =>
          onCriteriaChange("practicalApplication", value)
        }
      />
    </div>
  );
};

export default CriteriaSection;
