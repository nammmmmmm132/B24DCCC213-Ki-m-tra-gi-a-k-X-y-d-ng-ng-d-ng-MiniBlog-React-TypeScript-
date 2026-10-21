import { createContext, useContext, useState, type ReactNode } from "react";

interface AuthContextValue {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const AUTH_KEY = "miniblog_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem(AUTH_KEY) === "true"
  );

  const login = (username: string, password: string) => {
    if (username === "admin" && password === "123456") {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth phải nằm trong AuthProvider");
  return ctx;
}
