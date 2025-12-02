import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import CourseContentPage from "./pages/CourseContentPage/CourseContentPage";
import QuizContentPage from "./pages/QuizContentPage/QuizContentPage";
import { AuthProvider } from "./contexts/AuthContext";

import InstructorDashboard from "./components/InstructorDashboard/InstructorDashboard";
import StudentDashboard from "./pages/StudentDashboard/StudentDashboard";
import StudentCoursesView from "./pages/StudentCoursesView/StudentCoursesView";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedbackPage from "./components/Feedback/FeedbackPage";
import CreateAccount from "./pages/Register/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin/create-account"
            element={
              <ProtectedRoute requiredRole="Admin">
                <CreateAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="Admin">
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute requiredRole="Teacher">
                <InstructorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/course/:courseId"
            element={
              <ProtectedRoute requiredRole="Teacher">
                <CourseContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/course/:courseId/quiz/create"
            element={
              <ProtectedRoute requiredRole="Teacher">
                <QuizContentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/course/:courseId/feedback"
            element={
              <ProtectedRoute requiredRole="Teacher">
                <FeedbackPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute requiredRole="Student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/course/:courseId"
            element={
              <ProtectedRoute requiredRole="Student">
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
