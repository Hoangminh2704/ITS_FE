// StudentCoursesHeader.tsx
import React from "react";
import "./StudentCoursesHeader.css";
import type { StudentCoursesHeaderProps } from "../../../types/studentCoursesTypes";

const StudentCoursesHeader: React.FC<StudentCoursesHeaderProps> = ({
  onBackToCourse,
}) => {
  return (
    <header className="scv-header">
      <div className="scv-header-container">
        <div className="scv-header-content">
          <a
            className="scv-back-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBackToCourse();
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
  );
};

export default StudentCoursesHeader;
