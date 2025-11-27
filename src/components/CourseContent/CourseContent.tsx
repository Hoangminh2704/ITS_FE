import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InstructorHeader } from "../InstructorHeader/InstructorHeader";
import { apiService } from "../../services/apiService";
import "./CourseContent.css";
import type { Lesson, Module } from "./ModuleList/ModuleList";
import ModuleList from "./ModuleList/ModuleList";
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

  const fetchTopics = async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const subjectId = parseInt(courseId);
      const topicsData = await apiService.getTopicsBySubject(subjectId);
      const convertedModules: Module[] = await Promise.all(
        topicsData.map(async (topic: Topic) => {
          const materials = await apiService.getMaterialsByTopic(
            topic.topicId!
          );
          const lessons: Lesson[] = materials.map(
            (material: LearningMaterialResponseDTO, index: number) => {
              return {
                id: `lesson-${topic.topicId}-${material.materialId || index}`,
                title: material.title || `Lesson ${index + 1}`,
                type: mapMaterialTypeToLessonType(material.type),
                duration: material.duration
                  ? `${material.duration} min`
                  : undefined,
                materialId: material.materialId,
                hasFile: !!material.fileName,
                fileSize: material.fileSize,
                fileType: material.contentType,
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
  const fetchMaterialData = async (materialId?: number) => {
    if (!materialId) return;

    try {
      const material: LearningMaterialResponseDTO =
        await apiService.getMaterialById(materialId);
      const materialWithTopicId: LearningMaterial = {
        ...material,
        topicId: material.topicId || 0,
      };

      setActiveMaterial(materialWithTopicId);
    } catch (error) {
      console.error("Error fetching material:", error);
    }
  };
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
    const updatedModules = modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        isActive: lesson.id === lessonId,
      })),
    }));

    setModules(updatedModules);
    const lesson = updatedModules
      .flatMap((module) => module.lessons)
      .find((lesson) => lesson.id === lessonId);

    setActiveLesson(lesson);
    if (materialId) {
      fetchMaterialData(materialId);
    } else {
      setActiveMaterial(undefined);
    }
  };

  const handleModuleCreated = () => {
    fetchTopics();
  };

  const handleMaterialCreated = () => {
    fetchTopics();
  };

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
    setActiveMaterial(updatedMaterial);
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
    fetchTopics();
  };
  const handleModuleUpdated = () => {
    fetchTopics();
  };
  const handleModuleDeleted = () => {
    fetchTopics();
    setActiveLesson(undefined);
    setActiveMaterial(undefined);
  };
  const handleMaterialDeleted = () => {
    fetchTopics();
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
              onSave={() => {}}
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
