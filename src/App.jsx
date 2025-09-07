import React, { Suspense, useContext, useState, useEffect } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";

const MusicLibrary = React.lazy(() => import("music_library/MusicLibrary"));

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="max-w-5xl mx-auto p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎵 MF Music — Container</h1>
      <div className="space-x-2">
        {user ? (
          <>
            <span className="mr-3">
              Signed in: <strong>{user.name}</strong> ({user.role})
            </span>
            <button className="px-3 py-1 border rounded" onClick={logout}>
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
}

function AppContent() {
  const { token, loginAs, logout } = useContext(AuthContext);
  const [formdata, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      setFormData({ name: "", password: "" });
      setError("");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (formdata.name === "user" && formdata.password === "user123") {
      loginAs("user");
    } else if (formdata.name === "admin" && formdata.password === "admin123") {
      loginAs("admin");
    } else {
      setError("Invalid username or password");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 border rounded shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Login to Music library</h2>
          <form onSubmit={handleLogin} className="flex flex-col space-y-3">
            <label>Username</label>
            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="Enter Name"
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="px-3 py-2 bg-blue-500 text-white rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<div>Loading music library...</div>}>
      <MusicLibrary token={token} logout={logout} />
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
