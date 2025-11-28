// components/UserTableWrapper.tsx
import React, { useState } from "react";
import UserTableRow from "./UserTableRow";
import type { UserDetail } from "../../types";

interface UserTableWrapperProps {
  users: UserDetail[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  roleFilter: string;
  onEdit: (user: UserDetail) => void;
  onDelete: (user: UserDetail) => void;
  onRetry: () => void;
}

const UserTableWrapper: React.FC<UserTableWrapperProps> = ({
  users,
  loading,
  error,
  searchQuery,
  roleFilter,
  onEdit,
  onDelete,
  onRetry,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesRole = true;
    if (roleFilter !== "All Roles") {
      const userRole = user.role.role_name.toLowerCase();
      const filterRole = roleFilter.toLowerCase();
      matchesRole = userRole === filterRole;
    }

    return matchesSearch && matchesRole;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    pages.push(
      <li key="prev">
        <button
          className={`pagination-arrow ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="material-icons">chevron_left</span>
        </button>
      </li>
    );

    if (startPage > 1) {
      pages.push(
        <li key={1}>
          <button
            className="pagination-page"
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="ellipsis-start">
            <span className="pagination-ellipsis">...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i}>
          <button
            className={`pagination-page ${currentPage === i ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="ellipsis-end">
            <span className="pagination-ellipsis">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages}>
          <button
            className="pagination-page"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </li>
      );
    }

    pages.push(
      <li key="next">
        <button
          className={`pagination-arrow ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
        >
          <span className="material-icons">chevron_right</span>
        </button>
      </li>
    );

    return pages;
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter]);

  if (loading) {
    return (
      <div className="table-wrapper">
        <div className="loading-state">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-wrapper">
        <div className="error-state">
          Error: {error}
          <button onClick={onRetry} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead className="table-header">
          <tr>
            <th className="p-4">
              <input
                title="Select all users"
                className="table-checkbox"
                type="checkbox"
              />
            </th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data">
                {users.length === 0
                  ? "No users found"
                  : "No users match your search criteria"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {filteredUsers.length > 0 && (
        <nav className="table-pagination">
          <span className="pagination-info">
            Showing{" "}
            <span>
              {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredUsers.length)}
            </span>{" "}
            of <span>{filteredUsers.length}</span> users
          </span>
          <ul className="pagination-controls">{renderPagination()}</ul>
        </nav>
      )}
    </div>
  );
};

export default UserTableWrapper;
