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
