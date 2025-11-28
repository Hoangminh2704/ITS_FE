// components/Feedback/FeedbackCard.tsx
import React from "react";
import "./FeedbackCard.css";
import FeedbackContentParser from "../FeedbackContentParser/FeedbackContentParser";

interface FeedbackCardProps {
  feedback: {
    feedbackId?: number;
    studentId?: number;
    content: string;
    createdAt?: string;
  };
  index: number;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback, index }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <div className="feedback-header-left">
          <div className="student-info">
            <span className="student-avatar">
              <span className="material-symbols-outlined">person</span>
            </span>
            <div className="student-details">
              <span className="student-name">
                Student {feedback.studentId || "Unknown"}
              </span>
              <span className="feedback-date">
                {formatDate(feedback.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <div className="feedback-header-right">
          <div className="feedback-meta">
            <span className="feedback-number">#{index + 1}</span>
            {feedback.feedbackId && (
              <span className="feedback-id">ID: {feedback.feedbackId}</span>
            )}
          </div>
        </div>
      </div>

      <div className="feedback-content">
        <FeedbackContentParser content={feedback.content} compact={true} />
      </div>
    </div>
  );
};

export default FeedbackCard;
