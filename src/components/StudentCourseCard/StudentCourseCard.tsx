import React from "react";
import { useNavigate } from "react-router-dom";
import type { StudentCourse } from "../../types/studentCourse";
import "./StudentCourseCard.css";

interface CourseCardProps {
  course: StudentCourse;
}

const getTagClass = (category: StudentCourse["tagCategory"]) => {
  switch (category) {
    case "technology":
      return "tag-blue";
    case "development":
      return "tag-purple";
    case "data-science":
      return "tag-orange";
    case "design":
      return "tag-green";
    case "marketing":
      return "tag-pink";
    case "cloud":
      return "tag-cyan";
    default:
      return "tag-blue";
  }
};

const StudentCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const navigate = useNavigate();
  const tagClassName = `course-card-std-tag ${getTagClass(course.tagCategory)}`;

  const handleContinueLearning = () => {
    navigate(`/student/course/${course.id}`);
  };

  return (
    <div className="course-card-std">
      <img
        alt={course.title}
        className="course-card-std-image"
        src={course.imageUrl}
        onError={(e) =>
          (e.currentTarget.src =
            "https://placehold.co/600x288/4F46E5/FFFFFF?text=Course")
        }
      />
      <div className="course-card-std-content">
        <div className="course-card-std-tags">
          <span className={tagClassName}>{course.tag}</span>
          <span className="course-card-std-duration">{course.duration}</span>
        </div>
        <h3 className="course-card-std-title">{course.title}</h3>
        <p className="course-card-std-desc">{course.description}</p>
        <button
          className="course-card-std-btn"
          onClick={handleContinueLearning}
        >
          Continue Learning{" "}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
