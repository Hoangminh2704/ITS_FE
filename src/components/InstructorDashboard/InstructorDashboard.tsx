import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../Sidebar/Sidebar";
import "./InstructorDashboard.css";
import type { Question, Subject } from "../../types";
import { apiService } from "../../services/apiService";
import SubjectsList from "../Subject/SubjectList/SubjectList";
import StatsGrid from "../Stat/StatGrid/StatsGrid";
import SubjectForm from "../Forms/SubjectForm/SubjectForm";

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  // const [users, setUsers] = useState<UserDetail[]>([]);
  const [error, setError] = useState("");
  const [isSubjectFormOpen, setSubjectFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>(
    undefined
  );

  // Check if user has permission to create subjects
  const canCreateSubject = user?.role === "Teacher";

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const subjectsData = await apiService.getSubjects();
        setSubjects(subjectsData);

        // Fetch all questions for stats
        const allQuestions = await getAllQuestions(subjectsData);
        setQuestions(allQuestions);
        // const usersData = await apiService.getAllUsers();
        // setUsers(usersData);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Hàm để lấy tất cả questions từ tất cả subjects và topics
  const getAllQuestions = async (
    subjectsData: Subject[]
  ): Promise<Question[]> => {
    try {
      const allQuestions: Question[] = [];

      // Duyệt qua từng subject và lấy questions từ các topics
      for (const subject of subjectsData) {
        if (subject.subjectId) {
          // Lấy topics của subject
          const topics = await apiService.getTopicsBySubject(subject.subjectId);

          // Duyệt qua từng topic và lấy questions
          for (const topic of topics) {
            if (topic.topicId) {
              const questions = await apiService.getQuestionsByTopic(
                topic.topicId
              );
              allQuestions.push(...questions);
            }
          }
        }
      }
      return allQuestions;
    } catch (error) {
      console.error("Error fetching questions:", error);
      return [];
    }
  };

  const handleSidebarItemClick = (item: string) => {
    setActiveSidebarItem(item);
  };

  const refreshSubjects = async () => {
    try {
      const subjectsData = await apiService.getSubjects();
      setSubjects(subjectsData);

      // Refresh questions khi subjects được refresh
      const allQuestions = await getAllQuestions(subjectsData);
      setQuestions(allQuestions);
    } catch (err: any) {
      setError(err.message || "Failed to refresh subjects");
    }
  };

  // Thêm hàm xử lý edit subject
  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectFormOpen(true);
  };

  // Thêm hàm xử lý close form
  const handleCloseForm = () => {
    setSubjectFormOpen(false);
    setEditingSubject(undefined);
  };

  // Thêm hàm xử lý create subject
  const handleCreateSubject = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSubject(undefined);
    setSubjectFormOpen(true);
  };

  // Thêm hàm xử lý sau khi subject được tạo/cập nhật
  const handleSubjectCreated = () => {
    refreshSubjects();
    handleCloseForm();
  };

  const calculateStats = () => {
    const totalSubjects = subjects.length;
    const totalQuestions = questions.length;
    // const totalStudents =
    //   users.length > 0
    //     ? users.filter(
    //         (user) => user.role.role_name.toLowerCase() === "student"
    //       ).length
    //     : 0;

    return [
      {
        value: totalSubjects.toString(),
        label: "Total Subjects",
        icon: "auto_stories",
        color: "blue" as const,
      },
      // {
      //   value: totalStudents.toString(),
      //   label: "Total Students",
      //   icon: "groups",
      //   color: "green" as const,
      // },
      {
        value: totalQuestions.toString(),
        label: "Total Questions",
        icon: "quiz",
        color: "purple" as const,
      },
    ];
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Sidebar
          activeItem={activeSidebarItem}
          onItemClick={handleSidebarItemClick}
        />
        <main className="main-content">
          <div className="loading-state">
            <span className="material-icons spin">refresh</span>
            <p>Loading dashboard data...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component */}
      <Sidebar
        activeItem={activeSidebarItem}
        onItemClick={handleSidebarItemClick}
      />

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1 className="header-title">Welcome back, {user?.role}!</h1>
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

        {/* Stats Grid Component */}
        <StatsGrid stats={calculateStats()} />

        {/* Subjects Section */}
        <section>
          <div className="course-header">
            <h2 className="course-title">My Courses</h2>
            {canCreateSubject && (
              <button
                className="create-course-btn"
                onClick={handleCreateSubject}
              >
                <span className="material-icons">add</span>
                <span>Create New Subject</span>
              </button>
            )}
          </div>

          {!canCreateSubject && (
            <div className="permission-warning">
              <span className="material-icons">warning</span>
              <p>
                You don't have permission to create subjects. Please contact an
                administrator.
              </p>
            </div>
          )}

          {error && (
            <div className="error-state">
              <span className="material-icons">error</span>
              <p>{error}</p>
            </div>
          )}

          <SubjectsList
            subjects={subjects}
            onTopicCreated={refreshSubjects}
            onSubjectUpdated={refreshSubjects}
            onSubjectDeleted={refreshSubjects}
            canEdit={canCreateSubject}
            onEditSubject={handleEditSubject}
            emptyStateMessage={
              canCreateSubject
                ? "Create your first subject to get started"
                : "No subjects available"
            }
          />
        </section>
      </main>

      {/* Subject Form Modal - chỉ hiển thị nếu có quyền */}
      {canCreateSubject && (
        <SubjectForm
          isOpen={isSubjectFormOpen}
          onClose={handleCloseForm}
          onSubjectCreated={handleSubjectCreated}
          editingSubject={editingSubject}
        />
      )}
    </div>
  );
};

export default InstructorDashboard;
