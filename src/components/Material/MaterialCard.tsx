// components/MaterialCard/MaterialCard.tsx
import React, { useState } from "react";
import "./MaterialCard.css";
import type { LearningMaterial, LearningMaterialRequestDTO } from "../../types";
import { apiService } from "../../services/apiService";
import MaterialForm from "../Forms/MaterialForm";

interface MaterialCardProps {
  material: LearningMaterial;
  canEdit: boolean;
  onContentUpdated: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  material,
  canEdit,
  onContentUpdated,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getMaterialTypeText = (type?: string) => {
    switch (type) {
      case "pdf":
        return "PDF Document";
      case "video":
        return "Video";
      case "article":
        return "Article";
      case "slide":
        return "Presentation";
      default:
        return "Material";
    }
  };

  const getMaterialTypeIcon = (type?: string) => {
    switch (type) {
      case "pdf":
        return "picture_as_pdf";
      case "video":
        return "videocam";
      case "article":
        return "article";
      case "slide":
        return "slideshow";
      default:
        return "description";
    }
  };

  const getMaterialTypeColor = (type?: string) => {
    switch (type) {
      case "pdf":
        return "#ef4444";
      case "video":
        return "#3b82f6";
      case "article":
        return "#10b981";
      case "slide":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return null;
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleDelete = async () => {
    if (
      !material.materialId ||
      !confirm("Are you sure you want to delete this material?")
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await apiService.deleteLearningMaterial(material.materialId);
      onContentUpdated();
    } catch (error) {
      console.error("Error deleting material:", error);
      alert("Failed to delete material");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleMaterialUpdated = () => {
    setShowEditForm(false);
    onContentUpdated();
  };

  return (
    <div className="material-card">
      {/* Header */}
      <div
        className="material-card-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="material-info">
          <h4 className="material-title">{material.title}</h4>
          <div className="material-meta">
            <div
              className="material-type-badge"
              style={{
                backgroundColor: getMaterialTypeColor(material.type),
              }}
            >
              <span className="material-icons">
                {getMaterialTypeIcon(material.type)}
              </span>
              {getMaterialTypeText(material.type)}
            </div>
            {material.duration && (
              <span className="duration-indicator">
                <span className="material-icons">schedule</span>
                {formatDuration(material.duration)}
              </span>
            )}
          </div>
        </div>
        <div className="material-actions">
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
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="material-content">
          <div className="content-section">
            <h5 className="section-subtitle">Material Details</h5>
            <div className="material-details">
              <div className="detail-row">
                <label>Title:</label>
                <p className="material-title-text">{material.title}</p>
              </div>

              {material.content && (
                <div className="detail-row">
                  <label>Content:</label>
                  <div className="material-content-text">
                    {material.content}
                  </div>
                </div>
              )}

              <div className="detail-row">
                <label>Type:</label>
                <span className="material-type">
                  {getMaterialTypeText(material.type)}
                </span>
              </div>

              {material.duration && (
                <div className="detail-row">
                  <label>Duration:</label>
                  <span className="material-duration">
                    {formatDuration(material.duration)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {canEdit && (
            <div className="action-section">
              <h5 className="section-subtitle">Actions</h5>
              <div className="material-actions-buttons">
                <button className="edit-btn" onClick={handleEdit}>
                  <span className="material-icons">edit</span>
                  Edit Material
                </button>
                <button
                  className="delete-btn"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <span className="material-icons">
                    {isDeleting ? "hourglass_empty" : "delete"}
                  </span>
                  {isDeleting ? "Deleting..." : "Delete Material"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit Material Form Modal */}
      {canEdit && showEditForm && (
        <MaterialForm
          isOpen={showEditForm}
          onClose={() => setShowEditForm(false)}
          onMaterialCreated={handleMaterialUpdated}
          defaultTopicId={material.topicId}
          editingMaterial={material}
        />
      )}
    </div>
  );
};

export default MaterialCard;
