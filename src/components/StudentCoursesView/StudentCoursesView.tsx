import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import "./StudentCoursesView.css";

const StudentCoursesView: React.FC = () => {
  const navigate = useNavigate();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleBackToCourse = () => {
    navigate("/student");
  };

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFeedbackOpen(true);
  };

  return (
    <div className="student-courses-view">
      <header className="scv-header">
        <div className="scv-header-container">
          <div className="scv-header-content">
            <a
              className="scv-back-link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleBackToCourse();
              }}
            >
              <span className="material-icons-outlined">arrow_back</span>
              <span>Back to Course</span>
            </a>
            <div className="scv-nav-buttons">
              <button className="scv-nav-btn scv-nav-btn-secondary">
                <span className="material-icons-outlined">chevron_left</span>
                Previous
              </button>
              <button className="scv-nav-btn scv-nav-btn-primary">
                Next
                <span className="material-icons-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="scv-main">
        <div className="scv-grid">
          <aside className="scv-sidebar">
            <div className="scv-sidebar-header">
              <h2 className="scv-sidebar-title">Complete Web Development</h2>
              <button className="scv-collapse-btn">
                <span className="material-icons-outlined">unfold_less</span>
              </button>
            </div>
            <div className="scv-progress">
              <div className="scv-progress-bar">
                <div
                  className="scv-progress-fill"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <p className="scv-progress-text">13 of 20 lessons completed</p>
            </div>
            <hr className="scv-divider" />

            <nav className="scv-modules">
              <div className="scv-module">
                <h3 className="scv-module-title">Module 1: Getting Started</h3>
                <ul className="scv-lesson-list">
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-completed">
                          check_circle
                        </span>
                        Introduction to Web Development
                      </span>
                      <span className="scv-lesson-duration">5:30</span>
                    </a>
                  </li>
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-completed">
                          check_circle
                        </span>
                        Setting Up Development Environment
                      </span>
                      <span className="scv-lesson-duration">8:15</span>
                    </a>
                  </li>
                  <li>
                    <a className="scv-lesson-link scv-lesson-active" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons scv-icon-playing">
                          play_arrow
                        </span>
                        HTML Fundamentals
                      </span>
                      <span className="scv-lesson-duration">12:45</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="scv-module">
                <h3 className="scv-module-title">Module 2: HTML & CSS</h3>
                <ul className="scv-lesson-list">
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-uncompleted">
                          radio_button_unchecked
                        </span>
                        CSS Styling Basics
                      </span>
                      <span className="scv-lesson-duration">10:20</span>
                    </a>
                  </li>
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-uncompleted">
                          radio_button_unchecked
                        </span>
                        Responsive Design
                      </span>
                      <span className="scv-lesson-duration">15:30</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="scv-module">
                <h3 className="scv-module-title">Module 3: JavaScript</h3>
                <ul className="scv-lesson-list">
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-uncompleted">
                          radio_button_unchecked
                        </span>
                        JavaScript Basics
                      </span>
                      <span className="scv-lesson-duration">18:45</span>
                    </a>
                  </li>
                  <li>
                    <a className="scv-lesson-link" href="#">
                      <span className="scv-lesson-info">
                        <span className="material-icons-outlined scv-icon-uncompleted">
                          radio_button_unchecked
                        </span>
                        DOM Manipulation
                      </span>
                      <span className="scv-lesson-duration">22:10</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          <section className="scv-content">
            <div className="scv-video-wrapper">
              <img
                alt="Video player showing a lesson on HTML Fundamentals"
                className="scv-video"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPG3nIEZolvifVkXVAYEQvvcmfkWsS7AWvRupHKhZspfRW6w01SSOGdMpVBbj1OtBQcPdISOPB4dEJUactNOmSyhz7VNnCWhx1r9y_XB3lmq3GhBsdIUSin3Ki97hcd212LO0MyaQVRWALXzyXZsxH3aReWiNLfgJgMQkEMd6dJfLk2GxP8KzJ2vFwZBtc9lJZVun0_73KllhJIFsf0RwknWM6sPhZvVQwUbU64kBoycZH6widKZwlQB5yGhv7niYtqrFecgh8Rtbo"
              />
            </div>

            <div className="scv-tabs">
              <nav className="scv-tab-nav">
                <a className="scv-tab scv-tab-active" href="#">
                  Overview
                </a>
                <a className="scv-tab" href="#">
                  Resources
                </a>
                <a className="scv-tab" href="#">
                  Discussion
                </a>
                <a className="scv-tab" href="#" onClick={handleFeedbackClick}>
                  Feedback
                </a>
              </nav>
            </div>

            <div className="scv-tab-content">
              <article className="scv-article">
                <h2>HTML Fundamentals</h2>
                <p className="scv-subtitle">
                  Learn the building blocks of web development with HTML
                </p>
                <p>
                  In this lesson, you'll learn the fundamental concepts of HTML
                  (HyperText Markup Language), which forms the backbone of every
                  website on the internet. HTML provides the structure and
                  semantic meaning to web content.
                </p>
                <h3>What You'll Learn</h3>
                <ul className="scv-checklist">
                  <li>
                    <span className="material-icons-outlined scv-check-icon">
                      check
                    </span>
                    <span>Understanding HTML document structure</span>
                  </li>
                  <li>
                    <span className="material-icons-outlined scv-check-icon">
                      check
                    </span>
                    <span>Working with essential HTML elements</span>
                  </li>
                  <li>
                    <span className="material-icons-outlined scv-check-icon">
                      check
                    </span>
                    <span>
                      Creating semantic markup for better accessibility
                    </span>
                  </li>
                  <li>
                    <span className="material-icons-outlined scv-check-icon">
                      check
                    </span>
                    <span>Best practices for clean, maintainable code</span>
                  </li>
                </ul>
                <h3>Key Concepts</h3>
                <p>
                  HTML uses a system of tags to define different types of
                  content. Each tag serves a specific purpose and helps browsers
                  understand how to display and structure the content. We'll
                  explore the most commonly used tags and learn when and how to
                  use them effectively.
                </p>
              </article>
            </div>
          </section>
        </div>
      </main>

      <StudentFeedback
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};

export default StudentCoursesView;
