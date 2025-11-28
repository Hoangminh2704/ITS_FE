// components/Feedback/FeedbackList.tsx
import React from "react";
import "./FeedbackList.css";
import type { FeedbackResponseDTO } from "../../../types";
import FeedbackCard from "../FeedbackCard/FeedbackCard";

interface FeedbackListProps {
  feedbacks: FeedbackResponseDTO[];
  onRefresh: () => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({
  feedbacks,
  onRefresh,
}) => {
  if (feedbacks.length === 0) {
    return (
      <div className="feedback-list-empty">
        <div className="empty-state">
          <span className="material-symbols-outlined">reviews</span>
          <h3>No Feedback Yet</h3>
          <p>There are no feedbacks available for this course.</p>
          <button className="btn btn-primary" onClick={onRefresh}>
            <span className="material-symbols-outlined">refresh</span>
            Check Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-list">
      <div className="feedback-list-header">
        <div className="feedback-count">
          <span className="count-number">{feedbacks.length}</span>
          <span className="count-label">
            {feedbacks.length === 1 ? "Feedback" : "Feedbacks"}
          </span>
        </div>
        <button className="btn btn-secondary btn-refresh" onClick={onRefresh}>
          <span className="material-symbols-outlined">refresh</span>
          Refresh
        </button>
      </div>

      <div className="feedback-cards-container">
        {feedbacks.map((feedback, index) => (
          <FeedbackCard
            key={feedback.feedbackId || index}
            feedback={feedback}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;
