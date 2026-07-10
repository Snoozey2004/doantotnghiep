import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse stored user:", err);
        localStorage.removeItem("user");
      }
    } else {
      const roleValue = localStorage.getItem("userRole");
      const userName = localStorage.getItem("userName");
      const token = localStorage.getItem("accessToken");

      if (token && roleValue) {
        let parsedRoleNum = Number(roleValue);
        if (isNaN(parsedRoleNum)) {
            const roleMap = { admin: 0, editor: 1, customer: 2, seller: 3 };
            parsedRoleNum = roleMap[roleValue.toLowerCase()] ?? roleValue;
        }
        setUser({
          id: null,
          fullName: userName || "",
          email: "",
          role: parsedRoleNum
        });
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, expiresAt = null) => {
    let parsedRole = userData.role;
    if (typeof parsedRole === "string") {
      const num = parseInt(parsedRole, 10);
      if (!isNaN(num)) {
        parsedRole = num;
      } else {
        const roleMap = { admin: 0, editor: 1, customer: 2, seller: 3 };
        parsedRole = roleMap[parsedRole.toLowerCase()] ?? parsedRole;
      }
    }

    const userWithRole = {
      ...userData,
      role: parsedRole
    };
    setUser(userWithRole);
    localStorage.setItem("user", JSON.stringify(userWithRole));
    localStorage.setItem("userRole", String(userWithRole.role));
    localStorage.setItem("userName", userWithRole.fullName || "");

    // Store token expiration time
    if (expiresAt) {
      localStorage.setItem("tokenExpiresAt", expiresAt);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("tokenExpiresAt");
  };

  // Listen for logout events from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "user" && !e.newValue) {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
