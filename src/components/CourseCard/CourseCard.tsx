import React from "react";
import { useNavigate } from "react-router-dom";
import type { Course } from "../../types/course";
import "./CourseCard.css";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();

  const handleManageCourse = () => {
    navigate(`/instructor/course/${course.id}`);
  };

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
        <button className="manage-course-btn" onClick={handleManageCourse}>
          Manage Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
