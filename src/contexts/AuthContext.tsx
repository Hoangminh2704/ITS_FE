import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Danh sách tài khoản mặc định
const DEFAULT_ACCOUNTS = [
  {
    email: "admin@its.com",
    password: "admin123",
    name: "Administrator",
    role: "Admin",
  },
  {
    email: "instructor@its.com",
    password: "instructor123",
    name: "John Instructor",
    role: "Instructor",
  },
  {
    email: "student@its.com",
    password: "student123",
    name: "Jane Student",
    role: "Student",
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Kiểm tra localStorage khi load app
  useEffect(() => {
    const savedUser = localStorage.getItem("its_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Tìm tài khoản trong danh sách
    const account = DEFAULT_ACCOUNTS.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (account) {
      const userData = {
        email: account.email,
        name: account.name,
        role: account.role,
      };
      setUser(userData);
      localStorage.setItem("its_user", JSON.stringify(userData));

      // Chuyển hướng dựa trên role
      switch (account.role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Instructor":
          navigate("/instructor");
          break;
        case "Student":
          navigate("/student");
          break;
        default:
          navigate("/");
      }

      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("its_user");
    navigate("/login");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
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
