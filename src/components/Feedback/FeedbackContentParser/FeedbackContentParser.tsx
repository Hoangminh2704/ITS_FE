// components/Feedback/FeedbackContentParser.tsx
import React from "react";
import "./FeedbackContentParser.css";

interface FeedbackContentParserProps {
  content: string;
  compact?: boolean;
}

const FeedbackContentParser: React.FC<FeedbackContentParserProps> = ({
  content,
  compact = false,
}) => {
  const parseFeedbackContent = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    const parsedData: {
      overallRating?: string;
      contentQuality?: string;
      instructorGuidance?: string;
      practicalApplication?: string;
      additionalThoughts?: string;
    } = {};

    let currentSection = "";

    lines.forEach((line) => {
      if (line.startsWith("Overall Rating:")) {
        currentSection = "overallRating";
        parsedData.overallRating = line.replace("Overall Rating:", "").trim();
      } else if (line.startsWith("Content Quality:")) {
        currentSection = "contentQuality";
        parsedData.contentQuality = line.replace("Content Quality:", "").trim();
      } else if (line.startsWith("Instructor Guidance:")) {
        currentSection = "instructorGuidance";
        parsedData.instructorGuidance = line
          .replace("Instructor Guidance:", "")
          .trim();
      } else if (line.startsWith("Practical Application:")) {
        currentSection = "practicalApplication";
        parsedData.practicalApplication = line
          .replace("Practical Application:", "")
          .trim();
      } else if (line.startsWith("Additional Thoughts:")) {
        currentSection = "additionalThoughts";
        parsedData.additionalThoughts = line
          .replace("Additional Thoughts:", "")
          .trim();
      } else if (currentSection === "additionalThoughts" && line.trim()) {
        parsedData.additionalThoughts =
          (parsedData.additionalThoughts || "") + " " + line.trim();
      }
    });

    if (parsedData.additionalThoughts) {
      parsedData.additionalThoughts = parsedData.additionalThoughts.trim();
    }

    if (Object.keys(parsedData).length === 0) {
      return null;
    }

    return parsedData;
  };

  const renderCompactRating = (rating: string) => {
    const match = rating.match(/(\d+)\/\d+/);
    if (!match) return <span className="compact-rating-text">{rating}</span>;

    const score = parseInt(match[1]);

    return (
      <div className="compact-rating">
        <div className="compact-stars">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className={`compact-star ${
                i < score ? "star-filled" : "star-empty"
              }`}
            >
              {i < score ? "★" : "☆"}
            </span>
          ))}
        </div>
        <span className="compact-rating-text">{rating}</span>
      </div>
    );
  };

  const renderCompactMetrics = (parsedData: any) => {
    const metrics = [
      { value: parsedData.contentQuality, label: "Content" },
      { value: parsedData.instructorGuidance, label: "Instructor" },
      { value: parsedData.practicalApplication, label: "Practical" },
    ].filter((metric) => metric.value);

    if (metrics.length === 0) return null;

    return (
      <div className="compact-metrics">
        {metrics.map((metric, index) => {
          const match = metric.value?.match(/(\d+)%/);
          const value = match ? parseInt(match[1]) : 0;

          return (
            <div key={index} className="compact-metric">
              <span className="compact-metric-label">{metric.label}</span>
              <span className="compact-metric-value">{metric.value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderDetailedView = (parsedData: any) => {
    const renderRatingStars = (rating: string) => {
      const match = rating.match(/(\d+)\/\d+/);
      if (!match) return <span className="rating-text">{rating}</span>;

      const score = parseInt(match[1]);
      const maxScore = 5;

      return (
        <div className="rating-display">
          <div className="stars-container">
            {Array.from({ length: maxScore }, (_, i) => (
              <span
                key={i}
                className={`star ${i < score ? "star-filled" : "star-empty"}`}
              >
                {i < score ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span className="rating-text">{rating}</span>
        </div>
      );
    };

    const renderPercentageMetric = (percentage: string, label: string) => {
      const match = percentage.match(/(\d+)%/);
      const value = match ? parseInt(match[1]) : 0;

      const getPercentageColor = (value: number) => {
        if (value >= 80) return "high";
        if (value >= 60) return "medium";
        return "low";
      };

      return (
        <div className="metric-item">
          <div className="metric-header">
            <span className="metric-label">{label}</span>
            <span className={`metric-value ${getPercentageColor(value)}`}>
              {percentage}
            </span>
          </div>
          <div className="metric-bar">
            <div
              className={`metric-fill ${getPercentageColor(value)}`}
              style={{ width: `${value}%` }}
            >
              <span className="metric-fill-text">{value}%</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="feedback-content-detailed">
        {parsedData.overallRating && (
          <div className="feedback-section rating-section">
            <div className="section-header">
              <h4 className="section-title">
                <span className="material-symbols-outlined section-icon">
                  star
                </span>
                Overall Rating
              </h4>
            </div>
            <div className="section-content">
              {renderRatingStars(parsedData.overallRating)}
            </div>
          </div>
        )}

        {(parsedData.contentQuality ||
          parsedData.instructorGuidance ||
          parsedData.practicalApplication) && (
          <div className="feedback-section metrics-section">
            <div className="section-header">
              <h4 className="section-title">
                <span className="material-symbols-outlined section-icon">
                  analytics
                </span>
                Detailed Metrics
              </h4>
            </div>
            <div className="section-content">
              <div className="metrics-grid">
                {parsedData.contentQuality &&
                  renderPercentageMetric(
                    parsedData.contentQuality,
                    "Content Quality"
                  )}

                {parsedData.instructorGuidance &&
                  renderPercentageMetric(
                    parsedData.instructorGuidance,
                    "Instructor Guidance"
                  )}

                {parsedData.practicalApplication &&
                  renderPercentageMetric(
                    parsedData.practicalApplication,
                    "Practical Application"
                  )}
              </div>
            </div>
          </div>
        )}

        {parsedData.additionalThoughts && (
          <div className="feedback-section thoughts-section">
            <div className="section-header">
              <h4 className="section-title">
                <span className="material-symbols-outlined section-icon">
                  chat
                </span>
                Additional Thoughts
              </h4>
            </div>
            <div className="section-content">
              <div className="thoughts-content">
                <p>{parsedData.additionalThoughts}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const parsedContent = parseFeedbackContent(content);

  if (!parsedContent) {
    return (
      <div className="feedback-content-simple">
        <p>{content}</p>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="feedback-content-compact">
        {parsedContent.overallRating &&
          renderCompactRating(parsedContent.overallRating)}
        {renderCompactMetrics(parsedContent)}
        {parsedContent.additionalThoughts && (
          <div className="compact-thoughts">
            <span className="material-symbols-outlined">format_quote</span>
            <span className="compact-thoughts-text">
              {parsedContent.additionalThoughts.length > 50
                ? parsedContent.additionalThoughts.substring(0, 50) + "..."
                : parsedContent.additionalThoughts}
            </span>
          </div>
        )}
      </div>
    );
  }

  return renderDetailedView(parsedContent);
};

export default FeedbackContentParser;
