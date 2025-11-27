// FeedbackBody.tsx
import React from "react";
import OverallRating from "./OverallRating/OverallRating";
import CriteriaSection from "./CriteriaSection/CriteriaSection";
import ThoughtsSection from "./ThoughtsSection/ThoughtsSection";
import "./FeedbackBody.css";
const FeedbackBody: React.FC = () => {
  return (
    <div className="feedback-body">
      <OverallRating />
      <CriteriaSection />
      <ThoughtsSection />
    </div>
  );
};

export default FeedbackBody;
