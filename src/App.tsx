import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import CourseContentPage from "./pages/CourseContentPage/CourseContentPage";
import QuizContentPage from "./pages/QuizContentPage/QuizContentPage";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./components/StudentDashboard/StudentDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute>
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:courseId"
            element={
              <ProtectedRoute>
                <CourseContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/instructor/course/:courseId/quiz/create"
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
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
