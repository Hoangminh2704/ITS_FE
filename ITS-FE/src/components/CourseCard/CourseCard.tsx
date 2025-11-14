import React from "react";
import type { Course } from "../../Data/coursesData"; // Import kiểu dữ liệu
import "./CourseCard.css"; // Import CSS cho card

// Định nghĩa props cho component
interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="course-card">
      <img
        alt={`Cover image for ${course.title}`}
        className="course-card-image"
        src={course.imageUrl}
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/400x160/6366F1/FFFFFF?text=Course+Image")
        }
      />
      <div className="course-card-content">
        <h3 className="course-card-title">{course.title}</h3>
        <div className="course-card-info">
          <div className="info-item">
            <span className="material-icons">person_outline</span>
            <span>{course.students} Students</span>
          </div>
          <div className="info-item">
            <span className="material-icons">schedule</span>
            <span>{course.duration}</span>
          </div>
        </div>
        <button className="manage-course-btn">Manage Course</button>
      </div>
    </div>
  );
};

export default CourseCard;
