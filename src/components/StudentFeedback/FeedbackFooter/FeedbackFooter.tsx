// FeedbackFooter.tsx
import React from "react";
import "./FeedbackFooter.css";
interface FeedbackFooterProps {
  onClose: () => void;
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = ({ onClose }) => {
  return (
    <div className="feedback-footer">
      <button className="footer-btn-secondary" onClick={onClose}>
        Maybe Later
      </button>
      <button className="footer-btn-primary">
        Submit Feedback
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
};

export default FeedbackFooter;
