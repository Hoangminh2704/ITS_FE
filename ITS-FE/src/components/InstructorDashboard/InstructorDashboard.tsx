import React from "react";
import "./InstructorDashboard.css";

const InstructorDashboard: React.FC = () => {
  // Dữ liệu mẫu (mock data) cho các khóa học
  const courses = [
    {
      id: 1,
      title: "Software Architecture 101",
      students: 50,
      duration: "8 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBfuoVQIZGDHlFGUJD-HxOL6_tZImtwe4KSEbXC2LWjveC2tqJUfzxvt6MNWKS6gN4YBAZhUNydSitqXoyct6rsK0lQqqKIHQCuJaqMDaiLewZh1Jg-lUmJJ-2BzEdcFtEiy9awwwN6K8qb-hb6aNqacrvzvwstb_PDVFYL7bR4AsDDyLX-38eQihXfVIko1UkvpdP1h4qG7nSSgyiJAF8Wu6WJB6JYkQAyhT2GZPeYkCbWoLTkQTJkwl8ibgRxch3IasJ4MOtOsDE_",
    },
    {
      id: 2,
      title: "Advanced Web Development",
      students: 85,
      duration: "12 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAaj9Upc3O0CfW2zR6T0DVSKXTi8wBHXnTldwqbcnokBwY-5_FpF564CH3V5y9TAoSxIUaffTFYPDamok66hZLquK9Pl43w-jM1RYJVQBPglifN0orn5Ty0ZNX8l-fjawM9yoK6MNJPznfzQUvJRLmCCDjYyjc9Pi-7yAdjvCt3MgGTpVifkqREMryuzwcJniA4levkZ19elHXv5-BLHPMZKf8F7v8QyYzff-7JfhPRMvSOdionRcOXX4PFEX0JW1S3TLjvdkiAn7Bi",
    },
    {
      id: 3,
      title: "Data Science Fundamentals",
      students: 120,
      duration: "10 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDfsSGU3LfizTRuv7Pb_ZkNqeQJ892_IsyqLXeihsEJ4WKQBQzFsQc5Cfps0ZLPkBeRo33FDKhTgg3v4fP4Njha3_Qy-oLcuW17aadwJ5qdtFa3W23nNQf6o-Bc-543lR0Cn0VSUlYUIrElRiOYG7kVcg1SWInKfA9671o_9intO8L868orseaLfGXQN53XoahPbN6LMRTc27NAULQinnuu8nA2jqFe3zZd7tqUOshYoSr-lpzW5ni0inkm_E32OaK6Zm_CvIfM3mez",
    },
    {
      id: 4,
      title: "Mobile App Development",
      students: 65,
      duration: "14 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBNnyhwu95uLhm-aY9mn-06hAd2IdF1ztCFOAqk0LBklX9y97Rxmo8IPy-r3gbuC_NRC8HC0Em-zFyTsXppg73pNGWHo5-ZoIrREHAuMu0UIicAqhjYTrfjfxeoauq8GO8v6ADQOmCz8u4NPSBz6pa82Q6PBfS2iyetmWV0kZIYRbd0e4avrce6rddKEV3SNnLCLAaTfJwimLWPRN79yyo2DWSES0mNkQZ2EnYGnBti-kpB2ThXfvFA5KFeU-Jjo-e0TmLHqXHGtP2P",
    },
    {
      id: 5,
      title: "Cloud Computing Essentials",
      students: 42,
      duration: "6 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD-_HL38q31iGSfWUpdr6yi8fXf3Vj4GqvAaxBeYgbumG3JvWIV8YeV1u6jdTLKI7r6IUVMkLLQwxwZN8b0Utu37PKy7UVG6pqq6YmHlGOaawtuXQKsVmyyjdJOWPt1bm0dHljJKW6zbpIfTQ94QD6nzrDLDdEX--6CrclfmomXyy89q9VF_te6Xy4oZP9dpRhFZ1E14u1Nkvim9Q_bHI4J5IsY3QPc00YnFfMpwSdL49crMvC4mAEt1VP4CQY-NuK8FqZxi9HmwBWb",
    },
    {
      id: 6,
      title: "Cybersecurity Basics",
      students: 78,
      duration: "9 Weeks",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuArCg0bmrpyOaEQpSJAUjln_64l3kmQIo8VzN2ZXDxpe3zyBxLz76wYrOZoAAHpFfkiT1rWMilZVywDw295c0-U8n9U118xkqVyfYh-lPR2bvzrd_CL3z4iR_3XVH8pDP4dJm0-IIOl25Yh2qOdf_J87-RlQz6_UjZGfFpz55itiX8hCGDFyB5WbBf7VhhCit5ep5GZlTeQvZn-kj5HazxHUM32ylfEG6TdkMIWazCm6nYa8HIHBXG0TgKtepik4Y123uzGUTV7cpnR",
    },
  ];

  // Nhúng CSS trực tiếp vào component

  return (
    <React.Fragment>
      {/* Giao diện JSX của component */}
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo-container">
              <div className="sidebar-logo">
                <span className="material-icons">school</span>
              </div>
              <span className="sidebar-title">ITS Instructor Panel</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <a className="nav-link active" href="#">
                  <span className="material-icons">dashboard</span>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a className="nav-link inactive" href="#">
                  <span className="material-icons">library_books</span>
                  <span>Course Management</span>
                </a>
              </li>
            </ul>
          </nav>
          <div className="sidebar-footer">
            <div className="profile-container">
              <div className="profile-info">
                <img
                  alt="Profile picture of John Anderson"
                  className="profile-avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiKpTfV4aUSlT5YTy0u-_YBXfV-0pltqX62AEL1YW1PbSy_SV9LwdSAoxUCOBkHAm4iLT9aCVFkzuNJHtFFA52l_a4OPYc4CejqDOq1kmtEz9d6mNRmJTNlkpCKFlHCBTWUFrrXMWRJpq8o-Xcfb9Gil8ZXSJHAj39UCN4S35mE3kjpMmq3VC2nvX8BssrsovsyEGIckkVbvhwioHMytknDXzjdi9f4N0fP-WImA5uk9ebD9Vg47RMANcS1gQNduvMMYuQ_y6HiqJN"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/40x40/6366F1/FFFFFF?text=J")
                  }
                />
                <div>
                  <p className="profile-name">John Anderson</p>
                  <p className="profile-role">Instructor</p>
                </div>
              </div>
              <button className="profile-options-btn">
                <span className="material-icons">more_vert</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="dashboard-header">
            <div>
              <h1 className="header-title">Welcome back, Instructor!</h1>
              <p className="header-subtitle">
                Here's what's happening with your courses today
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <button className="notification-btn">
                <span className="material-icons">notifications</span>
                <span className="notification-dot"></span>
              </button>
            </div>
          </header>

          {/* Stats Grid */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-blue">
                <span className="material-icons">auto_stories</span>
              </div>
              <div>
                <p className="stat-value">12</p>
                <p className="stat-label">Total Courses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-green">
                <span className="material-icons">groups</span>
              </div>
              <div>
                <p className="stat-value">524</p>
                <p className="stat-label">Total Students</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-purple">
                <span className="material-icons">quiz</span>
              </div>
              <div>
                <p className="stat-value">38</p>
                <p className="stat-label">Active Quizzes</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon stat-icon-yellow">
                <span className="material-icons">star</span>
              </div>
              <div>
                <p className="stat-value">4.8</p>
                <p className="stat-label">Average Rating</p>
              </div>
            </div>
          </section>

          {/* My Courses Section */}
          <section>
            <div className="course-header">
              <h2 className="course-title">My Courses</h2>
              <button className="create-course-btn">
                <span className="material-icons">add</span>
                <span>Create New Course</span>
              </button>
            </div>
            <div className="course-grid">
              {courses.map((course) => (
                <div className="course-card" key={course.id}>
                  <img
                    alt={`Cover image for ${course.title}`}
                    className="course-card-image"
                    src={course.imageUrl}
                    onError={(e) =>
                      (e.currentTarget.src =
                        "https://placehold.co/400x160/6366F1/FFFFFF?text=Course+Image")
                    }
                  />
                  <div className="course-card-content">
                    <h3 className="course-card-title">{course.title}</h3>
                    <div className="course-card-info">
                      <div className="info-item">
                        <span className="material-icons">person_outline</span>
                        <span>{course.students} Students</span>
                      </div>
                      <div className="info-item">
                        <span className="material-icons">schedule</span>
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <button className="manage-course-btn">Manage Course</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </React.Fragment>
  );
};

export default InstructorDashboard;
