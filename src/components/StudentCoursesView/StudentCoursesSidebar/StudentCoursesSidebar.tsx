// StudentCoursesSidebar.tsx
import React from "react";
import "./StudentCoursesSidebar.css";
import type {
  StudentCoursesSidebarProps,
  Lesson,
  Module,
  Quiz,
} from "../../../types/studentCoursesTypes";

const StudentCoursesSidebar: React.FC<StudentCoursesSidebarProps> = ({
  modules = [],
  onLessonClick,
  onQuizClick,
  onModuleToggle,
  onQuizToggle,
  courseTitle,
  onLessonComplete,
}) => {
  const getLessonIcon = (status: Lesson["status"], isActive?: boolean) => {
    if (isActive) {
      return "play_circle";
    }
    switch (status) {
      case "completed":
        return "check_circle";
      case "playing":
        return "play_circle";
      default:
        return "radio_button_unchecked";
    }
  };

  const getLessonIconClass = (status: Lesson["status"], isActive?: boolean) => {
    if (isActive) {
      return "scv-icon-playing";
    }
    switch (status) {
      case "completed":
        return "scv-icon-completed";
      case "playing":
        return "scv-icon-playing";
      default:
        return "scv-icon-uncompleted";
    }
  };

  const totalItems = modules.reduce(
    (total, module) =>
      total + module.lessons.length + (module.quizzes?.length || 0),
    0
  );
  const completedItems = modules.reduce(
    (total, module) =>
      total +
      module.lessons.filter((lesson) => lesson.status === "completed").length +
      (module.quizzes?.filter((quiz) => quiz.isCompleted).length || 0),
    0
  );
  const progressPercentage =
    totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleLessonComplete = (
    lessonId: string,
    moduleId: string,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (onLessonComplete) {
      onLessonComplete(lessonId, moduleId);
    }
  };

  return (
    <aside className="scv-sidebar">
      <div className="scv-sidebar-header">
        <h2 className="scv-sidebar-title">{courseTitle}</h2>
        <button className="scv-collapse-btn">
          <span className="material-icons-outlined">unfold_less</span>
        </button>
      </div>

      <div className="scv-progress">
        <div className="scv-progress-bar">
          <div
            className="scv-progress-fill"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="scv-progress-text">
          {completedItems} of {totalItems} items completed
        </p>
      </div>

      <hr className="scv-divider" />

      <nav className="scv-modules">
        {modules.map((module) => (
          <div key={module.id} className="scv-module">
            {/* Module Header với toggle */}
            <div
              className="scv-module-header"
              onClick={() => onModuleToggle && onModuleToggle(module.id)}
            >
              <div className="scv-module-header-main">
                <span className="material-icons-outlined scv-expand-icon">
                  {module.isExpanded ? "expand_more" : "chevron_right"}
                </span>
                <span className="material-icons-outlined">
                  {module.isExpanded ? "folder_open" : "folder"}
                </span>
                <span className="scv-module-title">{module.title}</span>
              </div>
              <span className="scv-module-lesson-count">
                {module.lessons.filter(
                  (lesson) => lesson.status === "completed"
                ).length +
                  (module.quizzes?.filter((quiz) => quiz.isCompleted).length ||
                    0)}
                /{module.lessons.length + (module.quizzes?.length || 0)}
              </span>
            </div>

            {/* Module Content (chỉ hiển thị khi expanded) */}
            {module.isExpanded && (
              <div className="scv-module-content">
                {/* Lessons List */}
                <ul className="scv-lesson-list">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="scv-lesson-item">
                      <a
                        className={`scv-lesson-link ${
                          lesson.isActive ? "scv-lesson-active" : ""
                        }`}
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (onLessonClick) {
                            onLessonClick(lesson.id);
                          }
                        }}
                      >
                        <span className="scv-lesson-info">
                          <span
                            className={`material-icons-outlined scv-lesson-icon ${getLessonIconClass(
                              lesson.status,
                              lesson.isActive
                            )}`}
                          >
                            {getLessonIcon(lesson.status, lesson.isActive)}
                          </span>
                          <span className="scv-lesson-title">
                            {lesson.title}
                          </span>
                        </span>
                        <div className="scv-lesson-meta">
                          {lesson.duration && (
                            <span className="scv-lesson-duration">
                              {lesson.duration}
                            </span>
                          )}
                          {lesson.status === "completed" ? (
                            <span className="scv-lesson-completed-badge">
                              <span className="material-icons-outlined">
                                check
                              </span>
                            </span>
                          ) : (
                            <button
                              className="scv-lesson-complete-btn"
                              onClick={(e) =>
                                handleLessonComplete(lesson.id, module.id, e)
                              }
                              title="Mark as completed"
                            >
                              <span className="material-icons-outlined">
                                check_circle
                              </span>
                            </button>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Quizzes List */}
                {module.quizzes && module.quizzes.length > 0 && (
                  <div className="scv-quiz-section">
                    <div
                      className="scv-quiz-section-header"
                      onClick={() =>
                        module.quizzes?.forEach(
                          (quiz) =>
                            onQuizToggle && onQuizToggle(module.id, quiz.id)
                        )
                      }
                    >
                      <h4 className="scv-quiz-section-title">
                        <span className="material-icons-outlined scv-expand-icon">
                          {module.quizzes.some((quiz) => quiz.isExpanded)
                            ? "expand_more"
                            : "chevron_right"}
                        </span>
                        Quizzes ({module.quizzes.length})
                      </h4>
                    </div>

                    {module.quizzes.some((quiz) => quiz.isExpanded) && (
                      <ul className="scv-quiz-list">
                        {module.quizzes.map((quiz) => (
                          <li key={quiz.id} className="scv-quiz-item">
                            <div className="scv-quiz-header">
                              <a
                                className="scv-quiz-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (onQuizClick) {
                                    onQuizClick(quiz.id, quiz.questions);
                                  }
                                }}
                              >
                                <span className="scv-quiz-info">
                                  <span className="material-icons-outlined scv-quiz-icon">
                                    quiz
                                  </span>
                                  <span className="scv-quiz-title">
                                    {quiz.title}
                                  </span>
                                </span>
                                <div className="scv-quiz-meta">
                                  {quiz.isCompleted && (
                                    <span className="scv-quiz-score">
                                      {quiz.score}%
                                    </span>
                                  )}
                                  <span className="scv-quiz-question-count">
                                    {quiz.questions.length} questions
                                  </span>
                                  <span className="material-icons-outlined scv-quiz-status">
                                    {quiz.isCompleted
                                      ? "check_circle"
                                      : "play_circle"}
                                  </span>
                                </div>
                              </a>

                              {/* Quiz expand button */}
                              <button
                                className="scv-quiz-expand-btn"
                                onClick={() =>
                                  onQuizToggle &&
                                  onQuizToggle(module.id, quiz.id)
                                }
                              >
                                <span className="material-icons-outlined">
                                  {quiz.isExpanded
                                    ? "expand_less"
                                    : "expand_more"}
                                </span>
                              </button>
                            </div>

                            {/* Quiz questions (chỉ hiển thị khi expanded) */}
                            {quiz.isExpanded && (
                              <div className="scv-quiz-questions">
                                <ul className="scv-question-list">
                                  {quiz.questions.map((question, index) => (
                                    <li
                                      key={question.id}
                                      className="scv-question-item"
                                    >
                                      <span className="scv-question-number">
                                        Q{index + 1}
                                      </span>
                                      <span className="scv-question-text">
                                        {question.text}
                                      </span>
                                      {question.isCorrect !== undefined && (
                                        <span
                                          className={`scv-question-status ${
                                            question.isCorrect
                                              ? "correct"
                                              : "incorrect"
                                          }`}
                                        >
                                          {question.isCorrect ? "✓" : "✗"}
                                        </span>
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {modules.length === 0 && (
          <div className="scv-empty-state">
            <span className="material-icons-outlined">folder_open</span>
            <p>No course content available.</p>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default StudentCoursesSidebar;
