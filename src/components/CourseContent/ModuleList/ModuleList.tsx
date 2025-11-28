// ModuleList.tsx
import React, { useState } from "react";
import "./ModuleList.css";
import ModuleItem from "../ModuleItem/ModuleItem";
import type { Topic } from "../../../types";
import MaterialForm from "../../Forms/MaterialForm/MaterialForm";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal";
import { apiService } from "../../../services/apiService";
import AlertModal from "../../Modal/AlertModal/AlertModal";
import TopicForm from "../../Forms/TopicForm/TopicForm";

export interface Module {
  id: string;
  title: string;
  isExpanded: boolean;
  lessons: Lesson[];
  topicId?: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "document" | "exercise" | "quiz";
  duration?: string;
  isActive?: boolean;
  materialId?: number;
}

interface ModuleListProps {
  modules: Module[];
  onModuleToggle: (moduleId: string) => void;
  onLessonClick: (lessonId: string, materialId?: number) => void;
  onModuleClick?: (module: Module) => void;
  onModuleCreated: () => void;
  onMaterialCreated: () => void;
  onModuleUpdated?: () => void;
  onModuleDeleted?: () => void;
  courseId?: string;
  topics?: Topic[];
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  onModuleToggle,
  onLessonClick,
  onModuleCreated,
  onMaterialCreated,
  onModuleUpdated,
  onModuleDeleted,
  onModuleClick,
  courseId,
  topics = [],
}) => {
  const [showTopicForm, setShowTopicForm] = React.useState(false);
  const [showMaterialForm, setShowMaterialForm] = React.useState(false);
  const [selectedTopicId, setSelectedTopicId] = React.useState<number>();
  const [editingTopic, setEditingTopic] = React.useState<Topic>();
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
  const [deletingTopic, setDeletingTopic] = React.useState<Topic>();
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
  const handleAddModuleClick = () => {
    setEditingTopic(undefined);
    setShowTopicForm(true);
  };

  const handleEditModuleClick = (module: Module) => {
    const topic = topics.find((t) => t.topicId === module.topicId);
    if (topic) {
      setEditingTopic(topic);
      setShowTopicForm(true);
    }
  };

  const handleDeleteModuleClick = (module: Module) => {
    const topic = topics.find((t) => t.topicId === module.topicId);
    if (topic) {
      setDeletingTopic(topic);
      setDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingTopic?.topicId) return;

    try {
      await apiService.deleteTopic(deletingTopic.topicId);
      setDeleteModalOpen(false);
      setDeletingTopic(undefined);

      if (onModuleDeleted) {
        onModuleDeleted();
      }
      showAlert("Success", "Module deleted successfully", "success");
    } catch (error) {
      showAlert("Error", "Failed to delete module. Please try again.", "error");
    }
  };

  const handleAddLessonClick = () => {
    setShowMaterialForm(true);
  };

  const handleTopicFormClose = () => {
    setShowTopicForm(false);
    setEditingTopic(undefined);
  };

  const handleMaterialFormClose = () => {
    setShowMaterialForm(false);
    setSelectedTopicId(undefined);
  };

  const handleTopicCreated = () => {
    setShowTopicForm(false);
    setEditingTopic(undefined);
    onModuleCreated();
  };

  const handleTopicUpdated = () => {
    setShowTopicForm(false);
    setEditingTopic(undefined);
    if (onModuleUpdated) {
      onModuleUpdated();
    }
  };

  const handleMaterialCreated = () => {
    setShowMaterialForm(false);
    setSelectedTopicId(undefined);
    onMaterialCreated();
  };

  const handleLessonItemClick = (lessonId: string, materialId?: number) => {
    onLessonClick(lessonId, materialId);
  };

  const subjectId = courseId ? parseInt(courseId) : 1;

  return (
    <>
      <div className="module-list-container">
        <h2 className="aside-title">Course Structure</h2>
        <div className="aside-btn-group">
          <button className="aside-btn" onClick={handleAddModuleClick}>
            <span className="material-symbols-outlined">add</span>
            {editingTopic ? "Edit Module" : "Add Module"}
          </button>
          <button
            className="aside-btn"
            onClick={handleAddLessonClick}
            disabled={modules.length === 0 && topics.length === 0}
          >
            <span className="material-icons">add</span>
            Add Lesson
          </button>
        </div>

        <div className="module-list-content">
          {modules.map((module) => (
            <div key={module.id} className="module-group">
              <div className="module-header">
                <div
                  className="module-header-main"
                  onClick={() => {
                    onModuleToggle(module.id);
                    if (onModuleClick) {
                      onModuleClick(module);
                    }
                  }}
                >
                  <span className="material-symbols-outlined">
                    {module.isExpanded ? "expand_more" : "chevron_right"}
                  </span>
                  <span className="material-symbols-outlined">
                    {module.isExpanded ? "folder_open" : "folder"}
                  </span>
                  <span className="module-header-title">{module.title}</span>
                </div>
                <div className="module-actions">
                  <button
                    className="module-action-btn"
                    onClick={() => handleEditModuleClick(module)}
                    title="Edit module"
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="module-action-btn delete-btn"
                    onClick={() => handleDeleteModuleClick(module)}
                    title="Delete module"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>

              {module.isExpanded && (
                <ul className="module-content">
                  {module.lessons.map((lesson) => (
                    <ModuleItem
                      key={lesson.id}
                      lesson={lesson}
                      onClick={() =>
                        handleLessonItemClick(lesson.id, lesson.materialId)
                      }
                    />
                  ))}
                </ul>
              )}
            </div>
          ))}

          {modules.length === 0 && (
            <div className="empty-modules">
              <span className="material-icons">folder_open</span>
              <p>No modules yet. Create your first module to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Topic Form Modal */}
      <TopicForm
        isOpen={showTopicForm}
        onClose={handleTopicFormClose}
        onTopicCreated={editingTopic ? handleTopicUpdated : handleTopicCreated}
        defaultSubjectId={subjectId}
        editingTopic={editingTopic}
      />

      {/* Material Form Modal */}
      <MaterialForm
        isOpen={showMaterialForm}
        onClose={handleMaterialFormClose}
        onMaterialCreated={handleMaterialCreated}
        defaultTopicId={selectedTopicId || 0}
        topics={topics}
        courseId={courseId}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Module"
        message={`Are you sure you want to delete "${deletingTopic?.name}"? This action cannot be undone and all associated lessons and materials will be lost.`}
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

export default ModuleList;
