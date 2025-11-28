// StudentCoursesView.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentFeedback from "../StudentFeedback/StudentFeedback";
import StudentCoursesHeader from "./StudentCoursesHeader/StudentCoursesHeader";
import StudentCoursesSidebar from "./StudentCoursesSidebar/StudentCoursesSidebar";
import StudentCoursesContent from "./StudentCoursesContent/StudentCoursesContent";

import { apiService } from "../../services/apiService";
import "./StudentCoursesView.css";
import type {
  Topic,
  LearningMaterialResponseDTO,
  SubjectResponseDTO,
  QuestionResponseDTO,
} from "../../types";
import type {
  Module,
  Lesson,
  Quiz,
  Question,
} from "../../types/studentCoursesTypes";
import QuizComponent from "./QuizComponent/QuizComponent";

const StudentCoursesView: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);
  const [courseTitle, setCourseTitle] = useState<string>(
    "Complete Web Development"
  );
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState<Lesson>();
  const [activeQuiz, setActiveQuiz] = useState<{
    quiz: Quiz;
    questions: Question[];
  }>();

  const mapMaterialTypeToStatus = (
    materialType?: string,
    isActive?: boolean
  ): "completed" | "playing" | "uncompleted" => {
    if (isActive) return "playing";
    if (!materialType) return "uncompleted";
    return "uncompleted";
  };

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

  const convertQuestionsToAppFormat = (
    questions: QuestionResponseDTO[],
    topicId: number
  ): Question[] => {
    return questions.map((question, index) => ({
      id: `question-${topicId}-${question.questionId || index}`,
      questionId: question.questionId,
      text: question.text,
      type: question.type || "multiple_choice",
      correctAnswer: question.correctAnswer,
      hintContent: question.hintContent,
      options: question.correctAnswer
        ? [question.correctAnswer, "Option 2", "Option 3", "Option 4"]
        : undefined,
    }));
  };

  const fetchCourseData = async () => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const subjectId = parseInt(courseId);

      let subject: SubjectResponseDTO;
      try {
        subject = await apiService.getSubjectWithTopics(subjectId);
        setCourseTitle(subject.name || "Complete Web Development");
      } catch (error) {
        console.error("Error fetching subject:", error);
      }

      const topicsData: Topic[] = await apiService.getTopicsBySubject(
        subjectId
      );

      const convertedModules: Module[] = await Promise.all(
        topicsData.map(async (topic: Topic, index: number) => {
          const materials: LearningMaterialResponseDTO[] =
            await apiService.getMaterialsByTopic(topic.topicId!);

          const questions: QuestionResponseDTO[] =
            await apiService.getQuestionsByTopic(topic.topicId!);

          const lessons: Lesson[] = materials.map(
            (material: LearningMaterialResponseDTO, materialIndex: number) => {
              const isActive = index === 0 && materialIndex === 0;

              return {
                id: `lesson-${topic.topicId}-${
                  material.materialId || materialIndex
                }`,
                title: material.title || `Lesson ${materialIndex + 1}`,
                duration: material.duration
                  ? `${material.duration} min`
                  : undefined,
                status: mapMaterialTypeToStatus(material.type, isActive),
                isActive: isActive,
                materialId: material.materialId,
                type: mapMaterialTypeToLessonType(material.type),
                hasFile: !!material.fileName,
                fileSize: material.fileSize,
                fileType: material.contentType,
              };
            }
          );

          const quizzes: Quiz[] =
            questions.length > 0
              ? [
                  {
                    id: `quiz-${topic.topicId}`,
                    title: `${topic.name} Quiz`,
                    questions: convertQuestionsToAppFormat(
                      questions,
                      topic.topicId!
                    ),
                    topicId: topic.topicId,
                    isExpanded: false,
                    isCompleted: false,
                    score: 0,
                  },
                ]
              : [];

          return {
            id: `module-${topic.topicId}`,
            title: topic.name || `Topic ${topic.topicId}`,
            lessons: lessons,
            quizzes: quizzes,
            isExpanded: index === 0,
            topicId: topic.topicId,
          };
        })
      );

      setModules(convertedModules);

      if (
        convertedModules.length > 0 &&
        convertedModules[0].lessons.length > 0
      ) {
        setActiveLesson(convertedModules[0].lessons[0]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const handleBackToCourse = () => {
    navigate("/student");
  };

  const handleFeedbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFeedbackOpen(true);
  };

  const handleLessonClick = (lessonId: string) => {
    const updatedModules = modules.map((module) => ({
      ...module,
      lessons: module.lessons.map((lesson) => ({
        ...lesson,
        isActive: lesson.id === lessonId,
        status: lesson.id === lessonId ? "playing" : lesson.status,
      })),
    }));

    setModules(updatedModules);
    setActiveQuiz(undefined);

    const lesson = updatedModules
      .flatMap((module) => module.lessons)
      .find((lesson) => lesson.id === lessonId);

    setActiveLesson(lesson);
  };

  const handleModuleToggle = (moduleId: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? { ...module, isExpanded: !module.isExpanded }
          : module
      )
    );
  };

  const handleQuizToggle = (moduleId: string, quizId: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              quizzes: module.quizzes?.map((quiz) =>
                quiz.id === quizId
                  ? { ...quiz, isExpanded: !quiz.isExpanded }
                  : quiz
              ),
            }
          : module
      )
    );
  };

  const handleQuizClick = (quizId: string, questions: Question[]) => {
    const quiz = modules
      .flatMap((module) => module.quizzes || [])
      .find((q) => q.id === quizId);

    if (quiz) {
      setActiveQuiz({ quiz, questions });
      setActiveLesson(undefined);
    }
  };

  const handleQuizSubmit = (
    quizId: string,
    score: number,
    userAnswers: Question[]
  ) => {
    setModules((prevModules) =>
      prevModules.map((module) => ({
        ...module,
        quizzes: module.quizzes?.map((quiz) =>
          quiz.id === quizId
            ? {
                ...quiz,
                isCompleted: true,
                score: score,
                questions: userAnswers,
              }
            : quiz
        ),
      }))
    );

    setActiveQuiz(undefined);
  };
  const handleLessonComplete = (lessonId: string, moduleId: string) => {
    setModules((prevModules) =>
      prevModules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, status: "completed" as const }
                  : lesson
              ),
            }
          : module
      )
    );
  };
  const handleQuizClose = () => {
    setActiveQuiz(undefined);
  };

  if (loading) {
    return (
      <div className="student-courses-view">
        <div className="loading-container">
          <span className="material-icons-outlined loading-spinner">
            refresh
          </span>
          <span>Loading course content...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="student-courses-view">
      <StudentCoursesHeader onBackToCourse={handleBackToCourse} />

      <main className="scv-main">
        <div className="scv-grid">
          <StudentCoursesSidebar
            modules={modules}
            onLessonClick={handleLessonClick}
            onQuizClick={handleQuizClick}
            onModuleToggle={handleModuleToggle}
            onQuizToggle={handleQuizToggle}
            courseTitle={courseTitle}
            onLessonComplete={handleLessonComplete}
          />

          {activeQuiz ? (
            <QuizComponent
              quiz={activeQuiz.quiz}
              questions={activeQuiz.questions}
              onQuizSubmit={handleQuizSubmit}
              onClose={handleQuizClose}
            />
          ) : (
            <StudentCoursesContent
              onFeedbackClick={handleFeedbackClick}
              activeLesson={activeLesson}
            />
          )}
        </div>
      </main>

      <StudentFeedback
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        subjectId={courseId ? parseInt(courseId) : undefined}
      />
    </div>
  );
};

export default StudentCoursesView;
