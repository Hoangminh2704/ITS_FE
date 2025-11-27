// EditorSection.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import AlertModal from "../Modal/AlertModal/AlertModal";
import EditorHeader from "./EditorHeader/EditorHeader";
import "./EditorSection.css";
import type { EditorSectionProps } from "../../types/EditorSectionTypes";
import FileUploadSection from "./FileUploadSection/FileUploadSection";
import LessonContentSection from "./LessonContentSection/LessonContentSection";
import EditorFooter from "./EditorFooter/EditorFooter";

const EditorSection: React.FC<EditorSectionProps> = ({
  activeLesson,
  activeMaterial,
  modules,
  onSave,
  onCancel,
  onMaterialUpdated,
  onMaterialDeleted,
}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    type: "info" as "success" | "error" | "info" | "warning",
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "document",
    duration: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    setAlertConfig({ title, message, type });
    setAlertModalOpen(true);
  };

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
    // Reset selected file khi material thay đổi
    setSelectedFile(null);
  }, [activeMaterial, activeLesson]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);

    // Auto-detect type từ file extension
    if (file && activeMaterial) {
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
        txt: "article",
        md: "article",
      };

      if (extension && typeMap[extension]) {
        setFormData((prev) => ({
          ...prev,
          type: typeMap[extension],
        }));
      }
    }
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
      const updateData: any = {
        title: formData.title,
        content: formData.content,
        type: formData.type,
        duration: formData.duration,
        topicId: topicId,
      };

      // Gọi API update - TÍCH HỢP CẢ FILE MỚI NẾU CÓ
      await apiService.updateLearningMaterial(
        activeMaterial.materialId,
        updateData,
        selectedFile || undefined
      );

      // Fetch lại material mới nhất từ server
      const freshMaterial = await apiService.getMaterialById(
        activeMaterial.materialId
      );
      const fullUpdatedMaterial = {
        ...freshMaterial,
        topicId: topicId,
      };

      // Gọi callback với dữ liệu mới nhất
      if (onMaterialUpdated) {
        onMaterialUpdated(fullUpdatedMaterial);
      }

      // Gọi onSave callback hiện tại
      onSave(updateData);

      // Reset selected file sau khi save thành công
      setSelectedFile(null);

      // Hiển thị thông báo phù hợp
      if (selectedFile) {
        showAlert("Success", "Lesson and file updated successfully", "success");
      } else {
        showAlert("Success", "Lesson updated successfully", "success");
      }
    } catch (error) {
      showAlert("Error", "Failed to update lesson. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadFile = async () => {
    if (!activeMaterial?.materialId) return;

    try {
      const downloadInfo = await apiService.getFileDownloadUrl(
        activeMaterial.materialId
      );
      window.open(downloadInfo.downloadUrl, "_blank");
    } catch (error) {
      showAlert("Error", "Failed to download file. Please try again.", "error");
    }
  };

  const handleRemoveSelectedFile = () => {
    setSelectedFile(null);
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
        <EditorHeader
          activeLesson={activeLesson}
          activeModule={activeModule}
          onDeleteClick={handleDeleteClick}
          onCreateQuiz={handleCreateQuiz}
        />

        <div className="editor-body">
          {activeLesson ? (
            <div className="editor-content-area">
              <FileUploadSection
                activeMaterial={activeMaterial}
                selectedFile={selectedFile}
                onFileChange={handleFileChange}
                onDownloadFile={handleDownloadFile}
                onRemoveSelectedFile={handleRemoveSelectedFile}
              />

              <LessonContentSection
                formData={formData}
                onInputChange={handleInputChange}
              />
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

          <EditorFooter
            activeLesson={activeLesson}
            isLoading={isLoading}
            formData={formData}
            selectedFile={selectedFile}
            onCancel={onCancel}
            onSave={handleSave}
          />
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Lesson"
        message={`Are you sure you want to delete "${activeLesson?.title}"? This action cannot be undone and will also delete the associated file.`}
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
