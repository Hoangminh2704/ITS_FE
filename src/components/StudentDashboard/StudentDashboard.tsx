// StudentDashboard.tsx
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { studentCourseData } from "../../Data/studentCourses";
import StudentSidebar from "./StudentSidebar/StudentSidebar";
import StudentHeader from "./StudentHeader/StudentHeader";
import StudentContent from "./StudentContent/StudentContent";
import "./StudentDashboard.css";

const StudentDashboard: React.FC = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar onLogout={handleLogout} user={user} />

      <div className="student-main-wrapper">
        <StudentHeader />
        <StudentContent courses={studentCourseData} />
      </div>
    </div>
  );
};

export default StudentDashboard;
