import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import { apiService } from "../../services/apiService";
import "./CourseContent.css";
import type { Lesson, Module } from "./ModuleList";
import ModuleList from "./ModuleList";

import type {
  Topic,
  LearningMaterial,
  LearningMaterialResponseDTO,
} from "../../types";
import EditorSection from "../EditorSection/EditorSection";

const CourseContentManagement: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMaterial, setActiveMaterial] = useState<LearningMaterial>();
  const [activeLesson, setActiveLesson] = useState<Lesson>();

  // Map material type to lesson type
  const mapMaterialTypeToLessonType = (
    materialType?: string
  ): "video" | "document" | "exercise" | "quiz" => {
    if (!materialType) return "document";

    switch (materialType.toLowerCase()) {
      case "video":
        return "video";
      case "exercise":
        return "exercise";
      case "quiz":
        return "quiz";
      default:
        return "document";
    }
  };

  // Fetch topics từ backend
  const fetchTopics = async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const subjectId = parseInt(courseId);
      const topicsData = await apiService.getTopicsBySubject(subjectId);
      console.log("topicsData", topicsData);

      // Convert topics từ backend sang modules format
      const convertedModules: Module[] = await Promise.all(
        topicsData.map(async (topic: Topic) => {
          // Fetch materials cho từng topic
          const materials = await apiService.getMaterialsByTopic(
            topic.topicId!
          );

          // Convert learning materials to lessons với type assertion
          const lessons: Lesson[] = materials.map(
            (material: LearningMaterialResponseDTO, index: number) => {
              // Xử lý trường hợp topicId có thể là undefined
              const materialWithTopicId: LearningMaterial = {
                ...material,
                topicId: material.topicId || topic.topicId!, // Fallback to topic.topicId nếu material.topicId là undefined
              };

              return {
                id: `lesson-${topic.topicId}-${material.materialId || index}`,
                title: material.title || `Lesson ${index + 1}`,
                type: mapMaterialTypeToLessonType(material.type),
                duration: material.duration
                  ? `${material.duration} min`
                  : undefined,
                materialId: material.materialId,
              };
            }
          );

          return {
            id: `module-${topic.topicId}`,
            title: topic.name || `Topic ${topic.topicId}`,
            isExpanded: false,
            topicId: topic.topicId,
            lessons: lessons,
          };
        })
      );

      setModules(convertedModules);
      setTopics(topicsData);
    } catch (error) {
      console.error("Error fetching topics:", error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch material data khi lesson được click
  const fetchMaterialData = async (materialId?: number) => {
    if (!materialId) return;

    try {
      const material: LearningMaterialResponseDTO =
        await apiService.getMaterialById(materialId);

      // Convert response to LearningMaterial với đầy đủ topicId
      const materialWithTopicId: LearningMaterial = {
        ...material,
        topicId: material.topicId || 0, // Provide default value
      };

      setActiveMaterial(materialWithTopicId);
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };

  // Fetch data khi component mount hoặc courseId thay đổi
  useEffect(() => {
    fetchTopics();
  }, [courseId]);

  const handleModuleToggle = (moduleId: string) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    );
  };

  const handleLessonClick = (lessonId: string, materialId?: number) => {
    // Cập nhật trạng thái active cho lesson
    const updatedModules = modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        isActive: lesson.id === lessonId,
      })),
    }));

    setModules(updatedModules);

    // Tìm lesson active
    const lesson = updatedModules
      .flatMap((module) => module.lessons)
      .find((lesson) => lesson.id === lessonId);

    setActiveLesson(lesson);

    // Fetch material data nếu có materialId
    if (materialId) {
      fetchMaterialData(materialId);
    } else {
      setActiveMaterial(undefined);
    }
  };

  // Callback khi topic mới được tạo
  const handleModuleCreated = () => {
    fetchTopics();
  };

  // Callback khi material mới được tạo
  const handleMaterialCreated = () => {
    fetchTopics();
  };

  // Handle save material
  const handleSaveMaterial = (materialData: any) => {
    // TODO: Implement save material logic
    console.log("Saving material:", materialData);
  };

  // Handle cancel editing
  const handleCancelEditing = () => {
    setActiveLesson(undefined);
    setActiveMaterial(undefined);
  };

  if (loading) {
    return (
      <div className="course-mgmt-body">
        <div className="course-mgmt-layout">
          <InstructorHeader courseId={courseId} activeTab="Courses" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
              color: "var(--color-slate-500)",
            }}
          >
            <span className="material-symbols-outlined loading-spinner">
              refresh
            </span>
            <span>Loading course content...</span>
          </div>
        </div>
      </div>
    );
  }

  const handleMaterialUpdated = (updatedMaterial: LearningMaterial) => {
    // Cập nhật activeMaterial với dữ liệu mới từ server
    setActiveMaterial(updatedMaterial);

    // Đồng thời cập nhật activeLesson title nếu có thay đổi
    if (activeLesson) {
      setActiveLesson((prev) =>
        prev
          ? {
              ...prev,
              title: updatedMaterial.title,
            }
          : undefined
      );
    }

    // Refresh toàn bộ modules để cập nhật UI trong module list
    fetchTopics();

    console.log("Material updated successfully");
  };
  const handleModuleUpdated = () => {
    // Refresh topics để cập nhật dữ liệu mới nhất
    fetchTopics();
    console.log("Module updated successfully");
  };
  const handleModuleDeleted = () => {
    // Refresh topics để cập nhật dữ liệu mới nhất
    fetchTopics();

    // Clear active lesson và material nếu đang xem lesson thuộc module bị xóa
    setActiveLesson(undefined);
    setActiveMaterial(undefined);

    console.log("Module deleted successfully");
  };
  const handleMaterialDeleted = () => {
    // Refresh topics để cập nhật dữ liệu mới nhất
    fetchTopics();

    console.log("Material deleted successfully");
  };

  return (
    <React.Fragment>
      <div className="course-mgmt-body">
        <div className="course-mgmt-layout">
          <InstructorHeader courseId={courseId} activeTab="Courses" />

          <main className="course-mgmt-main">
            <aside className="course-structure-aside">
              <ModuleList
                modules={modules}
                onModuleToggle={handleModuleToggle}
                onLessonClick={handleLessonClick}
                onModuleCreated={handleModuleCreated}
                onMaterialCreated={handleMaterialCreated}
                onModuleUpdated={handleModuleUpdated}
                onModuleDeleted={handleModuleDeleted}
                courseId={courseId}
                topics={topics} // Truyền topics xuống
              />
            </aside>

            <EditorSection
              activeLesson={activeLesson}
              activeMaterial={activeMaterial}
              modules={modules}
              onSave={handleSaveMaterial}
              onCancel={handleCancelEditing}
              onMaterialUpdated={handleMaterialUpdated}
              onMaterialDeleted={handleMaterialDeleted}
            />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CourseContentManagement;
