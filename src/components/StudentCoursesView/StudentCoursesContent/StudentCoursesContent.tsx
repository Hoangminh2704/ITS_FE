// StudentCoursesContent.tsx
import React from "react";
import "./StudentCoursesContent.css";
import type { StudentCoursesContentProps } from "../../../types/studentCoursesTypes";

const StudentCoursesContent: React.FC<StudentCoursesContentProps> = ({
  onFeedbackClick,
}) => {
  return (
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
          <a className="scv-tab" href="#" onClick={onFeedbackClick}>
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
            website on the internet. HTML provides the structure and semantic
            meaning to web content.
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
              <span>Creating semantic markup for better accessibility</span>
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
            HTML uses a system of tags to define different types of content.
            Each tag serves a specific purpose and helps browsers understand how
            to display and structure the content. We'll explore the most
            commonly used tags and learn when and how to use them effectively.
          </p>
        </article>
      </div>
    </section>
  );
};

export default StudentCoursesContent;
