// StudentProfile.tsx
import React, { useState } from "react";
import "./StudentProfile.css";
import type { StudentProfileProps } from "../../../types/studentTypes";

const StudentProfile: React.FC<StudentProfileProps> = ({ user, onLogout }) => {
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  const handleClickOutside = () => {
    setShowLogoutMenu(false);
  };

  const handleLogout = () => {
    onLogout();
    setShowLogoutMenu(false);
  };

  const userName = user?.name || "Student";
  const userInitial = user?.name?.charAt(0) || "U";

  return (
    <>
      <div className="profile-container">
        <div className="profile-info">
          <img
            alt={`${userName} profile picture`}
            className="profile-avatar"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrch7thzOF_60M2ayBEke6_hNQ2KQVt2DgrjfJmnLHwWj6LxcGxPk7cByIQRlTiOXyBq7mQS82kKAgr1kCm0JtSjAzkBQPrYeQGlQEylXKOp1-zXdE8BEKQKGvcRYWSrYxjz848ivypV9GcyWlZgEoQoa-PNtziULhNu73pxm4l9nrKPItQZoFOct7ko9XWYmUNwtpwHMHusIQCersnobfuvyiNnxhIf2MiLwUlH9x8f8zD0kHnz57Ipy1UlIabpAIUd7vYlgqlnI"
            onError={(e) =>
              (e.currentTarget.src = `https://placehold.co/40x40/4F46E5/FFFFFF?text=${userInitial}`)
            }
          />
          <div>
            <p className="profile-name">{userName}</p>
            <p className="profile-role">Student</p>
          </div>
        </div>
        <div className="profile-options-container">
          <button className="profile-options-btn" onClick={toggleLogoutMenu}>
            <span className="material-symbols-outlined">more_vert</span>
          </button>

          {/* Logout Menu Dropdown */}
          {showLogoutMenu && (
            <div className="logout-menu">
              <button className="logout-menu-item" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {showLogoutMenu && (
        <div className="menu-overlay" onClick={handleClickOutside} />
      )}
    </>
  );
};

export default StudentProfile;
