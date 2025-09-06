import React, { createContext, useState, useEffect } from "react";
import { sign, verify } from "./auth";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("mf_token"));
  const [user, setUser] = useState( token ? verify(token) : null );

  useEffect(() => {
    setUser(token ? verify(token) : null);
  }, [token]);

  function loginAs(role) {
    const t = sign({ role, name: role === "admin" ? "Admin" : "User" });
    localStorage.setItem("mf_token", t);
    setToken(t);
  }
  function logout() {
    localStorage.removeItem("mf_token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}