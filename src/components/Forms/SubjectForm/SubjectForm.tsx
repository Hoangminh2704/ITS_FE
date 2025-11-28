// components/SubjectForm/SubjectForm.tsx
import React, { useEffect, useState } from "react";
import "./SubjectForm.css";
import type { Subject } from "../../../types";
import { apiService } from "../../../services/apiService";

interface SubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectCreated: () => void;
  editingSubject?: Subject;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  isOpen,
  onClose,
  onSubjectCreated,
  editingSubject,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    level: "Beginner",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (editingSubject) {
        setFormData({
          name: editingSubject.name || "",
          description: editingSubject.description || "",
          duration: "",
          level: "Beginner",
        });
      } else {
        setFormData({
          name: "",
          description: "",
          duration: "",
          level: "Beginner",
        });
      }
      setError("");
    }
  }, [isOpen, editingSubject]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const submitData = {
        name: formData.name,
        description: formData.description,
      };

      if (editingSubject && editingSubject.subjectId) {
        await apiService.updateSubject(editingSubject.subjectId, submitData);
      } else {
        await apiService.createSubject(submitData);
      }

      onSubjectCreated();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save subject. Please try again.");
      console.error("Failed to save subject:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      description: "",
      duration: "",
      level: "Beginner",
    });
    setError("");
    onClose();
  };

  const overlayClass = isOpen ? "modal-overlay open" : "modal-overlay";

  return (
    <div className={overlayClass} onClick={handleCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h2>{editingSubject ? "Edit Subject" : "Create New Subject"}</h2>
            <button type="button" className="close-btn" onClick={handleCancel}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="modal-body">
            {error && <div className="form-error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="name">Subject Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Advanced Web Development"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe what students will learn..."
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Thumbnail Image</label>
              <div className="upload-area">
                <div className="upload-content">
                  <div className="upload-icon-bg">
                    <span
                      title="cloud_upload"
                      className="material-symbols-outlined"
                      style={{ fontSize: "2rem" }}
                    >
                      cloud_upload
                    </span>
                  </div>
                  <div className="upload-text">
                    <label htmlFor="file-upload">Upload Image</label>
                    <input
                      title="cloud_upload"
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      style={{ display: "none" }}
                    />
                  </div>
                  <p className="upload-hint">
                    Drag and drop or click to browse
                  </p>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  placeholder="e.g. 8 Weeks"
                  value={formData.duration}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="level">Level</label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              <span className="material-symbols-outlined">
                {editingSubject ? "save" : "add"}
              </span>
              <span>
                {loading
                  ? "Saving..."
                  : editingSubject
                  ? "Update Subject"
                  : "Create Subject"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectForm;
