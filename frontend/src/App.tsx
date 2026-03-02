import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Canvas } from './components/layout/Canvas';
import { PlaybackControls } from './components/controls/PlaybackControls';
import { BackgroundEffects } from './components/layout/BackgroundEffects';
import { AuthPage } from './components/auth/AuthPage';
import { ProfilePage } from './components/profile/ProfilePage';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'dashboard' | 'profile'>('dashboard');

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard'); // Reset view on logout
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden text-zinc-100 font-inter relative">
      <BackgroundEffects />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          <AuthPage key="auth" onLogin={() => setIsAuthenticated(true)} />
        ) : currentView === 'profile' ? (
          <ProfilePage key="profile" onBack={() => setCurrentView('dashboard')} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col lg:flex-row h-full w-full absolute inset-0"
          >
            {/* Left Sidebar (AI Input + Explanation) - 40% */}
            <div className="w-full lg:w-[40%] flex-shrink-0 z-20">
              <Sidebar
                onLogout={handleLogout}
                onNavigateToProfile={() => setCurrentView('profile')}
              />
            </div>

            {/* Right Area (Visualization + Controls) - 60% */}
            <div className="flex-1 w-full lg:w-[60%] relative flex flex-col z-10">
              <Canvas />
              <PlaybackControls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
