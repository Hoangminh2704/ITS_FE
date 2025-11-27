// StudentSidebar.tsx
import React from "react";
import "./StudentSidebar.css";
import type { StudentSidebarProps } from "../../../types/studentTypes";
import StudentProfile from "../StudentProfile/StudentProfile";

const StudentSidebar: React.FC<StudentSidebarProps> = ({ onLogout, user }) => {
  return (
    <aside className="student-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon-bg">
            <span className="material-symbols-outlined">school</span>
          </div>
          <span className="logo-title">ITS</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">dashboard</span>
          Dashboard
        </a>
        <a className="sidebar-link sidebar-link-active" href="#">
          <span className="material-symbols-outlined">import_contacts</span>
          My Learning
        </a>
        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">calendar_month</span>
          Schedule
        </a>
        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">show_chart</span>
          Progress
        </a>
      </nav>
      <div className="sidebar-footer">
        <StudentProfile user={user} onLogout={onLogout} />
      </div>
    </aside>
  );
};

export default StudentSidebar;
