import React from "react";
// Import đã bị xóa để khắc phục lỗi đường dẫn
// import { studentCourseData } from "../../Data/studentCourseData";
// import StudentCourseCard from "../cards/StudentCourseCard";

// LƯU Ý:
// 1. Thêm 2 link font/icon vào public/index.html
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
// <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
//
// 2. Import file variables.css vào file CSS toàn cục (ví dụ: App.css hoặc index.css)
// @import "../../styles/studentVariables.css";

// --- Bắt đầu nhúng code từ file ngoài ---

// 1. Nhúng từ "src/types/studentCourse.ts"
// Định nghĩa kiểu dữ liệu cho một khóa học của sinh viên
interface StudentCourse {
  id: number;
  title: string;
  tag: string;
  tagCategory:
    | "technology"
    | "development"
    | "data-science"
    | "design"
    | "marketing"
    | "cloud";
  duration: string;
  description: string;
  imageUrl: string;
}

// 2. Nhúng từ "src/Data/studentCourseData.ts"
const studentCourseData: StudentCourse[] = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    tag: "Technology",
    tagCategory: "technology",
    duration: "12 weeks",
    description: "Learn the fundamentals of ML algorithms and applications",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBlaiVB8GH9WFqp6VHb7KuMrj7OPdt7Jz5Oo6BwpptztnKkOMWKOrjeujDj0H-6A3DOVuDNnpFwtnwyhwrLTgNznVpS8s4msN2udK0k1h7kwiPRxdaIpXVO7HKzNfEch8ulCwiezUh_vsqMIN8_v99qv3WQPfPET3ES0VWKWrtOySm_ZJ-By4H361U4PEPpTH9v2LJyf30A6TRWFezUsbudhIs6nTBgVEqs5ytwtSkkDAzMPUCimqTCQXidsVZfOtqmDr8phxFyVouO",
  },
  {
    id: 2,
    title: "Advanced Web Development",
    tag: "Development",
    tagCategory: "development",
    duration: "10 weeks",
    description: "Master modern frameworks and best practices",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA3AkKZCVZ528ZSApp82j4JmrMDaElwIVqSZ43hW_bNvFr4zM8yySc1U-wRb6_EOct4YTS1xg4Q06XNjbmz4AcvHHxOa14RowwjFtpcSb_bKdjNOBfCjDgdtrkif8YAZEbv_Q0mz3tCYKPudALLLCwgNwRbLpfRhtLIk71PLltxt9I-JG1b5qlDUGxHMdX0MWYOw8ZxJBKA_QP5Be-dpiKd-sTN_gW15WMaURzO-P2p_n6FIxEedqgckdid4pWE5pNulcsAlX8fjkFs",
  },
  {
    id: 3,
    title: "Data Analytics Fundamentals",
    tag: "Data Science",
    tagCategory: "data-science",
    duration: "14 weeks",
    description: "Explore data visualization and statistical analysis",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCir9vx8FTZVRNZI6kl6V4jos0Ne9Qex0yL95WUyeSbJ3efukBcMKpPMIwv3aEj-o8xnfdoueCx3wnF9fswzdjynMkz9mka0ty2o4erjD1EeMQG17kRa1BMj9v282ykTwmw2e6fzZMCdFItPA9ngvVMY6PkDWBSO2Yr5jQ_KZzdt1VYTS439CCwQbEP7BrXFvQ38N6wdL17Kt8jXuuUPYkqcnXobMdI0u7U3Pz4P7DYRw78Qx9J47LQ9JjHwZ4V_stXldItPyZicVii",
  },
  {
    id: 4,
    title: "UX/UI Design Principles",
    tag: "Design",
    tagCategory: "design",
    duration: "8 weeks",
    description: "Create beautiful and functional user interfaces",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACDGgn92uMzd74SD-k7dm9BYbXxs_YIRyL7eEKaAdDWOm4121piKLL-DyNwf0O-AJvX0pVnhDLnfx3ViqtXePG0ywR5QnR9IcOK_hhQ6oEVeV5lA7e9MtNrkfzlv-ldTDI0GF07_BzbwRcZxdBope_hWKLZ2sCXaAwvvNuai-nwEAH2UdiK1k6WRsuv4AuQfsLkMhlvYY4qVi7OqCz86xxsYnLK8bDh9JHfD69Gu5fM3BU-vCkUaUR3iq68fZnkn5BYUi0e_AjERZt",
  },
  {
    id: 5,
    title: "Digital Marketing Strategies",
    tag: "Marketing",
    tagCategory: "marketing",
    duration: "6 weeks",
    description: "Master social media and content marketing",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCw9VDxOQZrR96vuWI49Vr_QkZP264mClVBDgNV9VB_eudE5A1klq03AAd5ZleKsTuxOdH20wkOFwwa2bAw8vlZdHvuAEOhcVQpfsd27Bc9MG3rErpTRb9oe7DxzuEFmD7R21YXlppafF4n2zJqeUdSyUyEhixZxn--tKlhhS_GUPYqSmQHGbhi3WIF7BUdfpYA4iqAZpxNi4SCs619beUF5FNg-8QeW_je_l_KAdfOvanSdGNhZRcJbqYyt2Uhcgv1iS60fBmFwH2Y",
  },
  {
    id: 6,
    title: "Cloud Computing Essentials",
    tag: "Cloud",
    tagCategory: "cloud",
    duration: "16 weeks",
    description: "Learn AWS, Azure and cloud architecture",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArmcfbyDafmYM94XIJWU4fRbNaxgA4CHaPiEAWMluRA8PHEt1DtaCwkWHIs4b5gkWgDiAfyPGCguW4Ozh19OEBQOKCWZkA5SHUmWn68ZFMRKagiXZACOgQCCng0lqSM2M5so48FiAWuFEpZOcWejqzJg2-qf1wQEdr_3eEp44D3gAZaVDW78hU-2y8W5RUng7byytSCPwb3rQTrt32QaOSRNwijDPGDIKnCwhn8gc-mr00coOwvcxoLIBhiif4EauYmSeBM6mWEmO4",
  },
];

