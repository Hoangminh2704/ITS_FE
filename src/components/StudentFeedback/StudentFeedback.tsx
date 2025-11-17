import React from "react";
import "./StudentFeedback.css";

interface StudentFeedbackProps {
  isOpen: boolean;
  onClose: () => void;
}

const StudentFeedback: React.FC<StudentFeedbackProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="feedback-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
        <div className="feedback-header">
          <div>
            <h1 className="feedback-title">Rate This Course</h1>
            <p className="feedback-subtitle">
              Your feedback helps us improve the learning experience
            </p>
          </div>
          <button className="feedback-close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="feedback-body">
          <div className="overall-rating-section">
            <h2 className="section-label">Overall Rating</h2>
            <div className="star-rating">
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
              <span className="material-symbols-outlined">star</span>
            </div>
            <p className="rating-hint">Click to rate</p>
          </div>

          <div className="criteria-section">
            <div className="criteria-item">
              <label className="criteria-label" htmlFor="content-quality">
                Content Quality
              </label>
              <div className="criteria-control">
                <input
                  className="criteria-slider"
                  id="content-quality"
                  max="100"
                  min="0"
                  type="range"
                  defaultValue="25"
                />
                <div className="criteria-stars">
                  <span className="material-symbols-outlined star-filled">
                    star
                  </span>
                  <span className="material-symbols-outlined star-filled">
                    star
                  </span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
              </div>
            </div>

            <div className="criteria-item">
              <label className="criteria-label" htmlFor="instructor-guidance">
                Instructor Guidance
              </label>
              <div className="criteria-control">
                <input
                  className="criteria-slider"
                  id="instructor-guidance"
                  max="100"
                  min="0"
                  type="range"
                  defaultValue="25"
                />
                <div className="criteria-stars">
                  <span className="material-symbols-outlined star-filled">
                    star
                  </span>
                  <span className="material-symbols-outlined star-filled">
                    star
                  </span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
              </div>
            </div>

            <div className="criteria-item">
              <label className="criteria-label" htmlFor="practical-application">
                Practical Application
              </label>
              <div className="criteria-control">
                <input
                  className="criteria-slider"
                  id="practical-application"
                  max="100"
                  min="0"
                  type="range"
                  defaultValue="25"
                />
                <div className="criteria-stars">
                  <span className="material-symbols-outlined star-filled">
                    star
                  </span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
              </div>
            </div>
          </div>

          <div className="thoughts-section">
            <label className="thoughts-label" htmlFor="thoughts">
              Share Your Thoughts
            </label>
            <textarea
              className="thoughts-textarea"
              id="thoughts"
              placeholder="Tell us more about your experience with this course..."
              rows={4}
            ></textarea>
            <p className="thoughts-hint">
              Your feedback is valuable and helps us improve
            </p>
          </div>
        </div>

        <div className="feedback-footer">
          <button className="footer-btn-secondary" onClick={onClose}>
            Maybe Later
          </button>
          <button className="footer-btn-primary">
            Submit Feedback
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
