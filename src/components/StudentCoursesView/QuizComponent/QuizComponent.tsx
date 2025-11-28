// QuizComponent.tsx
import React, { useState } from "react";
import "./QuizComponent.css";
import type { Question, Quiz } from "../../../types/studentCoursesTypes";

interface QuizComponentProps {
  quiz: Quiz;
  questions: Question[];
  onQuizSubmit: (
    quizId: string,
    score: number,
    userAnswers: Question[]
  ) => void;
  onClose: () => void;
}

const QuizComponent: React.FC<QuizComponentProps> = ({
  quiz,
  questions,
  onQuizSubmit,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const correctAnswers = questions.filter((question) => {
        const userAnswer = userAnswers[question.id]?.toLowerCase().trim();
        const correctAnswer = question.correctAnswer?.toLowerCase().trim();
        return userAnswer === correctAnswer;
      }).length;

      const score = Math.round((correctAnswers / questions.length) * 100);

      const updatedQuestions = questions.map((question) => ({
        ...question,
        userAnswer: userAnswers[question.id],
        isCorrect:
          userAnswers[question.id]?.toLowerCase().trim() ===
          question.correctAnswer?.toLowerCase().trim(),
      }));

      setShowResults(true);
      onQuizSubmit(quiz.id, score, updatedQuestions);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const correctAnswers = questions.filter((q) => q.isCorrect).length;

    return (
      <div className="quiz-component">
        <div className="quiz-header">
          <button className="quiz-back-btn" onClick={onClose}>
            <span className="material-icons-outlined">arrow_back</span>
            Back to Course
          </button>
          <h2 className="quiz-title">{quiz.title} - Results</h2>
        </div>

        <div className="quiz-results">
          <div className="quiz-score-card">
            <div className="score-circle">
              <span className="score-percentage">{quiz.score}%</span>
            </div>
            <p className="score-description">
              You answered {correctAnswers} out of {questions.length} questions
              correctly.
            </p>
          </div>

          <div className="questions-review">
            <h4>Question Review</h4>
            {questions.map((question, index) => (
              <div key={question.id} className="question-review-item">
                <div className="question-review-header">
                  <span className="question-number">Q{index + 1}</span>
                  <span
                    className={`question-status ${
                      question.isCorrect ? "correct" : "incorrect"
                    }`}
                  >
                    {question.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <p className="question-text">{question.text}</p>
                <div className="answer-comparison">
                  <div className="user-answer">
                    <strong>Your answer:</strong>{" "}
                    {userAnswers[question.id] || "Not answered"}
                  </div>
                  {!question.isCorrect && question.correctAnswer && (
                    <div className="correct-answer">
                      <strong>Correct answer:</strong> {question.correctAnswer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <button className="quiz-retry-btn" onClick={handleRetry}>
              <span className="material-icons-outlined">refresh</span>
              Retry Quiz
            </button>
            <button className="quiz-close-btn" onClick={onClose}>
              <span className="material-icons-outlined">check</span>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-component">
      <div className="quiz-header">
        <button className="quiz-back-btn" onClick={onClose}>
          <span className="material-icons-outlined">arrow_back</span>
          Back to Course
        </button>
        <h2 className="quiz-title">{quiz.title}</h2>
        <div className="quiz-progress">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>

      <div className="quiz-content">
        <div className="question-card">
          <h3 className="question-text">{currentQuestion.text}</h3>

          {/* Luôn hiển thị text input cho tất cả các câu hỏi */}
          <div className="text-answer">
            <textarea
              placeholder="Type your answer here..."
              value={userAnswers[currentQuestion.id] || ""}
              onChange={(e) => handleAnswerSelect(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <div className="quiz-navigation">
          <button
            className="nav-btn prev-btn"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <span className="material-icons-outlined">chevron_left</span>
            Previous
          </button>

          <div className="progress-indicator">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${
                  index === currentQuestionIndex ? "active" : ""
                } ${userAnswers[questions[index].id] ? "answered" : ""}`}
              />
            ))}
          </div>

          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={!userAnswers[currentQuestion.id]?.trim()}
          >
            {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
            <span className="material-icons-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizComponent;
