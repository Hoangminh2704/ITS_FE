export interface BaseEntity {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
}
// User Types
export interface UserRole {
  id: number;
  role_name: string;
}
export interface User extends BaseEntity {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Teacher" | "Student";
}
export interface UserDetail {
  id: number;
  email: string;
  fullname: string;
  role: UserRole;
  created_at: string;
}
export interface UserListResponse {
  users: UserDetail[];
}

export interface LoginRequestDTO {
  email: string;
  password: string;
}

export interface LoginResponseDTO {
  jwt: string;
}
export interface RegisterRequestDTO {
  email: string;
  password: string;
  fullname: string;
  role: string;
}

export interface RegisterResponseDTO {
  message: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Teacher" | "Student";
}

// Subject Types
export interface Subject extends BaseEntity {
  subjectId?: number;
  name: string;
  description?: string;
  topics?: Topic[]; // Thêm relation topics
}
export interface SubjectRequestDTO {
  name: string;
  description?: string;
}

export interface SubjectResponseDTO {
  subjectId?: number;
  name: string;
  description?: string;
}
// Topic Types
export interface Topic extends BaseEntity {
  topicId?: number;
  name: string;
  description?: string;
  difficultyLevel?: number;
  subjectId: number;
  subject?: Subject;
  questions?: Question[];
  learningMaterials?: LearningMaterial[];
}
export interface TopicRequestDTO {
  name: string;
  description?: string;
  difficultyLevel?: number;
  subjectId: number;
}

export interface TopicResponseDTO {
  topicId?: number;
  name: string;
  description?: string;
  difficultyLevel?: number;
  subjectId?: number;
}
// Question Types
export interface Question extends BaseEntity {
  questionId?: number;
  text: string;
  type?: string;
  correctAnswer?: string;
  hintContent?: string;
  topicId?: number;
  topic?: Topic;
}
export interface QuestionRequestDTO {
  text: string;
  type?: string;
  correctAnswer?: string;
  hintContent?: string;
  topicId: number;
}

export interface QuestionResponseDTO {
  questionId?: number;
  text: string;
  type?: string;
  correctAnswer?: string;
  hintContent?: string;
  topicId?: number;
}
// Learning Material Types
export interface LearningMaterial extends BaseEntity {
  materialId?: number;
  title: string;
  content?: string;
  type?: string;
  duration?: number;
  topicId?: number;
  topic?: Topic;
}
export interface LearningMaterialRequestDTO {
  title: string;
  content?: string;
  type?: string;
  duration?: number;
  topicId: number;
}

export interface LearningMaterialResponseDTO {
  materialId?: number;
  title: string;
  content?: string;
  type?: string;
  duration?: number;
  topicId?: number;
}
// Feedback Types
export interface Feedback extends BaseEntity {
  feedbackId?: number;
  content: string;
  subjectId: number;
  studentId?: number;
  subject?: Subject;
}
export interface FeedbackRequestDTO {
  content: string;
  subjectId: number;
}

export interface FeedbackResponseDTO {
  feedbackId?: number;
  content: string;
  subjectId?: number;
  studentId?: number;
}
