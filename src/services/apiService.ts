// services/apiService.ts
import type {
  Subject,
  SubjectRequestDTO,
  SubjectResponseDTO,
  Topic,
  TopicRequestDTO,
  TopicResponseDTO,
  Question,
  QuestionRequestDTO,
  QuestionResponseDTO,
  LearningMaterial,
  LearningMaterialRequestDTO,
  LearningMaterialResponseDTO,
  Feedback,
  FeedbackRequestDTO,
  FeedbackResponseDTO,
  UserDetail,
} from "../types";
const IDENTITY_API_BASE = "http://localhost:8080/api/v1";
const COURSE_API_BASE = "http://localhost:8081/api";

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("its_token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }
  private async handleUnauthorized() {
    // Chỉ redirect nếu đang ở trang cần authentication
    if (
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      localStorage.removeItem("its_token");
      localStorage.removeItem("its_user");
      window.location.href = "/login";
    }
    throw new Error("Unauthorized");
  }
  private async identityRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${IDENTITY_API_BASE}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);

    // Check for 401 Unauthorized
    if (response.status === 401) {
      return this.handleUnauthorized();
    }

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // For DELETE requests and 204 No Content responses, return null
    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }

    // For other responses, try to parse as JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    // If not JSON, return as text or null
    return response.text();
  }

  private async courseRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${COURSE_API_BASE}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);

    // Check for 401 Unauthorized
    if (response.status === 401) {
      return this.handleUnauthorized();
    }

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // For DELETE requests and 204 No Content responses, return null
    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }

    // For other responses, try to parse as JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }

    // If not JSON, return as text or null
    return response.text();
  }

  async getAllUsers(): Promise<UserDetail[]> {
    return this.identityRequest("/users");
  }
  // Subject APIs
  async createSubject(data: SubjectRequestDTO): Promise<SubjectResponseDTO> {
    return this.courseRequest("/subjects", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateSubject(
    subjectId: number,
    data: SubjectRequestDTO
  ): Promise<SubjectResponseDTO> {
    return this.courseRequest(`/subjects/${subjectId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteSubject(subjectId: number): Promise<void> {
    await this.courseRequest(`/subjects/${subjectId}`, {
      method: "DELETE",
    });
  }

  async getSubjects(): Promise<SubjectResponseDTO[]> {
    return this.courseRequest("/subjects");
  }

  async getSubjectWithTopics(subjectId: number): Promise<Subject> {
    const subject = (await this.courseRequest(
      `/subjects/${subjectId}`
    )) as SubjectResponseDTO;
    const topics = await this.getTopicsBySubject(subjectId);
    return { ...subject, topics };
  }

  // Topic APIs
  async createTopic(data: TopicRequestDTO): Promise<TopicResponseDTO> {
    return this.courseRequest("/topics", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateTopic(
    topicId: number,
    data: TopicRequestDTO
  ): Promise<TopicResponseDTO> {
    return this.courseRequest(`/topics/${topicId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteTopic(topicId: number): Promise<void> {
    await this.courseRequest(`/topics/${topicId}`, {
      method: "DELETE",
    });
  }

  async getTopicsBySubject(subjectId: number): Promise<Topic[]> {
    const topics = (await this.courseRequest(
      `/topics/subject/${subjectId}`
    )) as TopicResponseDTO[];

    const topicsWithDetails = await Promise.all(
      topics.map(async (topic: TopicResponseDTO) => {
        const questions = await this.getQuestionsByTopic(topic.topicId!);
        const materials = await this.getMaterialsByTopic(topic.topicId!);
        return { ...topic, questions, learningMaterials: materials } as Topic;
      })
    );

    return topicsWithDetails;
  }

  async getTopicWithDetails(topicId: number): Promise<Topic> {
    const topic = (await this.courseRequest(
      `/topics/${topicId}`
    )) as TopicResponseDTO;
    const questions = await this.getQuestionsByTopic(topicId);
    const materials = await this.getMaterialsByTopic(topicId);
    return { ...topic, questions, learningMaterials: materials } as Topic;
  }

  // Question APIs
  async createQuestion(data: QuestionRequestDTO): Promise<QuestionResponseDTO> {
    return this.courseRequest("/questions", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateQuestion(
    questionId: number,
    data: QuestionRequestDTO
  ): Promise<QuestionResponseDTO> {
    return this.courseRequest(`/questions/${questionId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteQuestion(questionId: number): Promise<void> {
    await this.courseRequest(`/questions/${questionId}`, {
      method: "DELETE",
    });
  }

  async getQuestionsByTopic(topicId: number): Promise<QuestionResponseDTO[]> {
    return this.courseRequest(`/questions/topic/${topicId}`);
  }

  async getQuestionById(questionId: number): Promise<QuestionResponseDTO> {
    return this.courseRequest(`/questions/${questionId}`);
  }

  // Learning Material APIs
  async createLearningMaterial(
    data: LearningMaterialRequestDTO
  ): Promise<LearningMaterialResponseDTO> {
    return this.courseRequest("/materials", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateLearningMaterial(
    materialId: number,
    data: LearningMaterialRequestDTO
  ): Promise<LearningMaterialResponseDTO> {
    return this.courseRequest(`/materials/${materialId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteLearningMaterial(materialId: number): Promise<void> {
    await this.courseRequest(`/materials/${materialId}`, {
      method: "DELETE",
    });
  }

  async getMaterialsByTopic(
    topicId: number
  ): Promise<LearningMaterialResponseDTO[]> {
    return this.courseRequest(`/materials/topic/${topicId}`);
  }

  async getMaterialById(
    materialId: number
  ): Promise<LearningMaterialResponseDTO> {
    return this.courseRequest(`/materials/${materialId}`);
  }

  // Feedback APIs
  async createFeedback(data: FeedbackRequestDTO): Promise<FeedbackResponseDTO> {
    return this.courseRequest("/feedbacks", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getFeedbacksBySubject(
    subjectId: number
  ): Promise<FeedbackResponseDTO[]> {
    return this.courseRequest(`/feedbacks/subject/${subjectId}`);
  }

  async deleteFeedback(feedbackId: number): Promise<void> {
    await this.courseRequest(`/feedbacks/${feedbackId}`, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
