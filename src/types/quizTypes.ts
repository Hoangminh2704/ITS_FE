// quizTypes.ts

import type { Question } from ".";

export interface QuizContentProps {}

export interface QuizHeaderProps {
  lessonTitle?: string;
  onBackToCourse: () => void;
}

export interface QuizTitleSectionProps {
  quizTitle: string;
  onQuizTitleChange: (title: string) => void;
  saving: boolean;
}

export interface QuizSettingsProps {
  saving: boolean;
}

export interface QuizOverviewProps {
  questions: Question[];
}

export interface QuizActionsProps {
  saving: boolean;
  onBackToCourse: () => void;
  onSaveQuiz: () => void;
}

export interface QuizStatesProps {
  type: "loading" | "access-denied";
  courseId?: string;
  onBackToCourse?: () => void;
}
