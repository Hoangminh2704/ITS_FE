// ThoughtsSection.tsx
import React from "react";
import "./ThoughtsSection.css";

interface ThoughtsSectionProps {
  thoughts: string;
  onThoughtsChange: (thoughts: string) => void;
}

const ThoughtsSection: React.FC<ThoughtsSectionProps> = ({
  thoughts,
  onThoughtsChange,
}) => {
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onThoughtsChange(e.target.value);
  };

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
        value={thoughts}
        onChange={handleTextareaChange}
      ></textarea>
      <p className="thoughts-hint">
        Your feedback is valuable and helps us improve
      </p>
    </div>
  );
};

export default ThoughtsSection;
