// StudentDashboard.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import StudentSidebar from "./StudentSidebar/StudentSidebar";
import StudentHeader from "./StudentHeader/StudentHeader";
import StudentContent from "./StudentContent/StudentContent";
import "./StudentDashboard.css";

const StudentDashboard: React.FC = () => {
  const { logout, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="student-dashboard-layout">
      <StudentSidebar onLogout={handleLogout} user={user} />

      <div className="student-main-wrapper">
        <StudentHeader onSearch={handleSearch} searchValue={searchTerm} />
        <StudentContent
          searchTerm={searchTerm}
          onClearSearch={handleClearSearch}
        />
      </div>
    </div>
  );
};

export default StudentDashboard;
