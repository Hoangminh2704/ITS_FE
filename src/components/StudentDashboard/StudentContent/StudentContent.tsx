// StudentContent.tsx
import React, { useState, useEffect, useMemo } from "react";
import "./StudentContent.css";
import StudentCourseCard from "../../StudentCourseCard/StudentCourseCard";
import { apiService } from "../../../services/apiService";
import type { LearningMaterialResponseDTO } from "../../../types";
import type { StudentCourse } from "../../../types/studentCoursesTypes";
import { getRandomCourseImage } from "../../../images/data";
import type { StudentContentProps } from "../../../types/studentTypes";

const StudentContent: React.FC<StudentContentProps> = ({
  searchTerm = "",
  onClearSearch,
}) => {
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<
    "all" | "in-progress" | "completed"
  >("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const formatDuration = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  };

  const getSubjectImageUrl = (subjectName: string): string => {
    const imageMap: { [key: string]: string } = {
      Mathematics: "https://placehold.co/600x288/4F46E5/FFFFFF?text=Math",
      Physics: "https://placehold.co/600x288/DC2626/FFFFFF?text=Physics",
      Chemistry: "https://placehold.co/600x288/16A34A/FFFFFF?text=Chemistry",
      Programming: "https://placehold.co/600x288/7C3AED/FFFFFF?text=Coding",
      "Data Science": "https://placehold.co/600x288/EA580C/FFFFFF?text=Data",
      Design: "https://placehold.co/600x288/DB2777/FFFFFF?text=Design",
      "Computer Science": "https://placehold.co/600x288/7C3AED/FFFFFF?text=CS",
      Engineering:
        "https://placehold.co/600x288/EA580C/FFFFFF?text=Engineering",
    };

    return imageMap[subjectName] || getRandomCourseImage();
  };

  const getSubjectTag = (subjectName: string): string => {
    const tagMap: { [key: string]: string } = {
      Mathematics: "Math",
      Physics: "Science",
      Chemistry: "Science",
      Programming: "Coding",
      "Data Science": "Analytics",
      Design: "Creative",
      "Computer Science": "Technology",
      Engineering: "Technical",
    };

    return tagMap[subjectName] || "General";
  };

  const getSubjectTagCategory = (
    subjectName: string
  ): StudentCourse["tagCategory"] => {
    const categoryMap: { [key: string]: StudentCourse["tagCategory"] } = {
      Mathematics: "technology",
      Physics: "technology",
      Chemistry: "data-science",
      Programming: "development",
      "Data Science": "data-science",
      Design: "design",
      "Computer Science": "technology",
      Engineering: "development",
    };

    return categoryMap[subjectName] || "technology";
  };

  const calculateTotalDuration = (
    materials: LearningMaterialResponseDTO[]
  ): number => {
    return materials.reduce(
      (sum, material) => sum + (material.duration || 0),
      0
    );
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      const subjects = await apiService.getSubjects();

      const coursesPromises = subjects.map(
        async (subject): Promise<StudentCourse | null> => {
          try {
            const topics = await apiService.getTopicsBySubject(
              subject.subjectId!
            );

            let totalDuration = 0;
            for (const topic of topics) {
              const materials = await apiService.getMaterialsByTopic(
                topic.topicId!
              );
              totalDuration += calculateTotalDuration(materials);
            }

            const durationString = formatDuration(totalDuration);

            if (totalDuration > 0) {
              return {
                id: subject.subjectId!,
                subjectId: subject.subjectId!,
                title: subject.name,
                description: subject.description || "No description available",
                imageUrl: getSubjectImageUrl(subject.name),
                tag: getSubjectTag(subject.name),
                tagCategory: getSubjectTagCategory(subject.name),
                totalDuration: totalDuration,
                duration: durationString,
                progress: Math.floor(Math.random() * 100),
                instructor: "Instructor",
                topics: topics,
              };
            } else {
              return null;
            }
          } catch (topicError) {
            console.error(
              `Error processing subject ${subject.name}:`,
              topicError
            );
            return null;
          }
        }
      );

      const coursesWithDuration = await Promise.all(coursesPromises);
      const validCourses = coursesWithDuration.filter(
        (course): course is StudentCourse =>
          course !== null && course !== undefined
      );

      setCourses(validCourses);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Failed to load courses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    let result = courses;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase().trim();
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.tag.toLowerCase().includes(searchLower)
      );
    }

    switch (activeFilter) {
      case "in-progress":
        result = result.filter(
          (course) =>
            course.progress && course.progress > 0 && course.progress < 100
        );
        break;
      case "completed":
        result = result.filter((course) => course.progress === 100);
        break;
      default:
        break;
    }

    return result;
  }, [courses, searchTerm, activeFilter]);

  // const handleFilterChange = (filter: "all" | "in-progress" | "completed") => {
  //   setActiveFilter(filter);
  // };

  if (loading) {
    return (
      <main className="student-main-content">
        <div className="content-header">
          <h1 className="content-title">My Courses</h1>
        </div>
        <div className="loading-state">
          <span className="material-symbols-outlined loading-spinner">
            refresh
          </span>
          <p>Loading courses...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="student-main-content">
        <div className="content-header">
          <h1 className="content-title">My Courses</h1>
        </div>
        <div className="error-state">
          <span className="material-symbols-outlined error-icon">error</span>
          <p>{error}</p>
          <button className="retry-btn" onClick={fetchCourses}>
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="student-main-content">
      <div className="content-header">
        <h1 className="content-title">My Courses</h1>
        {/* {courses.length > 0 && (
          <div className="filter-tabs">
            <button
              className={`tab-btn ${
                activeFilter === "all" ? "tab-btn-active" : "tab-btn-inactive"
              }`}
              onClick={() => handleFilterChange("all")}
            >
              All Courses
            </button>
            <button
              className={`tab-btn ${
                activeFilter === "in-progress"
                  ? "tab-btn-active"
                  : "tab-btn-inactive"
              }`}
              onClick={() => handleFilterChange("in-progress")}
            >
              In Progress
            </button>
            <button
              className={`tab-btn ${
                activeFilter === "completed"
                  ? "tab-btn-active"
                  : "tab-btn-inactive"
              }`}
              onClick={() => handleFilterChange("completed")}
            >
              Completed
            </button>
          </div>
        )} */}
      </div>

      {searchTerm && (
        <div className="search-results-info">
          <p>
            {filteredCourses.length === 0
              ? `No courses found for "${searchTerm}"`
              : `Found ${filteredCourses.length} course${
                  filteredCourses.length !== 1 ? "s" : ""
                } for "${searchTerm}"`}
          </p>
          <button className="clear-search-btn" onClick={onClearSearch}>
            Clear search
          </button>
        </div>
      )}

      <div className="course-grid">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <StudentCourseCard course={course} key={course.id} />
          ))
        ) : (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-icon">
              folder_off
            </span>
            <p>
              {courses.length === 0
                ? "No courses available. Please check back later."
                : searchTerm
                ? `No courses found for "${searchTerm}"`
                : "No courses found for the selected filter."}
            </p>
            {courses.length === 0 && (
              <button className="retry-btn" onClick={fetchCourses}>
                Refresh
              </button>
            )}
            {courses.length > 0 && !searchTerm && activeFilter !== "all" && (
              <button
                className="clear-search-btn"
                onClick={() => setActiveFilter("all")}
              >
                Show All Courses
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default StudentContent;
