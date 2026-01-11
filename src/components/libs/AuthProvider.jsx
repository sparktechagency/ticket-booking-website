"use client";

import { deleteCookie, getCookie, setCookie } from "cookies-next";
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(getCookie("accessToken"));
  });

  const login = (token) => {
    setCookie("accessToken", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    deleteCookie("accessToken", { path: "/" });
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
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
