import React from "react";
import "./ModuleItem.css";

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "document" | "exercise" | "quiz";
  duration?: string;
  isActive?: boolean;
}

interface ModuleItemProps {
  lesson: Lesson;
  onClick: () => void;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ lesson, onClick }) => {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return "play_circle";
      case "document":
        return "description";
      case "exercise":
        return "code";
      case "quiz":
        return "quiz";
      default:
        return "article";
    }
  };

  const getIconClass = (type: string) => {
    switch (type) {
      case "video":
        return "icon-video";
      case "document":
        return "icon-document";
      case "exercise":
        return "icon-exercise";
      case "quiz":
        return "icon-quiz";
      default:
        return "";
    }
  };

  return (
    <li>
      <div
        className={`module-item ${lesson.isActive ? "module-item-active" : ""}`}
        onClick={onClick}
      >
        <div className="module-item-details">
          <span
            className={`material-symbols-outlined ${getIconClass(lesson.type)}`}
          >
            {getLessonIcon(lesson.type)}
          </span>
          <span className="module-item-title">{lesson.title}</span>
        </div>
        {lesson.duration && (
          <span className="module-item-duration">{lesson.duration}</span>
        )}
      </div>
    </li>
  );
};

export default ModuleItem;
