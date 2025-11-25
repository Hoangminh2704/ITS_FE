// components/QuestionsList/QuestionsList.tsx
import React from "react";

import type { Question } from "../../types";
import "./QuestionList.css";
import QuestionCard from "./QuestionCard";

interface QuestionsListProps {
  questions: Question[];
  canEdit: boolean;
  onContentCreated: () => void;
  emptyStateMessage?: string;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  canEdit,
  onContentCreated,
  emptyStateMessage = "No questions available",
}) => {
  if (questions.length === 0) {
    return (
      <div className="empty-state">
        <span className="material-icons">help_outline</span>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="questions-list">
      {questions.map((question) => (
        <QuestionCard
          key={question.questionId}
          question={question}
          canEdit={canEdit}
          onContentUpdated={onContentCreated}
        />
      ))}
    </div>
  );
};

export default QuestionsList;
