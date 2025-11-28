import React, { useEffect, useState, useRef } from "react";
import { useForm } from "../../../hooks/useForm";
import { apiService } from "../../../services/apiService";
import "./MaterialForm.css"; // Import file SCSS mới
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
  const fileInputRef = useRef<HTMLInputElement>(null);

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
            // UPDATE material
            await apiService.updateLearningMaterial(
              editingMaterial.materialId,
              formData as LearningMaterialRequestDTO,
              selectedFile || undefined
            );
          } else {
            // CREATE material
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  // Kích hoạt input file ẩn khi click vào vùng upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFileError("");
    handleSubmit(e);
  };

  // Class điều khiển animation
  const overlayClass = isOpen
    ? "material-modal-overlay open"
    : "material-modal-overlay";

  const modalTitle = editingMaterial
    ? "Edit Learning Material"
    : "Create Learning Material";
  const submitButtonText = editingMaterial
    ? "Update Material"
    : "Create Material";

  return (
    <div className={overlayClass} onClick={handleCancel}>
      <div
        className="material-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleFormSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden", // Thêm dòng này
          }}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>{modalTitle}</h2>
            <button type="button" className="close-btn" onClick={handleCancel}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Title Field */}
            <div className="form-group">
              <label htmlFor="title">
                Title <span className="required">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange("title")}
                placeholder="e.g. Introduction to React Hooks"
                required
              />
              {errors.title && <div className="form-error">{errors.title}</div>}
            </div>

            {/* File Upload Area */}
            {!editingMaterial && (
              <div className="form-group">
                <label>
                  Material File <span className="required">*</span>
                </label>
                <div
                  className={`upload-area ${selectedFile ? "has-file" : ""}`}
                  onClick={handleUploadClick}
                >
                  <input
                    ref={fileInputRef}
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.mp4,.mov,.avi,.doc,.docx,.ppt,.pptx"
                    className="sr-only"
                    style={{ display: "none" }}
                    required={!editingMaterial}
                  />

                  {selectedFile ? (
                    <div className="file-preview">
                      <span className="material-icons">description</span>
                      <div className="file-info">
                        <div>{selectedFile.name}</div>
                        <div className="upload-hint">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <span
                        className="material-symbols-outlined"
                        style={{
                          marginLeft: "auto",
                          color: "var(--color-green-500)",
                        }}
                      >
                        check_circle
                      </span>
                    </div>
                  ) : (
                    <div className="upload-content">
                      <div className="upload-icon-bg">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "2rem" }}
                        >
                          cloud_upload
                        </span>
                      </div>
                      <div className="upload-text">
                        <span>Click to upload</span> or drag and drop
                      </div>
                      <p className="upload-hint">
                        PDF, Video, PPT, Word (Max 50MB)
                      </p>
                    </div>
                  )}
                </div>
                {fileError && <div className="form-error">{fileError}</div>}
              </div>
            )}

            {/* Topic Selection */}
            {!editingMaterial && (
              <div className="form-group">
                <label htmlFor="topicId">
                  Topic <span className="required">*</span>
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
                    name="topicId"
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

            {/* Description / Content */}
            <div className="form-group">
              <label htmlFor="content">Content / Description</label>
              <textarea
                id="content"
                name="content"
                value={values.content}
                onChange={handleChange("content")}
                placeholder="Brief description of the material..."
                rows={3}
              />
            </div>

            {/* Type & Duration Row */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="type">Material Type</label>
                <select
                  id="type"
                  name="type"
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
                <label htmlFor="duration">Duration (minutes)</label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  value={values.duration}
                  onChange={handleChange("duration")}
                  placeholder="e.g. 15"
                  min="0"
                />
              </div>
            </div>

            {editingMaterial && <input type="hidden" value={values.topicId} />}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="material-icons loading-spinner">
                    refresh
                  </span>
                  <span>{editingMaterial ? "Updating..." : "Creating..."}</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined">
                    {editingMaterial ? "save" : "add"}
                  </span>
                  <span>{submitButtonText}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MaterialForm;
