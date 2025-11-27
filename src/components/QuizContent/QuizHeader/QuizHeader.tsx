// QuizHeader.tsx
import React from "react";

import "./QuizHeader.css";
import type { QuizHeaderProps } from "../../../types/quizTypes";

const QuizHeader: React.FC<QuizHeaderProps> = ({
  lessonTitle,
  onBackToCourse,
}) => {
  return (
    <div className="page-title-container">
      <button
        className="page-title"
        onClick={onBackToCourse}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Create New Quiz
      </button>
      <p className="page-subtitle">
        {lessonTitle
          ? `Creating quiz for: ${lessonTitle}`
          : "Design engaging quizzes and assessments for your students"}
      </p>
    </div>
  );
};

export default QuizHeader;
