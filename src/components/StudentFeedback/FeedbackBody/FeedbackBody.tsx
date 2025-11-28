// FeedbackBody.tsx
import React from "react";
import OverallRating from "./OverallRating/OverallRating";
import CriteriaSection from "./CriteriaSection/CriteriaSection";
import ThoughtsSection from "./ThoughtsSection/ThoughtsSection";
import "./FeedbackBody.css";

interface FeedbackData {
  overallRating: number;
  contentQuality: number;
  instructorGuidance: number;
  practicalApplication: number;
  thoughts: string;
}

interface FeedbackBodyProps {
  feedbackData: FeedbackData;
  onFeedbackChange: (updates: Partial<FeedbackData>) => void;
}

const FeedbackBody: React.FC<FeedbackBodyProps> = ({
  feedbackData,
  onFeedbackChange,
}) => {
  const handleOverallRatingChange = (rating: number) => {
    onFeedbackChange({ overallRating: rating });
  };

  const handleCriteriaChange = (criteria: string, value: number) => {
    onFeedbackChange({ [criteria]: value });
  };

  const handleThoughtsChange = (thoughts: string) => {
    onFeedbackChange({ thoughts });
  };

  return (
    <div className="feedback-body">
      <OverallRating
        rating={feedbackData.overallRating}
        onRatingChange={handleOverallRatingChange}
      />
      <CriteriaSection
        criteriaData={{
          contentQuality: feedbackData.contentQuality,
          instructorGuidance: feedbackData.instructorGuidance,
          practicalApplication: feedbackData.practicalApplication,
        }}
        onCriteriaChange={handleCriteriaChange}
      />
      <ThoughtsSection
        thoughts={feedbackData.thoughts}
        onThoughtsChange={handleThoughtsChange}
      />
    </div>
  );
};

export default FeedbackBody;
