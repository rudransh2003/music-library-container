import React, { Suspense, useContext, useState, useEffect } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";
import { Toaster, toast } from "sonner";

const MusicLibrary = React.lazy(() => import("music_library/MusicLibrary"));

function AppContent() {
  const { token, loginAs, logout: ctxLogout } = useContext(AuthContext);
  const [formdata, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      ctxLogout();
      toast.success("Logged out");
    } else {
      toast.message("Logout cancelled");
    }
  };

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
      toast.success("Logged in as user");
    } else if (formdata.name === "admin" && formdata.password === "admin123") {
      loginAs("admin");
      toast.success("Logged in as admin");
    } else {
      setError("Invalid username or password");
      toast.error("Invalid username or password");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🎵</span>
            <h2 className="text-xl sm:text-2xl font-extrabold">Music library</h2>
          </div>

          <p className="text-sm text-white/60 mb-4">Sign in to continue</p>

          <form onSubmit={handleLogin} className="space-y-3">
            <label className="block text-xs uppercase tracking-wide text-white/60">
              Username
            </label>
            <div className="rounded-lg bg-white/10 focus-within:bg-white/15 border border-white/10">
              <input
                name="name"
                value={formdata.name}
                onChange={handleChange}
                placeholder="Enter name (user / admin)"
                className="w-full bg-transparent outline-none px-3 py-2 text-sm"
                autoCapitalize="off"
                autoCorrect="off"
              />
            </div>

            <label className="block text-xs uppercase tracking-wide text-white/60">
              Password
            </label>
            <div className="rounded-lg bg-white/10 focus-within:bg-white/15 border border-white/10">
              <input
                type="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none px-3 py-2 text-sm"
              />
            </div>

            {error && <div className="text-red-400 text-xs mt-1">{error}</div>}

            <button
              type="submit"
              className="w-full mt-2 rounded-full bg-white text-black font-medium py-2 hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
          <div className="text-sm text-white/70">Loading music library…</div>
        </div>
      }
    >
      <MusicLibrary token={token} logout={logout} />
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-center" closeButton theme="light" duration={2000} />
      <AppContent />
    </AuthProvider>
  );
}