import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Sidebar.css";

interface NavLink {
  icon: string;
  label: string;
  path: string;
  active?: boolean;
}

interface SidebarProps {
  title: string;
  subtitle: string;
  navLinks: NavLink[];
  showSupport?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  subtitle,
  navLinks,
  showSupport = true,
}) => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="material-icons">school</span>
        </div>
        <div>
          <h1 className="sidebar-title">{title}</h1>
          <p className="sidebar-subtitle">{subtitle}</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navLinks.map((link, index) => (
          <a
            key={index}
            className={`nav-link ${link.active ? "active" : ""}`}
            href={link.path}
          >
            <span className="material-icons">{link.icon}</span>
            <span>{link.label}</span>
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <span className="material-icons">account_circle</span>
          <div>
            <div className="user-profile-name">{user?.name}</div>
            <div className="user-profile-role">{user?.role}</div>
          </div>
        </div>
        {showSupport && (
          <a className="nav-link" href="#">
            <span className="material-icons">support_agent</span>
            <span>Support</span>
          </a>
        )}
        <button className="nav-link" onClick={handleLogout}>
          <span className="material-icons">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
