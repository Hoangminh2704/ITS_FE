// EditorFooter.tsx
import React from "react";
import "./EditorFooter.css";
import type { EditorFooterProps } from "../../../types/EditorSectionTypes";

const EditorFooter: React.FC<EditorFooterProps> = ({
  activeLesson,
  isLoading,
  formData,
  selectedFile,
  onCancel,
  onSave,
}) => {
  return (
    <div className="editor-footer">
      <div className="footer-buttons">
        <button
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          disabled={!activeLesson || isLoading || !formData.title.trim()}
          onClick={onSave}
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined loading-spinner">
                refresh
              </span>
              {selectedFile ? "Saving with File..." : "Saving..."}
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              Save Lesson
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default EditorFooter;
