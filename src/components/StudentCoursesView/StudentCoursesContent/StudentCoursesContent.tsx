// StudentCoursesContent.tsx
import React, { useState, useEffect } from "react";
import "./StudentCoursesContent.css";
import type { StudentCoursesContentProps } from "../../../types/studentCoursesTypes";
import type {
  LearningMaterialResponseDTO,
  FileDownloadResponse,
} from "../../../types";
import { apiService } from "../../../services/apiService";

interface ExtendedStudentCoursesContentProps
  extends StudentCoursesContentProps {
  activeLesson?: {
    id: string;
    title: string;
    materialId?: number;
  };
}

const StudentCoursesContent: React.FC<ExtendedStudentCoursesContentProps> = ({
  onFeedbackClick,
  activeLesson,
}) => {
  const [activeMaterial, setActiveMaterial] =
    useState<LearningMaterialResponseDTO>();
  const [fileUrl, setFileUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);

  const fetchMaterialData = async (materialId?: number) => {
    if (!materialId) {
      setActiveMaterial(undefined);
      setFileUrl("");
      return;
    }

    try {
      setLoading(true);
      const material: LearningMaterialResponseDTO =
        await apiService.getMaterialById(materialId);
      setActiveMaterial(material);

      // Fetch file download URL if material has a file
      if (material.fileName) {
        await fetchFileUrl(materialId);
      }
    } catch (error) {
      console.error("Error fetching material:", error);
      setActiveMaterial(undefined);
      setFileUrl("");
    } finally {
      setLoading(false);
    }
  };

  const fetchFileUrl = async (materialId: number) => {
    try {
      setFileLoading(true);
      const fileResponse: FileDownloadResponse =
        await apiService.getFileDownloadUrl(materialId);
      setFileUrl(fileResponse.downloadUrl || "");
    } catch (error) {
      console.error("Error fetching file URL:", error);
      setFileUrl("");
    } finally {
      setFileLoading(false);
    }
  };

  const handleDownloadFile = async () => {
    if (!activeMaterial?.materialId) return;

    try {
      const fileResponse: FileDownloadResponse =
        await apiService.getFileDownloadUrl(activeMaterial.materialId);

      if (fileResponse.downloadUrl) {
        // Tạo link tải xuống
        const link = document.createElement("a");
        link.href = fileResponse.downloadUrl;
        link.download = activeMaterial.fileName || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  useEffect(() => {
    if (activeLesson?.materialId) {
      fetchMaterialData(activeLesson.materialId);
    } else {
      setActiveMaterial(undefined);
      setFileUrl("");
    }
  }, [activeLesson]);

  if (loading) {
    return (
      <section className="scv-content">
        <div className="loading-content">
          <span className="material-icons-outlined loading-spinner">
            refresh
          </span>
          <span>Loading lesson content...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="scv-content">
      {/* File Display Section - Similar to FileUploadSection but read-only */}
      {activeMaterial?.fileName && (
        <div className="file-display-section">
          <h3 className="editor-section-title">Learning Material</h3>

          <div className="current-file-info">
            <div className="file-info-header">
              <span className="material-symbols-outlined">description</span>
              <span>Current File</span>
            </div>
            <div className="file-details">
              <div className="file-name">{activeMaterial.fileName}</div>
              {activeMaterial.fileSize && (
                <div className="file-size">
                  {(activeMaterial.fileSize / 1024 / 1024).toFixed(2)} MB
                </div>
              )}
              <div className="file-type">
                Type: {activeMaterial.type || "Unknown"}
              </div>
            </div>
            <div className="file-actions">
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleDownloadFile}
                disabled={!activeMaterial.fileName}
              >
                <span className="material-symbols-outlined">download</span>
                Download File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Default content when no material */}
      {!activeMaterial?.fileName && (
        <div className="scv-video-wrapper">
          <img
            alt={`Lesson content for ${
              activeLesson?.title || "current lesson"
            }`}
            className="scv-video"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPG3nIEZolvifVkXVAYEQvvcmfkWsS7AWvRupHKhZspfRW6w01SSOGdMpVBbj1OtBQcPdISOPB4dEJUactNOmSyhz7VNnCWhx1r9y_XB3lmq3GhBsdIUSin3Ki97hcd212LO0MyaQVRWALXzyXZsxH3aReWiNLfgJgMQkEMd6dJfLk2GxP8KzJ2vFwZBtc9lJZVun0_73KllhJIFsf0RwknWM6sPhZvVQwUbU64kBoycZH6widKZwlQB5yGhv7niYtqrFecgh8Rtbo"
          />
        </div>
      )}

      <div className="scv-tabs">
        <nav className="scv-tab-nav">
          <a className="scv-tab scv-tab-active" href="#">
            Overview
          </a>
          <a className="scv-tab" href="#" onClick={onFeedbackClick}>
            Feedback
          </a>
        </nav>
      </div>

      <div className="scv-tab-content">
        <article className="scv-article">
          <h2>{activeLesson?.title || "HTML Fundamentals"}</h2>
          {/* <p className="scv-subtitle">{activeMaterial?.content}</p> */}

          {activeMaterial?.content ? (
            <div dangerouslySetInnerHTML={{ __html: activeMaterial.content }} />
          ) : (
            <>
              <p>
                In this lesson, you'll learn the fundamental concepts of HTML
                (HyperText Markup Language), which forms the backbone of every
                website on the internet. HTML provides the structure and
                semantic meaning to web content.
              </p>
              <h3>What You'll Learn</h3>
              <ul className="scv-checklist">
                <li>
                  <span className="material-icons-outlined scv-check-icon">
                    check
                  </span>
                  <span>Understanding HTML document structure</span>
                </li>
                <li>
                  <span className="material-icons-outlined scv-check-icon">
                    check
                  </span>
                  <span>Working with essential HTML elements</span>
                </li>
                <li>
                  <span className="material-icons-outlined scv-check-icon">
                    check
                  </span>
                  <span>Creating semantic markup for better accessibility</span>
                </li>
                <li>
                  <span className="material-icons-outlined scv-check-icon">
                    check
                  </span>
                  <span>Best practices for clean, maintainable code</span>
                </li>
              </ul>
              <h3>Key Concepts</h3>
              <p>
                HTML uses a system of tags to define different types of content.
                Each tag serves a specific purpose and helps browsers understand
                how to display and structure the content. We'll explore the most
                commonly used tags and learn when and how to use them
                effectively.
              </p>
            </>
          )}
        </article>
      </div>
    </section>
  );
};

export default StudentCoursesContent;
