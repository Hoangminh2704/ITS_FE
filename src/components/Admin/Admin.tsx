import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Admin.css";

const Admin: React.FC = () => {
  const { logout, user } = useAuth();

  const users = [
    {
      id: "#12345",
      name: "Nguyễn Thị Lan",
      email: "nguyen.lan@example.com",
      role: "Admin",
      dateJoined: "15/01/2024",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB7NbEx3jJDYbPvYdAQYOKYjRstL8KvW8RkoXZ2oVPAWzWzTrNRwrqUwPv_bZyX8vIL0pm0SeJSnzPw10eEpzEWZxNaAKgPomcUWy90UVYL6h1oGluWTdllZ3shekoZ-6cLQ_1KRWJEWb09dk4GC9Zr414ZzUwxWMFLG5Cn5NuijqlsjVKLjazsQTssN6x9rAp9XVkBhmLS-kdalS5zVZUHFEfJHPIfMv4tP4w5JzWcaaVmqrZ-pdWEXxMbnisiRRyE_ysQYHx0yYoT",
    },
    {
      id: "#12346",
      name: "Trần Văn Minh",
      email: "tran.minh@example.com",
      role: "Teacher",
      dateJoined: "20/01/2024",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBeRNJFtvjAq6ulIbqjmGmdXh47svJqwzCJPdTJgUh8J0ShDBWTjZTVg9O6-kTZ-axNl5LrltG55amAM0EEn-yBS1Goc4jK3DDhXomx_H1kwmrB681jb0wVlX4vwNJ3PaZ0xus7OWWZ408SWDbFW5qOLZzD7R7sFYYdXPlk4bUfgi7WRPDnxH3_2tK_hA4q3pD4f1Iye9lFSae4M0yjojFgdBRe64t3bKcLs_QvDT0gp9uKPNGV6aas5VfprTZYPHqxe7FuYdBlDg4H",
    },
    {
      id: "#12347",
      name: "Lê Hoàng Nam",
      email: "le.nam@example.com",
      role: "Student",
      dateJoined: "22/01/2024",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAPemgK5KqTZ8rWH2ynwsN08YtgzN0J5CTxOqzkx39mluZd-9RcZAxp4j1TJNX5LR5F5glH1a1RYYdpDJUc4Fk6MLH1CMkxovODoXs_Hay5GK9k32TptwS8iu9GN_cvEqC2eshs_FiYOYxFcU9zlnKN10xvsw268pXjnQKS2bMaTNSvFpxy5JJoq1K5GBLmHHANsVX0rV2VG0pGyUfl-5UoCPIkEk8X32RiUpq6msFBRnyCm0OKL0YGVrVQIwSznilokemh9fkGRza0",
    },
    {
      id: "#12348",
      name: "Phạm Thị Hương",
      email: "pham.huong@example.com",
      role: "Teacher",
      dateJoined: "25/01/2024",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDl16sapPM08e2zsGhAAzfLF8awxkQFXgbqISwcP20CLVbp46x3spDHPASSDFk0pam-gXsH66MViKGSHzO9ufzkBCkD7cCMIqoMg-887WamnPdWbeHlXe77Nyl6tk0yv47GDdc8SHDeZJSSlBEQLrCfsUJqVpTL0oydlynrEV8cAgQ2L85TIJNKdJt9l3Kx6FYyXRx9NQU7nWJ2qtHBftB1veOCeK365MxKYpkNbFMPjC6tdoBRkNalobyR_8HTxT99e3BsGRFxlZUl",
    },
    {
      id: "#12349",
      name: "Đặng Quốc Tuấn",
      email: "dang.tuan@example.com",
      role: "Student",
      dateJoined: "28/01/2024",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBZnnnpNbtoslaKUhiWpAAVhfEhsJMqyL7hbYIeDeJO9HVlvs3TB9FFFSg3P4qKUB5J0bRbgp49ErHATqtdShNF5rYiVju-KD0PuZRISGJt8elpH4mAq_TmboUa748ZRxYNo6W_qsN_mxg6QAZ36zjCtSH2H-ORb7uxEpOsxIfl3bDrjo4Wzt_-oya-CJozNTkDySLkByVLAnsSDKxxd76J_ij2T7Pqif5M7WwrG6d6zW3tILlnp3YWEROVeb62GbLHRXG-KIg6JSr9",
    },
  ];

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

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span className="material-icons">school</span>
          </div>
          <div>
            <h1 className="sidebar-title">ITS Admin</h1>
            <p className="sidebar-subtitle">Intelligent Tutoring System</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <a className="nav-link active" href="#">
            <span className="material-icons">people</span>
            <span>User Management</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-icons">settings_suggest</span>
            <span>System Management</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-icons">menu_book</span>
            <span>Course Management</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-icons">bar_chart</span>
            <span>Analytics</span>
          </a>
          <a className="nav-link" href="#">
            <span className="material-icons">notifications</span>
            <span>Notifications</span>
          </a>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <span className="material-icons">account_circle</span>
            <div>
              <div className="user-profile-name">{user?.name}</div>
              <div className="user-profile-role">{user?.role}</div>
            </div>
          </div>
          <a className="nav-link" href="#">
            <span className="material-icons">support_agent</span>
            <span>Support</span>
          </a>
          <button
            className="nav-link"
            onClick={handleLogout}
            style={{ width: "100%", textAlign: "left" }}
          >
            <span className="material-icons">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

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
                />
              </div>
              <select title="Filter by role" className="filter-select">
                <option>All Roles</option>
                <option>Admin</option>
                <option>Teacher</option>
                <option>Student</option>
              </select>
              <div className="toolbar-spacer"></div>
              <button className="toolbar-btn">
                <span className="material-icons">filter_list</span>
                <span>Filter</span>
              </button>
              <button className="toolbar-btn">
                <span className="material-icons">file_download</span>
                <span>Export</span>
              </button>
            </div>

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
                  {users.map((user) => (
                    <tr className="table-row" key={user.id}>
                      <td className="p-4">
                        <input
                          title={`Select ${user.name}`}
                          className="table-checkbox"
                          type="checkbox"
                        />
                      </td>
                      <td>
                        <div className="user-cell">
                          <img
                            alt={`Avatar of ${user.name}`}
                            className="user-avatar"
                            src={user.avatar}
                          />
                          <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-id">ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="user-email">{user.email}</td>
                      <td>
                        <span className={getRoleClass(user.role)}>
                          <span className="material-icons role-icon">
                            {getRoleIcon(user.role)}
                          </span>
                          {user.role}
                        </span>
                      </td>
                      <td className="user-date">{user.dateJoined}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="action-btn-edit">
                            <span className="material-icons">edit</span>
                          </button>
                          <button className="action-btn-delete">
                            <span className="material-icons">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav className="table-pagination">
              <span className="pagination-info">
                Showing <span>1-{users.length}</span> of <span>1000</span>
              </span>
              <ul className="pagination-controls">
                <li>
                  <a className="pagination-arrow" href="#">
                    <span className="material-icons">chevron_left</span>
                  </a>
                </li>
                <li>
                  <a className="pagination-page active" href="#">
                    1
                  </a>
                </li>
                <li>
                  <a className="pagination-page" href="#">
                    2
                  </a>
                </li>
                <li>
                  <a className="pagination-page" href="#">
                    3
                  </a>
                </li>
                <li>
                  <span className="pagination-ellipsis">...</span>
                </li>
                <li>
                  <a className="pagination-page" href="#">
                    16
                  </a>
                </li>
                <li>
                  <a className="pagination-arrow" href="#">
                    <span className="material-icons">chevron_right</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
