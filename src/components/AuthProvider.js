import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error("Email và mật khẩu là bắt buộc"));
          return;
        }

        const isAdmin = email.toLowerCase() === "admin@autocar.com";
        if (isAdmin && password !== "123") {
          reject(new Error("Sai tài khoản hoặc mật khẩu"));
          return;
        }

        const newUser = {
          id: Date.now(),
          email,
          name: email.split("@")[0],
          isAdmin,
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        resolve(newUser);
      }, 200);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: !!user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
