import React, { useState, useEffect } from "react";
import type { UserDetail } from "../../types";
import { apiService } from "../../services/apiService";
import Sidebar from "../Sidebar/Sidebar";
import UserTableWrapper from "../UserTable/UserTableWrapper";
import "./Admin.css";

const Admin: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSidebarItem, setActiveSidebarItem] = useState("user-management");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await apiService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSidebarItemClick = (item: string) => {
    setActiveSidebarItem(item);
  };

  return (
    <div className="admin-layout">
      {/* Sử dụng Sidebar component */}
      <Sidebar
        activeItem={activeSidebarItem}
        onItemClick={handleSidebarItemClick}
      />

      <main className="main-content">
        <header className="content-header">
          <div>
            <h2 className="content-title">User Management</h2>
            <p className="content-subtitle">Manage all users in the system</p>
          </div>
          <button className="add-user-btn">
            <span className="material-icons">add</span>
            <span>Add New User</span>
          </button>
        </header>

        <div className="content-body">
          <div className="table-container">
            <div className="table-toolbar">
              <div className="search-bar">
                <span className="material-icons search-icon">search</span>
                <input
                  className="search-input"
                  placeholder="Search by name or email..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <select
                title="Filter by role"
                className="filter-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option>All Roles</option>
                {Array.from(
                  new Set(users.map((user) => user.role.role_name))
                ).map((role) => (
                  <option key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                  </option>
                ))}
              </select>
              <div className="toolbar-spacer"></div>
            </div>

            <UserTableWrapper
              users={users}
              loading={loading}
              error={error}
              searchQuery={searchQuery}
              roleFilter={roleFilter}
              onEdit={() => {}}
              onDelete={() => {}}
              onRetry={fetchUsers}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
