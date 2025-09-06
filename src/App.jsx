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
  const { token } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen">
      HELLO
      <Header />
      <main className="max-w-5xl mx-auto p-4">
        <Suspense fallback={<div>Loading remote music library...</div>}>
          <MusicLibrary token={token} />
        </Suspense>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}