import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import ConfirmModal from "../Modal/ConfirmModal";
import "./Sidebar.css";

interface SidebarProps {
  activeItem?: string;
  onItemClick?: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeItem = "dashboard",
  onItemClick = () => {},
}) => {
  const { logout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleNavClick = (item: string) => {
    onItemClick(item);
  };

  return (
    <>
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo-container">
            <div className="sidebar-logo">
              <span className="material-icons">school</span>
            </div>
            <span className="sidebar-title">ITS Teacher Panel</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className={`nav-link ${
                  activeItem === "dashboard" ? "active" : "inactive"
                }`}
                onClick={() => handleNavClick("dashboard")}
              >
                <span className="material-icons">dashboard</span>
                <span>Dashboard</span>
              </button>
            </li>
            {/* <li>
              <button
                className={`nav-link ${
                  activeItem === "course-management" ? "active" : "inactive"
                }`}
                onClick={() => handleNavClick("course-management")}
              >
                <span className="material-icons">library_books</span>
                <span>Course Management</span>
              </button>
            </li> */}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="profile-container">
            <div className="profile-info">
              <img
                alt={`Profile picture of ${user?.name}`}
                className="profile-avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiKpTfV4aUSlT5YTy0u-_YBXfV-0pltqX62AEL1YW1PbSy_SV9LwdSAoxUCOBkHAm4iLT9aCVFkzuNJHtFFA52l_a4OPYc4CejqDOq1kmtEz9d6mNRmJTNlkpCKFlHCBTWUFrrXMWRJpq8o-Xcfb9Gil8ZXSJHAj39UCN4S35mE3kjpMmq3VC2nvX8BssrsovsyEGIckkVbvhwioHMytknDXzjdi9f4N0fP-WImA5uk9ebD9Vg47RMANcS1gQNduvMMYuQ_y6HiqJN"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/40x40/6366F1/FFFFFF?text=J")
                }
              />
              <div>
                <p className="profile-name">{user?.name || "John Anderson"}</p>
                <p className="profile-role">{user?.role || "Teacher"}</p>
              </div>
            </div>
            <button className="profile-options-btn">
              <span className="material-icons">more_vert</span>
            </button>
          </div>
          <button className="logout-btn" onClick={handleLogoutClick}>
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Confirm Modal for Logout */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        type="warning"
      />
    </>
  );
};

export default Sidebar;
