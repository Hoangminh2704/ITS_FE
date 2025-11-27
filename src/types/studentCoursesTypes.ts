// studentCoursesTypes.ts
export interface StudentCoursesViewProps {}

export interface StudentCoursesHeaderProps {
  onBackToCourse: () => void;
}

export interface StudentCoursesSidebarProps {}

export interface StudentCoursesContentProps {
  onFeedbackClick: (e: React.MouseEvent) => void;
}

// Cập nhật Lesson interface để bao gồm isActive cho tất cả status
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "playing" | "uncompleted";
  isActive?: boolean;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}
export interface StudentCourse {
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
