import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Subject,
  Topic,
  LearningMaterial,
  Question,
} from "../../../types";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal";
import "./SubjectCard.css";
import { apiService } from "../../../services/apiService";
import { getRandomCourseImage } from "../../../images/data";
import AlertModal from "../../Modal/AlertModal/AlertModal";

interface SubjectCardProps {
  subject: Subject;
  onTopicCreated: () => void;
  onSubjectUpdated: () => void;
  onSubjectDeleted: () => void;
  canEdit: boolean;
  onEditSubject?: (subject: Subject) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onTopicCreated,
  onSubjectUpdated,
  onSubjectDeleted,
  canEdit,
  onEditSubject,
}) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
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
  // Gọi API để lấy tất cả dữ liệu
  useEffect(() => {
    const fetchSubjectData = async () => {
      if (!subject.subjectId) return;

      try {
        setLoading(true);

        // 1. Lấy danh sách topics
        const topicsData = await apiService.getTopicsBySubject(
          subject.subjectId
        );
        setTopics(topicsData);

        // 2. Lấy materials và questions cho từng topic
        const materialsPromises = topicsData.map((topic) =>
          topic.topicId ? apiService.getMaterialsByTopic(topic.topicId) : []
        );

        const questionsPromises = topicsData.map((topic) =>
          topic.topicId ? apiService.getQuestionsByTopic(topic.topicId) : []
        );

        const [materialsResults, questionsResults] = await Promise.all([
          Promise.all(materialsPromises),
          Promise.all(questionsPromises),
        ]);

        // 3. Gộp tất cả materials và questions
        const allMaterials = materialsResults.flat();
        const allQuestions = questionsResults.flat();

        setMaterials(allMaterials);
        setQuestions(allQuestions);
      } catch (error) {
        console.error("Error fetching subject data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, [subject.subjectId]);

  // Sử dụng useMemo để cache image URL
  const subjectImage = useMemo(() => {
    return getRandomCourseImage();
  }, [subject.subjectId]);

  const handleManageSubject = () => {
    navigate(`/teacher/course/${subject.subjectId}`);
  };

  const handleEditSubject = () => {
    if (onEditSubject) {
      onEditSubject(subject);
    }
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!subject.subjectId) return;

    try {
      await apiService.deleteSubject(subject.subjectId);
      onSubjectDeleted();
      showAlert("Success", "Subject deleted successfully", "success");
    } catch (error) {
      showAlert(
        "Error",
        "Failed to delete subject. Please try again.",
        "error"
      );
    }
  };

  // Calculate derived data for display
  const topicCount = topics.length;
  const questionCount = questions.length;
  const materialCount = materials.length;

  // Generate fallback placeholder image
  const fallbackImage = useMemo(() => {
    const colors = [
      "6366F1",
      "EF4444",
      "10B981",
      "F59E0B",
      "8B5CF6",
      "EC4899",
      "06B6D4",
      "84CC16",
      "F97316",
      "8B5CF6",
    ];
    const index = subject.subjectId ? subject.subjectId % colors.length : 0;
    return `https://placehold.co/400x160/${
      colors[index]
    }/FFFFFF?text=${encodeURIComponent(subject.name)}`;
  }, [subject.subjectId, subject.name]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = fallbackImage;
  };

  if (loading) {
    return (
      <div className="subject-card loading">
        <div className="loading-spinner">
          <span className="material-icons spin">refresh</span>
        </div>
        <p>Loading {subject.name}...</p>
      </div>
    );
  }

  return (
    <>
      <div className="subject-card">
        <img
          alt={`Cover image for ${subject.name}`}
          className="subject-card-image"
          src={subjectImage}
          onError={handleImageError}
        />
        <div className="subject-card-content">
          <div className="subject-card-header">
            <h3 className="subject-card-title">{subject.name}</h3>
            {canEdit && (
              <div className="subject-actions">
                <button
                  className="icon-btn"
                  onClick={handleEditSubject}
                  title="Edit subject"
                >
                  <span className="material-icons">edit</span>
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={handleDeleteClick}
                  title="Delete subject"
                >
                  <span className="material-icons">delete</span>
                </button>
              </div>
            )}
          </div>

          {subject.description && (
            <p className="subject-card-description">{subject.description}</p>
          )}

          <div className="subject-card-stats">
            <div className="stat-item">
              <span className="material-icons">topic</span>
              <span>{topicCount} Topics</span>
            </div>
            <div className="stat-item">
              <span className="material-icons">quiz</span>
              <span>{questionCount} Questions</span>
            </div>
            <div className="stat-item">
              <span className="material-icons">description</span>
              <span>{materialCount} Materials</span>
            </div>
          </div>

          <div className="subject-card-footer">
            <button
              className="manage-subject-btn"
              onClick={handleManageSubject}
            >
              <span className="material-icons">settings</span>
              Manage Subject
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Subject"
        message={`Are you sure you want to delete "${subject.name}"? This action cannot be undone and all associated topics, questions, and materials will be lost.`}
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

export default SubjectCard;
