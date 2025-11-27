// StudentCoursesView.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import StudentCoursesHeader from "./StudentCoursesHeader/StudentCoursesHeader";
import StudentCoursesSidebar from "./StudentCoursesSidebar/StudentCoursesSidebar";
import StudentCoursesContent from "./StudentCoursesContent/StudentCoursesContent";
import "./StudentCoursesView.css";

const StudentCoursesView: React.FC = () => {
  const navigate = useNavigate();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleBackToCourse = () => {
    navigate("/student");
  };

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFeedbackOpen(true);
  };

  return (
    <div className="student-courses-view">
      <StudentCoursesHeader onBackToCourse={handleBackToCourse} />

      <main className="scv-main">
        <div className="scv-grid">
          <StudentCoursesSidebar />
          <StudentCoursesContent onFeedbackClick={handleFeedbackClick} />
        </div>
      </main>

      <StudentFeedback
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
};

export default StudentCoursesView;
