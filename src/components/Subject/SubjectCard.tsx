// components/SubjectCard/SubjectCard.tsx
import React, { useState, useEffect } from "react";
import "./SubjectCard.css";
import type { Subject, Topic } from "../../types";
import { apiService } from "../../services/apiService";
import TopicForm from "../Forms/TopicForm";
import SubjectForm from "../Forms/SubjectForm";
import ConfirmModal from "../Modal/ConfirmModal";
import TopicList from "../Topic/TopicList";

interface SubjectCardProps {
  subject: Subject;
  onTopicCreated: () => void;
  onSubjectUpdated: () => void; // Thêm prop này
  canEdit: boolean;
}

const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  onTopicCreated,
  onSubjectUpdated,
  canEdit,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      if (isExpanded && subject.subjectId) {
        setLoading(true);
        try {
          const topicsData = await apiService.getTopicsBySubject(
            subject.subjectId
          );
          setTopics(topicsData);
        } catch (error) {
          console.error("Error fetching topics:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTopics();
  }, [isExpanded, subject.subjectId]);

  const handleAddTopic = () => {
    setShowTopicForm(true);
  };

  const handleEditSubject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowSubjectForm(true);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await apiService.deleteSubject(subject.subjectId!);
      onSubjectUpdated();
    } catch (error) {
      console.error("Error deleting subject:", error);
      alert("Failed to delete subject");
    }
  };

  const handleTopicCreated = () => {
    setShowTopicForm(false);
    onTopicCreated();
    // Refresh topics list
    if (subject.subjectId) {
      apiService.getTopicsBySubject(subject.subjectId).then(setTopics);
    }
  };

  const handleSubjectUpdated = () => {
    setShowSubjectForm(false);
    onSubjectUpdated();
  };

  const handleContentCreated = () => {
    // Refresh topics list when questions or materials are created
    if (subject.subjectId) {
      apiService.getTopicsBySubject(subject.subjectId).then(setTopics);
    }
  };

  const getEmptyStateMessage = () => {
    return canEdit
      ? "No topics yet. Add your first topic!"
      : "No topics available";
  };
  const handleTopicUpdated = () => {
    // Refresh topics list when a topic is updated or deleted
    if (subject.subjectId) {
      apiService.getTopicsBySubject(subject.subjectId).then(setTopics);
    }
    onTopicCreated(); // Also notify parent if needed
  };

  return (
    <div className="subject-card">
      <div
        className="subject-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="subject-info">
          <h3 className="subject-name">{subject.name}</h3>
          {subject.description && (
            <p className="subject-description">{subject.description}</p>
          )}
        </div>
        <div className="subject-actions">
          <button
            className="expand-btn"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <span className="material-icons">
              {isExpanded ? "expand_less" : "expand_more"}
            </span>
          </button>
          {canEdit && (
            <button
              className="add-topic-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddTopic();
              }}
            >
              <span className="material-icons">add</span>
              Add Topic
            </button>
          )}
          {canEdit && (
            <div className="subject-header-actions">
              <button
                className="icon-btn edit-btn"
                onClick={handleEditSubject}
                title="Edit subject"
              >
                <span className="material-icons">edit</span>
                Edit
              </button>
              <button
                className="icon-btn delete-btn"
                onClick={handleDeleteClick}
                title="Delete subject"
              >
                <span className="material-icons">delete</span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="subject-content">
          <div className="topics-section">
            <h4 className="section-title">Topics</h4>
            <TopicList
              topics={topics}
              onContentCreated={handleContentCreated}
              onTopicUpdated={handleTopicUpdated}
              canEdit={canEdit}
              loading={loading}
              emptyStateMessage={getEmptyStateMessage()}
            />
          </div>
        </div>
      )}

      {/* Topic Form Modal - chỉ hiển thị nếu có quyền edit */}
      {canEdit && (
        <>
          <TopicForm
            isOpen={showTopicForm}
            onClose={() => setShowTopicForm(false)}
            onTopicCreated={handleTopicCreated}
            defaultSubjectId={subject.subjectId!}
          />

          <SubjectForm
            isOpen={showSubjectForm}
            onClose={() => setShowSubjectForm(false)}
            onSubjectCreated={handleSubjectUpdated}
            editingSubject={subject}
          />
          <ConfirmModal
            isOpen={showDeleteConfirm}
            onClose={() => setShowDeleteConfirm(false)}
            onConfirm={handleDeleteConfirm}
            title="Delete Subject"
            message={`Are you sure you want to delete "${subject.name}"? This action cannot be undone and will also delete all topics, questions, and materials in this subject.`}
            confirmText="Delete"
            type="danger"
          />
        </>
      )}
    </div>
  );
};

export default SubjectCard;
