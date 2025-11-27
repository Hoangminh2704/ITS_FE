// components/QuizContent/QuizContent.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import { apiService } from "../../services/apiService";
import type { Question } from "../../types";
import "./QuizContent.css";
import QuestionsList from "../Question/QuestionsList";
import QuestionForm from "../Forms/QuestionForm";
import ConfirmModal from "../Modal/ConfirmModal"; // Thêm import
import AlertModal from "../Modal/AlertModal";

const QuizContent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();

  const { materialId, lessonTitle, topicId } = location.state || {};

  const [quizTitle, setQuizTitle] = useState(
    lessonTitle ? `${lessonTitle} Quiz` : ""
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Thêm state cho delete modal
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  ); // Thêm state lưu question cần xóa
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });
  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertModalOpen(true);
  };
  // Fetch existing questions khi component mount
  useEffect(() => {
    if (topicId) {
      fetchExistingQuestions();
    }
  }, [topicId]);

  const fetchExistingQuestions = async () => {
    if (!topicId) return;

    try {
      setLoading(true);
      const questionsData = await apiService.getQuestionsByTopic(topicId);
      setQuestions(questionsData);
    } catch (error) {
      showAlert("Error", "Failed to load existing questions", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCourse = () => {
    navigate(`/teacher/course/${courseId}`);
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (question: Question) => {
    // Mở modal xác nhận thay vì xóa trực tiếp
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete?.questionId) return;

    try {
      await apiService.deleteQuestion(questionToDelete.questionId);
      // Refresh questions list
      await fetchExistingQuestions();
      showAlert("Success", "Question deleted successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to delete question", "error");
    } finally {
      setShowDeleteModal(false);
      setQuestionToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setQuestionToDelete(null);
  };

  const handleQuestionCreated = () => {
    setShowQuestionForm(false);
    setEditingQuestion(null);
    fetchExistingQuestions(); // Refresh the list
  };

  const handleSaveQuiz = async () => {
    if (!topicId) {
      showAlert("Error", "Missing topic information", "error");
      return;
    }

    if (!quizTitle.trim()) {
      showAlert("Warning", "Please enter a quiz title", "warning");
      return;
    }

    setSaving(true);
    try {
      showAlert("Success", "Quiz settings saved successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to save quiz", "error");
    } finally {
      setSaving(false);
    }
  };

  // Tính tổng points
  const totalPoints = questions.reduce((total, q) => total + 10, 0); // Mỗi question 10 points

  if (loading) {
    return (
      <div className="quiz-body">
        <div className="quiz-layout">
          <InstructorHeader courseId={courseId} activeTab="Quizzes" />
          <main className="quiz-main">
            <div className="loading-state">
              <span className="material-symbols-outlined loading-spinner">
                refresh
              </span>
              <p>Loading questions...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-body">
      <div className="quiz-layout">
        <InstructorHeader courseId={courseId} activeTab="Quizzes" />

        <main className="quiz-main">
          <div className="page-title-container">
            <button
              className="page-title"
              onClick={handleBackToCourse}
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

          <div className="quiz-grid-layout">
            <div className="quiz-main-column">
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
                  onChange={(e) => setQuizTitle(e.target.value)}
                  disabled={saving}
                />
              </div>

              <div className="quiz-card">
                <div className="quiz-card-header">
                  <h3 className="quiz-card-title">Questions</h3>
                  <button
                    className="btn btn-primary"
                    onClick={handleAddQuestion}
                    disabled={saving}
                  >
                    <span className="material-symbols-outlined">add</span>
                    Add Question
                  </button>
                </div>

                <QuestionsList
                  questions={questions}
                  onEditQuestion={handleEditQuestion}
                  onDeleteQuestion={handleDeleteQuestion}
                  saving={saving}
                />
              </div>

              <div className="quiz-actions-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleBackToCourse}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-save"
                  onClick={handleSaveQuiz}
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
            </div>

            <div className="quiz-sidebar-column">
              <div className="quiz-card quiz-settings-card">
                <h3 className="quiz-card-title">Quiz Settings</h3>
                <div>
                  <label className="form-label" htmlFor="time-limit">
                    Time Limit (minutes)
                  </label>
                  <input
                    className="form-input"
                    id="time-limit"
                    type="number"
                    defaultValue="60"
                    disabled={saving}
                  />
                </div>
                <div>
                  <label className="form-label" htmlFor="attempts">
                    Attempts Allowed
                  </label>
                  <select
                    className="form-select"
                    id="attempts"
                    defaultValue="Unlimited"
                    disabled={saving}
                  >
                    <option>Unlimited</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="checkbox-group">
                  <div className="checkbox-item">
                    <input
                      className="form-checkbox"
                      id="randomize-questions"
                      type="checkbox"
                      defaultChecked
                      disabled={saving}
                    />
                    <label
                      className="checkbox-label"
                      htmlFor="randomize-questions"
                    >
                      Randomize question order
                    </label>
                  </div>
                  <div className="checkbox-item">
                    <input
                      className="form-checkbox"
                      id="show-results"
                      type="checkbox"
                      defaultChecked
                      disabled={saving}
                    />
                    <label className="checkbox-label" htmlFor="show-results">
                      Show results immediately
                    </label>
                  </div>
                </div>
              </div>

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
                    <span className="overview-tag">
                      {questions.length === 0
                        ? "Easy"
                        : totalPoints / questions.length > 15
                        ? "Hard"
                        : totalPoints / questions.length > 8
                        ? "Medium"
                        : "Easy"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Question Form Modal */}
      <QuestionForm
        isOpen={showQuestionForm}
        onClose={() => {
          setShowQuestionForm(false);
          setEditingQuestion(null);
        }}
        onQuestionCreated={handleQuestionCreated}
        defaultTopicId={topicId}
        editingQuestion={editingQuestion || undefined}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <AlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  );
};

export default QuizContent;
