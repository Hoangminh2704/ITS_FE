// components/SubjectForm/SubjectForm.tsx
import React, { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { apiService } from "../../services/apiService";
import "./SubjectForm.css";
import BaseModal from "../Modal/BaseModal";
import type { Subject } from "../../types";

interface SubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubjectCreated: () => void;
  editingSubject?: Subject; // Thêm prop này
}

interface SubjectFormData {
  name: string;
  description: string;
}

const SubjectForm: React.FC<SubjectFormProps> = ({
  isOpen,
  onClose,
  onSubjectCreated,
  editingSubject,
}) => {
  // Tạo initial values dựa trên editingSubject
  const getInitialValues = (): SubjectFormData => {
    if (editingSubject) {
      // Edit mode - prefill với dữ liệu hiện tại
      return {
        name: editingSubject.name || "",
        description: editingSubject.description || "",
      };
    } else {
      // Create mode - giá trị mặc định
      return {
        name: "",
        description: "",
      };
    }
  };

  const { values, errors, isLoading, handleChange, handleSubmit, reset } =
    useForm<SubjectFormData>({
      initialValues: getInitialValues(),
      onSubmit: async (formData) => {
        if (editingSubject && editingSubject.subjectId) {
          // Edit mode - gọi API update
          await apiService.updateSubject(editingSubject.subjectId, formData);
        } else {
          // Create mode - gọi API create
          await apiService.createSubject(formData);
        }
        onSubjectCreated();
        onClose();
        reset(); // Reset về initialValues mặc định
      },
    });

  // Reset form khi editingSubject thay đổi hoặc modal mở/đóng
  useEffect(() => {
    if (isOpen) {
      const newInitialValues = getInitialValues();

      // Manually set values bằng cách gọi handleChange cho từng field
      Object.keys(newInitialValues).forEach((key) => {
        const fieldName = key as keyof SubjectFormData;
        const event = {
          target: {
            name: fieldName,
            value: newInitialValues[fieldName],
          },
        } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

        handleChange(fieldName)(event);
      });
    }
  }, [editingSubject, isOpen]);

  const handleCancel = () => {
    reset(); // Reset về initialValues mặc định
    onClose();
  };

  // Xác định title và button text dựa trên mode
  const modalTitle = editingSubject ? "Edit Course" : "Create New Course";
  const submitButtonText = editingSubject ? "Update Course" : "Create Course";
  const loadingText = editingSubject ? "Updating..." : "Creating...";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={modalTitle}
      size="md"
    >
      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Course Name *
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter subject name"
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
              placeholder="Enter subject description"
              rows={4}
            />
            {errors.description && (
              <div className="form-error">{errors.description}</div>
            )}
          </div>
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

export default SubjectForm;
