import React from "react";
import { studentCourseData } from "../../Data/studentCourses";
import StudentCourseCard from "../StudentCourseCard/StudentCourseCard";
import "./StudentDashboard.css";

const StudentDashboard: React.FC = () => {
  return (
    <div className="student-dashboard-layout">
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
          <div className="profile-container">
            <div className="profile-info">
              <img
                alt="Alex Johnson profile picture"
                className="profile-avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrch7thzOF_60M2ayBEke6_hNQ2KQVt2DgrjfJmnLHwWj6LxcGxPk7cByIQRlTiOXyBq7mQS82kKAgr1kCm0JtSjAzkBQPrYeQGlQEylXKOp1-zXdE8BEKQKGvcRYWSrYxjz848ivypV9GcyWlZgEoQoa-PNtziULhNu73pxm4l9nrKPItQZoFOct7ko9XWYmUNwtpwHMHusIQCersnobfuvyiNnxhIf2MiLwUlH9x8f8zD0kHnz57Ipy1UlIabpAIUd7vYlgqlnI"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/40x40/4F46E5/FFFFFF?text=A")
                }
              />
              <div>
                <p className="profile-name">Alex Johnson</p>
                <p className="profile-role">Student</p>
              </div>
            </div>
            <button className="profile-options-btn">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="student-main-wrapper">
        <header className="student-header">
          <div className="searchbar-container">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
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

        <main className="student-main-content">
          <div className="content-header">
            <h1 className="content-title">My Courses</h1>
            <div className="filter-tabs">
              <button className="tab-btn tab-btn-active">All Courses</button>
              <button className="tab-btn tab-btn-inactive">In Progress</button>
              <button className="tab-btn tab-btn-inactive">Completed</button>
            </div>
          </div>

          <div className="course-grid">
            {studentCourseData.map((course) => (
              <StudentCourseCard course={course} key={course.id} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
