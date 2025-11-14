import React from "react";
import CourseCard from "../CourseCard/CourseCard";
import { courseData } from "../../Data/coursesData";
import "./InstructorDashboard.css";

const InstructorDashboard: React.FC = () => {
  return (
    <React.Fragment>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo-container">
              <div className="sidebar-logo">
                <span className="material-icons">school</span>
              </div>
              <span className="sidebar-title">ITS Instructor Panel</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a className="nav-link active" href="#">
                  <span className="material-icons">dashboard</span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a className="nav-link inactive" href="#">
                  <span className="material-icons">library_books</span>
                  <span>Course Management</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <div className="profile-container">
              <div className="profile-info">
                <img
                  alt="Profile picture of John Anderson"
                  className="profile-avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiKpTfV4aUSlT5YTy0u-_YBXfV-0pltqX62AEL1YW1PbSy_SV9LwdSAoxUCOBkHAm4iLT9aCVFkzuNJHtFFA52l_a4OPYc4CejqDOq1kmtEz9d6mNRmJTNlkpCKFlHCBTWUFrrXMWRJpq8o-Xcfb9Gil8ZXSJHAj39UCN4S35mE3kjpMmq3VC2nvX8BssrsovsyEGIckkVbvhwioHMytknDXzjdi9f4N0fP-WImA5uk9ebD9Vg47RMANcS1gQNduvMMYuQ_y6HiqJN"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/40x40/6366F1/FFFFFF?text=J")
                  }
                />
                <div>
                  <p className="profile-name">John Anderson</p>
                  <p className="profile-role">Instructor</p>
                </div>
              </div>
              <button className="profile-options-btn">
                <span className="material-icons">more_vert</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="dashboard-header">
            <div>
              <h1 className="header-title">Welcome back, Instructor!</h1>
              <p className="header-subtitle">
                Here's what's happening with your courses today
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <button className="notification-btn">
                <span className="material-icons">notifications</span>
                <span className="notification-dot"></span>
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <span className="material-icons">auto_stories</span>
              </div>
              <div>
                <p className="stat-value">12</p>
                <p className="stat-label">Total Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-green">
                <span className="material-icons">groups</span>
              </div>
              <div>
                <p className="stat-value">524</p>
                <p className="stat-label">Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <span className="material-icons">quiz</span>
              </div>
              <div>
                <p className="stat-value">38</p>
                <p className="stat-label">Active Quizzes</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-yellow">
                <span className="material-icons">star</span>
              </div>
              <div>
                <p className="stat-value">4.8</p>
                <p className="stat-label">Average Rating</p>
              </div>
            </div>
          </section>

          {/* My Courses Section */}
          <section>
            <div className="course-header">
              <h2 className="course-title">My Courses</h2>
              <button className="create-course-btn">
                <span className="material-icons">add</span>
                <span>Create New Course</span>
              </button>
            </div>
            <div className="course-grid">
              {courseData.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default InstructorDashboard;
