// StudentFeedback.tsx
import React, { useState } from "react";
import "./StudentFeedback.css";
import FeedbackHeader from "./FeedbackHeader/FeedbackHeader";
import FeedbackBody from "./FeedbackBody/FeedbackBody";
import FeedbackFooter from "./FeedbackFooter/FeedbackFooter";
import { apiService } from "../../services/apiService";
import type { FeedbackRequestDTO } from "../../types";

interface StudentFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
  subjectId?: number;
}

interface FeedbackData {
  overallRating: number;
  contentQuality: number;
  instructorGuidance: number;
  practicalApplication: number;
  thoughts: string;
}

const StudentFeedback: React.FC<StudentFeedbackProps> = ({
  isOpen,
  onClose,
  subjectId,
}) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    overallRating: 0,
    contentQuality: 25,
    instructorGuidance: 25,
    practicalApplication: 25,
    thoughts: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFeedbackSubmit = async () => {
    if (!subjectId) {
      alert("Subject ID is required");
      return;
    }

    if (feedbackData.overallRating === 0) {
      alert("Please provide an overall rating");
      return;
    }

    try {
      setIsSubmitting(true);

      const feedbackContent = `
Overall Rating: ${feedbackData.overallRating}/5
Content Quality: ${feedbackData.contentQuality}%
Instructor Guidance: ${feedbackData.instructorGuidance}%
Practical Application: ${feedbackData.practicalApplication}%

Additional Thoughts:
${feedbackData.thoughts || "No additional comments"}
      `.trim();

      const feedbackRequest: FeedbackRequestDTO = {
        content: feedbackContent,
        subjectId: subjectId,
      };

      await apiService.createFeedback(feedbackRequest);

      alert("Feedback submitted successfully!");
      onClose();

      // Reset form
      setFeedbackData({
        overallRating: 0,
        contentQuality: 25,
        instructorGuidance: 25,
        practicalApplication: 25,
        thoughts: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFeedbackData = (updates: Partial<FeedbackData>) => {
    setFeedbackData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <FeedbackHeader onClose={onClose} />
        <FeedbackBody
          feedbackData={feedbackData}
          onFeedbackChange={updateFeedbackData}
        />
        <FeedbackFooter
          onClose={onClose}
          onSubmit={handleFeedbackSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default StudentFeedback;
