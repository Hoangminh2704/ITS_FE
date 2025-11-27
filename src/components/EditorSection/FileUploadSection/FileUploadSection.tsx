// FileUploadSection.tsx
import React from "react";
import "./FileUploadSection.css";
import type { FileUploadSectionProps } from "../../../types/EditorSectionTypes";

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  activeMaterial,
  selectedFile,
  onFileChange,
  onDownloadFile,
  onRemoveSelectedFile,
}) => {
  const hasExistingFile = activeMaterial?.fileName;

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="file-upload-section">
      <h3 className="editor-section-title">File Management</h3>

      {/* Hiển thị file hiện tại */}
      {hasExistingFile && (
        <div className="current-file-info">
          <div className="file-info-header">
            <span className="material-symbols-outlined">description</span>
            <span>Current File</span>
          </div>
          <div className="file-details">
            <div className="file-name">{activeMaterial.fileName}</div>
            {activeMaterial.fileSize && (
              <div className="file-size">
                {(activeMaterial.fileSize / 1024 / 1024).toFixed(2)} MB
              </div>
            )}
            {activeMaterial.contentType && (
              <div className="file-type">{activeMaterial.contentType}</div>
            )}
          </div>
          <div className="file-actions">
            <button
              className="btn btn-secondary btn-sm"
              onClick={onDownloadFile}
              disabled={!hasExistingFile}
            >
              <span className="material-symbols-outlined">download</span>
              Download
            </button>
          </div>
        </div>
      )}

      {/* File upload/replace */}
      <div className="file-upload-area">
        <label className="form-label">
          {hasExistingFile ? "Replace File" : "Upload File"}
          {selectedFile && " (New file selected)"}
        </label>
        <input
          id="file-input"
          type="file"
          className="file-input"
          onChange={handleFileInputChange}
          accept=".pdf,.mp4,.mov,.avi,.doc,.docx,.ppt,.pptx,.txt,.md"
        />

        {selectedFile && (
          <div className="selected-file-info">
            <div className="file-preview">
              <span className="material-symbols-outlined">description</span>
              <div className="file-details">
                <div className="file-name">{selectedFile.name}</div>
                <div className="file-size">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div className="file-hint">
                  File will be updated when you click "Save Lesson"
                </div>
              </div>
            </div>
            <button
              className="btn btn-outline btn-sm"
              onClick={onRemoveSelectedFile}
            >
              <span className="material-symbols-outlined">close</span>
              Remove
            </button>
          </div>
        )}

        {!hasExistingFile && !selectedFile && (
          <div className="upload-hint">
            <span className="material-symbols-outlined">info</span>
            <span>No file uploaded yet. Please select a file to upload.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadSection;
