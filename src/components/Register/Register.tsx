import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const CreateAccount: React.FC = () => {
  useEffect(() => {
    document.title = "ITS";
    return () => {
      document.title = "ITS";
    };
  }, []);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const [success, setSuccess] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length <= 6) {
      setError("Password must be greater than 6 characters long");
      setLoading(false);
      return;
    }

    const role = isTeacher ? "TEACHER" : "STUDENT";
    const success = await register(email, password, name, role);

    if (success) {
      setSuccess(true);
      setEmail("");
      setPassword("");
      setName("");
      setIsTeacher(false);

      setTimeout(() => {
        navigate("/admin");
      }, 2000);
    } else {
      setError("Failed to create user. Please try again.");
    }

    setLoading(false);
  };

  const handleBack = () => {
    navigate("/admin");
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
          <p className="logo-subtitle">Admin - Create New User</p>
        </div>

        <div
          className="welcome-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            marginBottom: "1rem",
          }}
        >
          <button
            type="button"
            onClick={handleBack}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "#3346c8",
              cursor: "pointer",
              position: "absolute",
              left: "0",
              padding: "8px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
            disabled={loading}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <span
              className="material-icons-outlined"
              style={{ fontSize: "24px" }}
            >
              arrow_back
            </span>
          </button>
          <h2 className="welcome-title">Create New User</h2>
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
        {success && (
          <div
            className="success-message"
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              border: "1px solid #c3e6cb",
              textAlign: "center",
            }}
          >
            User created successfully! Redirecting to admin page...
          </div>
        )}

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
                disabled={success}
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
                disabled={success}
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
                disabled={success}
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
            <p className="role-label">Create account for:</p>
            <div className="role-options">
              <div className="role-option">
                <input
                  className="checkbox"
                  id="student"
                  name="role"
                  type="radio"
                  checked={!isTeacher}
                  onChange={() => setIsTeacher(false)}
                  disabled={success}
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
                  disabled={success}
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
              {loading ? "Creating..." : "Create new account"}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        {/* <div className="have-account">
          <a href="/login">Already have an account? Login</a>
        </div> */}
      </div>
    </div>
  );
};

export default CreateAccount;
