// StudentFeedback.tsx
import React from "react";
import "./StudentFeedback.css";
import FeedbackHeader from "./FeedbackHeader/FeedbackHeader";
import FeedbackBody from "./FeedbackBody/FeedbackBody";
import FeedbackFooter from "./FeedbackFooter/FeedbackFooter";
interface StudentFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentFeedback: React.FC<StudentFeedbackProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <FeedbackHeader onClose={onClose} />
        <FeedbackBody />
        <FeedbackFooter onClose={onClose} />
      </div>
    </div>
  );
};

export default StudentFeedback;
