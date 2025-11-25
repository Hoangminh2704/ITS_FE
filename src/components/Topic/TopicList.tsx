// components/TopicsList/TopicsList.tsx
import React from "react";
import type { Topic } from "../../types";
import "./TopicList.css";
import TopicCard from "./TopicCard";

interface TopicsListProps {
  topics: Topic[];
  onContentCreated: () => void;
  onTopicUpdated: () => void; // Add this prop
  canEdit: boolean;
  loading?: boolean;
  emptyStateMessage?: string;
}

const TopicsList: React.FC<TopicsListProps> = ({
  topics,
  onContentCreated,
  onTopicUpdated, // Receive the new prop
  canEdit,
  loading = false,
  emptyStateMessage = "No topics available",
}) => {
  if (loading) {
    return (
      <div className="loading-state">
        <span className="material-icons spin">refresh</span>
        <p>Loading topics...</p>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="empty-state">
        <span className="material-icons">folder_open</span>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="topics-list">
      {topics.map((topic) => (
        <TopicCard
          key={topic.topicId}
          topic={topic}
          onContentCreated={onContentCreated}
          onTopicUpdated={onTopicUpdated} // Pass it down to TopicCard
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default TopicsList;
