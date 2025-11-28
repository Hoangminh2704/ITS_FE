// components/InstructorHeader/InstructorHeader.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./InstructorHeader.css";

interface InstructorHeaderProps {
  courseId?: string;
  activeTab?:
    | "Dashboard"
    | "Courses"
    | "Quizzes"
    | "Students"
    | "Analytics"
    | "Feedback";
}

export const InstructorHeader: React.FC<InstructorHeaderProps> = ({
  courseId,
  activeTab = "Courses",
}) => {
  const navigate = useNavigate();

  const handleNavClick = (tab: string, e: React.MouseEvent) => {
    e.preventDefault();

    switch (tab) {
      case "Dashboard":
        navigate("/teacher");
        break;
      case "Courses":
        if (courseId) {
          navigate(`/teacher/course/${courseId}`);
        } else {
          navigate("/teacher");
        }
        break;
      case "Quizzes":
        if (courseId) {
          navigate(`/teacher/course/${courseId}/quiz/create`);
        }
        break;
      case "Feedback":
        if (courseId) {
          navigate(`/teacher/course/${courseId}/feedback`);
        }
        break;
      default:
        break;
    }
  };

  return (
    <header className="instructor-header">
      <div className="header-left">
        <div className="header-logo">
          <div className="logo-icon-bg">
            <span className="material-symbols-outlined">school</span>
          </div>
          <span className="logo-title">ITS</span>
        </div>
        <div className="header-divider"></div>
        <div>
          <h1 className="header-title">Course Content Management</h1>
        </div>
      </div>
      <div className="header-right">
        <nav className="header-nav">
          <a
            className={`nav-link ${
              activeTab === "Dashboard" ? "nav-link-active" : ""
            }`}
            href="#"
            onClick={(e) => handleNavClick("Dashboard", e)}
          >
            Dashboard
          </a>
          <a
            className={`nav-link ${
              activeTab === "Courses" ? "nav-link-active" : ""
            }`}
            href="#"
            onClick={(e) => handleNavClick("Courses", e)}
          >
            Courses
          </a>
          <a
            className={`nav-link ${
              activeTab === "Quizzes" ? "nav-link-active" : ""
            }`}
            href="#"
            onClick={(e) => handleNavClick("Quizzes", e)}
          >
            Quizzes
          </a>
          <a
            className={`nav-link ${
              activeTab === "Feedback" ? "nav-link-active" : ""
            }`}
            href="#"
            onClick={(e) => handleNavClick("Feedback", e)}
          >
            Feedback
          </a>
        </nav>
        <div className="header-right">
          <button className="notification-btn">
            <span className="material-symbols-outlined">notifications</span>
            <span className="notification-dot"></span>
          </button>
          <img
            alt="User avatar"
            className="avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMO4bs8VNo6f9Ip-mvYk19-J3-dfa231W6K6yH3lfd-8b1VmoByX69SroG2_Ye71OD9DaFvr32nU2o-DhiX_8sZSSLJUFj3YTd8gEqeNsb5AuPArTfOUXQ36foGzIDnDMj2Ud8ngZx_lX9foSvq8VLddVY7Ko1RKLxDcl9eWQLrtgdTGBePdp_2QkWt0M5Y5YPD-mLmYswRIL_KWe07XqdIxH8BtYPd-gWdXwNjPV4L_q0q4mddy-YcrsT3E12Y86zvxE_ehuHi1jV"
            onError={(e) =>
              (e.currentTarget.src =
                "https://placehold.co/36x36/4361EE/FFFFFF?text=A")
            }
          />
        </div>
      </div>
    </header>
  );
};