// 3. Nhúng component "src/components/cards/StudentCourseCard.tsx"
// Định nghĩa props cho component
interface CourseCardProps {
  course: StudentCourse;
}

// Hàm helper để lấy class màu cho tag
const getTagClass = (category: StudentCourse["tagCategory"]) => {
  switch (category) {
    case "technology":
      return "tag-blue";
    case "development":
      return "tag-purple";
    case "data-science":
      return "tag-orange";
    case "design":
      return "tag-green";
    case "marketing":
      return "tag-pink";
    case "cloud":
      return "tag-cyan";
    default:
      return "tag-blue";
  }
};

const StudentCourseCard: React.FC<CourseCardProps> = ({ course }) => {
  // CSS nhúng trực tiếp
  const cssStyles = `
    .course-card-std {
      background-color: var(--std-card-light);
      border-radius: 0.75rem;
      box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
      border: 1px solid var(--std-border-light);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .dark .course-card-std {
      background-color: var(--std-card-dark);
      border-color: var(--std-border-dark);
    }
    
    .course-card-std-image {
      width: 100%;
      height: 12rem; /* h-48 */
      object-fit: cover;
    }
    
    .course-card-std-content {
      padding: 1.5rem; /* p-6 */
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    
    .course-card-std-tags {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem; /* mb-3 */
    }
    
    .course-card-std-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem; /* px-3 py-1 */
      font-size: 0.75rem; /* text-xs */
      font-weight: 500;
      border-radius: 9999px;
    }
    
    .course-card-std-duration {
      font-size: 0.875rem; /* text-sm */
      color: var(--std-text-muted-light);
    }
    .dark .course-card-std-duration {
      color: var(--std-text-muted-dark);
    }
    
    /* Lớp màu cho Tag */
    .tag-blue { background-color: var(--std-tag-blue-bg); color: var(--std-tag-blue-text); }
    .tag-purple { background-color: var(--std-tag-purple-bg); color: var(--std-tag-purple-text); }
    .tag-orange { background-color: var(--std-tag-orange-bg); color: var(--std-tag-orange-text); }
    .tag-green { background-color: var(--std-tag-green-bg); color: var(--std-tag-green-text); }
    .tag-pink { background-color: var(--std-tag-pink-bg); color: var(--std-tag-pink-text); }
    .tag-cyan { background-color: var(--std-tag-cyan-bg); color: var(--std-tag-cyan-text); }
    
    .dark .tag-blue { background-color: var(--std-tag-dark-blue-bg); color: var(--std-tag-dark-blue-text); }
    .dark .tag-purple { background-color: var(--std-tag-dark-purple-bg); color: var(--std-tag-dark-purple-text); }
    .dark .tag-orange { background-color: var(--std-tag-dark-orange-bg); color: var(--std-tag-dark-orange-text); }
    .dark .tag-green { background-color: var(--std-tag-dark-green-bg); color: var(--std-tag-dark-green-text); }
    .dark .tag-pink { background-color: var(--std-tag-dark-pink-bg); color: var(--std-tag-dark-pink-text); }
    .dark .tag-cyan { background-color: var(--std-tag-dark-cyan-bg); color: var(--std-tag-dark-cyan-text); }
    
    .course-card-std-title {
      font-size: 1.125rem; /* text-lg */
      font-weight: 700;
      margin-bottom: 0.5rem; /* mb-2 */
      color: var(--std-text-light);
    }
    .dark .course-card-std-title { color: var(--std-text-dark); }
    
    .course-card-std-desc {
      font-size: 0.875rem; /* text-sm */
      color: var(--std-text-muted-light);
      flex: 1;
      margin-bottom: 1.5rem; /* mb-6 */
    }
    .dark .course-card-std-desc { color: var(--std-text-muted-dark); }
    
    .course-card-std-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background-color: var(--std-primary);
      color: white;
      font-weight: 600;
      padding: 0.75rem; /* py-3 */
      border: none;
      border-radius: 0.5rem; /* rounded-lg */
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .course-card-std-btn:hover {
      background-color: rgba(79, 70, 229, 0.9); /* primary/90 */
    }
  `;

  const tagClassName = `course-card-std-tag ${getTagClass(course.tagCategory)}`;

  return (
    <React.Fragment>
      <style>{cssStyles}</style>
      <div className="course-card-std">
        <img
          alt={course.title}
          className="course-card-std-image"
          src={course.imageUrl}
          onError={(e) =>
            (e.currentTarget.src =
              "https://placehold.co/600x288/4F46E5/FFFFFF?text=Course")
          }
        />
        <div className="course-card-std-content">
          <div className="course-card-std-tags">
            <span className={tagClassName}>{course.tag}</span>
            <span className="course-card-std-duration">{course.duration}</span>
          </div>
          <h3 className="course-card-std-title">{course.title}</h3>
          <p className="course-card-std-desc">{course.description}</p>
          <button className="course-card-std-btn">
            Continue Learning{" "}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

// --- Kết thúc nhúng code từ file ngoài ---

const StudentDashboard: React.FC = () => {
  // CSS nhúng trực tiếp
  const cssStyles = `
    .student-dashboard-layout {
      font-family: 'Inter', sans-serif;
      background-color: var(--std-background-light);
      color: var(--std-text-light);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      display: flex;
      height: 100vh;
    }
    .dark .student-dashboard-layout {
      background-color: var(--std-background-dark);
      color: var(--std-text-dark);
    }
    
    .student-sidebar {
      width: 16rem; /* w-64 */
      flex-shrink: 0;
      background-color: var(--std-card-light);
      border-right: 1px solid var(--std-border-light);
      display: flex;
      flex-direction: column;
    }
    .dark .student-sidebar {
      background-color: var(--std-card-dark);
      border-color: var(--std-border-dark);
    }

    .sidebar-header {
      height: 5rem; /* h-20 */
      display: flex;
      align-items: center;
      padding-left: 1.5rem; /* px-6 */
      padding-right: 1.5rem;
    }
    
    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem; /* gap-3 */
    }
    .logo-icon-bg {
      width: 2rem; /* w-8 */
      height: 2rem; /* h-8 */
      background-color: var(--std-primary);
      border-radius: 0.5rem; /* rounded-lg */
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .logo-icon-bg .material-symbols-outlined {
      color: white;
      font-size: 1.25rem; /* text-xl */
    }
    .logo-title {
      font-weight: 700;
      font-size: 1.25rem; /* text-xl */
      color: var(--std-text-light);
    }
    .dark .logo-title { color: var(--std-text-dark); }
    
    .sidebar-nav {
      flex: 1;
      padding: 1rem; /* px-4 py-4 */
      display: flex;
      flex-direction: column;
      gap: 0.5rem; /* space-y-2 */
    }
    
    .sidebar-link {
      display: flex;
      align-items: center;
      padding: 0.625rem 1rem; /* px-4 py-2.5 */
      color: var(--std-text-muted-light);
      border-radius: 0.5rem; /* rounded-lg */
      text-decoration: none;
      transition: background-color 0.2s, color 0.2s;
    }
    .dark .sidebar-link { color: var(--std-text-muted-dark); }
    
    .sidebar-link:hover {
      background-color: var(--std-background-light);
    }
    .dark .sidebar-link:hover {
      background-color: var(--std-background-dark);
    }
    
    .sidebar-link-active {
      color: var(--std-primary);
      background-color: rgba(79, 70, 229, 0.1); /* primary/10 */
      font-weight: 600;
    }
    .dark .sidebar-link-active {
      background-color: rgba(79, 70, 229, 0.1);
    }
    
    .sidebar-link .material-symbols-outlined {
      margin-right: 0.75rem; /* mr-3 */
    }
    
    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid var(--std-border-light);
    }
    .dark .sidebar-footer {
      border-color: var(--std-border-dark);
    }
    
    .profile-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .profile-info {
      display: flex;
      align-items: center;
      gap: 0.75rem; /* gap-3 */
    }
    .profile-avatar {
      width: 2.5rem; /* w-10 */
      height: 2.5rem; /* h-10 */
      border-radius: 9999px;
    }
    .profile-name {
      font-weight: 600;
      font-size: 0.875rem; /* text-sm */
      color: var(--std-text-light);
    }
    .dark .profile-name { color: var(--std-text-dark); }
    
    .profile-role {
      font-size: 0.75rem; /* text-xs */
      color: var(--std-text-muted-light);
    }
    .dark .profile-role { color: var(--std-text-muted-dark); }
    
    .profile-options-btn {
      background: none; border: none; cursor: pointer;
      color: var(--std-text-muted-light);
    }
    .dark .profile-options-btn { color: var(--std-text-muted-dark); }
    .profile-options-btn:hover { color: var(--std-text-light); }
    .dark .profile-options-btn:hover { color: var(--std-text-dark); }
    .profile-options-btn .material-symbols-outlined { font-size: 1.25rem; }
    
    .student-main-wrapper {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .student-header {
      height: 5rem; /* h-20 */
      flex-shrink: 0;
      background-color: var(--std-card-light);
      border-bottom: 1px solid var(--std-border-light);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 2rem; /* px-8 */
    }
    .dark .student-header {
      background-color: var(--std-card-dark);
      border-color: var(--std-border-dark);
    }
    
    .searchbar-container {
      flex: 1;
      max-width: 32rem; /* max-w-lg */
      position: relative;
    }
    .search-icon {
      position: absolute;
      left: 0.75rem; /* left-3 */
      top: 50%;
      transform: translateY(-50%);
      color: var(--std-text-muted-light);
    }
    .dark .search-icon { color: var(--std-text-muted-dark); }
    
    .search-input {
      width: 100%;
      padding-left: 2.5rem; /* pl-10 */
      padding-right: 1rem; /* pr-4 */
      padding-top: 0.625rem; /* py-2.5 */
      padding-bottom: 0.625rem;
      background-color: var(--std-background-light);
      border: 1px solid var(--std-border-light);
      border-radius: 0.5rem; /* rounded-lg */
      color: var(--std-text-light);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .dark .search-input {
      background-color: var(--std-background-dark);
      border-color: var(--std-border-dark);
      color: var(--std-text-dark);
    }
    .search-input:focus {
      outline: none;
      border-color: var(--std-primary);
      box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
    }
    
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1.5rem; /* gap-6 */
    }
    .header-action-btn {
      position: relative;
      background: none; border: none; cursor: pointer;
      color: var(--std-text-muted-light);
    }
    .dark .header-action-btn { color: var(--std-text-muted-dark); }
    .header-action-btn:hover { color: var(--std-text-light); }
    .dark .header-action-btn:hover { color: var(--std-text-dark); }
    
    .notification-dot {
      position: absolute;
      top: -0.25rem; /* -top-1 */
      right: -0.25rem; /* -right-1 */
      width: 0.5rem; /* w-2 */
      height: 0.5rem; /* h-2 */
      background-color: #EF4444; /* red-500 */
      border-radius: 9999px;
    }
    
    .student-main-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem; /* p-8 */
    }
    
    .content-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem; /* mb-6 */
    }
    .content-title {
      font-size: 1.875rem; /* text-3xl */
      font-weight: 700;
      color: var(--std-text-light);
    }
    .dark .content-title { color: var(--std-text-dark); }
    
    .filter-tabs {
      display: flex;
      align-items: center;
      gap: 0.25rem; /* gap-2 */
      background-color: var(--std-background-light);
      padding: 0.25rem; /* p-1 */
      border-radius: 0.5rem; /* rounded-lg */
      border: 1px solid var(--std-border-light);
    }
    .dark .filter-tabs {
      background-color: var(--std-card-dark);
      border-color: var(--std-border-dark);
    }
    
    .tab-btn {
      padding: 0.375rem 1rem; /* px-4 py-1.5 */
      font-size: 0.875rem; /* text-sm */
      font-weight: 500;
      border: none;
      border-radius: 0.375rem; /* rounded-md */
      cursor: pointer;
      transition: background-color 0.2s, color 0.2s;
    }
    .tab-btn-inactive {
      background-color: transparent;
      color: var(--std-text-muted-light);
    }
    .dark .tab-btn-inactive { color: var(--std-text-muted-dark); }
    .tab-btn-inactive:hover { color: var(--std-text-light); }
    .dark .tab-btn-inactive:hover { color: var(--std-text-dark); }
    
    .tab-btn-active {
      background-color: var(--std-primary);
      color: white;
    }
    
    .course-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem; /* gap-8 */
    }
    @media (min-width: 768px) {
      .course-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .course-grid { grid-template-columns: repeat(3, 1fr); }
    }
  `;

  return (
    <React.Fragment>
      <style>{cssStyles}</style>
      <div className="student-dashboard-layout">
        {/* Sidebar */}
        <aside className="student-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="logo-icon-bg">
                <span className="material-symbols-outlined">school</span>
              </div>
              <span className="logo-title">EduHub</span>
            </div>
          </div>
          <nav className="sidebar-nav">
            <a className="sidebar-link" href="#">
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </a>
            <a className="sidebar-link sidebar-link-active" href="#">
              <span className="material-symbols-outlined">import_contacts</span>
              My Learning
            </a>
            <a className="sidebar-link" href="#">
              <span className="material-symbols-outlined">calendar_month</span>
              Schedule
            </a>
            <a className="sidebar-link" href="#">
              <span className="material-symbols-outlined">show_chart</span>
              Progress
            </a>
          </nav>
          <div className="sidebar-footer">
            <div className="profile-container">
              <div className="profile-info">
                <img
                  alt="Alex Johnson profile picture"
                  className="profile-avatar"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxrch7thzOF_60M2ayBEke6_hNQ2KQVt2DgrjfJmnLHwWj6LxcGxPk7cByIQRlTiOXyBq7mQS82kKAgr1kCm0JtSjAzkBQPrYeQGlQEylXKOp1-zXdE8BEKQKGvcRYWSrYxjz848ivypV9GcyWlZgEoQoa-PNtziULhNu73pxm4l9nrKPItQZoFOct7ko9XWYmUNwtpwHMHusIQCersnobfuvyiNnxhIf2MiLwUlH9x8f8zD0kHnz57Ipy1UlIabpAIUd7vYlgqlnI"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://placehold.co/40x40/4F46E5/FFFFFF?text=A")
                  }
                />
                <div>
                  <p className="profile-name">Alex Johnson</p>
                  <p className="profile-role">Student</p>
                </div>
              </div>
              <button className="profile-options-btn">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="student-main-wrapper">
          <header className="student-header">
            <div className="searchbar-container">
              <span className="material-symbols-outlined search-icon">
                search
              </span>
              <input
                className="search-input"
                placeholder="Search courses, assignments..."
                type="text"
              />
            </div>
            <div className="header-actions">
              <button className="header-action-btn">
                <span className="material-symbols-outlined">notifications</span>
                <span className="notification-dot"></span>
              </button>
              <button className="header-action-btn">
                <span className="material-symbols-outlined">settings</span>
              </button>
            </div>
          </header>

          <main className="student-main-content">
            <div className="content-header">
              <h1 className="content-title">My Courses</h1>
              <div className="filter-tabs">
                <button className="tab-btn tab-btn-active">All Courses</button>
                <button className="tab-btn tab-btn-inactive">
                  In Progress
                </button>
                <button className="tab-btn tab-btn-inactive">Completed</button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="course-grid">
              {studentCourseData.map((course) => (
                <StudentCourseCard course={course} key={course.id} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default StudentDashboard;
