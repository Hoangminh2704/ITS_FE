// components/UserTableRow.tsx
import React from "react";
import type { UserDetail } from "../../types";

interface UserTableRowProps {
  user: UserDetail;
  onEdit: (user: UserDetail) => void;
  onDelete: (user: UserDetail) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  onEdit,
  onDelete,
}) => {
  const getRoleClass = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "role-badge role-admin";
      case "teacher":
        return "role-badge role-teacher";
      case "student":
        return "role-badge role-student";
      default:
        return "role-badge";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "shield";
      case "teacher":
        return "school";
      case "student":
        return "face";
      default:
        return "person";
    }
  };

  const getAvatarUrl = (name: string, email: string) => {
    // Tạo avatar placeholder dựa trên tên và email
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random`;
  };

  return (
    <tr className="table-row" key={user.id}>
      <td className="p-4">
        <input
          title={`Select ${user.fullname}`}
          className="table-checkbox"
          type="checkbox"
        />
      </td>
      <td>
        <div className="user-cell">
          <img
            alt={`Avatar of ${user.fullname}`}
            className="user-avatar"
            src={getAvatarUrl(user.fullname, user.email)}
          />
          <div>
            <div className="user-name">{user.fullname}</div>
            <div className="user-id">ID: #{user.id}</div>
          </div>
        </div>
      </td>
      <td className="user-email">{user.email}</td>
      <td>
        <span className={getRoleClass(user.role.role_name)}>
          <span className="material-icons role-icon">
            {getRoleIcon(user.role.role_name)}
          </span>
          {user.role.role_name}
        </span>
      </td>
      <td className="user-date">
        {new Date(user.created_at).toLocaleDateString("vi-VN")}
      </td>
      <td>
        <div className="action-buttons">
          <button className="action-btn-edit" onClick={() => onEdit(user)}>
            <span className="material-icons">edit</span>
          </button>
          <button className="action-btn-delete" onClick={() => onDelete(user)}>
            <span className="material-icons">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;
