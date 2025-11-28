// components/MaterialForm/MaterialForm.tsx
import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { apiService } from "../../../services/apiService";
import "./MaterialForm.css";
import BaseModal from "../../Modal/BaseModal/BaseModal";
import type {
  LearningMaterial,
  Topic,
  LearningMaterialCreateRequestDTO,
  LearningMaterialRequestDTO,
} from "../../../types";

interface MaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMaterialCreated: () => void;
  defaultTopicId: number;
  editingMaterial?: LearningMaterial;
  topics?: Topic[];
  courseId?: string;
}

interface MaterialFormData {
  title: string;
  content: string;
  type: string;
  duration: number;
  topicId: number;
}

const MaterialForm: React.FC<MaterialFormProps> = ({
  isOpen,
  onClose,
  onMaterialCreated,
  defaultTopicId,
  editingMaterial,
  topics = [],
  courseId,
}) => {
  const [availableTopics, setAvailableTopics] = useState<Topic[]>(topics);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");

  useEffect(() => {
    const fetchTopics = async () => {
      if (!courseId || topics.length > 0) return;

      try {
        setLoadingTopics(true);
        const subjectId = parseInt(courseId);
        const topicsData = await apiService.getTopicsBySubject(subjectId);
        setAvailableTopics(topicsData);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoadingTopics(false);
      }
    };

    if (isOpen) {
      fetchTopics();
    }
  }, [isOpen, courseId, topics.length]);

  const getInitialValues = (): MaterialFormData => {
    if (editingMaterial) {
      return {
        title: editingMaterial.title || "",
        content: editingMaterial.content || "",
        type: editingMaterial.type || "pdf",
        duration: editingMaterial.duration || 0,
        topicId: editingMaterial.topicId || defaultTopicId,
      };
    } else {
      return {
        title: "",
        content: "",
        type: "pdf",
        duration: 0,
        topicId: defaultTopicId,
      };
    }
  };

  const { values, errors, isLoading, handleChange, handleSubmit, reset } =
    useForm<MaterialFormData>({
      initialValues: getInitialValues(),
      onSubmit: async (formData) => {
        try {
          // Validate file for new material
          if (!editingMaterial && !selectedFile) {
            setFileError("Please select a file for the material");
            return;
          }

          if (editingMaterial && editingMaterial.materialId) {
            // UPDATE material - có thể có file mới hoặc không
            await apiService.updateLearningMaterial(
              editingMaterial.materialId,
              formData as LearningMaterialRequestDTO,
              selectedFile || undefined
            );
          } else {
            // CREATE material - bắt buộc có file
            await apiService.createLearningMaterial(
              formData as LearningMaterialCreateRequestDTO,
              selectedFile!
            );
          }

          onMaterialCreated();
          onClose();
          resetForm();
        } catch (error) {
          console.error("Error creating/updating material:", error);
          setFileError("Failed to upload material. Please try again.");
        }
      },
    });

  const resetForm = () => {
    reset();
    setSelectedFile(null);
    setFileError("");
  };

  useEffect(() => {
    if (isOpen) {
      const newInitialValues = getInitialValues();
      Object.keys(newInitialValues).forEach((key) => {
        const fieldName = key as keyof MaterialFormData;
        const event = {
          target: {
            name: fieldName,
            value: newInitialValues[fieldName],
          },
        } as React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >;

        handleChange(fieldName)(event);
      });
    }
  }, [editingMaterial, isOpen, defaultTopicId]);

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFileError("");

    // Auto-detect type from file extension
    if (file && !editingMaterial) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      const typeMap: { [key: string]: string } = {
        pdf: "pdf",
        mp4: "video",
        mov: "video",
        avi: "video",
        doc: "document",
        docx: "document",
        ppt: "presentation",
        pptx: "presentation",
      };

      if (extension && typeMap[extension]) {
        const event = {
          target: {
            name: "type",
            value: typeMap[extension],
          },
        } as React.ChangeEvent<HTMLSelectElement>;
        handleChange("type")(event);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFileError("");
    handleSubmit(e);
  };

  const modalTitle = editingMaterial
    ? "Edit Learning Material"
    : "Create Learning Material";
  const submitButtonText = editingMaterial
    ? "Update Material"
    : "Create Material";
  const loadingText = editingMaterial ? "Updating..." : "Creating...";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={modalTitle}
      size="lg"
    >
      <form onSubmit={handleFormSubmit} className="material-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title *
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={values.title}
              onChange={handleChange("title")}
              placeholder="Enter material title"
              required
            />
            {errors.title && <div className="form-error">{errors.title}</div>}
          </div>

          {!editingMaterial && (
            <div className="form-group">
              <label htmlFor="file" className="form-label">
                File *
              </label>
              <input
                id="file"
                type="file"
                className="form-input"
                onChange={handleFileChange}
                accept=".pdf,.mp4,.mov,.avi,.doc,.docx,.ppt,.pptx"
                required={!editingMaterial}
              />
              {selectedFile && (
                <div className="file-info">
                  <span className="material-icons">description</span>
                  {selectedFile.name} (
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </div>
              )}
              {fileError && <div className="form-error">{fileError}</div>}
            </div>
          )}

          {!editingMaterial && (
            <div className="form-group">
              <label htmlFor="topicId" className="form-label">
                Topic *
              </label>
              {loadingTopics ? (
                <div className="loading-state">
                  <span className="material-icons loading-spinner">
                    refresh
                  </span>
                  Loading topics...
                </div>
              ) : (
                <select
                  id="topicId"
                  className="form-select"
                  value={values.topicId}
                  onChange={handleChange("topicId")}
                  required
                >
                  <option value="">Select a topic</option>
                  {availableTopics.map((topic) => (
                    <option key={topic.topicId} value={topic.topicId}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              )}
              {errors.topicId && (
                <div className="form-error">{errors.topicId}</div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              className="form-textarea"
              value={values.content}
              onChange={handleChange("content")}
              placeholder="Enter material content or description"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Material Type
            </label>
            <select
              id="type"
              className="form-select"
              value={values.type}
              onChange={handleChange("type")}
            >
              <option value="pdf">PDF</option>
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="presentation">Presentation</option>
              <option value="exercise">Exercise</option>
              <option value="quiz">Quiz</option>
              <option value="link">External Link</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="duration" className="form-label">
              Duration (minutes)
            </label>
            <input
              id="duration"
              type="number"
              className="form-input"
              value={values.duration}
              onChange={handleChange("duration")}
              placeholder="Enter estimated duration in minutes"
              min="0"
            />
          </div>

          {editingMaterial && <input type="hidden" value={values.topicId} />}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-btn"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="material-icons loading-spinner">refresh</span>
                {loadingText}
              </>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default MaterialForm;
