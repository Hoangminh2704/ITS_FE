import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Register.css";

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (password.length <= 6) {
      setError("Password must greater than 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const role = isTeacher ? "TEACHER" : "STUDENT";
      const success = await register(email, password, name, role);

      if (!success) {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <div className="logo-icon">
            <span
              className="material-icons-outlined"
              style={{ fontSize: "32px" }}
            >
              school
            </span>
          </div>
          <h1 className="logo-title">Intelligent Tutoring System</h1>
          <p className="logo-subtitle">Smart learning platform</p>
        </div>

        <div className="welcome-header">
          <h2 className="welcome-title">Register to ITS</h2>
          <p className="welcome-subtitle">
            Welcome to ITS! Please create account to start learning.
          </p>
        </div>

        <div className="demo-info">
          <p>
            <strong>Demo Accounts:</strong>
          </p>
          <div className="demo-account">
            <span className="demo-badge demo-admin">Admin</span>
            <span>admin@its.edu / password123</span>
          </div>
          <div className="demo-account">
            <span className="demo-badge demo-teacher">Teacher</span>
            <span>teacher@its.edu / password123</span>
          </div>
          <div className="demo-account">
            <span className="demo-badge demo-student">Student</span>
            <span>student@its.edu / password123</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full Name
            </label>
            <div className="input-wrapper">
              <span className="material-icons-outlined input-icon">
                person_outline
              </span>
              <input
                className="form-input"
                id="name"
                name="name"
                placeholder="Enter your full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <div className="input-wrapper">
              <span className="material-icons-outlined input-icon">
                mail_outline
              </span>
              <input
                className="form-input"
                id="email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrapper">
              <span className="material-icons-outlined input-icon">
                lock_outline
              </span>
              <input
                className="form-input"
                id="password"
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <span className="material-icons-outlined">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
          </div>

          <div className="role-selection">
            <p className="role-label">Register as:</p>
            <div className="role-options">
              <div className="role-option">
                <input
                  className="checkbox"
                  id="student"
                  name="role"
                  type="radio"
                  checked={!isTeacher}
                  onChange={() => setIsTeacher(false)}
                />
                <label className="role-option-label" htmlFor="student">
                  Student
                </label>
              </div>
              <div className="role-option">
                <input
                  className="checkbox"
                  id="teacher"
                  name="role"
                  type="radio"
                  checked={isTeacher}
                  onChange={() => setIsTeacher(true)}
                />
                <label className="role-option-label" htmlFor="teacher">
                  Teacher
                </label>
              </div>
            </div>
          </div>

          <div className="remember-me">
            <input
              className="checkbox"
              id="remember-me"
              name="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="remember-label" htmlFor="remember-me">
              Remember me
            </label>
          </div>

          <div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "register"}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="have-account">
          <a href="/login">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
