// StudentCoursesSidebar.tsx
import React from "react";
import "./StudentCoursesSidebar.css";
import type {
  StudentCoursesSidebarProps,
  Lesson,
  Module,
} from "../../../types/studentCoursesTypes";

const StudentCoursesSidebar: React.FC<StudentCoursesSidebarProps> = () => {
  const modules: Module[] = [
    {
      title: "Module 1: Getting Started",
      lessons: [
        {
          id: "1",
          title: "Introduction to Web Development",
          duration: "5:30",
          status: "completed",
        },
        {
          id: "2",
          title: "Setting Up Development Environment",
          duration: "8:15",
          status: "completed",
        },
        {
          id: "3",
          title: "HTML Fundamentals",
          duration: "12:45",
          status: "playing",
          isActive: true,
        },
      ],
    },
    {
      title: "Module 2: HTML & CSS",
      lessons: [
        {
          id: "4",
          title: "CSS Styling Basics",
          duration: "10:20",
          status: "uncompleted",
        },
        {
          id: "5",
          title: "Responsive Design",
          duration: "15:30",
          status: "uncompleted",
        },
      ],
    },
    {
      title: "Module 3: JavaScript",
      lessons: [
        {
          id: "6",
          title: "JavaScript Basics",
          duration: "18:45",
          status: "uncompleted",
        },
        {
          id: "7",
          title: "DOM Manipulation",
          duration: "22:10",
          status: "uncompleted",
        },
      ],
    },
  ];

  const getLessonIcon = (status: Lesson["status"], isActive?: boolean) => {
    if (isActive) {
      return "play_arrow";
    }
    switch (status) {
      case "completed":
        return "check_circle";
      case "playing":
        return "play_arrow";
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

  return (
    <aside className="scv-sidebar">
      <div className="scv-sidebar-header">
        <h2 className="scv-sidebar-title">Complete Web Development</h2>
        <button className="scv-collapse-btn">
          <span className="material-icons-outlined">unfold_less</span>
        </button>
      </div>
      <div className="scv-progress">
        <div className="scv-progress-bar">
          <div className="scv-progress-fill" style={{ width: "65%" }}></div>
        </div>
        <p className="scv-progress-text">13 of 20 lessons completed</p>
      </div>
      <hr className="scv-divider" />

      <nav className="scv-modules">
        {modules.map((module, index) => (
          <div key={index} className="scv-module">
            <h3 className="scv-module-title">{module.title}</h3>
            <ul className="scv-lesson-list">
              {module.lessons.map((lesson) => (
                <li key={lesson.id}>
                  <a
                    className={`scv-lesson-link ${
                      lesson.isActive ? "scv-lesson-active" : ""
                    }`}
                    href="#"
                  >
                    <span className="scv-lesson-info">
                      <span
                        className={`material-icons-outlined ${getLessonIconClass(
                          lesson.status,
                          lesson.isActive
                        )}`}
                      >
                        {getLessonIcon(lesson.status, lesson.isActive)}
                      </span>
                      {lesson.title}
                    </span>
                    <span className="scv-lesson-duration">
                      {lesson.duration}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default StudentCoursesSidebar;
