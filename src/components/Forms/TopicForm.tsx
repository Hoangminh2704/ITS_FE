// components/TopicForm/TopicForm.tsx
import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { apiService } from "../../services/apiService";
import "./TopicForm.css";
import BaseModal from "../Modal/BaseModal";
import type { Topic } from "../../types";

interface TopicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicCreated: () => void;
  defaultSubjectId: number; // Bắt buộc truyền subjectId
  editingTopic?: Topic; // Thêm prop này
}

interface TopicFormData {
  name: string;
  description: string;
  difficultyLevel: number;
  subjectId: number;
}

const TopicForm: React.FC<TopicFormProps> = ({
  isOpen,
  onClose,
  onTopicCreated,
  defaultSubjectId,
  editingTopic,
}) => {
  // Tạo initial values dựa trên editingTopic
  const getInitialValues = (): TopicFormData => {
    if (editingTopic) {
      // Edit mode - prefill với dữ liệu hiện tại
      return {
        name: editingTopic.name || "",
        description: editingTopic.description || "",
        difficultyLevel: editingTopic.difficultyLevel || 1,
        subjectId: editingTopic.subjectId || defaultSubjectId,
      };
    } else {
      // Create mode - giá trị mặc định
      return {
        name: "",
        description: "",
        difficultyLevel: 1,
        subjectId: defaultSubjectId,
      };
    }
  };

  const { values, errors, isLoading, handleChange, handleSubmit, reset } =
    useForm<TopicFormData>({
      initialValues: getInitialValues(),
      onSubmit: async (formData) => {
        if (editingTopic && editingTopic.topicId) {
          // Edit mode - gọi API update
          await apiService.updateTopic(editingTopic.topicId, formData);
        } else {
          // Create mode - gọi API create
          await apiService.createTopic(formData);
        }
        onTopicCreated();
        onClose();
        reset(); // Reset về initialValues mặc định
      },
    });

  // Reset form khi editingTopic thay đổi hoặc modal mở/đóng
  useEffect(() => {
    if (isOpen) {
      const newInitialValues = getInitialValues();

      // Manually set values bằng cách gọi handleChange cho từng field
      Object.keys(newInitialValues).forEach((key) => {
        const fieldName = key as keyof TopicFormData;
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
  }, [editingTopic, isOpen, defaultSubjectId]);

  const handleCancel = () => {
    reset(); // Reset về initialValues mặc định
    onClose();
  };

  // Xác định title và button text dựa trên mode
  const modalTitle = editingTopic ? "Edit Topic" : "Create New Topic";
  const submitButtonText = editingTopic ? "Update Topic" : "Create Topic";
  const loadingText = editingTopic ? "Updating..." : "Creating...";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={modalTitle}
      size="md"
    >
      <form onSubmit={handleSubmit} className="topic-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Topic Name *
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter topic name"
              required
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              className="form-textarea"
              value={values.description}
              onChange={handleChange("description")}
              placeholder="Enter topic description"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="difficultyLevel" className="form-label">
              Difficulty Level
            </label>
            <select
              id="difficultyLevel"
              className="form-select"
              value={values.difficultyLevel}
              onChange={handleChange("difficultyLevel")}
            >
              <option value={1}>Beginner</option>
              <option value={2}>Intermediate</option>
              <option value={3}>Advanced</option>
            </select>
          </div>

          {/* Ẩn subjectId field vì đã được truyền tự động */}
          <input type="hidden" value={values.subjectId} />
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

export default TopicForm;
