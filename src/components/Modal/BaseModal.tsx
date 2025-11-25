// components/BaseModal/BaseModal.tsx
import React from "react";
import "./BaseModal.css";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="base-modal-overlay" onClick={handleOverlayClick}>
      <div className={`base-modal-container base-modal-${size}`}>
        <div className="base-modal-header">
          <h2 className="base-modal-title">{title}</h2>
          <button
            className="base-modal-close-btn"
            onClick={onClose}
            type="button"
          >
            <span className="material-icons">close</span>
          </button>
        </div>
        <div className="base-modal-content">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
