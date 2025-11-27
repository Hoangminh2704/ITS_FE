// EditorSection.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Thêm useParams
import type {
  LearningMaterial,
  LearningMaterialRequestDTO,
  LearningMaterialResponseDTO,
} from "../../types";
import "./EditorSection.css";
import type { Lesson } from "../CourseContent/ModuleItem";
import type { Module } from "../CourseContent/ModuleList";
import { apiService } from "../../services/apiService";
import ConfirmModal from "../Modal/ConfirmModal";
import AlertModal from "../Modal/AlertModal";

interface EditorSectionProps {
  activeLesson?: Lesson;
  activeMaterial?: LearningMaterial;
  modules: Module[];
  onSave: (materialData: any) => void;
  onCancel: () => void;
  onMaterialUpdated?: (updatedMaterial: LearningMaterial) => void;
  onMaterialDeleted?: () => void;
}

const EditorSection: React.FC<EditorSectionProps> = ({
  activeLesson,
  activeMaterial,
  modules,
  onSave,
  onCancel,
  onMaterialUpdated,
  onMaterialDeleted,
}) => {
  const { courseId } = useParams<{ courseId: string }>(); // Lấy courseId từ URL params
  const navigate = useNavigate();
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });
  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertModalOpen(true);
  };

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "document",
    duration: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Cập nhật form data khi activeMaterial thay đổi
  useEffect(() => {
    if (activeMaterial) {
      setFormData({
        title: activeMaterial.title || "",
        content: activeMaterial.content || "",
        type: activeMaterial.type || "document",
        duration: activeMaterial.duration || 0,
      });
    } else if (activeLesson) {
      setFormData({
        title: activeLesson.title || "",
        content: "",
        type: activeLesson.type || "document",
        duration: parseInt(activeLesson.duration?.replace(" min", "") || "0"),
      });
    }
  }, [activeMaterial, activeLesson]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activeMaterial?.materialId || !activeLesson) {
      showAlert("Error", "No active material or lesson to update", "error");
      return;
    }

    setIsLoading(true);
    try {
      // Tìm topicId từ modules
      const topicId =
        activeMaterial.topicId ||
        modules.find((module) =>
          module.lessons.some((lesson) => lesson.id === activeLesson?.id)
        )?.topicId ||
        0;

      // Tạo update data
      const updateData: LearningMaterialRequestDTO = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        duration: formData.duration,
        topicId: topicId,
      };

      // Gọi API update
      await apiService.updateLearningMaterial(
        activeMaterial.materialId,
        updateData
      );

      // Fetch lại material mới nhất từ server để đảm bảo dữ liệu đồng bộ
      const freshMaterial: LearningMaterialResponseDTO =
        await apiService.getMaterialById(activeMaterial.materialId);
      const fullUpdatedMaterial: LearningMaterial = {
        ...freshMaterial,
        topicId: topicId,
      };

      // Gọi callback với dữ liệu mới nhất
      if (onMaterialUpdated) {
        onMaterialUpdated(fullUpdatedMaterial);
      }

      // Gọi onSave callback hiện tại
      onSave(updateData);

      showAlert("Success", "Material updated successfully", "success");
    } catch (error) {
      showAlert(
        "Error",
        "Failed to update material. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!activeMaterial?.materialId) return;

    try {
      await apiService.deleteLearningMaterial(activeMaterial.materialId);
      setDeleteModalOpen(false);

      if (onMaterialDeleted) {
        onMaterialDeleted();
      }

      onCancel();

      showAlert("Success", "Lesson deleted successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to delete lesson. Please try again.", "error");
    }
  };

  const handleCreateQuiz = () => {
    if (!activeLesson || !activeMaterial?.materialId) {
      showAlert("Warning", "Please select a lesson first", "warning");
      return;
    }

    if (!courseId) {
      showAlert("Error", "Course ID is missing", "error");
      return;
    }

    // Chuyển đến trang quiz creation với thông tin material
    navigate(`/teacher/course/${courseId}/quiz/create`, {
      state: {
        materialId: activeMaterial.materialId,
        lessonTitle: activeLesson.title,
        topicId: activeMaterial.topicId,
      },
    });
  };

  const activeModule = modules.find((module) =>
    module.lessons.some((lesson) => lesson.id === activeLesson?.id)
  );

  return (
    <>
      <section className="editor-section">
        <div className="editor-header-card">
          <div className="editor-header-content">
            <div className="editor-header-title-group">
              <div className="editor-header-icon">
                <span className="material-symbols-outlined">
                  {activeLesson?.type === "video"
                    ? "play_circle"
                    : activeLesson?.type === "exercise"
                    ? "code"
                    : activeLesson?.type === "quiz"
                    ? "quiz"
                    : "description"}
                </span>
              </div>
              <div>
                <h2 className="editor-title">
                  {activeLesson?.title || "Select a lesson"}
                </h2>
                <p className="editor-subtitle">
                  {activeModule?.title || "No module selected"}
                </p>
              </div>
            </div>

            <div className="editor-header-buttons">
              <button
                className="btn btn-danger"
                disabled={!activeLesson}
                onClick={handleDeleteClick}
                title="Delete this lesson"
              >
                <span className="material-symbols-outlined">delete</span>
                Delete Lesson
              </button>
              <button
                className="btn btn-primary"
                disabled={!activeLesson}
                onClick={handleCreateQuiz}
              >
                <span className="material-symbols-outlined">quiz</span>
                Create Quiz
              </button>
            </div>
          </div>
        </div>

        <div className="editor-body">
          {activeLesson ? (
            <div className="editor-content-area">
              <div>
                <label className="form-label" htmlFor="lesson-title">
                  Lesson Title
                </label>
                <input
                  className="form-input"
                  id="lesson-title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <label className="form-label">Description</label>
                <div className="rich-text-editor">
                  <textarea
                    className="editor-textarea"
                    value={formData.content}
                    onChange={(e) =>
                      handleInputChange("content", e.target.value)
                    }
                    placeholder="Add your lesson content here..."
                    rows={10}
                  />
                </div>
              </div>

              <div>
                <h3 className="editor-section-title">Lesson Settings</h3>
                <div className="settings-grid">
                  <div>
                    <label className="form-label" htmlFor="duration">
                      Duration (minutes)
                    </label>
                    <input
                      className="form-input"
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) =>
                        handleInputChange(
                          "duration",
                          parseInt(e.target.value) || 0
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className="form-label" htmlFor="type">
                      Material Type
                    </label>
                    <select
                      className="form-select"
                      id="type"
                      value={formData.type}
                      onChange={(e) =>
                        handleInputChange("type", e.target.value)
                      }
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
                </div>
              </div>
            </div>
          ) : (
            <div
              className="editor-content-area"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{ textAlign: "center", color: "var(--color-slate-500)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "3rem",
                    marginBottom: "1rem",
                    display: "block",
                  }}
                >
                  play_lesson
                </span>
                <p>
                  Select a lesson from the course structure to start editing
                </p>
              </div>
            </div>
          )}

          <div className="editor-footer">
            <div className="footer-buttons">
              <button className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                disabled={!activeLesson || isLoading}
                onClick={handleSave}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined loading-spinner">
                      refresh
                    </span>
                    Saving...
                  </>
                ) : (
                  "Save Lesson"
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lesson"
        message={`Are you sure you want to delete "${activeLesson?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      <AlertModal
        isOpen={alertModalOpen}
        onClose={() => setAlertModalOpen(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </>
  );
};

export default EditorSection;
