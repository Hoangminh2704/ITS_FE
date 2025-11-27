// QuizActions.tsx
import React from "react";
import "./QuizActions.css";
import type { QuizActionsProps } from "../../../types/quizTypes";

const QuizActions: React.FC<QuizActionsProps> = ({
  saving,
  onBackToCourse,
  onSaveQuiz,
}) => {
  return (
    <div className="quiz-actions-footer">
      <button
        className="btn btn-secondary"
        onClick={onBackToCourse}
        disabled={saving}
      >
        Cancel
      </button>
      <button
        className="btn btn-primary btn-save"
        onClick={onSaveQuiz}
        disabled={saving}
      >
        {saving ? (
          <>
            <span className="material-symbols-outlined loading-spinner">
              refresh
            </span>
            Saving...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">save</span>
            Save Quiz
          </>
        )}
      </button>
    </div>
  );
};

export default QuizActions;
