// studentCoursesTypes.ts
import type { Topic } from ".";

export interface StudentCoursesViewProps {}

export interface StudentCoursesHeaderProps {
  onBackToCourse: () => void;
}

export interface StudentCoursesSidebarProps {
  modules: Module[];
  onLessonClick?: (lessonId: string) => void;
  onQuizClick?: (quizId: string, questions: Question[]) => void;
  onModuleToggle?: (moduleId: string) => void;
  onQuizToggle?: (moduleId: string, quizId: string) => void;
  courseTitle: string;
  onLessonComplete?: (lessonId: string, moduleId: string) => void;
}

export interface StudentCoursesContentProps {
  onFeedbackClick: (e: React.MouseEvent) => void;
  activeLesson?: {
    id: string;
    title: string;
    materialId?: number;
  };
}

export interface Question {
  id: string;
  questionId?: number;
  text: string;
  type?: string;
  correctAnswer?: string;
  hintContent?: string;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  topicId?: number;
  isExpanded?: boolean;
  isCompleted?: boolean;
  score?: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  status: "completed" | "playing" | "uncompleted";
  isActive?: boolean;
  materialId?: number;
  type?: "video" | "document" | "exercise" | "quiz";
  hasFile?: boolean;
  fileSize?: number;
  fileType?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quizzes?: Quiz[];
  isExpanded?: boolean;
  topicId?: number;
}

export interface StudentCourse {
  id: number;
  subjectId: number;
  title: string;
  description: string;
  imageUrl: string;
  tag: string;
  tagCategory:
    | "technology"
    | "development"
    | "data-science"
    | "design"
    | "marketing"
    | "cloud";
  totalDuration: number;
  duration: string;
  progress?: number;
  instructor?: string;
  topics?: Topic[];
}

export interface StudentCoursesResponse {
  courses: StudentCourse[];
}
