// components/Question/QuestionCard.tsx
import React from "react";
import "./QuestionCard.css";

interface QuestionOption {
  text: string;
  isCorrect: boolean;
  letter: string;
}

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  questionType: string;
  points: number;
  options: QuestionOption[];
  hintContent?: string;
  correctAnswer?: string;
  onEdit: () => void;
  onDelete: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  questionText,
  questionType,
  points,
  hintContent,
  correctAnswer,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="question-card">
      <div className="question-header">
        <div className="question-info">
          <div className="question-tags">
            <span className="question-tag-number">
              Question {questionNumber}
            </span>
            <span className="question-tag-meta">
              {questionType} • {points} points
            </span>
          </div>
          <p className="question-text">{questionText}</p>
        </div>
        <div className="question-actions">
          <button
            className="question-action-btn"
            onClick={onEdit}
            title="Edit question"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            className="question-action-btn"
            onClick={onDelete}
            title="Delete question"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      {/* Hiển thị correct answer nếu có */}
      {correctAnswer && (
        <div className="question-details">
          <div className="detail-row">
            <label>Correct Answer</label>
            <div className="correct-answer">{correctAnswer}</div>
          </div>
        </div>
      )}

      {/* Thêm phần hiển thị hint content nếu có */}
      {hintContent && (
        <div className="question-details">
          <div className="detail-row">
            <label>Hint</label>
            <div className="hint-content">{hintContent}</div>
          </div>
        </div>
      )}

      {/* {options.length > 0 && (
        <div className="question-options-grid">
          {options.map((option, index) => (
            <div key={index} className="option-item">
              {option.isCorrect && (
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              )}
              <span>
                {option.letter}. {option.text}
              </span>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default QuestionCard;
