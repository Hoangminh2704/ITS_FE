// components/QuestionForm/QuestionForm.tsx
import React, { useEffect } from "react";
import "./QuestionForm.css";
import type { Question } from "../../../types";
import { useForm } from "../../../hooks/useForm";
import BaseModal from "../../Modal/BaseModal/BaseModal";
import { apiService } from "../../../services/apiService";

interface QuestionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onQuestionCreated: () => void;
  defaultTopicId: number;
  editingQuestion?: Question;
}

interface QuestionFormData {
  text: string;
  type: string;
  correctAnswer: string;
  hintContent: string;
  topicId: number;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  isOpen,
  onClose,
  onQuestionCreated,
  defaultTopicId,
  editingQuestion,
}) => {
  // Tạo initial values dựa trên editingQuestion
  const getInitialValues = (): QuestionFormData => {
    if (editingQuestion) {
      // Edit mode - prefill với dữ liệu hiện tại
      return {
        text: editingQuestion.text || "",
        type: editingQuestion.type || "multiple_choice",
        correctAnswer: editingQuestion.correctAnswer || "",
        hintContent: editingQuestion.hintContent || "",
        topicId: editingQuestion.topicId || defaultTopicId,
      };
    } else {
      // Create mode - giá trị mặc định
      return {
        text: "",
        type: "multiple_choice",
        correctAnswer: "",
        hintContent: "",
        topicId: defaultTopicId,
      };
    }
  };

  const { values, errors, isLoading, handleChange, handleSubmit, reset } =
    useForm<QuestionFormData>({
      initialValues: getInitialValues(),
      onSubmit: async (formData) => {
        if (editingQuestion && editingQuestion.questionId) {
          // Edit mode - gọi API update
          await apiService.updateQuestion(editingQuestion.questionId, formData);
        } else {
          // Create mode - gọi API create
          await apiService.createQuestion(formData);
        }
        onQuestionCreated();
        onClose();
        reset(); // Reset về initialValues mặc định
      },
    });

  // Reset form khi editingQuestion thay đổi hoặc modal mở/đóng
  useEffect(() => {
    if (isOpen) {
      // Tạo một effect để manually update values khi dependencies thay đổi
      const newInitialValues = getInitialValues();

      // Manually set values bằng cách gọi handleChange cho từng field
      // Hoặc nếu useForm không hỗ trợ, chúng ta cần tìm cách khác
      Object.keys(newInitialValues).forEach((key) => {
        const fieldName = key as keyof QuestionFormData;
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

      // Reset errors
      // Bạn có thể cần thêm cách để reset errors nếu hook không tự làm
    }
  }, [editingQuestion, isOpen, defaultTopicId]);

  const handleCancel = () => {
    reset(); // Reset về initialValues mặc định
    onClose();
  };

  // Xác định title và button text dựa trên mode
  const modalTitle = editingQuestion ? "Edit Question" : "Create New Question";
  const submitButtonText = editingQuestion
    ? "Update Question"
    : "Create Question";
  const loadingText = editingQuestion ? "Updating..." : "Creating...";

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleCancel}
      title={modalTitle}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-content">
          <div className="form-group">
            <label htmlFor="text" className="form-label">
              Question Text *
            </label>
            <textarea
              id="text"
              className="form-textarea"
              value={values.text}
              onChange={handleChange("text")}
              placeholder="Enter your question"
              rows={3}
              required
            />
            {errors.text && <div className="form-error">{errors.text}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="type" className="form-label">
              Question Type
            </label>
            <select
              id="type"
              className="form-select"
              value={values.type}
              onChange={handleChange("type")}
            >
              <option value="multiple_choice">Multiple Choice</option>
              <option value="true_false">True/False</option>
              <option value="short_answer">Short Answer</option>
              <option value="essay">Essay</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="correctAnswer" className="form-label">
              Correct Answer
            </label>
            <textarea
              id="correctAnswer"
              className="form-textarea"
              value={values.correctAnswer}
              onChange={handleChange("correctAnswer")}
              placeholder="Enter the correct answer"
              rows={2}
            />
          </div>

          <div className="form-group">
            <label htmlFor="hintContent" className="form-label">
              Hint Content
            </label>
            <textarea
              id="hintContent"
              className="form-textarea"
              value={values.hintContent}
              onChange={handleChange("hintContent")}
              placeholder="Enter hint for the question"
              rows={2}
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

export default QuestionForm;
