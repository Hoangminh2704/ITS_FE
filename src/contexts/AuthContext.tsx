// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IDENTITY_SERVICE_API_URL = `http://localhost:8080`;

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Teacher" | "Student";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    fullname: string,
    role: string
  ) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (roles: User["role"][]) => boolean;
  isTeacher: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Tính toán derived values
  const isTeacher = user?.role === "Teacher" || user?.role === "Admin";
  const isAdmin = user?.role === "Admin";

  const hasRole = (roles: User["role"][]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("its_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${IDENTITY_SERVICE_API_URL}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid credentials");
        }
        throw new Error("Login failed");
      }

      const data = await response.json();
      const token = data.jwt;

      if (!token) {
        throw new Error("No token received");
      }

      // Decode JWT to get user information
      const decodedToken = parseJwt(token);

      const userData: User = {
        id: decodedToken.id,
        name: decodedToken.email.split("@")[0],
        email: decodedToken.email,
        role: mapRole(decodedToken.role),
      };

      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem("its_user", JSON.stringify(userData));
      localStorage.setItem("its_token", token);

      // Navigate based on role
      switch (userData.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Teacher":
          navigate("/teacher");
          break;
        case "Student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    fullname: string,
    role: string
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `${IDENTITY_SERVICE_API_URL}/api/v1/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            fullname,
            role: role.toUpperCase(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      const data = await response.json();
      return await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("its_user");
    localStorage.removeItem("its_token");
    navigate("/login");
  };

  function parseJwt(token: string): any {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error parsing JWT:", error);
      return {};
    }
  }

  function mapRole(role: string): "Admin" | "Teacher" | "Student" {
    switch (role.toLowerCase()) {
      case "admin":
        return "Admin";
      case "teacher":
        return "Teacher";
      case "student":
        return "Student";
      default:
        return "Student";
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        hasRole,
        isTeacher,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
