// components/Modal/AlertModal.tsx
import React from "react";
import BaseModal from "../BaseModal/BaseModal";
import "./AlertModal.css";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info";
  confirmText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
  cancelText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  onConfirm,
  showCancel = false,
  cancelText = "Cancel",
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      case "info":
        return "info";
      default:
        return "info";
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className={`alert-modal alert-${type}`}>
        <div className="alert-icon">
          <span className="material-symbols-outlined">{getIcon()}</span>
        </div>
        <div className="alert-message">{message}</div>
        <div className="alert-actions">
          {showCancel && (
            <button className="alert-btn alert-btn-secondary" onClick={onClose}>
              {cancelText}
            </button>
          )}
          <button
            className="alert-btn alert-btn-primary"
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default AlertModal;
