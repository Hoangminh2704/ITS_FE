// components/SubjectsList/SubjectsList.tsx
import React from "react";
import type { Subject } from "../../types";
import "./SubjectList.css";
import SubjectCard from "./SubjectCard";

interface SubjectsListProps {
  subjects: Subject[];
  onTopicCreated: () => void;
  onSubjectUpdated: () => void; // Thêm prop này
  canEdit: boolean;
  emptyStateMessage?: string;
}

const SubjectsList: React.FC<SubjectsListProps> = ({
  subjects,
  onTopicCreated,
  onSubjectUpdated, // Nhận prop từ parent
  canEdit,
  emptyStateMessage = "No subjects available",
}) => {
  if (subjects.length === 0) {
    return (
      <div className="empty-state-large">
        <span className="material-icons">auto_stories</span>
        <h3>No subjects yet</h3>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="subjects-list">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.subjectId}
          subject={subject}
          onTopicCreated={onTopicCreated} // Truyền callback từ parent
          onSubjectUpdated={onSubjectUpdated} // Truyền callback từ parent
          canEdit={canEdit}
        />
      ))}
    </div>
  );
};

export default SubjectsList;
