// components/Feedback/FeedbackPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import type { FeedbackResponseDTO, Subject } from "../../types";

import "./FeedbackPage.css";
import FeedbackList from "./FeedbackList/FeedbackList";

const FeedbackPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState<FeedbackResponseDTO[]>([]);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (courseId) {
      fetchFeedbackData();
    }
  }, [courseId]);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      setError(null);
      const numericCourseId = parseInt(courseId!);

      // Fetch subject details using courseId as subjectId
      const subjectData = await apiService.getSubjectWithTopics(
        numericCourseId
      );
      setSubject(subjectData);

      // Fetch feedbacks for this subject
      const feedbacksData = await apiService.getFeedbacksBySubject(
        numericCourseId
      );
      setFeedbacks(feedbacksData);
    } catch (err) {
      setError("Failed to load feedback data");
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCourse = () => {
    navigate(`/teacher/course/${courseId}`);
  };

  const calculateAverageRatings = () => {
    if (feedbacks.length === 0) return null;

    let totalOverall = 0;
    let totalContentQuality = 0;
    let totalInstructorGuidance = 0;
    let totalPracticalApplication = 0;
    let count = 0;

    feedbacks.forEach((feedback) => {
      const content = feedback.content;
      const lines = content.split("\n").filter((line) => line.trim());

      lines.forEach((line) => {
        if (line.includes("Overall Rating:")) {
          const match = line.match(/(\d+)\/\d+/);
          if (match) {
            totalOverall += parseInt(match[1]);
            count++;
          }
        } else if (line.includes("Content Quality:")) {
          const match = line.match(/(\d+)%/);
          if (match) totalContentQuality += parseInt(match[1]);
        } else if (line.includes("Instructor Guidance:")) {
          const match = line.match(/(\d+)%/);
          if (match) totalInstructorGuidance += parseInt(match[1]);
        } else if (line.includes("Practical Application:")) {
          const match = line.match(/(\d+)%/);
          if (match) totalPracticalApplication += parseInt(match[1]);
        }
      });
    });

    return {
      overall: count > 0 ? (totalOverall / count).toFixed(1) : 0,
      contentQuality:
        feedbacks.length > 0
          ? Math.round(totalContentQuality / feedbacks.length)
          : 0,
      instructorGuidance:
        feedbacks.length > 0
          ? Math.round(totalInstructorGuidance / feedbacks.length)
          : 0,
      practicalApplication:
        feedbacks.length > 0
          ? Math.round(totalPracticalApplication / feedbacks.length)
          : 0,
    };
  };

  const averageRatings = calculateAverageRatings();

  if (loading) {
    return (
      <div className="feedback-body">
        <div className="feedback-layout">
          <InstructorHeader courseId={courseId} activeTab="Feedback" />
          <main className="feedback-main">
            <div className="loading-state">
              <span className="material-symbols-outlined loading-spinner">
                refresh
              </span>
              <p>Loading feedbacks...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feedback-body">
        <div className="feedback-layout">
          <InstructorHeader courseId={courseId} activeTab="Feedback" />
          <main className="feedback-main">
            <div className="error-state">
              <span className="material-symbols-outlined">error</span>
              <h2>Error Loading Feedbacks</h2>
              <p>{error}</p>
              <button className="btn btn-primary" onClick={fetchFeedbackData}>
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-body">
      <div className="feedback-layout">
        <InstructorHeader courseId={courseId} activeTab="Feedback" />

        <main className="feedback-main">
          <div className="page-title-container">
            <button
              className="page-title"
              onClick={handleBackToCourse}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Feedback for {subject?.name || "Course"}
            </button>
            <p className="page-subtitle">
              Student feedback and reviews for this course
            </p>
          </div>

          <div className="feedback-stats-card">
            <div className="stat-items">
              <span className="stat-number">{feedbacks.length}</span>
              <span className="stat-label">Total Feedbacks</span>
            </div>
            {averageRatings && (
              <>
                <div className="stat-items">
                  <span className="stat-number">
                    {averageRatings.overall}/5
                  </span>
                  <span className="stat-label">Avg Rating</span>
                </div>
                <div className="stat-items">
                  <span className="stat-number">
                    {averageRatings.contentQuality}%
                  </span>
                  <span className="stat-label">Content Quality</span>
                </div>
              </>
            )}
          </div>

          <FeedbackList feedbacks={feedbacks} onRefresh={fetchFeedbackData} />
        </main>
      </div>
    </div>
  );
};

export default FeedbackPage;
