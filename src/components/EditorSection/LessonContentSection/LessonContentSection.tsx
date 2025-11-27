// LessonContentSection.tsx
import React from "react";
import "./LessonContentSection.css";
import type { LessonContentSectionProps } from "../../../types/EditorSectionTypes";

const LessonContentSection: React.FC<LessonContentSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <>
      <div>
        <label className="form-label" htmlFor="lesson-title">
          Lesson Title *
        </label>
        <input
          className="form-input"
          id="lesson-title"
          type="text"
          value={formData.title}
          onChange={(e) => onInputChange("title", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="form-label">Description</label>
        <div className="rich-text-editor">
          <textarea
            className="editor-textarea"
            value={formData.content}
            onChange={(e) => onInputChange("content", e.target.value)}
            placeholder="Add your lesson content here..."
            rows={8}
          />
        </div>
      </div>

      <div>
        <h3 className="editor-section-title">Lesson Settings</h3>
        <div className="settings-grid">
          <div>
            <label className="form-label" htmlFor="duration">
              Duration (minutes)
            </label>
            <input
              className="form-input"
              id="duration"
              type="number"
              value={formData.duration}
              onChange={(e) =>
                onInputChange("duration", parseInt(e.target.value) || 0)
              }
              min="0"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="type">
              Material Type
            </label>
            <select
              className="form-select"
              id="type"
              value={formData.type}
              onChange={(e) => onInputChange("type", e.target.value)}
            >
              <option value="pdf">PDF Document</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="presentation">Presentation</option>
              <option value="exercise">Exercise</option>
              <option value="quiz">Quiz</option>
              <option value="link">External Link</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonContentSection;
