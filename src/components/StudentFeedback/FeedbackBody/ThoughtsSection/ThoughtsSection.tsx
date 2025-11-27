// ThoughtsSection.tsx
import React from "react";
import "./ThoughtsSection.css";
const ThoughtsSection: React.FC = () => {
  return (
    <div className="thoughts-section">
      <label className="thoughts-label" htmlFor="thoughts">
        Share Your Thoughts
      </label>
      <textarea
        className="thoughts-textarea"
        id="thoughts"
        placeholder="Tell us more about your experience with this course..."
        rows={4}
      ></textarea>
      <p className="thoughts-hint">
        Your feedback is valuable and helps us improve
      </p>
    </div>
  );
};

export default ThoughtsSection;
