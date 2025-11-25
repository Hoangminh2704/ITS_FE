// components/MaterialForm/MaterialForm.tsx
import React, { useEffect } from "react";

import { useForm } from "../../hooks/useForm";
import { apiService } from "../../services/apiService";
import "./MaterialForm.css";
import BaseModal from "../Modal/BaseModal";
import type { LearningMaterial } from "../../types";

interface MaterialFormProps {
  isOpen: boolean;
  onClose: () => void;
  onMaterialCreated: () => void;
  defaultTopicId: number;
  editingMaterial?: LearningMaterial; // Thêm prop này
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
}) => {
  // Tạo initial values dựa trên editingMaterial
  const getInitialValues = (): MaterialFormData => {
    if (editingMaterial) {
      // Edit mode - prefill với dữ liệu hiện tại
      return {
        title: editingMaterial.title || "",
        content: editingMaterial.content || "",
        type: editingMaterial.type || "pdf",
        duration: editingMaterial.duration || 0,
        topicId: editingMaterial.topicId || defaultTopicId,
      };
    } else {
      // Create mode - giá trị mặc định
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
        if (editingMaterial && editingMaterial.materialId) {
          // Edit mode - gọi API update
          await apiService.updateLearningMaterial(
            editingMaterial.materialId,
            formData
          );
        } else {
          // Create mode - gọi API create
          await apiService.createLearningMaterial(formData);
        }
        onMaterialCreated();
        onClose();
        reset(); // Reset về initialValues mặc định
      },
    });

  // Reset form khi editingMaterial thay đổi hoặc modal mở/đóng
  useEffect(() => {
    if (isOpen) {
      // Tạo một effect để manually update values khi dependencies thay đổi
      const newInitialValues = getInitialValues();

      // Manually set values bằng cách gọi handleChange cho từng field
      Object.keys(newInitialValues).forEach((key) => {
        const fieldName = key as keyof MaterialFormData;
        // Tạo một synthetic event để trigger handleChange
        const event = {
          target: {
            name: fieldName,
            value: newInitialValues[fieldName],
          },
        } as React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >;

        // Gọi handleChange cho từng field
        handleChange(fieldName)(event);
      });
    }
  }, [editingMaterial, isOpen, defaultTopicId]);

  const handleCancel = () => {
    reset(); // Reset về initialValues mặc định
    onClose();
  };

  // Xác định title và button text dựa trên mode
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
      <form onSubmit={handleSubmit} className="material-form">
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

          {/* Ẩn topicId field vì đã được truyền tự động */}
          <input type="hidden" value={values.topicId} />
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
