import React from "react";
import "./CourseContent.css";
// LƯU Ý: Bạn cần thêm 2 dòng link này vào file public/index.html
// để load font chữ và icon (Material Symbols Outlined):
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>

const CourseContentManagement: React.FC = () => {
  // CSS được chuyển đổi từ Tailwind và nhúng trực tiếp

  return (
    <React.Fragment>
      {/* Thêm class 'course-mgmt-body' vào đây hoặc vào <body> chung của app */}
      <div className="course-mgmt-body">
        <div className="course-mgmt-layout">
          <header className="course-mgmt-header">
            <div className="header-left">
              <div className="header-logo">
                <div className="logo-icon-bg">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <span className="logo-title">ITS</span>
              </div>
              <div className="header-divider"></div>
              <div>
                <h1 className="header-title">Course Content Management</h1>
              </div>
            </div>
            <div className="header-right">
              <nav className="header-nav">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
                <a className="nav-link nav-link-active" href="#">
                  Courses
                </a>
                <a className="nav-link" href="#">
                  Quizzes
                </a>
                <a className="nav-link" href="#">
                  Students
                </a>
                <a className="nav-link" href="#">
                  Analytics
                </a>
              </nav>
              <div className="header-right">
                <button className="notification-btn">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                  <span className="notification-dot"></span>
                </button>
                <img
                  alt="User avatar"
                  className="avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMO4bs8VNo6f9Ip-mvYk19-J3-dfa231W6K6yH3lfd-8b1VmoByX69SroG2_Ye71OD9DaFvr32nU2o-DhiX_8sZSSLJUFj3YTd8gEqeNsb5AuPArTfOUXQ36foGzIDnDMj2Ud8ngZx_lX9foSvq8VLddVY7Ko1RKLxDcl9eWQLrtgdTGBePdp_2QkWt0M5Y5YPD-mLmYswRIL_KWe07XqdIxH8BtYPd-gWdXwNjPV4L_q0q4mddy-YcrsT3E12Y86zvxE_ehuHi1jV"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/36x36/4361EE/FFFFFF?text=A")
                  }
                />
              </div>
            </div>
          </header>

          <main className="course-mgmt-main">
            <aside className="course-structure-aside">
              <h2 className="aside-title">Course Structure</h2>
              <div className="aside-btn-group">
                <button className="aside-btn">
                  <span className="material-symbols-outlined">add</span>
                  Add Module
                </button>
                <button className="aside-btn">
                  <span className="material-symbols-outlined">add</span>
                  Add Lesson
                </button>
              </div>
              <div className="module-list-container">
                <div>
                  <div className="module-header">
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                    <span className="material-symbols-outlined">folder</span>
                    <span className="module-header-title">
                      Module 1: Introduction
                    </span>
                  </div>
                  <ul className="module-content">
                    <li>
                      <div className="module-item">
                        <div className="module-item-details">
                          <span className="material-symbols-outlined icon-video">
                            play_circle
                          </span>
                          <span className="module-item-title">
                            1.1 Welcome Video
                          </span>
                        </div>
                        <span className="module-item-duration">5 min</span>
                      </div>
                    </li>
                    <li>
                      <div className="module-item">
                        <div className="module-item-details">
                          <span className="material-symbols-outlined">
                            description
                          </span>
                          <span className="module-item-title">
                            1.2 Course Overview
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="module-header">
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                    <span className="material-symbols-outlined">folder</span>
                    <span className="module-header-title">
                      Module 2: React Fundamentals
                    </span>
                  </div>
                  <ul className="module-content">
                    <li>
                      <div className="module-item module-item-active">
                        <div className="module-item-details">
                          <span className="material-symbols-outlined icon-video">
                            play_circle
                          </span>
                          <span className="module-item-title">
                            2.1 JSX Introduction
                          </span>
                        </div>
                        <span className="module-item-duration">12 min</span>
                      </div>
                    </li>
                    <li>
                      <div className="module-item">
                        <div className="module-item-details">
                          <span className="material-symbols-outlined icon-video">
                            play_circle
                          </span>
                          <span className="module-item-title">
                            2.2 Components &amp; Props
                          </span>
                        </div>
                        <span className="module-item-duration">18 min</span>
                      </div>
                    </li>
                    <li>
                      <div className="module-item">
                        <div className="module-item-details">
                          <span className="material-symbols-outlined">
                            code
                          </span>
                          <span className="module-item-title">
                            2.3 Hands-on Exercise
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="module-header">
                    <span className="material-symbols-outlined">
                      chevron_right
                    </span>
                    <span className="material-symbols-outlined">
                      folder_open
                    </span>
                    <span className="module-header-title">
                      Module 3: State Management
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            <section className="editor-section">
              <div className="editor-header-card">
                <div className="editor-header-content">
                  <div className="editor-header-title-group">
                    <div className="editor-header-icon">
                      <span className="material-symbols-outlined">
                        play_circle
                      </span>
                    </div>
                    <div>
                      <h2 className="editor-title">2.1 JSX Introduction</h2>
                      <p className="editor-subtitle">
                        Module 2: React Fundamentals
                      </p>
                    </div>
                  </div>
                  <div className="editor-header-buttons">
                    <button className="btn btn-secondary">
                      Preview Course
                    </button>
                    <button className="btn btn-primary">Save Changes</button>
                  </div>
                </div>
              </div>

              <div className="editor-body">
                <div className="editor-content-area">
                  <div>
                    <label className="form-label" htmlFor="lesson-title">
                      Lesson Title
                    </label>
                    <input
                      className="form-input"
                      id="lesson-title"
                      type="text"
                      defaultValue="JSX Introduction"
                    />
                  </div>
                  <div>
                    <label className="form-label">Description</label>
                    <div className="rich-text-editor">
                      <div className="editor-toolbar">
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            format_bold
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            format_italic
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            format_underlined
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            format_list_bulleted
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            format_list_numbered
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            link
                          </span>
                        </button>
                        <button className="toolbar-btn">
                          <span className="material-symbols-outlined">
                            code
                          </span>
                        </button>
                      </div>
                      <div className="editor-textarea" contentEditable="true">
                        In this lesson, you'll learn about JSX, the syntax
                        extension for JavaScript that allows you to write
                        HTML-like code in your React components. We'll cover: •
                        What is JSX and why we use it • JSX syntax and rules •
                        Embedding expressions in JSX • JSX attributes and props
                        • Common JSX patterns and best practices. By the end of
                        this lesson, you'll be comfortable writing JSX and
                        understand how it transforms into regular JavaScript.
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="editor-section-title">Video Content</h3>
                    <div className="file-drop-zone">
                      <div className="drop-zone-icon-bg">
                        <span className="material-symbols-outlined">
                          videocam
                        </span>
                      </div>
                      <p className="drop-zone-title">Upload Video</p>
                      <p className="drop-zone-subtitle">
                        Drag and drop your video file here, or click to browse
                      </p>
                      <div className="drop-zone-buttons">
                        <button className="btn-file">
                          <span className="material-symbols-outlined">
                            upload_file
                          </span>{" "}
                          Upload File
                        </button>
                        <span
                          className="drop-zone-subtitle"
                          style={{ margin: 0 }}
                        >
                          or
                        </span>
                        <button className="btn-file">
                          <span className="material-symbols-outlined">
                            add_link
                          </span>{" "}
                          Add Video URL
                        </button>
                      </div>
                      <p className="drop-zone-hint">
                        Supported formats: MP4, MOV, AVI (Max 500MB)
                      </p>
                    </div>
                    <div className="upload-progress-card">
                      <div className="upload-progress-content">
                        <span className="material-symbols-outlined">
                          videocam
                        </span>
                        <div className="upload-progress-details">
                          <div className="upload-progress-info">
                            <p className="upload-file-name">
                              jsx-introduction.mp4
                            </p>
                            <div className="upload-file-meta">
                              <span>12:34</span>
                              <button className="upload-delete-btn">
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </button>
                            </div>
                          </div>
                          <p className="file-meta-2">
                            Uploaded 2 hours ago • 45.2 MB
                          </p>
                          <div className="progress-bar-bg">
                            <div
                              className="progress-bar-fg"
                              style={{ width: "100%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="resource-section-header">
                      <h3 className="editor-section-title">
                        Additional Resources
                      </h3>
                      <button className="btn-add-resource">
                        <span className="material-symbols-outlined">add</span>
                        Add Resource
                      </button>
                    </div>
                    <div className="resource-list">
                      <div className="resource-card">
                        <div className="resource-details">
                          <span className="material-symbols-outlined">
                            picture_as_pdf
                          </span>
                          <span className="resource-name">
                            JSX Cheat Sheet.pdf
                          </span>
                        </div>
                        <button className="resource-delete-btn">
                          <span className="material-symbols-outlined">
                            close
                          </span>
                        </button>
                      </div>
                      <div className="resource-card">
                        <div className="resource-details">
                          <span className="material-symbols-outlined icon-link">
                            link
                          </span>
                          <span className="resource-name">
                            Official React JSX Documentation
                          </span>
                        </div>
                        <button className="resource-delete-btn">
                          <span className="material-symbols-outlined">
                            close
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="editor-section-title">Lesson Settings</h3>
                    <div className="settings-grid">
                      <div>
                        <label className="form-label" htmlFor="duration">
                          Duration (minutes)
                        </label>
                        <input
                          className="form-input"
                          id="duration"
                          type="number"
                          defaultValue="12"
                        />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="difficulty">
                          Difficulty Level
                        </label>
                        <select className="form-select" id="difficulty">
                          <option>Beginner</option>
                          <option>Intermediate</option>
                          <option>Advanced</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="editor-footer">
                  <div className="footer-status">
                    <span className="material-symbols-outlined">history</span>
                    <span>Last saved 2 minutes ago</span>
                  </div>
                  <div className="footer-buttons">
                    <button className="btn btn-secondary">Cancel</button>
                    <button className="btn btn-primary">Save Lesson</button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseContentManagement;
