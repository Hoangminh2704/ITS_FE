// components/TopicForm/TopicForm.tsx
import React, { useEffect } from "react";
import "./TopicForm.css";
import type { Topic } from "../../../types";
import { useForm } from "../../../hooks/useForm";
import { apiService } from "../../../services/apiService";
import BaseModal from "../../Modal/BaseModal/BaseModal";

interface TopicFormProps {
  isOpen: boolean;
  onClose: () => void;
  onTopicCreated: () => void;
  defaultSubjectId: number;
  editingTopic?: Topic;
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
  const getInitialValues = (): TopicFormData => {
    if (editingTopic) {
      return {
        name: editingTopic.name || "",
        description: editingTopic.description || "",
        difficultyLevel: editingTopic.difficultyLevel || 1,
        subjectId: editingTopic.subjectId || defaultSubjectId,
      };
    } else {
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
        try {
          if (editingTopic && editingTopic.topicId) {
            await apiService.updateTopic(editingTopic.topicId, formData);
          } else {
            await apiService.createTopic(formData);
          }
          onTopicCreated();
          onClose();
          reset();
        } catch (error) {
          console.error("Error creating/updating topic:", error);
          throw error;
        }
      },
    });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [editingTopic, isOpen, defaultSubjectId]);

  const handleCancel = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const modalTitle = editingTopic ? "Edit Module" : "Create New Module";
  const submitButtonText = editingTopic ? "Update Module" : "Create Module";
  const loadingText = editingTopic ? "Updating..." : "Creating...";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={modalTitle}
      size="md"
    >
      <form onSubmit={handleFormSubmit} className="topic-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Module Name *
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter module name"
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
              placeholder="Enter module description"
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
