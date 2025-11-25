// components/QuestionCard/QuestionCard.tsx
import React, { useState } from "react";
import "./QuestionCard.css";
import type { Question, QuestionRequestDTO } from "../../types";
import { apiService } from "../../services/apiService";
import QuestionForm from "../Forms/QuestionForm";

interface QuestionCardProps {
  question: Question;
  canEdit: boolean;
  onContentUpdated: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  canEdit,
  onContentUpdated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getQuestionTypeText = (type?: string) => {
    switch (type) {
      case "multiple_choice":
        return "Multiple Choice";
      case "true_false":
        return "True/False";
      case "short_answer":
        return "Short Answer";
      default:
        return "Question";
    }
  };

  const getQuestionTypeColor = (type?: string) => {
    switch (type) {
      case "multiple_choice":
        return "#3b82f6";
      case "true_false":
        return "#f59e0b";
      case "short_answer":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = async () => {
    if (
      !question.questionId ||
      !confirm("Are you sure you want to delete this question?")
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await apiService.deleteQuestion(question.questionId);
      onContentUpdated();
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("Failed to delete question");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleQuestionUpdated = () => {
    setShowEditForm(false);
    onContentUpdated();
  };

  return (
    <div className="question-card">
      {/* Header */}
      <div
        className="question-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="question-info">
          <h4 className="question-title">{question.text}</h4>
          <div className="question-meta">
            <div
              className="question-type-badge"
              style={{
                backgroundColor: getQuestionTypeColor(question.type),
              }}
            >
              {getQuestionTypeText(question.type)}
            </div>
            {question.hintContent && (
              <span className="hint-indicator">
                <span className="material-icons">lightbulb</span>
                Has Hint
              </span>
            )}
          </div>
        </div>
        <div className="question-actions">
          <button
            className="expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <span className="material-icons">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="question-content">
          <div className="content-section">
            <h5 className="section-subtitle">Question Details</h5>
            <div className="question-details">
              <div className="detail-row">
                <label>Question Text:</label>
                <p className="question-text">{question.text}</p>
              </div>

              {question.hintContent && (
                <div className="detail-row">
                  <label>Hint:</label>
                  <p className="hint-content">{question.hintContent}</p>
                </div>
              )}

              <div className="detail-row">
                <label>Correct Answer:</label>
                <div className="correct-answer">
                  {question.correctAnswer || "No answer provided"}
                </div>
              </div>

              <div className="detail-row">
                <label>Question Type:</label>
                <span className="question-type">
                  {getQuestionTypeText(question.type)}
                </span>
              </div>
            </div>
          </div>

          {canEdit && (
            <div className="action-section">
              <h5 className="section-subtitle">Actions</h5>
              <div className="question-actions-buttons">
                <button className="edit-btn" onClick={handleEdit}>
                  <span className="material-icons">edit</span>
                  Edit Question
                </button>
                <button
                  className="delete-btn"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <span className="material-icons">
                    {isDeleting ? "hourglass_empty" : "delete"}
                  </span>
                  {isDeleting ? "Deleting..." : "Delete Question"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Question Form Modal */}
      {canEdit && showEditForm && (
        <QuestionForm
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          onQuestionCreated={handleQuestionUpdated}
          defaultTopicId={question.topicId}
          editingQuestion={question}
        />
      )}
    </div>
  );
};

export default QuestionCard;
