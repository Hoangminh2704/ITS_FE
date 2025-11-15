import React from "react";
import type { StudentCourse } from "../../types/studentCourse";

// Định nghĩa props cho component
interface CourseCardProps {
  course: StudentCourse;
}

// Hàm helper để lấy class màu cho tag
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
  // CSS nhúng trực tiếp
  const cssStyles = `
    .course-card-std {
      background-color: var(--std-card-light);
      border-radius: 0.75rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      border: 1px solid var(--std-border-light);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dark .course-card-std {
      background-color: var(--std-card-dark);
      border-color: var(--std-border-dark);
    }
    
    .course-card-std-image {
      width: 100%;
      height: 12rem; /* h-48 */
      object-fit: cover;
    }
    
    .course-card-std-content {
      padding: 1.5rem; /* p-6 */
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .course-card-std-tags {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem; /* mb-3 */
    }
    
    .course-card-std-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem; /* px-3 py-1 */
      font-size: 0.75rem; /* text-xs */
      font-weight: 500;
      border-radius: 9999px;
    }
    
    .course-card-std-duration {
      font-size: 0.875rem; /* text-sm */
      color: var(--std-text-muted-light);
    }
    .dark .course-card-std-duration {
      color: var(--std-text-muted-dark);
    }
    
    /* Lớp màu cho Tag */
    .tag-blue { background-color: var(--std-tag-blue-bg); color: var(--std-tag-blue-text); }
    .tag-purple { background-color: var(--std-tag-purple-bg); color: var(--std-tag-purple-text); }
    .tag-orange { background-color: var(--std-tag-orange-bg); color: var(--std-tag-orange-text); }
    .tag-green { background-color: var(--std-tag-green-bg); color: var(--std-tag-green-text); }
    .tag-pink { background-color: var(--std-tag-pink-bg); color: var(--std-tag-pink-text); }
    .tag-cyan { background-color: var(--std-tag-cyan-bg); color: var(--std-tag-cyan-text); }
    
    .dark .tag-blue { background-color: var(--std-tag-dark-blue-bg); color: var(--std-tag-dark-blue-text); }
    .dark .tag-purple { background-color: var(--std-tag-dark-purple-bg); color: var(--std-tag-dark-purple-text); }
    .dark .tag-orange { background-color: var(--std-tag-dark-orange-bg); color: var(--std-tag-dark-orange-text); }
    .dark .tag-green { background-color: var(--std-tag-dark-green-bg); color: var(--std-tag-dark-green-text); }
    .dark .tag-pink { background-color: var(--std-tag-dark-pink-bg); color: var(--std-tag-dark-pink-text); }
    .dark .tag-cyan { background-color: var(--std-tag-dark-cyan-bg); color: var(--std-tag-dark-cyan-text); }
    
    .course-card-std-title {
      font-size: 1.125rem; /* text-lg */
      font-weight: 700;
      margin-bottom: 0.5rem; /* mb-2 */
      color: var(--std-text-light);
    }
    .dark .course-card-std-title { color: var(--std-text-dark); }
    
    .course-card-std-desc {
      font-size: 0.875rem; /* text-sm */
      color: var(--std-text-muted-light);
      flex: 1;
      margin-bottom: 1.5rem; /* mb-6 */
    }
    .dark .course-card-std-desc { color: var(--std-text-muted-dark); }
    
    .course-card-std-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: var(--std-primary);
      color: white;
      font-weight: 600;
      padding: 0.75rem; /* py-3 */
      border: none;
      border-radius: 0.5rem; /* rounded-lg */
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .course-card-std-btn:hover {
      background-color: rgba(79, 70, 229, 0.9); /* primary/90 */
    }
  `;

  const tagClassName = `course-card-std-tag ${getTagClass(course.tagCategory)}`;

  return (
    <React.Fragment>
      <style>{cssStyles}</style>
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
          <button className="course-card-std-btn">
            Continue Learning{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentCourseCard;
