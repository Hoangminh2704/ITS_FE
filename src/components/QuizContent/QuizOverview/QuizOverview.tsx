// QuizOverview.tsx
import React from "react";
import "./QuizOverview.css";
import type { QuizOverviewProps } from "../../../types/quizTypes";

const QuizOverview: React.FC<QuizOverviewProps> = ({ questions }) => {
  const totalPoints = questions.reduce((total) => total + 10, 0);

  const getDifficulty = () => {
    if (questions.length === 0) return "Easy";
    const avgPoints = totalPoints / questions.length;
    return avgPoints > 15 ? "Hard" : avgPoints > 8 ? "Medium" : "Easy";
  };

  return (
    <div className="quiz-card quiz-overview-card">
      <h3 className="quiz-card-title">Quiz Overview</h3>
      <div className="overview-list">
        <div className="overview-item">
          <span>Total Questions:</span>
          <span className="overview-value">{questions.length}</span>
        </div>
        <div className="overview-item">
          <span>Total Points:</span>
          <span className="overview-value">{totalPoints}</span>
        </div>
        <div className="overview-item">
          <span>Estimated Time:</span>
          <span className="overview-value">
            {Math.ceil(questions.length * 2)} min
          </span>
        </div>
        <div className="overview-item">
          <span>Difficulty:</span>
          <span className="overview-tag">{getDifficulty()}</span>
        </div>
      </div>
    </div>
  );
};

export default QuizOverview;
