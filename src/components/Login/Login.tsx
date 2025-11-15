import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header with Logo */}
        <div className="login-header">
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

        {/* Welcome Text */}
        <div className="welcome-header">
          <h2 className="welcome-title">Login to ITS</h2>
          <p className="welcome-subtitle">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Demo Accounts Info */}
        <div className="demo-info">
          <p>
            <strong>Demo Accounts:</strong>
          </p>
          <div className="demo-account">
            <span className="demo-badge demo-admin">Admin</span>
            <span>admin@its.com / admin123</span>
          </div>
          <div className="demo-account">
            <span className="demo-badge demo-instructor">Instructor</span>
            <span>instructor@its.com / instructor123</span>
          </div>
          <div className="demo-account">
            <span className="demo-badge demo-student">Student</span>
            <span>student@its.com / student123</span>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Email Field */}
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

          {/* Password Field */}
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

          {/* Remember Me */}
          <div className="remember-me">
            <input
              className="checkbox"
              id="remember-me"
              name="remember-me"
              type="checkbox"
            />
            <label className="remember-label" htmlFor="remember-me">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Forgot Password Link */}
        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
