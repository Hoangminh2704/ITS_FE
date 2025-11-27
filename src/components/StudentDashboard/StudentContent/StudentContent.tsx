// StudentContent.tsx
import React from "react";
import "./StudentContent.css";
import StudentCourseCard from "../../StudentCourseCard/StudentCourseCard";
import type { StudentContentProps } from "../../../types/studentTypes";

const StudentContent: React.FC<StudentContentProps> = ({ courses }) => {
  return (
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
        {courses.map((course) => (
          <StudentCourseCard course={course} key={course.id} />
        ))}
      </div>
    </main>
  );
};

export default StudentContent;
