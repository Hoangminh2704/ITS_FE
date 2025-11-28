// components/QuizContent/QuizContent.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import { apiService } from "../../services/apiService";
import type { Question } from "../../types";
import "./QuizContent.css";
import QuestionsList from "../Question/QuestionList/QuestionsList";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import AlertModal from "../Modal/AlertModal/AlertModal";
import QuestionForm from "../Forms/QuestionForm/QuestionForm";
import { AccessDeniedState, LoadingState } from "./QuizStates/QuizStates";
import QuizHeader from "./QuizHeader/QuizHeader";
import QuizTitleSection from "./QuizCard/QuizTitleSection";
import QuizSettings from "./QuizSettings/QuizSettings";
import QuizOverview from "./QuizOverview/QuizOverview";
import QuizActions from "./QuizActions/QuizActions";

const QuizContent: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const location = useLocation();

  const { lessonTitle, topicId } = location.state || {};

  const [quizTitle, setQuizTitle] = useState(
    lessonTitle ? `${lessonTitle} Quiz` : ""
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<Question | null>(
    null
  );
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });

  useEffect(() => {
    if (!topicId) {
      showAlert(
        "Access Denied",
        "Please select a module or lesson first to create quiz",
        "error"
      );
      const timer = setTimeout(() => {
        navigate(`/teacher/course/${courseId}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [topicId, courseId, navigate]);

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertModalOpen(true);
  };

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
    if (!topicId) {
      showAlert(
        "Error",
        "Cannot add question without a selected module",
        "error"
      );
      return;
    }
    setEditingQuestion(null);
    setShowQuestionForm(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (question: Question) => {
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete?.questionId) return;

    try {
      await apiService.deleteQuestion(questionToDelete.questionId);
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
    fetchExistingQuestions();
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

  if (!topicId) {
    return (
      <AccessDeniedState
        courseId={courseId}
        onBackToCourse={handleBackToCourse}
      />
    );
  }

  if (loading) {
    return <LoadingState courseId={courseId} />;
  }

  return (
    <div className="quiz-body">
      <div className="quiz-layout">
        <InstructorHeader courseId={courseId} activeTab="Quizzes" />

        <main className="quiz-main">
          <QuizHeader
            lessonTitle={lessonTitle}
            onBackToCourse={handleBackToCourse}
          />

          <div className="quiz-grid-layout">
            <div className="quiz-main-column">
              <QuizTitleSection
                quizTitle={quizTitle}
                onQuizTitleChange={setQuizTitle}
                saving={saving}
              />

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

              <QuizActions
                saving={saving}
                onBackToCourse={handleBackToCourse}
                onSaveQuiz={handleSaveQuiz}
              />
            </div>

            <div className="quiz-sidebar-column">
              <QuizSettings saving={saving} />
              <QuizOverview questions={questions} />
            </div>
          </div>
        </main>
      </div>

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
