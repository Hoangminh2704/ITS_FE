// QuizTitleSection.tsx
import React from "react";
import "./QuizCard.css";
import type { QuizTitleSectionProps } from "../../../types/quizTypes";

const QuizTitleSection: React.FC<QuizTitleSectionProps> = ({
  quizTitle,
  onQuizTitleChange,
  saving,
}) => {
  return (
    <div className="quiz-card">
      <label className="form-label" htmlFor="quiz-title">
        Quiz Title
      </label>
      <input
        className="form-input"
        id="quiz-title"
        placeholder="e.g., Chapter 1 Final Quiz"
        type="text"
        value={quizTitle}
        onChange={(e) => onQuizTitleChange(e.target.value)}
        disabled={saving}
      />
    </div>
  );
};

export default QuizTitleSection;
