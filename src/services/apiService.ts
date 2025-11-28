// services/apiService.ts
import type {
  Subject,
  SubjectRequestDTO,
  SubjectResponseDTO,
  Topic,
  TopicRequestDTO,
  TopicResponseDTO,
  QuestionRequestDTO,
  QuestionResponseDTO,
  LearningMaterialCreateRequestDTO,
  LearningMaterialRequestDTO,
  LearningMaterialResponseDTO,
  FeedbackRequestDTO,
  FeedbackResponseDTO,
  UserDetail,
  FileDownloadResponse,
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

  private getAuthHeadersMultipart(): HeadersInit {
    const token = localStorage.getItem("its_token");
    return {
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleUnauthorized() {
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
    if (response.status === 401) {
      return this.handleUnauthorized();
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  private async courseRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${COURSE_API_BASE}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    const response = await fetch(url, config);

    if (response.status === 401) {
      return this.handleUnauthorized();
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    if (response.status === 204 || options.method === "DELETE") {
      return null;
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return response.text();
  }

  private async courseMultipartRequest(
    endpoint: string,
    formData: FormData,
    method: string = "POST"
  ) {
    const url = `${COURSE_API_BASE}${endpoint}`;

    const config: RequestInit = {
      method,
      headers: this.getAuthHeadersMultipart(),
      body: formData,
    };

    const response = await fetch(url, config);

    if (response.status === 401) {
      return this.handleUnauthorized();
    }
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async createLearningMaterial(
    data: LearningMaterialCreateRequestDTO,
    file?: File
  ): Promise<LearningMaterialResponseDTO> {
    const formData = new FormData();

    formData.append("material", JSON.stringify(data));

    if (file) {
      formData.append("file", file);
    }

    return this.courseMultipartRequest("/materials", formData, "POST");
  }

  async updateLearningMaterial(
    materialId: number,
    data: LearningMaterialRequestDTO,
    file?: File
  ): Promise<LearningMaterialResponseDTO> {
    const formData = new FormData();

    const { file: _, ...materialData } = data;
    formData.append("material", JSON.stringify(materialData));

    if (file) {
      formData.append("file", file);
    }

    return this.courseMultipartRequest(
      `/materials/${materialId}`,
      formData,
      "PUT"
    );
  }

  async getFileDownloadUrl(materialId: number): Promise<FileDownloadResponse> {
    return this.courseRequest(`/materials/${materialId}/download`);
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

  async getAllUsers(): Promise<UserDetail[]> {
    return this.identityRequest("/auth/users");
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
