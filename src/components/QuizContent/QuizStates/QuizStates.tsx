// QuizStates.tsx
import React from "react";
import "./QuizStates.css";
import { InstructorHeader } from "../../InstructorHeader/InstructorHeader";

export const LoadingState: React.FC<{ courseId?: string }> = ({ courseId }) => (
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

export const AccessDeniedState: React.FC<{
  courseId?: string;
  onBackToCourse: () => void;
}> = ({ courseId, onBackToCourse }) => (
  <div className="quiz-body">
    <div className="quiz-layout">
      <InstructorHeader courseId={courseId} activeTab="Quizzes" />
      <main className="quiz-main">
        <div className="access-denied-state">
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: "4rem",
              color: "var(--color-red-500)",
              marginBottom: "1rem",
            }}
          >
            block
          </span>
          <h2 style={{ color: "var(--color-red-600)", marginBottom: "1rem" }}>
            Access Denied
          </h2>
          <p
            style={{
              color: "var(--color-slate-600)",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Please select a module or lesson first to create a quiz.
            <br />
            Redirecting to course content...
          </p>
          <button
            className="btn btn-primary"
            onClick={onBackToCourse}
            style={{ marginTop: "1rem" }}
          >
            Go Back to Course
          </button>
        </div>
      </main>
    </div>
  </div>
);
