// EditorHeader.tsx
import React from "react";
import "./EditorHeader.css";
import type { EditorHeaderProps } from "../../../types/EditorSectionTypes";

const EditorHeader: React.FC<EditorHeaderProps> = ({
  activeLesson,
  activeModule,
  onDeleteClick,
  onCreateQuiz,
}) => {
  return (
    <div className="editor-header-card">
      <div className="editor-header-content">
        <div className="editor-header-title-group">
          <div className="editor-header-icon">
            <span className="material-symbols-outlined">
              {activeLesson?.type === "video"
                ? "play_circle"
                : activeLesson?.type === "exercise"
                ? "code"
                : activeLesson?.type === "quiz"
                ? "quiz"
                : "description"}
            </span>
          </div>
          <div>
            <h2 className="editor-title">
              {activeLesson?.title || "Select a lesson"}
            </h2>
            <p className="editor-subtitle">
              {activeModule?.title || "No module selected"}
            </p>
          </div>
        </div>

        <div className="editor-header-buttons">
          <button
            className="btn btn-danger"
            disabled={!activeLesson}
            onClick={onDeleteClick}
            title="Delete this lesson"
          >
            <span className="material-symbols-outlined">delete</span>
            Delete Lesson
          </button>
          <button
            className="btn btn-primary"
            disabled={!activeLesson}
            onClick={onCreateQuiz}
          >
            <span className="material-symbols-outlined">quiz</span>
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
