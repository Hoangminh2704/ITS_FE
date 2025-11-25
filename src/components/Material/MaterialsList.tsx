// components/MaterialsList/MaterialsList.tsx
import React from "react";
import type { LearningMaterial } from "../../types";
import "./MaterialList.css";
import MaterialCard from "./MaterialCard";

interface MaterialsListProps {
  materials: LearningMaterial[];
  canEdit: boolean;
  onContentCreated: () => void;
  emptyStateMessage?: string;
}

const MaterialsList: React.FC<MaterialsListProps> = ({
  materials,
  canEdit,
  onContentCreated,
  emptyStateMessage = "No materials available",
}) => {
  if (materials.length === 0) {
    return (
      <div className="empty-state">
        <span className="material-icons">description</span>
        <p>{emptyStateMessage}</p>
      </div>
    );
  }

  return (
    <div className="materials-list">
      {materials.map((material) => (
        <MaterialCard
          key={material.materialId}
          material={material}
          canEdit={canEdit}
          onContentUpdated={onContentCreated}
        />
      ))}
    </div>
  );
};

export default MaterialsList;
