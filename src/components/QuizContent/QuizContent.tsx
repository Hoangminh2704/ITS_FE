import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import "./QuizContent.css";

const CreateQuiz: React.FC = () => {
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();

  const handleBackToCourse = () => {
    navigate(`/teacher/course/${courseId}`);
  };

  return (
    <React.Fragment>
      <div className="quiz-body">
        <div className="quiz-layout">
          <InstructorHeader courseId={courseId} activeTab="Quizzes" />

          <main className="quiz-main">
            <div className="page-title-container">
              <a
                className="page-title"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleBackToCourse();
                }}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Create New Quiz
              </a>
              <p className="page-subtitle">
                Design engaging quizzes and assessments for your students
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
                  />
                </div>
                <div className="quiz-card">
                  <div className="quiz-card-header">
                    <h3 className="quiz-card-title">Questions</h3>
                    <button className="btn btn-primary">
                      <span className="material-symbols-outlined">add</span>
                      Add Question
                    </button>
                  </div>
                  <div className="question-list">
                    <div className="question-card">
                      <div className="question-header">
                        <div className="question-info">
                          <div className="question-tags">
                            <span className="question-tag-number">
                              Question 1
                            </span>
                            <span className="question-tag-meta">
                              Multiple Choice • 10 points
                            </span>
                          </div>
                          <p className="question-text">
                            What is the primary purpose of object-oriented
                            programming?
                          </p>
                        </div>
                        <div className="question-actions">
                          <button className="question-action-btn">
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button className="question-action-btn">
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="question-options-grid">
                        <div className="option-item">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span>
                            A. To organize code into reusable components
                          </span>
                        </div>
                        <div className="option-item">
                          <span>B. To make code run faster</span>
                        </div>
                        <div className="option-item">
                          <span>C. To reduce file size</span>
                        </div>
                        <div className="option-item">
                          <span>D. To eliminate bugs completely</span>
                        </div>
                      </div>
                    </div>
                    <div className="question-card">
                      <div className="question-header">
                        <div className="question-info">
                          <div className="question-tags">
                            <span className="question-tag-number">
                              Question 2
                            </span>
                            <span className="question-tag-meta">
                              Multiple Choice • 25 points
                            </span>
                          </div>
                          <p className="question-text">
                            What does HTML stand for?
                          </p>
                        </div>
                        <div className="question-actions">
                          <button className="question-action-btn">
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button className="question-action-btn">
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="question-options-grid">
                        <div className="option-item">
                          <span>A. Hyper Tool Markup Language</span>
                        </div>
                        <div className="option-item">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            check_circle
                          </span>
                          <span>B. Hyper Text Markup Language</span>
                        </div>
                        <div className="option-item">
                          <span>C. Home Tool Markup Language</span>
                        </div>
                        <div className="option-item">
                          <span>D. Hyperlinks and Text Markup Language</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="quiz-actions-footer">
                  <button className="btn btn-secondary">Save as Draft</button>
                  <button className="btn btn-primary btn-save">
                    <span className="material-symbols-outlined">save</span>
                    Save Quiz
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
                      <span className="overview-value">2</span>
                    </div>
                    <div className="overview-item">
                      <span>Total Points:</span>
                      <span className="overview-value">35</span>
                    </div>
                    <div className="overview-item">
                      <span>Estimated Time:</span>
                      <span className="overview-value">15 min</span>
                    </div>
                    <div className="overview-item">
                      <span>Difficulty:</span>
                      <span className="overview-tag">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateQuiz;
