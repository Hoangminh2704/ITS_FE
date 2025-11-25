// components/InstructorDashboard/InstructorDashboard.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import "./InstructorDashboard.css";
import type { Subject } from "../../types";
import { apiService } from "../../services/apiService";
import SubjectForm from "../Forms/SubjectForm";
import SubjectsList from "../Subject/SubjectList";

const InstructorDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState("");
  const [isSubjectFormOpen, setSubjectFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user has permission to create subjects
  const canCreateSubject = user?.role === "Teacher";

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const subjectsData = await apiService.getSubjects();
        setSubjects(subjectsData);
      } catch (err: any) {
        setError(err.message || "Failed to load subjects");
        console.error("Error fetching subjects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  const refreshSubjects = async () => {
    try {
      const subjectsData = await apiService.getSubjects();
      setSubjects(subjectsData);
    } catch (err: any) {
      setError(err.message || "Failed to refresh subjects");
    }
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          {/* Sidebar content same as before */}
        </aside>
        <main className="main-content">
          <div className="loading-state">
            <span className="material-icons spin">refresh</span>
            <p>Loading subjects...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar - giữ nguyên */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <div className="sidebar-logo">
              <span className="material-icons">school</span>
            </div>
            <span className="sidebar-title">ITS Teacher Panel</span>
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
              <a className="nav-link inactive" href="/">
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
                alt={`Profile picture of ${user?.name}`}
                className="profile-avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiKpTfV4aUSlT5YTy0u-_YBXfV-0pltqX62AEL1YW1PbSy_SV9LwdSAoxUCOBkHAm4iLT9aCVFkzuNJHtFFA52l_a4OPYc4CejqDOq1kmtEz9d6mNRmJTNlkpCKFlHCBTWUFrrXMWRJpq8o-Xcfb9Gil8ZXSJHAj39UCN4S35mE3kjpMmq3VC2nvX8BssrsovsyEGIckkVbvhwioHMytknDXzjdi9f4N0fP-WImA5uk9ebD9Vg47RMANcS1gQNduvMMYuQ_y6HiqJN"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/40x40/6366F1/FFFFFF?text=J")
                }
              />
              <div>
                <p className="profile-name">{user?.name || "John Anderson"}</p>
                <p className="profile-role">{user?.role || "Teacher"}</p>
              </div>
            </div>
            <button className="profile-options-btn">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 className="header-title">Welcome back, {user?.role}!</h1>
            <p className="header-subtitle">
              Manage your subjects and course content
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <button className="notification-btn">
              <span className="material-icons">notifications</span>
              <span className="notification-dot"></span>
            </button>
          </div>
        </header>

        {/* Subjects Section */}
        <section>
          <div className="course-header">
            <h2 className="course-title">My Subjects</h2>
            {canCreateSubject && (
              <button
                className="create-course-btn"
                onClick={() => setSubjectFormOpen(true)}
              >
                <span className="material-icons">add</span>
                <span>Create New Subject</span>
              </button>
            )}
          </div>

          {!canCreateSubject && (
            <div className="permission-warning">
              <span className="material-icons">warning</span>
              <p>
                You don't have permission to create subjects. Please contact an
                administrator.
              </p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <span className="material-icons">error</span>
              <p>{error}</p>
            </div>
          )}

          <SubjectsList
            subjects={subjects}
            onTopicCreated={refreshSubjects}
            onSubjectUpdated={refreshSubjects} // Fixed: Added missing prop
            canEdit={canCreateSubject}
            emptyStateMessage={
              canCreateSubject
                ? "Create your first subject to get started"
                : "No subjects available"
            }
          />
        </section>
      </main>

      {/* Subject Form Modal - chỉ hiển thị nếu có quyền */}
      {canCreateSubject && (
        <SubjectForm
          isOpen={isSubjectFormOpen}
          onClose={() => setSubjectFormOpen(false)}
          onSubjectCreated={refreshSubjects}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
