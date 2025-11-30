import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  useEffect(() => {
    document.title = "ITS - Login";
  }, []);

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

        <div className="welcome-header">
          <h2 className="welcome-title">Login to ITS</h2>
          <p className="welcome-subtitle">
            Welcome back! Please login to continue.
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

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <div className="input-wrapper">
              <span className="material-icons-outlined input-icon">
                mail_outline
              </span>
              <input
                className="form-input login"
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
                className="form-input login"
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
        <div className="create-account">
          <a href="/register">Create new account.</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
