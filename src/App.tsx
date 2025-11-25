import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import CourseContentPage from "./pages/CourseContentPage/CourseContentPage";
import QuizContentPage from "./pages/QuizContentPage/QuizContentPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import StudentCoursesView from "./pages/StudentCoursesView/StudentCoursesView";
import Register from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/course"
            element={
              <ProtectedRoute>
                <CourseContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/course/:courseId/quiz/create"
            element={
              <ProtectedRoute>
                <QuizContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/course/:courseId"
            element={
              <ProtectedRoute>
                <StudentCoursesView />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
