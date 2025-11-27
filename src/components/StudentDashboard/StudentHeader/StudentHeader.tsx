// StudentHeader.tsx
import React from "react";
import "./StudentHeader.css";
import type { StudentHeaderProps } from "../../../types/studentTypes";

const StudentHeader: React.FC<StudentHeaderProps> = () => {
  return (
    <header className="student-header">
      <div className="searchbar-container">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          className="search-input"
          placeholder="Search courses, assignments..."
          type="text"
        />
      </div>
      <div className="header-actions">
        <button className="header-action-btn">
          <span className="material-symbols-outlined">notifications</span>
          <span className="notification-dot"></span>
        </button>
        <button className="header-action-btn">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
};

export default StudentHeader;
