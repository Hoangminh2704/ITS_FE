// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { UserDetail } from "../types";

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
  getAllUsers: () => Promise<UserDetail[]>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const isTeacher = user?.role === "Teacher" || user?.role === "Admin";
  const isAdmin = user?.role === "Admin";

  const hasRole = (roles: User["role"][]): boolean => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const validateToken = (token: string): boolean => {
    try {
      const decodedToken = parseJwt(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp && decodedToken.exp < currentTime) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("its_user");
      const savedToken = localStorage.getItem("its_token");

      if (savedUser && savedToken) {
        if (validateToken(savedToken)) {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);

          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/"
          ) {
            switch (parsedUser.role) {
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
          }
        } else {
          localStorage.removeItem("its_token");
          localStorage.removeItem("its_user");
          if (window.location.pathname !== "/login") {
            navigate("/login");
          }
        }
      } else {
        const publicRoutes = ["/login", "/register"];
        if (!publicRoutes.includes(window.location.pathname)) {
          navigate("/login");
        }
      }
    };

    initializeAuth();
  }, [navigate]);

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

      return true;
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

  const getAllUsers = async (): Promise<UserDetail[]> => {
    try {
      const token = localStorage.getItem("its_token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${IDENTITY_SERVICE_API_URL}/api/v1/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          await handleUnauthorized();
        }
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Get all users error:", error);
      throw error;
    }
  };

  const handleUnauthorized = async () => {
    localStorage.removeItem("its_token");
    localStorage.removeItem("its_user");
    setUser(null);
    setIsAuthenticated(false);
    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
    throw new Error("Unauthorized");
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
        getAllUsers,
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
