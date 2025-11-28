// FeedbackFooter.tsx
import React from "react";
import "./FeedbackFooter.css";

interface FeedbackFooterProps {
  onClose: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = ({
  onClose,
  onSubmit,
  isSubmitting = false,
}) => {
  return (
    <div className="feedback-footer">
      <button className="footer-btn-secondary" onClick={onClose}>
        Maybe Later
      </button>
      <button
        className="footer-btn-primary"
        onClick={onSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
        <span className="material-symbols-outlined">send</span>
      </button>
    </div>
  );
};

export default FeedbackFooter;
