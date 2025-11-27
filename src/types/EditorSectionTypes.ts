import type { LearningMaterial, LearningMaterialResponseDTO } from ".";
import type { Lesson } from "../components/CourseContent/ModuleItem/ModuleItem";
import type { Module } from "../components/CourseContent/ModuleList/ModuleList";

export interface EditorSectionProps {
  activeLesson?: Lesson;
  activeMaterial?: LearningMaterialResponseDTO;
  modules: Module[];
  onSave: (materialData: any) => void;
  onCancel: () => void;
  onMaterialUpdated?: (updatedMaterial: LearningMaterial) => void;
  onMaterialDeleted?: () => void;
}

export interface FileUploadSectionProps {
  activeMaterial?: LearningMaterialResponseDTO;
  selectedFile: File | null;
  onFileChange: (file: File | null) => void;
  onDownloadFile: () => void;
  onRemoveSelectedFile: () => void;
}

export interface LessonContentSectionProps {
  formData: {
    title: string;
    content: string;
    type: string;
    duration: number;
  };
  onInputChange: (field: string, value: string | number) => void;
}

export interface EditorHeaderProps {
  activeLesson?: Lesson;
  activeModule?: Module;
  onDeleteClick: () => void;
  onCreateQuiz: () => void;
}

export interface EditorFooterProps {
  activeLesson?: Lesson;
  isLoading: boolean;
  formData: { title: string };
  selectedFile: File | null;
  onCancel: () => void;
  onSave: (e: React.FormEvent) => void;
}
