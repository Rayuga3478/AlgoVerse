import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/layout/Canvas';
import { PlaybackControls } from './components/controls/PlaybackControls';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { AuthPage } from './components/auth/AuthPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { RoadmapPage } from './components/roadmap/RoadmapPage';
import { ProblemPage } from './components/roadmap/ProblemPage';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const { user, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#0a0a0a]">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
    setCurrentView('dashboard'); // Reset view on logout
  };

  const AppLayout = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      key="main-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col lg:flex-row h-full w-full absolute inset-0 p-4 lg:p-6 gap-6"
    >
      {/* Left Sidebar */}
      <div className="w-full lg:w-[35%] xl:w-[30%] flex-shrink-0 z-20 h-full">
        <Sidebar
          onLogout={handleLogout}
          onNavigateToProfile={() => setCurrentView('profile')}
        />
      </div>

      {/* Right Area (Dynamic Content) */}
      <div className="flex-1 w-full relative flex flex-col z-10 h-full rounded-[2rem] lg:rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
        {children}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden text-zinc-100 font-inter relative">
      <BackgroundEffects />

      <AnimatePresence mode="wait">
        {!user ? (
          <AuthPage key="auth" onLogin={() => { }} />
        ) : currentView === 'profile' ? (
          <ProfilePage key="profile" onBack={() => setCurrentView('dashboard')} onLogout={handleLogout} />
        ) : (
          <AppLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/visualizer" replace />} />
              <Route path="/visualizer" element={
                <div className="flex-1 w-full relative flex flex-col h-full">
                  <Canvas />
                  <PlaybackControls />
                </div>
              } />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/roadmap" element={<RoadmapPage />} />
              <Route path="/problem/:id" element={<ProblemPage />} />
              <Route path="*" element={<Navigate to="/visualizer" replace />} />
            </Routes>
          </AppLayout>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
