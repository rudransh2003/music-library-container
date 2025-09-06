import React, { Suspense, useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthContext";

const MusicLibrary = React.lazy(() => import("music_library/MusicLibrary"));

function Header() {
  const { user, loginAs, logout } = useContext(AuthContext);

  return (
    <header className="max-w-5xl mx-auto p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">🎵 MF Music — Container</h1>
      <div className="space-x-2">
        {user ? (
          <>
            <span className="mr-3">Signed in: <strong>{user.name}</strong> ({user.role})</span>
            <button className="px-3 py-1 border rounded" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="px-3 py-1 border rounded" onClick={() => loginAs("user")}>Login as user</button>
            <button className="px-3 py-1 border rounded" onClick={() => loginAs("admin")}>Login as admin</button>
          </>
        )}
      </div>
    </header>
  );
}

function AppContent() {
  const { token, user, loginAs, logout } = useContext(AuthContext);

  if(!token) {
    return(
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-8 border rounded shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Login to Music library</h2>
          <div className="space-x-4">
            <button
              className="px-4 py-2 border rounded bg-blue-500 text-white cursor-pointer"
              onClick={() => loginAs("user")}
            >
              Login as User
            </button>
            <button
              className="px-4 py-2 border rounded bg-green-500 text-white cursor-pointer"
              onClick={() => loginAs("admin")}
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    )
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