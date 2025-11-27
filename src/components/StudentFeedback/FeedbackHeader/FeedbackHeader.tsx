// FeedbackHeader.tsx
import React from "react";
import "./FeedbackHeader.css";
interface FeedbackHeaderProps {
  onClose: () => void;
}

const FeedbackHeader: React.FC<FeedbackHeaderProps> = ({ onClose }) => {
  return (
    <div className="feedback-header">
      <div>
        <h1 className="feedback-title">Rate This Course</h1>
        <p className="feedback-subtitle">
          Your feedback helps us improve the learning experience
        </p>
      </div>
      <button className="feedback-close-btn" onClick={onClose}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
};

export default FeedbackHeader;
