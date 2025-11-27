import React from "react";
import type { Subject } from "../../../types";
import "./SubjectList.css";
import SubjectCard from "../SubjectCard/SubjectCard";

interface SubjectsListProps {
  subjects: Subject[];
  onTopicCreated: () => void;
  onSubjectUpdated: () => void;
  onSubjectDeleted: () => void;
  canEdit: boolean;
  emptyStateMessage?: string;
  onEditSubject?: (subject: Subject) => void;
}

const SubjectsList: React.FC<SubjectsListProps> = ({
  subjects,
  onTopicCreated,
  onSubjectUpdated,
  onSubjectDeleted,
  canEdit,
  emptyStateMessage = "No subjects available",
  onEditSubject,
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
    <div className="subjects-grid">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.subjectId}
          subject={subject}
          onTopicCreated={onTopicCreated}
          onSubjectUpdated={onSubjectUpdated}
          onSubjectDeleted={onSubjectDeleted}
          canEdit={canEdit}
          onEditSubject={onEditSubject}
        />
      ))}
    </div>
  );
};

export default SubjectsList;
