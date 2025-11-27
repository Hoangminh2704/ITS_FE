// components/Question/QuestionsList.tsx
import React from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import "./QuestionList.css";
import type { Question } from "../../../types";

interface QuestionsListProps {
  questions: Question[];
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (question: Question) => void; // Thay đổi từ questionId sang question
  saving?: boolean;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  if (questions.length === 0) {
    return (
      <div className="questions-list-empty">
        <span className="material-icons">help_outline</span>
        <p>No questions yet. Add your first question to get started.</p>
      </div>
    );
  }

  return (
    <div className="questions-list">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.questionId || `question-${index}`}
          questionNumber={index + 1}
          questionText={question.text}
          questionType={question.type || "multiple_choice"}
          points={10}
          options={[]}
          hintContent={question.hintContent}
          correctAnswer={question.correctAnswer}
          onEdit={() => onEditQuestion(question)}
          onDelete={() => onDeleteQuestion(question)} // Truyền cả question object
        />
      ))}
    </div>
  );
};

export default QuestionsList;
